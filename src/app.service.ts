import { Injectable } from '@nestjs/common';
import { User } from './entity/User';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
