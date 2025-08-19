import { Request } from 'express';
import { UsuarioJWT } from './UsuarioJWT';

export class AuthRequest extends Request {
  user: UsuarioJWT;
}
