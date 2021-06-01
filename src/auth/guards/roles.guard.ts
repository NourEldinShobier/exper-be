import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, User } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    return this.matchRoles(roles, user.role);
  }

  private matchRoles(acceptable: Role[], provided: Role[]): boolean {
    return provided.some(r => acceptable.includes(r));
  }
}