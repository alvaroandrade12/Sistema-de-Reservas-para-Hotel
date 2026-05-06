import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service'; // Cambiado a ./
import { EstudiantesController } from './estudiantes.controller'; // Cambiado a ./
import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  imports: [PrismaModule],
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
})
export class EstudiantesModule {}