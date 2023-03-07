import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';
import { INestApplication } from '@nestjs/common';

describe('AppModule', () => {
  let app: INestApplication
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
  });

  afterAll(async () => {
    app.close();
  });

  describe('controllers', () => {
    it('should have MovieController', () => {
      const movieController = module.get<MovieController>(MovieController);
      expect(movieController).toBeDefined();
    });
  });

  describe('services', () => {
    it('should have MovieService', () => {
      const movieService = module.get<MovieService>(MovieService);
      expect(movieService).toBeDefined();
    });
  });
});