import { Validators } from '../../../config';

export class CreateOrderDetailDto {
  private constructor(
    public readonly orderId: string,
    public readonly ticketId: string[]
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateOrderDetailDto?] {
    const { orderId, ticketId } = object;

    if (!orderId) return ['Missing orderId'];
    if (!Validators.isMongoId(orderId) || !isNaN(orderId))
      return ['Invalid orderId'];

    if (!ticketId) return ['Missing ticketId'];
    if (!Array.isArray(ticketId)) return ['Invalid ticketId'];
    if (!ticketId.length) return ['Invalid ticketId'];
    if (ticketId.some((id) => !Validators.isMongoId(id) || isNaN(id)))
      return ['Invalid ticketId'];

    const createOrderDetailDto = new CreateOrderDetailDto(orderId, ticketId);

    return [undefined, createOrderDetailDto];
  }
}
