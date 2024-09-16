import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common'
import { MovieFranchise } from '../../entity/movie-franchise'
import { PaginationResponse } from '../../helpers/pagination-response'
import { FindMovieFranchiseParamsDto } from './dtos/find-movie-franchise-params.dto'
import { UpdateMovieFranchiseDto } from './dtos/update-movie-franchise.dto'
import { MovieFranchiseService } from './movie-franchise.service'

@Controller('franchises')
export class MovieFranchiseController {
  constructor(private movieFranchiseService: MovieFranchiseService) {}

  @Get()
  async findFranchises(@Query() params?: FindMovieFranchiseParamsDto): Promise<PaginationResponse<MovieFranchise>> {
    return this.movieFranchiseService.findFranchises(params)
  }

  @Get(':id')
  async findFranchiseById(@Param() params: { id: string }): Promise<MovieFranchise> {
    return this.movieFranchiseService.findFranchiseById(params.id)
  }

  @Post('create')
  async createFranchise(@Body() movieFranchiseDto: UpdateMovieFranchiseDto): Promise<MovieFranchise> {
    Logger.log('movieFranchiseDto',movieFranchiseDto)
    return this.movieFranchiseService.createFranchise(movieFranchiseDto)
  }

  @Put('update/:id')
  async updateFranchise(@Param('id') id: string, @Body() content: UpdateMovieFranchiseDto): Promise<MovieFranchise> {
    return this.movieFranchiseService.updateFranchise(id, content)
  }

  @Delete(':id')
  async deleteFranchise(@Param() params: { id: string }) {
    this.movieFranchiseService.deleteFranchise(params.id)
  }


}