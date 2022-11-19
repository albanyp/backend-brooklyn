import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { dbConfig } from './data-source';
import { UsersModule } from './modules/users/users.module';
import { MovieTypeModule } from './modules/movie-type/movie-type.module';
import { MovieFranchiseModule } from './modules/movie-franchise/movie-franchise.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ConfigModule.forRoot(), 
    AuthModule,
    UsersModule,
    MovieFranchiseModule,
    MovieTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
