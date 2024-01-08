import { OrderModel } from '../../data/mongo/models/order.model';
import { CustomError } from '../../errors/custom.error';
import { OrderDetailsService } from '../orderDetails/orderDetails.service';
import { SaleProductsService } from '../saleProducts/saleProducts.service';
import { UserService } from '../users/user.service';
import { CreateOrderDto } from './dtos/create-order.dto';

export class OrderService {
  constructor(
    private readonly userService: UserService,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly saleProductsService: SaleProductsService
  ) {}

  async getOrders() {
    return await OrderModel.find().populate('userId');
  }

  async getOrderById(id: string) {
    if (id.length !== 24) throw CustomError.badRequest('Invalid order id');

    const order = await OrderModel.findById(id).populate('userId');

    if (!order) throw CustomError.notFound('Order not found');

    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto, user: any) {
    const userData = !user ? await this.getUser(undefined) : user;

    const order = await this.createOrderRecord(userData.id);

    const orderDetails = await this.createOrderDetails(
      order.id,
      createOrderDto.ticketId
    );

    if (createOrderDto.products) {
      await this.createSaleProducts(
        order,
        createOrderDto.products,
        createOrderDto.ticketId,
        orderDetails
      );
    } else {
      order.total = this.calculateOrderTotal(orderDetails);
      await order.save();
    }

    return order;
  }

  async updateOrder(id: string, data: any) {
    return 'updateOrder';
  }

  async deleteOrder(id: string) {
    return 'deleteOrder';
  }

  private async getUser(userId: string | undefined) {
    if (!userId) {
      return await this.userService.getGuestUser();
    }

    return await this.userService.getUserById(userId);
  }

  private async createOrderRecord(userId: string) {
    return await OrderModel.create({
      userId,
    });
  }

  private async createOrderDetails(orderId: string, ticketId: string[]) {
    return await this.orderDetailsService.createOrderDetails({
      orderId,
      ticketId,
    });
  }

  private async createSaleProducts(
    order: any,
    products: { productId: string; quantity: number }[],
    ticketId: string[],
    orderDetails: { price: number }[]
  ) {
    const saleProducts = await this.saleProductsService.createSaleProduct({
      orderId: order.id,
      products,
      ticketId,
    });

    order.total =
      saleProducts.products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      ) + this.calculateOrderTotal(orderDetails);

    return await order.save();
  }

  private calculateOrderTotal(orderDetails: { price: number }[]) {
    return orderDetails.reduce((sum, detail) => sum + detail.price, 0);
  }
}
