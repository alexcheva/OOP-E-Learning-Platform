import express from "express";
import EnrollmentController from "../controllers/EnrollmentController.js";

const router = express.Router();

router.post("/", EnrollmentController.create);
router.get("/", EnrollmentController.getAll);
router.get('/:id', EnrollmentController.getById); // GET /api/enrollments/:id
router.delete("/:id", EnrollmentController.delete);

export default router;
