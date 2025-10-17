import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Container,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

function AuthTabs({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    major: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e, activeTab);
    const endpoint =
      activeTab === "register"
        ? "http://localhost:9000/api/register"
        : "http://localhost:9000/api/login";
    
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(`AuthTabs data ${data} user ${data.user}`)
        onLoginSuccess(data.user); // pass user object up
      } else {
        alert(data.message || "Error during authentication");
      }
      } catch (err) {
        console.error(err);
        alert("Server error. Please try again later.");
      }
  };

  return (
   <Container maxWidth="sm">
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
      <Button
        variant={activeTab === "login" ? "contained" : "outlined"}
        onClick={() => setActiveTab("login")}
      >
        Log in
      </Button>
      <Button
        variant={activeTab === "register" ? "contained" : "outlined"}
        onClick={() => setActiveTab("register")}
      >
        Register
      </Button>
    </Box>
      <Box sx={{ mt: 6 }}>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {activeTab === "register" && (
            <>
              <TextField 
                variant="filled"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <RadioGroup
                row
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="student"
                  control={<Radio />}
                  label="Student"
                />
                <FormControlLabel
                  value="teacher"
                  control={<Radio />}
                  label="Teacher"
                />
              </RadioGroup>

              {formData.role === "student" && (
                <TextField
                  select
                  label="Major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                >
                  <MenuItem value="Computer Science">Computer Science</MenuItem>
                  <MenuItem value="Mathematics">Mathematics</MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                </TextField>
              )}
            </>
          )}

          <TextField
           variant="filled"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            variant="filled"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="contained" size="large">
            {activeTab === "login" ? "Log In" : "Register"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AuthTabs;
