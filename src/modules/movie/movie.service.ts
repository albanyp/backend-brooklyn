import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Logger } from '@nestjs/common'
import { QueryFailedError, Repository } from 'typeorm';
import { Movie } from '../../entity/movie';
import { MovieDto, MovieRequestDto } from './dtos/movie.dto';
import { v4 as uuidv4 } from 'uuid'
import { FindMovieParamsDto } from './dtos/find-movie-params.dto';
import { PAGE_SIZE } from '../../constants';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { PaginationResponse } from '../../helpers/pagination-response';
import { PatchMovieDto } from './dtos/patch-movie.dto';
import { validateEntityKeys } from '../../helpers/patch-utils';
import { MovieFranchiseService } from '../movie-franchise/movie-franchise.service';
import { MovieTypeService } from '../movie-type/movie-type.service';
// import { MovieDetailsDto } from './dtos/movie-details.dto';

export class MovieService {

constructor(
  @InjectRepository(Movie) 
  private movieRepository: Repository<Movie>,
  private movieFranchiseService: MovieFranchiseService,
  private movieTypeService: MovieTypeService) { }

  async findMovieById(id: string): Promise<any> {
    try {
      const movie = await this.movieRepository.findOneBy({ id: id })
      // if(typeof movie.franchiseId === 'string') {
        const mediaType = await this.movieTypeService.findMovieTypeById(movie.typeId)
        let franchise

        if(movie.franchiseId && movie.franchiseId.length > 0) {
          franchise = await this.movieFranchiseService.findFranchiseById(movie.franchiseId) 
          Logger.log('movie franchise', franchise)
        }

        const res = {
          ...movie,
          franchise,
          mediaType
        }
        
        Logger.log(res)
  
        return res
      // } else {
      //   return movie
      // }
    } catch(err) {
      Logger.log(err)
    }
  }

  async findMovies(props: FindMovieParamsDto): Promise<PaginationResponse<Movie>> {
    const pageNumber = props.pageNumber ? props.pageNumber : 1
    const pageSize = props.pageSize ? props.pageSize : PAGE_SIZE
    const movieQueryBuilder = await this.movieRepository
      .createQueryBuilder('movie')

    if (props.title) {
      movieQueryBuilder.where('movie.title ilike :title', { title: `%${props.title}%` })
    }

    if (props.groupName) {
      movieQueryBuilder.andWhere('movie.groupName ilike :groupName', { groupName: `%${props.groupName}%` })
    }

    if (props.author) {
      movieQueryBuilder.andWhere('movie.author ilike :author', { author: `%${props.author}%` })
    }

    if (props.producer) {
      movieQueryBuilder.andWhere('movie.producer ilike :producer', { producer: `%${props.producer}%` })
    }

    if (pageNumber) {
      movieQueryBuilder
        .skip((pageNumber - 1) * pageSize)
        .take(pageNumber * pageSize)
    }

    const [movies, total] = await movieQueryBuilder.getManyAndCount()

    return {
      data: movies,
      total
    }
  }


  async createMovie(movie: MovieRequestDto, logoFile?: Express.Multer.File, coverFile?: Express.Multer.File): Promise<MovieDto> {
    try {
      movie.position = +movie.position
      const newMovie = this.movieRepository.create(movie)
      newMovie.id = uuidv4()

      Logger.log('movie', movie)
      if(logoFile) {
        newMovie.logoUrl = `media/${logoFile[0]?.filename && logoFile[0].filename}`
      }

      if(coverFile) {
        newMovie.coverUrl = `media/${coverFile[0]?.filename && coverFile[0].filename}`
      }

      Logger.log('comparison for franchises', typeof movie.franchise === 'string' && movie.franchise.length > 0)

      if (typeof movie.franchise === 'string' && movie.franchise.length > 0) {
        newMovie.franchiseId = movie.franchise
      } else {
        newMovie.franchiseId = null
      }

      Logger.log('newMovie.franchiseId', newMovie.franchiseId)
      if(typeof movie.releaseDate === 'string' && movie.releaseDate === 'null') {
        newMovie.releaseDate = null;
      }

      if(movie.position) {
        newMovie.position = +movie.position
      }

      await this.movieRepository.save(newMovie)
      Logger.log('newMovie', newMovie)
      return newMovie

    } catch(err) {
      Logger.log(err)
      if(err.code === '23505') {
        throw new BadRequestException(`${movie.title} already exists`)
      } else {
        throw new BadRequestException('Oops! There has been issue')
      }
    }
  }

  async updateMovie(id: string, propsToBeUpdated: FindMovieParamsDto, logoFile?: Express.Multer.File, coverFile?: Express.Multer.File): Promise<Movie> {
    try {
      const movie = await this.findMovieById(id)

      if (movie && propsToBeUpdated) {
        const movieProps = Object.keys(propsToBeUpdated)
        const changedProps = {}
        let newMovie = movie

        Logger.log('movieProps', movieProps)
        movieProps.forEach(movieProp => {
          Logger.log('movieProp', movieProp)
          Logger.log('movie[movieProp]', movie[movieProp])
          Logger.log('propsToBeUpdated[movieProp]', propsToBeUpdated[movieProp])
          if (propsToBeUpdated[movieProp] !== movie[movieProp]) {
            if(movieProp === 'releaseDate' && propsToBeUpdated[movieProp] === '') {
              propsToBeUpdated[movieProp] = null
            }

            changedProps[movieProp] = propsToBeUpdated[movieProp]
            newMovie[movieProp] = propsToBeUpdated[movieProp]
          }
        })

        if(logoFile) {
          changedProps["logoUrl"] = `media/${logoFile[0]?.filename && logoFile[0].filename}`
          newMovie["logoUrl"] = `media/${logoFile[0]?.filename && logoFile[0].filename}`
        }

        if(coverFile) {
          changedProps["coverUrl"] = `media/${coverFile[0]?.fileName && coverFile[0].filename}`
          newMovie["coverUrl"] = `media/${coverFile[0]?.filename && coverFile[0].filename}`
        }

        if (Object.keys(changedProps).length > 0) {
          await this.movieRepository.save(newMovie)
          return newMovie;
        }

      }
    } catch {
      throw new BadRequestException()
    }
  }

  async patchMovie(id: string, dto: PatchMovieDto): Promise<Movie> {
    const movie = await this.findMovieById(id)
    const validKeys = ['title', 'groupName', 'author', 'producer', 'releaseDate', 'logoUrl', 'coverUrl']
    validateEntityKeys(validKeys, dto)

    if (movie && movie[dto.key] !== dto.value) {
      this.movieRepository.update(id, {
        [dto.key]: dto.value
      })

      return {
        ...movie,
        [dto.key]: dto.value
      }
    }
  }

  async deleteMovie(id: string) {
    this.movieRepository.delete({ id: id })
  }

}