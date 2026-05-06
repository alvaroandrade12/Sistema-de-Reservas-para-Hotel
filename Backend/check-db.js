const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
async function main() {
  const programas = await prisma.programaAcademico.findMany();
  console.log('Programas Academicos:', programas);
  
  const estudiantes = await prisma.estudiante.findMany();
  console.log('Estudiantes:', estudiantes);
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
