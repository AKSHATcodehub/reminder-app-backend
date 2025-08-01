import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log("strt")
    await mongoose.connect('mongodb+srv://akshat7377:Akshat99@cluster0.m9by5j9.mongodb.net');
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
