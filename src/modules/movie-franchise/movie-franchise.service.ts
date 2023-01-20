import { BadRequestException, ConflictException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieFranchise } from '../../entity/movie-franchise';
import { MovieFranchiseDto } from './dtos/movie-franchise.dto';
import { v4 as uuidv4 } from 'uuid'
import { FindMovieFranchiseDto } from './dtos/find-movie-franchise.dto';
import { PAGE_SIZE } from '../../constants';
import { PaginationResponse } from '../../helpers/pagination-response';

@Injectable()
export class MovieFranchiseService {
  constructor(@InjectRepository(MovieFranchise) private movieFranchiseRepository: Repository<MovieFranchise>) { }

  async findFranchises(params?: FindMovieFranchiseDto): Promise<PaginationResponse<MovieFranchise>> {
    const page = params && params.pageNumber ? params.pageNumber : null
    const size = params && params.pageSize ? params.pageSize : PAGE_SIZE
    const name = params && params.name ? params.name : null

    if (page) {
      const queryBuilder = await this.movieFranchiseRepository
        .createQueryBuilder('movieFranchise')
        .skip((page - 1) * size)
        .take(size * page)

        if(name) {
          queryBuilder.where('movieFranchise.name ilike :franchiseName', { franchiseName: `%${name}%` })
        }

        const [franchise, total] = await queryBuilder.getManyAndCount()

      return {
        data: franchise,
        total
      }
    } else {
      const franchises = await this.movieFranchiseRepository.find()
      
      return {
        data: franchises,
        total: franchises.length
      }
    }

  }

  async findFranchise(param: string): Promise<MovieFranchise> {
    const franchise = await this.movieFranchiseRepository.findOneBy({ id: param })
    return franchise
  }

  async createFranchise(movieFranchise: MovieFranchise): Promise<MovieFranchise> {
    try {
      const newMovieFranchise = this.movieFranchiseRepository.create(movieFranchise)
      newMovieFranchise.id = uuidv4()
      newMovieFranchise.createdAt = new Date()
      newMovieFranchise.updatedAt = newMovieFranchise.createdAt

      await this.movieFranchiseRepository.save(newMovieFranchise)
      return newMovieFranchise
    } catch {
      throw new BadRequestException()
    }
  }

  async updateFranchise(id: string, body: MovieFranchiseDto) {
    if(body && body.name) {
      const franchiseToBeUpdated = await this.findFranchise(id)
      if(franchiseToBeUpdated) {
        if(franchiseToBeUpdated.name !== body.name) {
          const contentToBeUpdated = body
          contentToBeUpdated.updatedAt = new Date()
          try {
            this.movieFranchiseRepository.update(
              id,
              contentToBeUpdated
            )
          } catch {
            throw new ConflictException()
          }
        } else {
          Logger.log('already up to date')
        }
      } 
    }
  }

  async deleteFranchise(id: string) {
    this.movieFranchiseRepository.delete(id)
  }
}