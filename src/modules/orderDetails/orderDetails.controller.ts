import { Request, Response } from 'express';
import { OrderDetailsService } from './orderDetails.service';
import { CustomError } from '../../errors/custom.error';
import { CreateOrderDetailDto } from './dtos/create-orderDetail.dto';

export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  getOrderDetails = async (req: Request, res: Response) => {
    this.orderDetailsService
      .getOrderDetails()
      .then((orderDetails) => res.status(200).json(orderDetails))
      .catch((error) => this.handleError(error, res));
  };

  getOrderDetailsById = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.orderDetailsService
      .getOrderDetailsById(id)
      .then((orderDetails) => res.status(200).json(orderDetails))
      .catch((error) => this.handleError(error, res));
  };

  createOrderDetails = async (req: Request, res: Response) => {
    const [error, createOrderDetailDto] = CreateOrderDetailDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.orderDetailsService
      .createOrderDetails(createOrderDetailDto!)
      .then((orderDetails) => res.status(201).json(orderDetails))
      .catch((error) => this.handleError(error, res));
  };

  updateOrderDetails = async (req: Request, res: Response) => {
    res.json('updateOrderDetails');
  };

  deleteOrderDetails = async (req: Request, res: Response) => {
    res.json('deleteOrderDetails');
  };
}
