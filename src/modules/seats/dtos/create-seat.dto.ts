import { regularExps, Validators } from '../../../config';

export class CreateSeatDto {
  private constructor(
    public readonly movieTheaterId: string,
    public readonly seatNumber: number,
    public readonly row: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateSeatDto?] {
    const { movieTheaterId, seatNumber, row } = object;

    if (!movieTheaterId) return ['Missing movieTheaterId'];
    if (!Validators.isMongoId(movieTheaterId) || !isNaN(movieTheaterId))
      return ['Invalid movieTheaterId'];

    if (seatNumber <= 0) return ['seatNumber must be greater than 0'];
    if (!seatNumber) return ['Missing seatNumber'];
    if (isNaN(seatNumber)) return ['Invalid seatNumber'];

    if (!row) return ['Missing row'];
    if (!regularExps.row.test(row)) return ['Invalid row'];

    const createSeatDto = new CreateSeatDto(movieTheaterId, seatNumber, row);

    return [undefined, createSeatDto];
  }
}
