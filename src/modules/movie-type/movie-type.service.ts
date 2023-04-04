import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieType } from '../../entity/movie-type';
import { v4 as uuidv4 } from 'uuid'
import { BadRequestException } from '@nestjs/common/exceptions';
import { FindMovieTypeParamsDto } from './dtos/find-movie-type-params.dto';
import { PAGE_SIZE } from '../../constants';
import { PaginationResponse } from '../../helpers/pagination-response';

@Injectable()
export class MovieTypeService {
  constructor(@InjectRepository(MovieType) private movieTypeRepository: Repository<MovieType>) {}

  async findMovieTypeById(typeId: string): Promise<MovieType> {
    const movieType = await this.movieTypeRepository.findOneBy({ id: typeId })
    return movieType
  }

  async findMovieTypes(params: FindMovieTypeParamsDto): Promise<PaginationResponse<MovieType>> {
    const size = params.pageSize ? params.pageSize : PAGE_SIZE
    const page = params.pageNumber ? params.pageNumber : 1
    const queryBuilder = this.movieTypeRepository.createQueryBuilder('movieType')
      .skip((page - 1) * size)
      .take(page * size)
    
    if(params.name) {
      queryBuilder.where('movieType.name ilike :typeName', { typeName: `%${params.name}%`})
    }

    const [type, total] = await queryBuilder.getManyAndCount()

    return {
      data: type,
      total
    }
  }

  async createMovieType(dto: MovieType): Promise<MovieType> {
    const movieType = await this.movieTypeRepository.findOneBy({ name: dto.name })

    if(!movieType) {
      const newMovieType = await this.movieTypeRepository.create({
        name: dto.name
      })

      newMovieType.id = uuidv4()
      newMovieType.createdAt = new Date()
      newMovieType.updatedAt = newMovieType.createdAt

       await this.movieTypeRepository.save(newMovieType)
       return newMovieType
    }
  }

  async updateMovieType(id: string, dto: MovieType): Promise<MovieType> {
    const movieType = await this.movieTypeRepository.findOneBy({ id: id })

    if(movieType && movieType.name !== dto.name) {
      const updatedMovieType = movieType
      updatedMovieType.name = dto.name
      updatedMovieType.updatedAt = new Date()
      await this.movieTypeRepository.update(id, updatedMovieType)

      return updatedMovieType
    } else {
      new BadRequestException()
    }
  }

  async deleteMovieType(id: string) {
    this.movieTypeRepository.delete(id)
  }
  
}