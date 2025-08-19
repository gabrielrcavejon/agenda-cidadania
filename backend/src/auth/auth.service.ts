import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioPayload } from './models/UsuarioPayload';
import { UsuarioToken } from './models/UsuarioToken';
import { UsuarioJWT } from './models/UsuarioJWT';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  login(usuarioJWT: UsuarioJWT): UsuarioToken {
    const payload: UsuarioPayload = {
      sub: usuarioJWT.idUsuario,
      idEmpresa: usuarioJWT.idEmpresa,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<UsuarioJWT> {
    try {
      const usuario = await this.usuarioService.findUsuarioByEmail(email);

      if (usuario && bcrypt.compareSync(password, usuario.senha)) {
        return {
          idUsuario: usuario.idUsuario,
          idEmpresa: usuario.idEmpresa,
        };
      }

      throw new Error('Email or password are incorrect.');
    } catch (error) {
      throw new Error(error);
    }
  }
}
