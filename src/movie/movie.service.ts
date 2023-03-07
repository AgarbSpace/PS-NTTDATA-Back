import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class MovieService {
  async searchMovies(title: string) {
    const apiKey = process.env.API_KEY;
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`);
    return response.data;
  }

  async searchMoviesById(id: string) {
    const apiKey = process.env.API_KEY;
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
    return response.data;
  }

  async searchMoviesByTitleAndYear(title: string, year: string) {
    const apiKey = process.env.API_KEY;
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}&y=${year}`);
    return response.data;
  }
  async searchMoviesByTitleYearAndFullPlot(title: string, year: string, plot: string) {
    const apiKey = process.env.API_KEY;
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}&y=${year}&plot=${plot}`);
    return response.data;
  }
  async searchMoviesByTitleAndFullPlot(title: string, plot: string) {
    const apiKey = process.env.API_KEY;
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}&plot=${plot}`);
    return response.data;
  }
  async searchMoviesByIdAndFullPlot(id: string, plot: string) {
    const apiKey = process.env.API_KEY;
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=${plot}`);
    return response.data;
  }
}
