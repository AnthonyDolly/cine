import { ProjectionModel } from '../../data';
import { CustomError } from '../../errors/custom.error';
import { SeatService } from '../seats/seat.service';
import { TicketService } from '../tickets/ticket.service';
import { CreateProjectionDto } from './dtos/create-projection.dto';

export class ProjectionService {
  constructor(
    private readonly seatService: SeatService,
    private readonly ticketService: TicketService
  ) {}

  async getProjections() {
    return await ProjectionModel.find().populate('movieTheaterId movieId');
  }

  async getProjectionById(id: string) {
    if (id.length !== 24) throw CustomError.badRequest('Invalid projection id');

    const projection = await ProjectionModel.findById(id).populate(
      'movieTheaterId movieId'
    );

    if (!projection) throw CustomError.notFound('Projection not found');

    return projection;
  }

  async createProjection(createProjectionDto: CreateProjectionDto) {
    const existProjection = await ProjectionModel.findOne({
      movieTheaterId: createProjectionDto.movieTheaterId,
      dateTime: createProjectionDto.dateTime,
    });

    if (existProjection)
      throw CustomError.badRequest(
        `Projection already exists in movieTheater ${createProjectionDto.movieTheaterId} at ${createProjectionDto.dateTime}`
      );

    try {
      const projection = new ProjectionModel(createProjectionDto);

      await projection.save();

      const seats = await this.seatService.getSeatsByMovieTheaterId(
        createProjectionDto.movieTheaterId
      );

      if (!seats) throw CustomError.notFound('Seats not found');

      const seatsIds = seats.map((seat) => seat.id);

      await this.ticketService.createTickets(
        projection.id,
        seatsIds,
        projection.price
      );

      return projection;
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async updateProjection(id: string, data: any) {
    return 'updateProjection';
  }

  async deleteProjection(id: string) {
    return 'deleteProjection';
  }
}
