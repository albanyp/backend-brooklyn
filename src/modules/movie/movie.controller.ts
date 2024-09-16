import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Logger, Query, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common'
import { Movie } from '../../entity/movie'
import { PaginationResponse } from '../../helpers/pagination-response'
import { PatchMovieDto } from './dtos/patch-movie.dto'
import { FindMovieParamsDto } from './dtos/find-movie-params.dto'
import { MovieDto, MovieRequestDto } from './dtos/movie.dto'
import { UpdateMovieDto } from './dtos/update-movie.dto'
import { MovieService } from './movie.service'
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { join, extname } from 'path'


@Controller('movies')
@UseInterceptors(
  FileFieldsInterceptor(
    [
      { name: 'logoFile' },
      { name: 'coverFile' }
    ],
    {
      storage: diskStorage({
        destination: './static/media',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const extension = extname(file.originalname);
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          cb(null, `${name}-${randomName}${extension}`);
        },
      })
    }
  )
)

export class MovieController {
  constructor(private movieService: MovieService) { }

  @Get(':id')
  async findMovieById(@Param('id') movieId: string): Promise<Movie> {
    return this.movieService.findMovieById(movieId)
  }

  @Get()
  async findMovies(@Query() props?: FindMovieParamsDto): Promise<PaginationResponse<Movie>> {
    return this.movieService.findMovies(props)
  }

  @Post('create')
  async createMovie(@Body() movieProps: MovieRequestDto, @UploadedFiles() files?: { logoFile?: Express.Multer.File, coverFile?: Express.Multer.File }): Promise<MovieDto> {
    // Logger.log('returned movie', this.movieService.createMovie(movieProps, files.logoFile, files.coverFile))
    Logger.log('movieprops', movieProps)
    return this.movieService.createMovie(movieProps, files?.logoFile, files.coverFile)
  }

  @Put('update/:id')
  async updateMovie(@Param('id') movieId: string, @Body() props: FindMovieParamsDto, @UploadedFiles() files?: { logoFile?: Express.Multer.File, coverFile?: Express.Multer.File }): Promise<Movie> {
    Logger.log('props', props)
    return this.movieService.updateMovie(movieId, props, files.logoFile, files.coverFile)
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