import { Router } from 'express';
import { MovieService } from '../modules/movies/movie.service';
import { MovieController } from '../modules/movies/movie.controller';

export class MovieRoutes {
  static get routes(): Router {
    const router = Router();
    const movieService = new MovieService();
    const movieController = new MovieController(movieService);

    // Define routes
    router.get('/', movieController.getMovies);
    router.get('/:id', movieController.getMovieById);
    router.post('/', movieController.createMovie);
    router.put('/:id', movieController.updateMovie);
    router.delete('/:id', movieController.deleteMovie);

    return router;
  }
}
