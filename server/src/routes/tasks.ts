import { Router } from 'express';
import { getTasks, getTaskById, updateTask, createTask } from '../controllers/taskController';

const router = Router();

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);

export default router;
