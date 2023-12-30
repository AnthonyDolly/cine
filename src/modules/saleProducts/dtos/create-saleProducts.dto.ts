import { Validators } from '../../../config';

export class CreateSaleProductsDto {
  private constructor(
    public readonly orderId: string,
    public readonly products: {
      productId: string;
      quantity: number;
    }[],
    public readonly ticketId: string[]
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateSaleProductsDto?] {
    const { orderId, products, ticketId } = object;

    if (!orderId) return ['Missing orderId'];
    if (!Validators.isMongoId(orderId) || !isNaN(orderId))
      return ['Invalid orderId'];

    if (
      !products ||
      !Array.isArray(products) ||
      !products.length ||
      products.some(
        (product: { productId: string }) =>
          !Validators.isMongoId(product.productId)
      )
    ) {
      return ['Invalid products'];
    }

    if (
      products.some((product: { quantity: number }) => product.quantity <= 0) ||
      products.some((product: { quantity: number }) => isNaN(product.quantity))
    ) {
      return ['Invalid quantity'];
    }

    if (!ticketId) return ['Missing ticketId'];
    if (!Array.isArray(ticketId)) return ['Invalid ticketId'];
    if (!ticketId.length) return ['Invalid ticketId'];
    if (ticketId.some((id) => !Validators.isMongoId(id) || isNaN(id)))
      return ['Invalid ticketId'];

    const createSaleProductsDto = new CreateSaleProductsDto(
      orderId,
      products,
      ticketId
    );

    return [undefined, createSaleProductsDto];
  }
}
