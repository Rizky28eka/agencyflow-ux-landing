import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Move dotenv.config() here

import { protect } from './middleware/authMiddleware'; // Import protect middleware

import projectRoutes from './routes/projects';
import userRoutes from './routes/users';
import taskRoutes from './routes/tasks';
import clientRoutes from './routes/clients';
import authRoutes from './routes/auth';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes); // Public auth routes

// Protected data routes
app.use('/api/projects', protect, projectRoutes);
app.use('/api/users', protect, userRoutes);
app.use('/api/tasks', protect, taskRoutes);
app.use('/api/clients', protect, clientRoutes);


// Test route
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the AgencyFlow API!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
