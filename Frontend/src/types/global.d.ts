export interface Estudiante {
  id?: number;
  nombres: string;
  apellidos: string;
  codigoEstudiantil: string;
  documentoIdentidad: string;
  correoInstitucional: string;
  fechaNacimiento: string | Date; // Permitir ambos tipos ayuda a evitar el error que tienes
  programaAcademicoId: number;
}