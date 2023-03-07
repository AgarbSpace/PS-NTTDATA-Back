import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly moviesService: MovieService) { }
  
  @Get()
  async searchMovies(@Query('title') title: string) {
    const response = await this.moviesService.searchMovies(title);
    if ( response === "Unauthorized") {
      throw new HttpException('Unauthorized: Api Key not found', 401);
    }

    return response;
  }
}
