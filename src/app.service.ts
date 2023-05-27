import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  sendAll(): string {
    return 'Post data Hello World!';
  }
}
