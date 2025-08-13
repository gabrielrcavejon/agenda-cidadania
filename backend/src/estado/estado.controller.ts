import { Controller, Get } from '@nestjs/common';
import { EstadoService } from './estado.service';

@Controller('estado')
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) {}

  @Get()
  findAll() {
    return this.estadoService.findAll();
  }
}
