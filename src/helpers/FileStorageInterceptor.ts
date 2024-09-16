import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { diskStorage } from 'multer'
import * as path from 'path'

@Injectable()
export class FileStorageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const storage = diskStorage({
      destination: './static/media',
      filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const extension = path.extname(file.originalname);
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${name}-${randomName}${extension}`);
      },
    });

    // Set the storage for all files
    const files: Express.Multer.File[] = request.files as Express.Multer.File[];
    files.forEach(file => {
      // You can manipulate the file object here if needed
      // For example, if you want to set the storage property
      // file.storage = storage;
    });

    return next.handle();
  }
}