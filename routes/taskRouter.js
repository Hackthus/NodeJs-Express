import express from 'express';
import { body, query, validationResult } from 'express-validator';
import { listAllTasks, addTask, removeTask } from '../services/tasks.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await listAllTasks();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

const validationRules = [
  body('id').notEmpty().isInt().trim().escape().withMessage('ID is required and should be an integer'),
  body('sensitiveField').notEmpty().withMessage('Sensitive field is required'),
];

router.post('/', validationRules, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const task = req.body;

  try {
    const message = await addTask(task);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

const validateDelete = [query('taskId').notEmpty().isInt()];

router.delete('/', validateDelete, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const taskId = parseInt(req.query.taskId);

  try {
    const message = await removeTask(taskId);
    if (message === 'Task not found') {
      return res.status(400).json({ message });
    }
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

export default router;
