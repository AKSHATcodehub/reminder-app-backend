import express from 'express';
import { signUp, login } from '../controllers/userController';
import { createReminder, getUpcomingReminders } from '../controllers/reminderController';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/reminders', authMiddleware, createReminder);
router.get('/reminders', authMiddleware, getUpcomingReminders);

export default router;
