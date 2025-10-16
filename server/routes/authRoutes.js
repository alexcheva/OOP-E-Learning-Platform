import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role, major } = req.body;

  try {
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, role, major) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, password, role, major || null]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.password !== password)
      return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;