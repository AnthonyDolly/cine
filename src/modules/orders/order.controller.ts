import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { CustomError } from '../../errors/custom.error';
import { CreateOrderDto } from './dtos/create-order.dto';

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  getOrders = async (req: Request, res: Response) => {
    this.orderService
      .getOrders()
      .then((orders) => res.status(200).json(orders))
      .catch((error) => this.handleError(error, res));
  };

  getOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.orderService
      .getOrderById(id)
      .then((order) => res.status(200).json(order))
      .catch((error) => this.handleError(error, res));
  };

  createOrder = async (req: Request, res: Response) => {
    const [error, createOrderDto] = CreateOrderDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.orderService
      .createOrder(createOrderDto!, req.body.user)
      .then((order) => res.status(201).json(order))
      .catch((error) => this.handleError(error, res));
  };

  updateOrder = async (req: Request, res: Response) => {
    res.json('updateOrder');
  };

  deleteOrder = async (req: Request, res: Response) => {
    res.json('deleteOrder');
  };
}
