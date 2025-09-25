import { Request, Response } from 'express';
import prisma from '../db/prisma'; // Import Prisma Client

// GET all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        assignee: true,
      },
    });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// GET task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
      include: {
        project: true,
        assignee: true,
      },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(`Error fetching task ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error fetching task', error });
  }
};

// UPDATE task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: updates,
      include: {
        project: true,
        assignee: true,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(`Error updating task ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// CREATE task
export const createTask = async (req: Request, res: Response) => {
  try {
    const newTaskData = req.body;

    // Basic validation
    if (!newTaskData.name) {
      return res.status(400).json({ message: 'Task name is required' });
    }

    const createdTask = await prisma.task.create({
      data: newTaskData,
      include: {
        project: true,
        assignee: true,
      },
    });

    res.status(201).json(createdTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task', error });
  }
};