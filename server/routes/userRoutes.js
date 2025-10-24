import express from "express";
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/', UserController.create);       // POST /api/users
router.get('/', UserController.list);       // GET /api/users
router.get('/students', UserController.listStudents);       // GET /api/users/students
router.get('/:id', UserController.getById); // GET /api/users/:id
router.delete('/:id', UserController.deleteById); // DELETE /api/users/:id
router.put('/:id', UserController.updateById); // PUT /api/users/:id

export default router;