import { Module } from '@nestjs/common';
import { MulterModule as Multer } from '@nestjs/platform-express';


@Module({
  imports: [
    Multer.register({
      dest: '../../static/media',
    }),
  ],
})

export class MulterModule {}
