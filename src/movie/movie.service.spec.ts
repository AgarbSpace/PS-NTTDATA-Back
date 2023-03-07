import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import axios, {AxiosStatic} from 'axios';
import { MovieService } from './movie.service';

jest.mock('axios');

describe('MovieService', () => {
  let app: INestApplication;
  let service: MovieService;
  let axiosMock: jest.Mocked<AxiosStatic>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService],
    }).compile();
    app = module.createNestApplication();

    service = module.get<MovieService>(MovieService);
    axiosMock = axios as jest.Mocked<AxiosStatic>;
  });

  afterAll(async () => {
    app.close();
  });

  it('should search movies by title', async () => {
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
    axiosMock.get.mockResolvedValueOnce({ data: expected });

    const result = await service.searchMovies('Shrek');
    expect(result).toEqual(expected);
  });

  it('should throw an error if the API request fails', async () => {
    axiosMock.get.mockRejectedValueOnce(new Error('API request failed'));

    await expect(service.searchMovies('Shrek')).rejects.toThrow('API request failed');
  });
});
