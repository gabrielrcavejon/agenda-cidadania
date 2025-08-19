import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  telefone: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  nome: string;
}
