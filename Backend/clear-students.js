const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function main() {
  await prisma.estudiante.deleteMany();
  console.log('All students deleted successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
