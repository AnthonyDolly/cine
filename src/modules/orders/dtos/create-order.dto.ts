import { Validators } from '../../../config';

export class CreateOrderDto {
  private constructor(
    public readonly ticketId: string[],
    public readonly products?: {
      productId: string;
      quantity: number;
    }[]
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateOrderDto?] {
    const { ticketId, products } = object;

    if (
      !ticketId ||
      !Array.isArray(ticketId) ||
      ticketId.some((id) => !Validators.isMongoId(id) || !isNaN(id))
    ) {
      return ['Invalid ticketIdx'];
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

    const createOrderDto = new CreateOrderDto(ticketId, products);

    return [undefined, createOrderDto];
  }
}
