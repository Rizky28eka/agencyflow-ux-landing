import { Request, Response } from 'express';
import prisma from '../db/prisma'; // Import Prisma Client

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({ where: { id: parseInt(id) } });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error(`Error fetching project ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error fetching project' });
  }
};