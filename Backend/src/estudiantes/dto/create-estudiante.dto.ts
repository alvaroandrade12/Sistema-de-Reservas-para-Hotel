import { IsString, IsEmail, IsISO8601, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  codigoEstudiantil: string;

  @IsString()
  @IsNotEmpty()
  documentoIdentidad: string;

  @IsEmail()
  correoInstitucional: string;

  @IsISO8601()
  fechaNacimiento: string;

  @IsNumber()
  programaAcademicoId: number;
}