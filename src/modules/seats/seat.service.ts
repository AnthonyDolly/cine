import { SeatModel } from '../../data/mongo/models/seat.model';
import { CustomError } from '../../errors/custom.error';
import { MovieTheaterService } from '../movieTheaters/movieTheater.service';
import { CreateSeatDto } from './dtos/create-seat.dto';

export class SeatService {
  constructor(private readonly movieTheaterService: MovieTheaterService) {}

  async getSeats() {
    return await SeatModel.find().populate('movieTheaterId');
  }

  async getSeatById(id: string) {
    if (id.length !== 24) throw CustomError.badRequest('Invalid seat id');

    const seat = await SeatModel.findById(id).populate('movieTheaterId');

    if (!seat) throw CustomError.notFound('Seat not found');

    return seat;
  }

  async createSeat(createSeatDto: CreateSeatDto) {
    const { movieTheaterId, seatNumber, row } = createSeatDto;

    const seatExistsMessage = `Seat already exists in movieTheater ${movieTheaterId}`;
    const capacityExceededMessage = `The capacity of seats in movieTheater ${movieTheaterId} has been exceeded`;

    const existSeat = await SeatModel.findOne({
      movieTheaterId,
      seatNumber,
      row,
    });

    if (existSeat) throw CustomError.badRequest(seatExistsMessage);

    const { capacity } = await this.movieTheaterService.getMovieTheaterById(
      movieTheaterId
    );

    const seats = await this.getSeatsByMovieTheaterId(movieTheaterId);

    const numberOfSeatsFromMovieTheater = Array.isArray(seats)
      ? seats.length
      : 0;

    if (numberOfSeatsFromMovieTheater === capacity)
      throw CustomError.badRequest(capacityExceededMessage);

    try {
      const seat = new SeatModel(createSeatDto);
      return await seat.save();
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async updateSeat(id: string, data: any) {
    return 'updateSeat';
  }

  async deleteSeat(id: string) {
    return 'deleteSeat';
  }

  async getSeatsByMovieTheaterId(movieTheaterId: string) {
    if (movieTheaterId.length !== 24)
      throw CustomError.badRequest('Invalid movieTheater id');

    await this.movieTheaterService.getMovieTheaterById(movieTheaterId);

    const seats = await SeatModel.find({ movieTheaterId });

    if (seats.length === 0) {
      return 0;
    }

    return seats;
  }
}
