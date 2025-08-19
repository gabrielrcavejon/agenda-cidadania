import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tipo, Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioJWT } from 'src/auth/models/UsuarioJWT';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findUsuarioByEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: { email },
    });
  }

  async findOne(idUsuario: number): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: { idUsuario },
    });
  }

  async create(
    createUsuarioDto: CreateUsuarioDto,
    tipo: Tipo,
  ): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(createUsuarioDto);

    usuario.tipo = tipo;

    return await this.usuarioRepository.save(usuario);
  }

  async getMe(usuarioJWT: UsuarioJWT): Promise<Usuario> {
    try {
      return await this.usuarioRepository.findOneOrFail({
        where: { idUsuario: usuarioJWT.idUsuario },
        relations: ['empresa', 'empresa.endereco', 'empresa.endereco.cidade'],
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
