import { Type } from 'class-transformer';
import {
  IsISO8601,
  IsNotEmpty,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateEnderecoDto } from 'src/endereco/dto/create-endereco.dto';

export class CreateEventoDto {
  @IsNotEmpty()
  @MaxLength(60)
  @MinLength(3)
  nome: string;

  @IsNotEmpty()
  @MaxLength(60)
  @MinLength(3)
  descricao: string;

  @IsNotEmpty()
  @IsISO8601({ strict: true }) // força o uso do fuso horário
  dataHoraInicio: Date;

  @IsNotEmpty()
  @IsISO8601({ strict: true }) // força o uso do fuso horário
  dataHoraFim: Date;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;
}
