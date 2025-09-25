import { Request, Response } from 'express';
import prisma from '../db/prisma'; // Import Prisma Client

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany();
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Error fetching clients' });
  }
};

export const getClientById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const client = await prisma.client.findUnique({ where: { id: parseInt(id) } });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.json(client);
    } catch (error) {
        console.error(`Error fetching client ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error fetching client' });
    }
};

export const createClient = async (req: Request, res: Response) => {
    try {
        const newClientData = req.body;
        if (!newClientData.name) {
            return res.status(400).json({ message: 'Client name is required' });
        }
        const createdClient = await prisma.client.create({ data: newClientData });
        res.status(201).json(createdClient);
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Error creating client' });
    }
};

export const updateClient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedClient = await prisma.client.update({ where: { id: parseInt(id) }, data: updates });
        res.json(updatedClient);
    } catch (error) {
        console.error(`Error updating client ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error updating client' });
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.client.delete({ where: { id: parseInt(id) } });
        res.status(204).send(); // No content
    } catch (error) {
        console.error(`Error deleting client ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error deleting client' });
    }
};