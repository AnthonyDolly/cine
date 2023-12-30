import { Validators } from '../../../config';

export class CreateOrderDto {
  private constructor(
    public readonly ticketId: string[],
    public readonly userId?: string,
    public readonly products?: {
      productId: string;
      quantity: number;
    }[]
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateOrderDto?] {
    const { ticketId, userId, products } = object;

    if (
      !ticketId ||
      !Array.isArray(ticketId) ||
      ticketId.some((id) => !Validators.isMongoId(id) || !isNaN(id))
    ) {
      return ['Invalid ticketIdx'];
    }

    if (userId && !Validators.isMongoId(userId)) {
      return ['Invalid userId'];
    }

    if (
      products &&
      (!Array.isArray(products) ||
        !products.length ||
        products.some(
          (product: { productId: string }) =>
            !Validators.isMongoId(product.productId)
        ))
    ) {
      return ['Invalid products'];
    }

    if (
      products &&
      (products.some(
        (product: { quantity: number }) => product.quantity <= 0
      ) ||
        products.some((product: { quantity: number }) =>
          isNaN(product.quantity)
        ))
    ) {
      return ['Invalid quantity'];
    }

    const createOrderDto = new CreateOrderDto(ticketId, userId, products);

    return [undefined, createOrderDto];
  }
}
