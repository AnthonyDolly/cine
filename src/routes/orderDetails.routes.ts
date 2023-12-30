import { Router } from 'express';
import { OrderDetailsController } from '../modules/orderDetails/orderDetails.controller';
import { OrderDetailsService } from '../modules/orderDetails/orderDetails.service';
import { TicketService } from '../modules/tickets/ticket.service';

export class OrderDetailsRoutes {
  static get routes(): Router {
    const router = Router();
    const ticketService = new TicketService();
    const orderDetailsService = new OrderDetailsService(ticketService);
    const orderDetailsController = new OrderDetailsController(
      orderDetailsService
    );

    // Define routes
    router.get('/', orderDetailsController.getOrderDetails);
    router.get('/:id', orderDetailsController.getOrderDetailsById);
    router.post('/', orderDetailsController.createOrderDetails);
    router.put('/:id', orderDetailsController.updateOrderDetails);
    router.delete('/:id', orderDetailsController.deleteOrderDetails);

    return router;
  }
}
