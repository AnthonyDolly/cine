import { Router } from 'express';
import { TicketService } from '../modules/tickets/ticket.service';
import { TicketController } from '../modules/tickets/ticket.controller';

export class TicketRoutes {
  static get routes(): Router {
    const router = Router();
    const ticketService = new TicketService();
    const ticketController = new TicketController(ticketService);

    // Define routes
    router.get('/', ticketController.getTickets);
    router.get('/:id', ticketController.getTicketById);
    router.post('/', ticketController.createTicket);
    router.put('/:id', ticketController.updateTicket);
    router.delete('/:id', ticketController.deleteTicket);
    router.get('/projection/:projectionId', ticketController.getTicketsByProjectionId);

    return router;
  }
}
