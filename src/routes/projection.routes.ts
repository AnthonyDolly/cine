import { Router } from 'express';
import { ProjectionService } from '../modules/projections/projection.service';
import { ProjectionController } from '../modules/projections/projection.controller';
import { SeatService } from '../modules/seats/seat.service';
import { MovieTheaterService } from '../modules/movieTheaters/movieTheater.service';
import { TicketService } from '../modules/tickets/ticket.service';

export class ProjectionRoutes {
  static get routes(): Router {
    const router = Router();
    const movieTheaterService = new MovieTheaterService();
    const seatService = new SeatService(movieTheaterService);
    const ticketService = new TicketService();

    const projectionService = new ProjectionService(seatService, ticketService);
    const projectionController = new ProjectionController(projectionService);

    // Define routes
    router.get('/', projectionController.getProjections);
    router.get('/:id', projectionController.getProjectionById);
    router.post('/', projectionController.createProjection);
    router.put('/:id', projectionController.updateProjection);
    router.delete('/:id', projectionController.deleteProjection);

    return router;
  }
}
