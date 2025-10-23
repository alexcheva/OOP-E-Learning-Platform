import express from "express";
import EnrollmentController from "../controllers/EnrollmentController.js";

const router = express.Router();

router.get("/", EnrollmentController.getAll);
router.get('/:id', EnrollmentController.getById); // GET /api/enrollments/:id
router.post("/", EnrollmentController.create);
router.delete("/:id", EnrollmentController.delete);

export default router;
