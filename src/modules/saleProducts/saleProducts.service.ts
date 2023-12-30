import { OrderModel } from '../../data/mongo/models/order.model';
import { SaleProductsModel } from '../../data/mongo/models/saleProducts.model';
import { OrderDetailsModel } from '../../data/mongo/models/orderDetails.model';
import { CustomError } from '../../errors/custom.error';
import { ProductService } from '../products/product.service';
import { CreateSaleProductsDto } from './dtos/create-saleProducts.dto';
import { TicketService } from '../tickets/ticket.service';

export class SaleProductsService {
  constructor(
    private readonly productService: ProductService,
    private readonly ticketService: TicketService
  ) {}

  async getSaleProducts() {
    return await SaleProductsModel.find().populate({
      path: 'productId',
      select: 'name price',
    });
  }

  async getSaleProductById(id: string) {
    if (id.length !== 24) throw CustomError.badRequest('Invalid sale id');

    const sale = await SaleProductsModel.findById(id).populate('productId');

    if (!sale) throw CustomError.notFound('Sale not found');

    return sale;
  }

  async createSaleProduct(createSaleProductsDto: CreateSaleProductsDto) {
    const products = await this.productService.getProductsByIds(
      createSaleProductsDto.products.map((product) => product.productId)
    );

    if (!products) {
      await OrderModel.findByIdAndDelete(createSaleProductsDto.orderId);
      await OrderDetailsModel.findOneAndDelete({
        orderId: createSaleProductsDto.orderId,
      });
      await this.ticketService.updateTickets(
        createSaleProductsDto.ticketId,
        'available'
      );
      throw CustomError.notFound('Product not found');
    }

    if (
      products.some(
        (product, index) =>
          product.stock < createSaleProductsDto.products[index].quantity
      )
    ) {
      await OrderModel.findByIdAndDelete(createSaleProductsDto.orderId);
      await OrderDetailsModel.findOneAndDelete({
        orderId: createSaleProductsDto.orderId,
      });
      await this.ticketService.updateTickets(
        createSaleProductsDto.ticketId,
        'available'
      );
      throw CustomError.badRequest(`Quantity exceeds stock of product`);
    }

    const sale = new SaleProductsModel({
      ...createSaleProductsDto,
      products: createSaleProductsDto.products.map((product, index) => ({
        ...product,
        price: products[index].price,
      })),
    });

    products.forEach((product, index) => {
      product.stock -= createSaleProductsDto.products[index].quantity;
    });

    await Promise.all([
      sale.save(),
      ...products.map((product) => product.save()),
    ]);

    return sale;
  }

  async updateSaleProduct(id: string, data: any) {
    return 'updateSale';
  }

  async deleteSaleProduct(id: string) {
    return 'deleteSale';
  }
}
