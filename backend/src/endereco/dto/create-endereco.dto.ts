import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEnderecoDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  idCidade: number;

  @IsNotEmpty()
  @MaxLength(60)
  @MinLength(3)
  logradouro: string;

  @IsNotEmpty()
  @MaxLength(60)
  @MinLength(3)
  bairro: string;

  @IsNotEmpty()
  @MaxLength(8)
  @MinLength(8)
  cep: string;

  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(1)
  numero: string;
}
