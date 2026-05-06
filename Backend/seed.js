const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.programaAcademico.count();
  if (count === 0) {
    console.log('Creating default ProgramaAcademico...');
    await prisma.programaAcademico.create({
      data: {
        id: 1,
        nombre: 'Ingeniería de Sistemas',
        codigo: 'ING-SIS',
        facultad: 'Ingeniería',
        duracionSemestres: 10
      }
    });
    console.log('Default ProgramaAcademico created successfully!');
  } else {
    console.log('ProgramaAcademico already exists.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
