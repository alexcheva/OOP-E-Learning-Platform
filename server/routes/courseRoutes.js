import express from 'express';
import CourseController from '../controllers/CourseController.js';

const router = express.Router();

router.post('/', CourseController.create);    // POST /api/courses
router.get('/', CourseController.list);       // GET /api/courses
router.get('/:id', CourseController.getById); // GET /api/courses/:id
router.delete('/:id', CourseController.deleteById); // DELETE /api/courses/:id
router.put('/:id', CourseController.updateById); // PUT /api/courses/:id

export default router;