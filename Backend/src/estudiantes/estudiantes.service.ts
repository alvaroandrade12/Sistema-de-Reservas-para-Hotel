// backend/src/estudiantes/estudiantes.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(private prisma: PrismaService) {} // Debe tener esto

  async create(createEstudianteDto: CreateEstudianteDto) {
    const data: any = { ...createEstudianteDto };
    if (data.fechaNacimiento) {
      data.fechaNacimiento = new Date(data.fechaNacimiento);
    }
    // Asegurar que el id es un número
    if (data.programaAcademicoId) {
      data.programaAcademicoId = Number(data.programaAcademicoId);
    }

    // Regla de Negocio: Verificar que el programa académico exista
    const programa = await this.prisma.programaAcademico.findUnique({
      where: { id: data.programaAcademicoId }
    });
    if (!programa) {
      throw new NotFoundException(`El Programa Académico con ID ${data.programaAcademicoId} no existe`);
    }

    // Regla de Negocio: Verificar si ya existe un estudiante con el mismo código, documento o correo
    const existente = await this.prisma.estudiante.findFirst({
      where: {
        OR: [
          { codigoEstudiantil: data.codigoEstudiantil },
          { correoInstitucional: data.correoInstitucional },
          { documentoIdentidad: data.documentoIdentidad }
        ]
      }
    });
    if (existente) {
      throw new ConflictException('Ya existe un estudiante con este código, documento o correo');
    }
    
    return this.prisma.estudiante.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.estudiante.findMany({
      include: {
        programaAcademico: true,
      }
    });
  }

  async findOne(id: number) {
    const estudiante = await this.prisma.estudiante.findUnique({
      where: { id },
      include: {
        programaAcademico: true,
      }
    });
    
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    return estudiante;
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    const data: any = { ...updateEstudianteDto };
    if (data.fechaNacimiento) {
      data.fechaNacimiento = new Date(data.fechaNacimiento);
    }
    if (data.programaAcademicoId) {
      data.programaAcademicoId = Number(data.programaAcademicoId);
    }

    return this.prisma.estudiante.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.estudiante.delete({
      where: { id },
    });
  }
}