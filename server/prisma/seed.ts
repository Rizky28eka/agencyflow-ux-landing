import { seed as seedUsers } from '../src/db/seeds/02_users';
import { seed as seedProjects } from '../src/db/seeds/01_projects';
import { seed as seedTasks } from '../src/db/seeds/03_tasks';
import { seed as seedClients } from '../src/db/seeds/04_clients';

async function main() {
  console.log('Start seeding...');
  await seedUsers();
  await seedProjects();
  await seedTasks();
  await seedClients();
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });