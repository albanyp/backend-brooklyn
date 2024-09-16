import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../../entity/movie';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieFranchiseService } from '../movie-franchise/movie-franchise.service';
import { MovieFranchise } from '../../entity/movie-franchise';
import { MovieTypeService } from '../movie-type/movie-type.service';
import { MovieType } from '../../entity/movie-type';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieFranchise, MovieType])],
  controllers: [MovieController],
  providers: [MovieService, MovieFranchiseService, MovieTypeService],
})

export class MovieModule { }