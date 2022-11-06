import express from 'express';
import {
  deleteRole,
  getAllRoles,
  getRole,
  updateRole,
  createRole,
} from '@/controllers/Roles';
// import { requireAuth } from '@/middleware/auth';

const router = express.Router();

// ? middleware
// router.use(requireAuth);

router.route('/').get(getAllRoles).post(createRole);
router.route('/:id').get(getRole).delete(deleteRole).put(updateRole);

export default router;
