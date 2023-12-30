import { MovieModel } from '../../data';
import { CustomError } from '../../errors/custom.error';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { GetMoviesFilterDto } from './dtos/get-movies-filter.dto';

export class MovieService {
  constructor() {}

  async getMovies(getMoviesFilterDto: GetMoviesFilterDto) {
    const { genre, status } = getMoviesFilterDto;

    const query: any = {};

    if (genre) query.genre = genre;
    if (status) query.status = status;

    return await MovieModel.find(query);
  }

  async getMovieById(id: string) {
    if (id.length !== 24) throw CustomError.badRequest('Invalid movie id');

    const movie = await MovieModel.findById(id);

    if (!movie) throw CustomError.notFound('Movie not found');

    return movie;
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    try {
      const movie = new MovieModel(createMovieDto);

      return await movie.save();
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async updateMovie(id: string, data: any) {
    return 'updateMovie';
  }

  async deleteMovie(id: string) {
    return 'deleteMovie';
  }
}
