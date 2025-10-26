// ./modals/EditModal.jsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

export default function EditModal({ 
  isOpen, 
  onClose, 
  entityName,   // e.g. "course" or "user"
  data,         // current record to edit
  fields,       // array of { name, label, type }
  endpoint,     // e.g. `/api/courses` or `/api/users`
  onSave        // callback after successful update
}) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  console.log("EditModal", isOpen, data, fields, endpoint)

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${endpoint}/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Update failed");

      onSave(result);
      onClose();
    } catch (err) {
      console.error(`Error updating ${entityName}:`, err.message);
      alert(`Failed to update ${entityName}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit {entityName}</DialogTitle>

      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {fields.map((f) => (
            <TextField
              key={f.name}
              label={f.label}
              name={f.name}
              type={f.type || "text"}
              value={formData[f.name] ?? ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          ))}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
