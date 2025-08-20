import { Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UsuarioJWT } from 'src/auth/models/UsuarioJWT';
import { InjectRepository } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  async create(
    usuarioJWT: UsuarioJWT,
    createEventoDto: CreateEventoDto,
  ): Promise<Evento> {
    const evento = this.eventoRepository.create(createEventoDto);

    evento.idUsuarioCriacao = usuarioJWT.idUsuario;
    evento.idEmpresa = usuarioJWT.idEmpresa;

    return await this.eventoRepository.save(evento);
  }

  async findAll(usuarioJWT: UsuarioJWT): Promise<Evento[]> {
    return this.eventoRepository.find({
      where: {
        idEmpresa: usuarioJWT.idEmpresa,
      },
      relations: ['endereco', 'endereco.cidade', 'endereco.cidade.estado'],
    });
  }

  async findOne(idEvento: number) {
    return await this.eventoRepository.findOne({
      where: {
        idEvento,
      },
      relations: [
        'empresa',
        'empresa.endereco',
        'empresa.endereco.cidade',
        'empresa.endereco.cidade.estado',
        'endereco',
        'endereco.cidade',
        'endereco.cidade.estado',
      ],
    });
  }
}
