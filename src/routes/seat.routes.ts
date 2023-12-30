import { Router } from 'express';
import { SeatService } from '../modules/seats/seat.service';
import { SeatController } from '../modules/seats/seat.controller';
import { MovieTheaterService } from '../modules/movieTheaters/movieTheater.service';

export class SeatRoutes {
  static get routes(): Router {
    const router = Router();
    const movieTheaterService = new MovieTheaterService();
    const seatService = new SeatService(movieTheaterService);
    const seatController = new SeatController(seatService);

    // Define routes
    router.get('/', seatController.getSeats);
    router.get('/:id', seatController.getSeatById);
    router.post('/', seatController.createSeat);
    router.put('/:id', seatController.updateSeat);
    router.delete('/:id', seatController.deleteSeat);
    router.get('/movieTheater/:movieTheaterId', seatController.getSeatsByMovieTheaterId);

    return router;
  }
}
