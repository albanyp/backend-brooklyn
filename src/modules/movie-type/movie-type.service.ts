import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieType } from '../../entity/movie-type';
import { v4 as uuidv4 } from 'uuid'
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class MovieTypeService {
  constructor(@InjectRepository(MovieType) private movieTypeRepository: Repository<MovieType>) {}

  async getMovieType(typeId: string): Promise<MovieType> {
    const movieType = await this.movieTypeRepository.findOneBy({ id: typeId })
    return movieType
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