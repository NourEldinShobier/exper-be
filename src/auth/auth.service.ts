import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException, Scope, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from 'src/auth/dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.interface';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
  }

  async signIn(params: SignInDto): Promise<{ accessToken: string }> {
    const { username, password } = params;
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (user === null) throw new NotFoundException();
    const hash = await bcrypt.hash(password, user.salt);
    if (hash !== user.password) throw new UnauthorizedException();

    const payload: JwtPayload = {
      id: user.id, name: user.name,
      username: user.username, phone: user.phone,
      user: user.role,
    };

    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
