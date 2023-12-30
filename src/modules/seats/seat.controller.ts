import { Request, Response } from 'express';
import { SeatService } from './seat.service';
import { CustomError } from '../../errors/custom.error';
import { CreateSeatDto } from './dtos/create-seat.dto';

export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  getSeats = async (req: Request, res: Response) => {
    this.seatService
      .getSeats()
      .then((seats) => res.status(200).json(seats))
      .catch((error) => this.handleError(error, res));
  };

  getSeatById = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.seatService
      .getSeatById(id)
      .then((seat) => res.status(200).json(seat))
      .catch((error) => this.handleError(error, res));
  };

  createSeat = async (req: Request, res: Response) => {
    const [error, createSeatDto] = CreateSeatDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.seatService
      .createSeat(createSeatDto!)
      .then((seat) => res.status(201).json(seat))
      .catch((error) => this.handleError(error, res));
  };

  updateSeat = async (req: Request, res: Response) => {
    res.json('updateSeat');
  };

  deleteSeat = async (req: Request, res: Response) => {
    res.json('deleteSeat');
  };

  getSeatsByMovieTheaterId = async (req: Request, res: Response) => {
    const { movieTheaterId } = req.params;

    this.seatService
      .getSeatsByMovieTheaterId(movieTheaterId)
      .then((seats) => res.status(200).json(seats))
      .catch((error) => this.handleError(error, res));
  };
}
