import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../models/AuthRequest';
import { UsuarioJWT } from '../models/UsuarioJWT';

export const UsuarioLogado = createParamDecorator(
  (data: unknown, context: ExecutionContext): UsuarioJWT => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);
