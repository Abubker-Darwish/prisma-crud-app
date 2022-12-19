import {
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
  createRole,
  getCurrentUser,
} from '@/controllers/Users';
import express from 'express';

import { requireAuth } from '@/middleware/auth';

const router = express.Router();

// ? middleware
router.use(requireAuth);

router.route('/').get(getAllUsers).post(createRole);
router.route('/current').get(getCurrentUser);
router.route('/:id').put(updateUser).get(getUser).delete(deleteUser);

export default router;
