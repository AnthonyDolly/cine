import { Validators } from "../../../config";

export class CreateTicketsDto {
  private constructor(
    public readonly projectionId: string,
    public readonly seatId: string[],
    public readonly price: number
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateTicketsDto?] {
    const { projectionId, seatId, price } = object;

    if (!projectionId) return ['Missing projectionId'];
    if (!Validators.isMongoId(projectionId) || !isNaN(projectionId))
      return ['Invalid projectionId'];

    if (!seatId) return ['Missing seatId'];
    if (!Array.isArray(seatId)) return ['seatId must be an array'];
    if (seatId.length === 0) return ['seatId must not be empty'];
    if (!seatId.every((id) => Validators.isMongoId(id) && !isNaN(id)))
      return ['Invalid seatId'];

    if (!price) return ['Missing price'];
    if (isNaN(price)) return ['Invalid price'];
    if (price <= 0) return ['price must be greater than 0'];

    const createTicketsDto = new CreateTicketsDto(projectionId, seatId, price);

    return [undefined, createTicketsDto];
  }
}
