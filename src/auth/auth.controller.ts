import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from 'src/auth/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post()
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }
}