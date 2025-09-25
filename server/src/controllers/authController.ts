import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma'; // Import Prisma Client

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined in environment variables');
}

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `user-${Date.now()}`;

    const newUser = await prisma.user.create({
      data: {
        id: userId,
        name,
        email,
        password: hashedPassword,
        role: role || 'MEMBER',
        status: 'Active',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
    });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Jangan kirim password
    const { password: _, ...userWithoutPassword } = user;

    res.json({ token, user: userWithoutPassword });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};