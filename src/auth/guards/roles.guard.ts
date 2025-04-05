import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) : boolean{
    //Bch njibou l’roles li talbinha l'endpoint.
    const requiredRole = this.reflector.get('role', context.getHandler());
    //Si l’endpoint maytalbch rôle spécifique, kol chay masmou7
    if (!requiredRole) return true;
//requette http
    const request = context.switchToHttp().getRequest();
    //Yjib JWT token men header Authorization (Format: Bearer <TOKEN>).
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new ForbiddenException('Token missing');

    const user = this.jwtService.verify(token);
    return user.role.some((role) => requiredRole.includes(role));
    //Yverifi est-ce que l'utilisateur 3andou au moins 1 rôle men roles li talbha l’endpoint
  }
}
