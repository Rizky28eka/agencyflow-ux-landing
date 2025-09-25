import prisma from '../prisma'; // Import Prisma Client

export async function seed(): Promise<void> {
    // Deletes ALL existing entries
    await prisma.client.deleteMany();

    // Inserts seed entries
    await prisma.client.createMany({
        data: [
            { id: 1, name: 'TechCorp', contactPerson: 'John Doe', email: 'john.doe@techcorp.com', status: 'Active', contractValue: 150000, health: 'Good' },
            { id: 2, name: 'StartupXYZ', contactPerson: 'Jane Smith', email: 'jane.smith@startup.xyz', status: 'Active', contractValue: 250000, health: 'At Risk' },
            { id: 3, name: 'RetailCo', contactPerson: 'Peter Jones', email: 'peter.jones@retailco.com', status: 'Inactive', contractValue: 50000, health: 'Good' },
        ]
    });
};