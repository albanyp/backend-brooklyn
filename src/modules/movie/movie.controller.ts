import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Logger, Query } from '@nestjs/common'
import { Movie } from '../../entity/movie'
import { PaginationResponse } from '../../helpers/pagination-response'
import { PatchMovieDto } from './dtos/patch-movie.dto' 
import { FindMovieParamsDto } from './dtos/find-movie-params.dto'
import { MovieDto } from './dtos/movie.dto'
import { UpdateMovieDto } from './dtos/update-movie.dto'
import { MovieService } from './movie.service'

@Controller('movies')

export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get(':id')
  async findMovieById(@Param() movieId: { id: string }): Promise<Movie> {
    return this.movieService.findMovieById(movieId.id)
  }

  @Get()
  async findMovies(@Query() props?: FindMovieParamsDto): Promise<PaginationResponse<Movie>> {
    return this.movieService.findMovies(props)
  }

  @Post('create')
  async createMovie(@Body() movieProps: MovieDto): Promise<Movie> {
    return this.movieService.createMovie(movieProps)
  }

  @Put('update/:id')
  async updateMovie(@Param('id') movieId: string, @Body() props: FindMovieParamsDto): Promise<Movie> {
    return this.movieService.updateMovie(movieId, props)
  }

  @Patch('update/:id')
  async patchMovie(@Param('id') movieId: string, @Body() dto: PatchMovieDto): Promise<Movie> {
    return this.movieService.patchMovie(movieId, dto)
  }

  @Delete(':id')
  async deleteMovie(@Param() movieId: { id: string }) {
    this.movieService.deleteMovie(movieId.id)
  }
}