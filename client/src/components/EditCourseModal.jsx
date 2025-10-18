import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export default function EditCourseModal({ open, course, onClose, onSave }) {
  const [formData, setFormData] = React.useState(course || {});

  // Update local state when a new course is passed in
  React.useEffect(() => {
    setFormData(course || {});
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("HANDLE SAVE CALLED", formData)
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Course</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          fullWidth
          value={formData.name || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Credits"
          name="credits"
          type="number"
          fullWidth
          value={formData.credits || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Enrollment Limit"
          name="limit"
          type="number"
          fullWidth
          value={formData.enrollment_limit || ""}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
