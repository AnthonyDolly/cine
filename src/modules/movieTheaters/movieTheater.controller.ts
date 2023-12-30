import { Request, Response } from 'express';
import { MovieTheaterService } from './movieTheater.service';
import { CustomError } from '../../errors/custom.error';
import { CreateMovieTheaterDto } from './dtos/create-movieTheater.dto';

export class MovieTheaterController {
  constructor(private readonly movieTheaterService: MovieTheaterService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  getMovieTheaters = async (req: Request, res: Response) => {
    this.movieTheaterService
      .getMovieTheaters()
      .then((movieTheaters) => res.status(200).json(movieTheaters))
      .catch((error) => this.handleError(error, res));
  };

  getMovieTheaterById = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.movieTheaterService
      .getMovieTheaterById(id)
      .then((movieTheater) => res.status(200).json(movieTheater))
      .catch((error) => this.handleError(error, res));
  };

  createMovieTheater = async (req: Request, res: Response) => {
    const [error, createMovieTheaterDto] = CreateMovieTheaterDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.movieTheaterService
      .createMovieTheater(createMovieTheaterDto!)
      .then((movieTheater) => res.status(201).json(movieTheater))
      .catch((error) => this.handleError(error, res));
  };

  updateMovieTheater = async (req: Request, res: Response) => {
    res.json('updateMovieTheater');
  };

  deleteMovieTheater = async (req: Request, res: Response) => {
    res.json('deleteMovieTheater');
  };
}
