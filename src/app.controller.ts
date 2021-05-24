import { Controller, Get } from '@nestjs/common';
import { API_VERSION, DOCS } from 'src/server/config';

@Controller()
export class AppController {
  constructor() {
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
