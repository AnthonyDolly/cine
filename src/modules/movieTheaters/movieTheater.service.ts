import { MovieTheaterModel } from '../../data';
import { CustomError } from '../../errors/custom.error';
import { CreateMovieTheaterDto } from './dtos/create-movieTheater.dto';

export class MovieTheaterService {
  constructor() {}

  async getMovieTheaters() {
    return await MovieTheaterModel.find();
  }

  async getMovieTheaterById(id: string) {
    if (id.length !== 24) throw CustomError.badRequest('Invalid product id');

    const movieTheater = await MovieTheaterModel.findById(id);

    if (!movieTheater) {
      throw CustomError.notFound('MovieTheater not found');
    }

    return movieTheater;
  }

  async createMovieTheater(createMovieTheaterDto: CreateMovieTheaterDto) {
    const existMovieTheater = await MovieTheaterModel.findOne({
      name: createMovieTheaterDto.name,
    });

    if (existMovieTheater) throw CustomError.badRequest('Name already exists');

    try {
      const movieTheater = new MovieTheaterModel(createMovieTheaterDto);

      return await movieTheater.save();
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async updateMovieTheater(id: string, data: any) {
    return 'updateMovieTheater';
  }

  async deleteMovieTheater(id: string) {
    return 'deleteMovieTheater';
  }
}
