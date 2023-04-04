import { Controller, Get, Body, Delete, Param, Post, Put, Logger } from '@nestjs/common'
import { MovieType } from '../../entity/movie-type';
import { MovieTypeService } from './movie-type.service';
import { FindMovieTypeParamsDto } from './dtos/find-movie-type-params.dto';
import { PaginationResponse } from '../../helpers/pagination-response';

@Controller('types')
export class MovieTypeController {
  constructor(private movieTypeService: MovieTypeService) {}

  @Get(':id')
  async findMovieTypeById(@Param('id') typeId: string): Promise<MovieType>  {
    return this.movieTypeService.findMovieTypeById(typeId)
  }

  @Get()
  async findMovieTypes(@Param() params: FindMovieTypeParamsDto): Promise<PaginationResponse<MovieType>> {
    return this.movieTypeService.findMovieTypes(params)
  }

  @Post('create')
  async createMovieType(@Body() movieType: MovieType): Promise<MovieType> {
    return this.movieTypeService.createMovieType(movieType)
  }

  @Put('update/:id')
  async updateMovieType(@Param('id') typeId: string, @Body() movieType: MovieType): Promise<MovieType> {
    return this.movieTypeService.updateMovieType(typeId, movieType)
  }

  @Delete(':id')
  async deleteMovieType(@Param('id') typeId: string) {
    this.movieTypeService.deleteMovieType(typeId)
  }

}