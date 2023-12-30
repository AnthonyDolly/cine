import { OrderModel } from '../../data/mongo/models/order.model';
import { OrderDetailsModel } from '../../data/mongo/models/orderDetails.model';
import { CustomError } from '../../errors/custom.error';
import { TicketService } from '../tickets/ticket.service';
import { CreateOrderDetailDto } from './dtos/create-orderDetail.dto';

export class OrderDetailsService {
  constructor(private readonly ticketService: TicketService) {}

  async getOrderDetails() {
    return await OrderDetailsModel.find()
      .populate('orderId')
      .populate('ticketId');
  }

  async getOrderDetailsById(id: string) {
    if (id.length !== 24)
      throw CustomError.badRequest('Invalid orderDetails id');

    const orderDetails = await OrderDetailsModel.findById(id)
      .populate('orderId')
      .populate('ticketId');

    if (!orderDetails) throw CustomError.notFound('OrderDetails not found');

    return orderDetails;
  }

  async createOrderDetails(createOrderDetailDto: CreateOrderDetailDto) {
    const tickets = await this.ticketService.getTicketsByIds(
      createOrderDetailDto.ticketId
    );

    if (!tickets) {
      await OrderModel.findByIdAndDelete(createOrderDetailDto.orderId);
      throw CustomError.notFound('Ticket not found');
    }

    if (tickets.some((ticket) => ticket.status === 'sold')) {
      await OrderModel.findByIdAndDelete(createOrderDetailDto.orderId);
      throw CustomError.badRequest('Ticket already sold');
    }

    const orderDetails = await OrderDetailsModel.create({
      orderId: createOrderDetailDto.orderId,
      ticketId: createOrderDetailDto.ticketId,
    });

    await this.ticketService.updateTickets(
      createOrderDetailDto.ticketId,
      'sold'
    );

    return tickets;
  }

  async updateOrderDetails(id: string, data: any) {
    return 'updateOrderDetails';
  }

  async deleteOrderDetails(id: string) {
    return 'deleteOrderDetails';
  }
}
