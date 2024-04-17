import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
import configuration from 'src/config/configuration';
import { IS_PUBLIC_KEY } from './auth.public';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { UsersService } from 'src/users/users.service';
import { DEVICE_KEY } from './device.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ignoreDeviceInUse = this.reflector.getAllAndOverride<any>(
      DEVICE_KEY,
      [context.getHandler(), context.getClass()],
    );

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: configuration().jwt,
      });

      // We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;

      /// Activate role
      const { user } = context.switchToHttp().getRequest();

      if (!user.role) {
        throw new UnauthorizedException();
      }

      const userInfo = await this.userService.findOne(user.sub);

      if (!userInfo) {
        throw new UnauthorizedException();
      }

      if (ignoreDeviceInUse) {
        return true;
      }

      if (userInfo.role !== Role.Admin && !userInfo.mobileInfo) {
        throw new UnauthorizedException();
      }

      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) {
        return true;
      }

      return requiredRoles.some((role) => user.role?.includes(role));
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
