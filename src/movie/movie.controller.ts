import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import * as dotenv from 'dotenv';
dotenv.config();
@Controller('movie')
export class MovieController {
  constructor(private readonly moviesService: MovieService) { }
  
  @Get()
  async searchMovies(@Query('title') title?: string, id?: string, year?: string, plot?: string) {
    if (!process.env.API_KEY) {
      throw new HttpException('Unauthorized: Api Key not found', 401);
    }

    if (!title && !id) {
      throw new HttpException('Unprocessable Entity: At least movie title or id is required', 422);
    }

    if (title && plot && year) {
      const response = await this.moviesService.searchMoviesByTitleYearAndFullPlot(title, year, plot);
      return response.data;
    }

    if (title && plot) {
      const response = await this.moviesService.searchMoviesByTitleAndFullPlot(title, plot);
      return response.data;
    }

    if (title && year) {
      const response = await this.moviesService.searchMoviesByTitleAndYear(title, year);
      return response.data;
    }

    if (id && plot) {
      const response = await this.moviesService.searchMoviesByIdAndFullPlot(id, plot);
      return response.data;
    }

    if (id) {
      const response = await this.moviesService.searchMoviesById(id);
      return response;
    }

    const response = await this.moviesService.searchMovies(title);
    return response;
  }
}
