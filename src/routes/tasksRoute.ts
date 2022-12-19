import express from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from '@/controllers/Tasks';
import { requireAuth } from '@/middleware/auth';

const router = express.Router();

// ? middleware
router.use(requireAuth);

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).delete(deleteTask).put(updateTask);

export default router;
