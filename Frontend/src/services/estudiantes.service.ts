import { api } from "@/lib/api";

export interface Estudiante {
  id: number;
  nombres: string;
  apellidos: string;
  codigoEstudiantil: string;
  documentoIdentidad: string;
  correoInstitucional: string;
  fechaNacimiento: string;
  programaAcademicoId: number;
  programaAcademico?: { id: number; nombre: string };
}

export type CreateEstudianteDto = Omit<Estudiante, "id" | "programaAcademico">;
export type UpdateEstudianteDto = Partial<CreateEstudianteDto>;

export const estudiantesService = {
  // Línea 19: Agrega la 's'
  findAll: () => api.get<Estudiante[]>("/estudiantes"), 

  // Línea 21: Agrega la 's'
  findOne: (id: number) =>
    api.get<Estudiante>(`/estudiantes/${id}`),

  // Línea 24: ¡ESTA ES LA MÁS IMPORTANTE! Agrega la 's'
  create: (data: CreateEstudianteDto) =>
    api.post<Estudiante>("/estudiantes", data),

  // Línea 27: Agrega la 's'
  update: (id: number, data: UpdateEstudianteDto) =>
    api.put<Estudiante>(`/estudiantes/${id}`, data),

  // Línea 30: Agrega la 's'
  remove: (id: number) =>
    api.delete<void>(`/estudiantes/${id}`),
};