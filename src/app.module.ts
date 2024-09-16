import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { dbConfig } from './data-source'
import { UsersModule } from './modules/users/users.module'
import { MovieTypeModule } from './modules/movie-type/movie-type.module'
import { MovieFranchiseModule } from './modules/movie-franchise/movie-franchise.module'
import { MovieModule } from './modules/movie/movie.module'
import { ServeStaticModule  } from '@nestjs/serve-static'
import { join } from 'path'
// import path = require('path')
// import { MulterModule } from '@nestjs/platform-express'
// import { MulterModule } from './modules/multer'

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ConfigModule.forRoot(), 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveStaticOptions: {
        extensions: ['.jpeg', '.jpg']
      }
    }),
    AuthModule,
    UsersModule,
    MovieModule,
    MovieFranchiseModule,
    MovieTypeModule,
    // MulterModule.register({
    //   dest: path.join(__dirname, '../static/media'),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
