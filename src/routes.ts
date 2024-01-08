import { Router } from 'express';
import {
  UserRoutes,
  MovieTheaterRoutes,
  SeatRoutes,
  MovieRoutes,
  ProjectionRoutes,
} from './routes/';
import { ProductRoutes } from './routes/product.routes';
import { SaleProductsRoutes } from './routes/saleProducts.routes';
import { TicketRoutes } from './routes/ticket.routes';
import { OrderRoutes } from './routes/order.routes';
import { OrderDetailsRoutes } from './routes/orderDetails.routes';
import { AuthRoutes } from './routes/auth.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/users', UserRoutes.routes);
    router.use('/api/movietheaters', MovieTheaterRoutes.routes);
    router.use('/api/seats', SeatRoutes.routes);
    router.use('/api/movies', MovieRoutes.routes);
    router.use('/api/projections', ProjectionRoutes.routes);
    router.use('/api/products', ProductRoutes.routes);
    router.use('/api/sales', SaleProductsRoutes.routes);
    router.use('/api/tickets', TicketRoutes.routes);
    router.use('/api/orders', OrderRoutes.routes);
    router.use('/api/orderdetails', OrderDetailsRoutes.routes)

    return router;
  }
}
