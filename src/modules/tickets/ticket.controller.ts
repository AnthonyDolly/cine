import { Request, Response } from 'express';
import { CustomError } from '../../errors/custom.error';
import { TicketService } from './ticket.service';

export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  getTickets = async (req: Request, res: Response) => {
    this.ticketService
      .getTickets()
      .then((tickets) => res.status(200).json(tickets))
      .catch((error) => this.handleError(error, res));
  };

  getTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.ticketService
      .getTicketById(id)
      .then((ticket) => res.status(200).json(ticket))
      .catch((error) => this.handleError(error, res));
  };

  createTicket = async (req: Request, res: Response) => {
    return 'createTicket';
  };

  updateTicket = async (req: Request, res: Response) => {
    return 'updateTicket';
  };

  deleteTicket = async (req: Request, res: Response) => {
    return 'deleteTicket';
  };

  getTicketsByProjectionId = async (req: Request, res: Response) => {
    const { projectionId } = req.params;

    this.ticketService
      .getTicketsByProjectionId(projectionId)
      .then((tickets) => res.status(200).json(tickets))
      .catch((error) => this.handleError(error, res));
  };
}
