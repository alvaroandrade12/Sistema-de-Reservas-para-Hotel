const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.estudiante.deleteMany({
    where: {
      nombres: 'Test',
      apellidos: 'Test'
    }
  });
  console.log('Test student deleted successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
