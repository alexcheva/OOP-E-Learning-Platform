import express from "express";
import { pool } from "../db.js";
// import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get("/api/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users ORDER BY id");
    console.log("Get /api/users called, returning:", users);
    res.json(users.rows);
  } catch (e) {
    console.log(e);
  }
});
// router.get('/', UserController.list);       // GET /api/users
// router.get('/:id', UserController.getById); // GET /api/users/:id

export default router;