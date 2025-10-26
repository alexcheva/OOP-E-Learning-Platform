import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use('/api/courses', courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/enrollments", enrollmentRoutes);
// app.get('/api/admin/courses', checkRole('teacher'), CourseController.list);
app.get('/', (req, res) => {
  res.json({ message: 'Server running on Node 24!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));