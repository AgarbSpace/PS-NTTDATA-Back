import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import * as request from 'supertest';

describe('MovieController', () => {
  let app: INestApplication;
  let moviesService: MovieService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    moviesService = module.get<MovieService>(MovieService);
  });

  afterAll(async () => {
    app.close();
  });

  it('should return search result', async () => {
    const expected = {
  "Title": "Shrek",
  "Year": "2001",
  "Rated": "PG",
  "Released": "18 May 2001",
  "Runtime": "90 min",
  "Genre": "Animation, Adventure, Comedy",
  "Director": "Andrew Adamson, Vicky Jenson",
  "Writer": "William Steig, Ted Elliott, Terry Rossio",
  "Actors": "Mike Myers, Eddie Murphy, Cameron Diaz",
  "Plot": "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.",
  "Language": "English",
  "Country": "United States",
  "Awards": "Won 1 Oscar. 40 wins & 60 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  "Ratings": [
    {
      "Source": "Internet Movie Database",
      "Value": "7.9/10"
    },
    {
      "Source": "Rotten Tomatoes",
      "Value": "88%"
    },
    {
      "Source": "Metacritic",
      "Value": "84/100"
    }
  ],
  "Metascore": "84",
  "imdbRating": "7.9",
  "imdbVotes": "689,714",
  "imdbID": "tt0126029",
  "Type": "movie",
  "DVD": "19 Aug 2003",
  "BoxOffice": "$268,163,011",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
};
    jest.spyOn(moviesService, 'searchMovies').mockResolvedValue(expected);

    const response = await request(app.getHttpServer()).get('/movie?title=shrek');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected);
  });
});
