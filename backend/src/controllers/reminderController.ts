import { Request, Response } from 'express';
import Reminder from '../models/Reminder';
import nodemailer from 'nodemailer';
import { setTimeout } from 'timers';
import { config } from '../config';

import { z } from 'zod';

const reminderSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Date must be a valid ISO string',
  }),
});


export const createReminder = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const parsed = reminderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }

  const { title, description, date } = parsed.data;

  try {
    const newReminder = new Reminder({ userId, title, description, date });
    await newReminder.save();

    const timeUntilReminder = new Date(date).getTime() - Date.now();
    setTimeout(async () => {
      await sendEmailReminder(newReminder);
    }, timeUntilReminder);

    res.status(201).json(newReminder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const sendEmailReminder = async (reminder: any) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.TOKEN_SECRET_KEY,
      pass: config.TOKEN_SECRET_KEY
    }
  });

  const mailOptions = {
    from: config.TOKEN_SECRET_KEY,
    to: 'user-email@example.com',
    subject: reminder.title,
    text: reminder.description
  };

  await transporter.sendMail(mailOptions);
};

export const getUpcomingReminders = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  try {
    const reminders = await Reminder.find({ userId, date: { $gte: new Date() } });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
