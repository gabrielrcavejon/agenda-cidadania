import { Controller, Get } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioLogado } from 'src/auth/decorators/jwt-user.decorator';
import { UsuarioJWT } from 'src/auth/models/UsuarioJWT';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('me')
  getMe(@UsuarioLogado() usuario: UsuarioJWT) {
    return this.usuarioService.getMe(usuario);
  }
}
