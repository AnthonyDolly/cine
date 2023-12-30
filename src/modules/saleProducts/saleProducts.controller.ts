import { Request, Response } from 'express';
import { SaleProductsService } from './saleProducts.service';
import { CustomError } from '../../errors/custom.error';
import { CreateSaleProductsDto } from './dtos/create-saleProducts.dto';

export class SaleProductsController {
  constructor(private readonly saleService: SaleProductsService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  getSaleProducts = async (req: Request, res: Response) => {
    this.saleService
      .getSaleProducts()
      .then((sales) => res.status(200).json(sales))
      .catch((error) => this.handleError(error, res));
  };

  getSaleProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.saleService
      .getSaleProductById(id)
      .then((sale) => res.status(200).json(sale))
      .catch((error) => this.handleError(error, res));
  };

  createSaleProduct = async (req: Request, res: Response) => {
    const [error, createSaleDto] = CreateSaleProductsDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.saleService
      .createSaleProduct(createSaleDto!)
      .then((sale) => res.status(201).json(sale))
      .catch((error) => this.handleError(error, res));
  };

  updateSaleProduct = async (req: Request, res: Response) => {
    res.json('updateSale');
  };

  deleteSaleProduct = async (req: Request, res: Response) => {
    res.json('deleteSale');
  };
}
