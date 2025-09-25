import bcrypt from 'bcryptjs';
import prisma from '../prisma'; // Import Prisma Client

export async function seed(): Promise<void> {
    // Deletes ALL existing entries
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Inserts seed entries
    await prisma.user.createMany({
        data: [
            // OWNER
            { id: 'user-001', name: 'John Smith', email: 'john@agency.com', role: 'OWNER', status: 'Active', lastLogin: '2 hours ago', password: hashedPassword },
            
            // ADMIN
            { id: 'user-002', name: 'Admin User', email: 'admin@agency.com', role: 'ADMIN', status: 'Active', lastLogin: '1 hour ago', password: hashedPassword },

            // PROJECT_MANAGER
            { id: 'user-003', name: 'Sarah Johnson', email: 'sarah@agency.com', role: 'PROJECT_MANAGER', status: 'Active', lastLogin: '1 day ago', password: hashedPassword },
            { id: 'user-004', name: 'David Lee', email: 'david@agency.com', role: 'PROJECT_MANAGER', status: 'Active', lastLogin: '5 hours ago', password: hashedPassword },

            // TEAM_LEAD
            { id: 'user-005', name: 'Jessica Miller', email: 'jessica@agency.com', role: 'TEAM_LEAD', status: 'Active', lastLogin: '3 days ago', password: hashedPassword },
            { id: 'user-006', name: 'Chris Wilson', email: 'chris@agency.com', role: 'TEAM_LEAD', status: 'Inactive', lastLogin: '1 week ago', password: hashedPassword },

            // MEMBER
            { id: 'user-007', name: 'Mike Chen', email: 'mike@agency.com', role: 'MEMBER', status: 'Active', lastLogin: '3 hours ago', password: hashedPassword },
            { id: 'user-008', name: 'Emily Davis', email: 'emily@agency.com', role: 'MEMBER', status: 'Inactive', lastLogin: '1 week ago', password: hashedPassword },
            { id: 'user-009', name: 'Daniel Brown', email: 'daniel@agency.com', role: 'MEMBER', status: 'Active', lastLogin: 'yesterday', password: hashedPassword },

            // FINANCE
            { id: 'user-010', name: 'Nancy White', email: 'nancy@agency.com', role: 'FINANCE', status: 'Active', lastLogin: '4 hours ago', password: hashedPassword },
            { id: 'user-011', name: 'Robert Green', email: 'robert@agency.com', role: 'FINANCE', status: 'Active', lastLogin: '2 days ago', password: hashedPassword },

            // CLIENT
            { id: 'user-012', name: 'Client One', email: 'client1@example.com', role: 'CLIENT', status: 'Active', lastLogin: '6 hours ago', password: hashedPassword },
            { id: 'user-013', name: 'Client Two', email: 'client2@example.com', role: 'CLIENT', status: 'Active', lastLogin: '1 day ago', password: hashedPassword },
            { id: 'user-014', name: 'Client Three', email: 'client3@example.com', role: 'CLIENT', status: 'Inactive', lastLogin: '2 weeks ago', password: hashedPassword },
        ]
    });
};