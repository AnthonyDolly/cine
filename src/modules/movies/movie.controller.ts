import { Request, Response } from 'express';
import { MovieService } from './movie.service';
import { CustomError } from '../../errors/custom.error';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { GetMoviesFilterDto } from './dtos/get-movies-filter.dto';

export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  getMovies = async (req: Request, res: Response) => {
    const [error, getMoviesFilterDto] = GetMoviesFilterDto.create({
      ...req.query,
    });

    if (error) return res.status(400).json({ error });

    this.movieService
      .getMovies(getMoviesFilterDto!)
      .then((movies) => res.status(200).json(movies))
      .catch((error) => this.handleError(error, res));
  };

  getMovieById = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.movieService
      .getMovieById(id)
      .then((movie) => res.status(200).json(movie))
      .catch((error) => this.handleError(error, res));
  };

  createMovie = async (req: Request, res: Response) => {
    const [error, createMovieDto] = CreateMovieDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.movieService
      .createMovie(createMovieDto!)
      .then((movie) => res.status(201).json(movie))
      .catch((error) => this.handleError(error, res));
  };

  updateMovie = async (req: Request, res: Response) => {
    res.json('updateMovie');
  };

  deleteMovie = async (req: Request, res: Response) => {
    res.json('deleteMovie');
  };
}
