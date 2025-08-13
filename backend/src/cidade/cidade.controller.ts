import { Controller, Get, Param } from '@nestjs/common';
import { CidadeService } from './cidade.service';

@Controller('cidade')
export class CidadeController {
  constructor(private readonly cidadeService: CidadeService) {}

  @Get(':idEstado')
  findAll(@Param('idEstado') idEstado: string) {
    return this.cidadeService.findAll(Number(idEstado));
  }
}
