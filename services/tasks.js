import { connectDB } from '../db.js';
import bcrypt from 'bcrypt';

export async function addTask(task) {
  const db = await connectDB();
  const tasksCollection = db.collection('tasks');

  const hashedSensitiveField = await bcrypt.hash(task.sensitiveField, 10);
  task.sensitiveField = hashedSensitiveField;

  await tasksCollection.insertOne(task);
  return 'Task added successfully!';
}

export async function listAllTasks() {
  const db = await connectDB();
  const tasksCollection = db.collection('tasks');
  const tasks = await tasksCollection.find({}).toArray();
  return tasks;
}

export async function removeTask(taskId) {
  const db = await connectDB();
  const tasksCollection = db.collection('tasks');

  const result = await tasksCollection.deleteOne({ id: taskId });
  if (result.deletedCount === 0) {
    return 'Task not found';
  }

  return 'Task deleted successfully!';
}
