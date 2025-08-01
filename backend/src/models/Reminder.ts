import mongoose, { Schema, Document } from 'mongoose';

interface IReminder extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  date: Date;
}

const ReminderSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true }
});

const Reminder = mongoose.model<IReminder>('Reminder', ReminderSchema);

export default Reminder;
