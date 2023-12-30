import { Router } from 'express';
import { OrderService } from '../modules/orders/order.service';
import { OrderController } from '../modules/orders/order.controller';
import { UserService } from '../modules/users/user.service';
import { OrderDetailsService } from '../modules/orderDetails/orderDetails.service';
import { SaleProductsService } from '../modules/saleProducts/saleProducts.service';
import { TicketService } from '../modules/tickets/ticket.service';
import { ProductService } from '../modules/products/product.service';

export class OrderRoutes {
  static get routes(): Router {
    const router = Router();
    const userService = new UserService();
    const ticketService = new TicketService();
    const orderDetailsService = new OrderDetailsService(ticketService);
    const productService = new ProductService();
    const saleProductsService = new SaleProductsService(
      productService,
      ticketService
    );

    const orderService = new OrderService(
      userService,
      orderDetailsService,
      saleProductsService
    );
    const orderController = new OrderController(orderService);

    // Define routes
    router.get('/', orderController.getOrders);
    router.get('/:id', orderController.getOrderById);
    router.post('/', orderController.createOrder);
    router.put('/:id', orderController.updateOrder);
    router.delete('/:id', orderController.deleteOrder);

    return router;
  }
}
