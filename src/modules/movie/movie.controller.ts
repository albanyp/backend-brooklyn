import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Logger, Query } from '@nestjs/common'
import { Movie } from '../../entity/movie'
import { PaginationResponse } from '../../helpers/pagination-response'
import { FindMovieDto } from './dtos/find-movie.dto'
import { MovieDto } from './dtos/movie.dto'
import { UpdateMovieDto } from './dtos/update-movie.dto'
import { MovieService } from './movie.service'

@Controller('movies')

export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get(':id')
  async findMovie(@Param() movieId: { id: string }): Promise<Movie> {
    return this.movieService.findMovie(movieId.id)
  }

  @Get()
  async findMovies(@Query() props?: FindMovieDto): Promise<PaginationResponse<Movie>> {
    return this.movieService.findMovies(props)
  }

  @Post('create')
  async createMovie(@Body() movieProps: MovieDto): Promise<Movie> {
    return this.movieService.createMovie(movieProps)
  }

  @Put('update/:id')
  async updateMovie(@Param() movieId: { id: string }, @Body() props: FindMovieDto) {
    this.movieService.updateMovie(movieId.id, props)
  }

  @Patch('update/:id')
  async patchMovie(@Param() movieId: { id: string }, @Body() props: UpdateMovieDto) {
    this.movieService.patchMovie(movieId.id, props)
  }

  @Delete(':id')
  async deleteMovie(@Param() movieId: { id: string }) {
    this.movieService.deleteMovie(movieId.id)
  }
}