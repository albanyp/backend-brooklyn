import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common'
import { MovieFranchise } from '../../entity/movie-franchise'
import { PaginationResponse } from '../../helpers/pagination-response'
import { FindMovieFranchiseDto } from './dtos/find-movie-franchise.dto'
import { MovieFranchiseDto } from './dtos/movie-franchise.dto'
import { MovieFranchiseService } from './movie-franchise.service'

@Controller('franchises')
export class MovieFranchiseController {
  constructor(private movieFranchiseService: MovieFranchiseService) {}

  @Get()
  async findFranchises(@Query() params?: FindMovieFranchiseDto): Promise<PaginationResponse<MovieFranchise>> {
    return this.movieFranchiseService.findFranchises(params)
  }

  @Get(':id')
  async findFranchise(@Param() params): Promise<MovieFranchise> {
    return this.movieFranchiseService.findFranchise(params.id)
  }

  @Post('create')
  async createFranchise(@Body() movieFranchiseDto: MovieFranchise): Promise<MovieFranchise> {
    return this.movieFranchiseService.createFranchise(movieFranchiseDto)
  }

  @Put('update/:id')
  async updateFranchise(@Param() params, @Body() content: MovieFranchiseDto) {
    this.movieFranchiseService.updateFranchise(params.id, content)
  }

  @Delete(':id')
  async deleteFranchise(@Param() params: { id: string }) {
    this.movieFranchiseService.deleteFranchise(params.id)
  }


}