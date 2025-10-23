// components/AddEnrollmentModal.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";

export default function AddEnrollmentModal({
  isOpen,
  onClose,
  onSave,
  students = [],
  courses = [],
}) {
  const [formData, setFormData] = useState({
    student_id: "",
    course_id: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData({ student_id: "", course_id: "" });
      setLoading(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to enroll student");

      onSave(result); // refresh list or show success
      onClose();
    } catch (err) {
      console.error("Error adding enrollment:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Enrollment</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
          }}
        >
          <TextField
            select
            label="Student"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            fullWidth
            required
          >
            {students.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name} ({s.email})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Course"
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            fullWidth
            required
          >
            {courses.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name} ({c.credits} credits)
              </MenuItem>
            ))}
          </TextField>
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
          {loading ? "Adding..." : "Add Enrollment"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}