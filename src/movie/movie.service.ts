import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class MovieService {
  async searchMovies(title: string) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "Unauthorized";
    }

    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`);
    return response.data;
  }
}
