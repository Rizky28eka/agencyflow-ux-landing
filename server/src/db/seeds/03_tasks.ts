import prisma from '../prisma'; // Import Prisma Client

export async function seed(): Promise<void> {
    // Deletes ALL existing entries
    await prisma.task.deleteMany();

    // Inserts seed entries
    await prisma.task.createMany({
        data: [
            {
                name: 'Design new homepage mockups',
                status: 'Completed',
                dueDate: new Date('2024-01-15'),
                priority: 'High',
                projectId: 1, // Website Redesign
                assigneeId: 'user-003' // Mike Chen (Designer)
            },
            {
                name: 'Develop homepage frontend',
                status: 'In Progress',
                dueDate: new Date('2024-01-25'),
                priority: 'High',
                projectId: 1, // Website Redesign
                assigneeId: 'user-004' // Emily Davis (Developer)
            },
            {
                name: 'Setup user authentication',
                status: 'In Progress',
                dueDate: new Date('2024-02-10'),
                priority: 'High',
                projectId: 2, // Mobile App
                assigneeId: 'user-004' // Emily Davis (Developer)
            },
            {
                name: 'QA testing for homepage',
                status: 'Not Started',
                dueDate: new Date('2024-02-05'),
                priority: 'Medium',
                projectId: 1, // Website Redesign
                assigneeId: 'user-002' // Sarah Johnson (PM)
            },
            {
                name: 'Create brand guidelines document',
                status: 'Review',
                dueDate: new Date('2024-01-28'),
                priority: 'Medium',
                projectId: 3, // Brand Identity
                assigneeId: 'user-003' // Mike Chen (Designer)
            }
        ]
    });
};