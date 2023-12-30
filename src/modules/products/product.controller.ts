import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { CustomError } from '../../errors/custom.error';
import { CreateProductDto } from './dtos/create-product.dto';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  getProducts = async (req: Request, res: Response) => {
    this.productService
      .getProducts()
      .then((products) => res.status(200).json(products))
      .catch((error) => this.handleError(error, res));
  };

  getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.productService
      .getProductById(id)
      .then((product) => res.status(200).json(product))
      .catch((error) => this.handleError(error, res));
  };

  createProduct = async (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.productService
      .createProduct(createProductDto!)
      .then((product) => res.status(201).json(product))
      .catch((error) => this.handleError(error, res));
  };

  updateProduct = async (req: Request, res: Response) => {
    res.json('updateProduct');
  };

  deleteProduct = async (req: Request, res: Response) => {
    res.json('deleteProduct');
  };
}
