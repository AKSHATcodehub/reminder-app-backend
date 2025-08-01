# 🕑 Online Reminder System

## Overview

The **Online Reminder System** is a full-stack application that allows users to schedule personal reminders and receive email notifications when they are due. It provides secure user authentication, a dashboard to manage reminders, and automatic email alerts.

---

## ✨ Features

### ✅ User Authentication
- Sign up and login functionality using JWT tokens
- Password hashing with bcrypt for secure storage

### 📝 Create & Manage Reminders
- Users can create reminders with:
  - Title
  - Description
  - Date and time

### 🔔 Email Notifications
- Automatic email alerts sent when a reminder is due using Nodemailer
- SMTP integration with Gmail (or alternatives like Mailtrap for testing)

### 📅 View Upcoming Reminders
- Users can view all scheduled future reminders

