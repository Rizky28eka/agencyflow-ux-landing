import prisma from '../prisma'; // Import Prisma Client

export async function seed(): Promise<void> {
    // Deletes ALL existing entries
    await prisma.project.deleteMany();

    // Inserts seed entries
    await prisma.project.createMany({
        data: [
            {
                id: 1,
                name: 'Website Redesign',
                client: 'TechCorp',
                status: 'In Progress',
                progress: 75,
                team: 5,
                deadline: new Date('2024-02-15'),
                priority: 'High'
            },
            {
                id: 2,
                name: 'Mobile App Development',
                client: 'StartupXYZ',
                status: 'Planning',
                progress: 25,
                team: 8,
                deadline: new Date('2024-03-20'),
                priority: 'Medium'
            },
            {
                id: 3,
                name: 'Brand Identity',
                client: 'RetailCo',
                status: 'Review',
                progress: 90,
                team: 3,
                deadline: new Date('2024-01-30'),
                priority: 'High'
            },
            {
                id: 4,
                name: 'E-commerce Platform',
                client: 'ShopLocal',
                status: 'In Progress',
                progress: 60,
                team: 6,
                deadline: new Date('2024-04-10'),
                priority: 'Low'
            },
        ]
    });
};