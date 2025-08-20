import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UsuarioLogado } from 'src/auth/decorators/jwt-user.decorator';
import { UsuarioJWT } from 'src/auth/models/UsuarioJWT';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  create(
    @UsuarioLogado() usuario: UsuarioJWT,
    @Body() createEventoDto: CreateEventoDto,
  ) {
    return this.eventoService.create(usuario, createEventoDto);
  }

  @Get()
  async findAll(@UsuarioLogado() usuario: UsuarioJWT) {
    return await this.eventoService.findAll(usuario);
  }

  @Public()
  @Get(':idEvento')
  async findOne(@Param('idEvento') idEvento: string) {
    return await this.eventoService.findOne(+idEvento);
  }
}
