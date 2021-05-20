import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { API_VERSION, DOCS } from 'src/server/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('docs')
  getDocs(): string {
    return DOCS;
  }

  @Get('version')
  getAPIVersion(): string {
    return API_VERSION;
  }
}
