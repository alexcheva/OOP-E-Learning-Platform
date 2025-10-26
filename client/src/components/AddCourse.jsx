import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Container } from "@mui/material";

export default function AddCourse({ onCourseAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    credits: "",
    enrollment_limit: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      onCourseAdded && onCourseAdded(data);
      setFormData({ name: "", credits: "", enrollment_limit: "" });
      alert("Course added successfully!");
      navigate("/");
    } else {
      alert("Failed to add course");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New Course
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Course Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Credits"
          name="credits"
          type="number"
          value={formData.credits}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Enrollment Limit"
          name="enrollment_limit"
          type="number"
          value={formData.enrollment_limit}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" size="large">
            Add Course
        </Button>
      </Box>
    </Container>
  );
}