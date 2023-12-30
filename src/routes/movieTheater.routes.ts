import { Router } from 'express';
import { MovieTheaterService } from '../modules/movieTheaters/movieTheater.service';
import { MovieTheaterController } from '../modules/movieTheaters/movieTheater.controller';

export class MovieTheaterRoutes {
  static get routes(): Router {
    const router = Router();
    const movieTheaterService = new MovieTheaterService();
    const movieTheaterController = new MovieTheaterController(
      movieTheaterService
    );

    // Define routes
    router.get('/', movieTheaterController.getMovieTheaters);
    router.get('/:id', movieTheaterController.getMovieTheaterById);
    router.post('/', movieTheaterController.createMovieTheater);
    router.put('/:id', movieTheaterController.updateMovieTheater);
    router.delete('/:id', movieTheaterController.deleteMovieTheater);

    return router;
  }
}
