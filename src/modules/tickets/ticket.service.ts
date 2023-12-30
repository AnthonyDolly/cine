import { TicketModel } from '../../data/mongo/models/ticket.model';
import { CustomError } from '../../errors/custom.error';

export class TicketService {
  constructor() {}

  async getTickets() {
    return await TicketModel.find().populate({
      path: 'seatId',
      populate: { path: 'movieTheaterId' },
    });
  }

  async getTicketById(id: string) {
    if (id.length !== 24) throw CustomError.badRequest('Invalid ticket id');

    const ticket = await TicketModel.findById(id)
      .populate('projectionId')
      .populate('seatId');

    if (!ticket) throw CustomError.notFound('Ticket not found');

    return ticket;
  }

  async createTicket(data: any) {
    return 'createTicket';
  }

  async updateTicket(id: string, data: any) {
    return 'updateTicket';
  }

  async deleteTicket(id: string) {
    return 'deleteTicket';
  }

  async createTickets(projectionId: string, seatId: string[], price: number) {
    const tickets = seatId.map((seat) => {
      return new TicketModel({
        projectionId,
        seatId: seat,
        price,
      });
    });

    await TicketModel.insertMany(tickets);
  }

  async getTicketsByProjectionId(projectionId: string) {
    if (projectionId.length !== 24)
      throw CustomError.badRequest('Invalid projection id');

    const tickets = await TicketModel.find({
      projectionId,
      status: 'available',
    }).populate({
      path: 'seatId',
      populate: { path: 'movieTheaterId' },
    });

    return tickets;
  }

  async getTicketsByIds(ids: string[]) {
    const tickets = await TicketModel.find({ _id: { $in: ids } }).populate({
      path: 'seatId',
      populate: { path: 'movieTheaterId' },
    });

    if (tickets.length !== ids.length) return null;

    return tickets;
  }

  async updateTickets(ids: string[], status: string) {
    await TicketModel.updateMany(
      { _id: { $in: ids } },
      { $set: { status } },
      { multi: true }
    );
  }
}
