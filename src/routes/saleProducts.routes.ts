import { Router } from 'express';
import { SaleProductsService } from '../modules/saleProducts/saleProducts.service';
import { SaleProductsController } from '../modules/saleProducts/saleProducts.controller';
import { ProductService } from '../modules/products/product.service';
import { UserService } from '../modules/users/user.service';
import { TicketService } from '../modules/tickets/ticket.service';

export class SaleProductsRoutes {
  static get routes() {
    const router = Router();
    const userService = new UserService();
    const productService = new ProductService();
    const ticketService = new TicketService();

    const saleProductsService = new SaleProductsService(
      productService,
      ticketService
    );
    const saleProductsController = new SaleProductsController(
      saleProductsService
    );

    // Define routes
    router.get('/', saleProductsController.getSaleProducts);
    router.get('/:id', saleProductsController.getSaleProductById);
    router.post('/', saleProductsController.createSaleProduct);
    router.put('/:id', saleProductsController.updateSaleProduct);
    router.delete('/:id', saleProductsController.deleteSaleProduct);

    return router;
  }
}
