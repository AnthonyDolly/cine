import { Validators, regularExps } from '../../../config';

export class CreateProjectionDto {
  private constructor(
    public readonly movieTheaterId: string,
    public readonly movieId: string,
    public readonly price: number,
    public readonly dateTime: Date
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateProjectionDto?] {
    const { movieTheaterId, movieId, price, dateTime } = object;

    if (!movieTheaterId) return ['Missing movieTheaterId'];
    if (!Validators.isMongoId(movieTheaterId) || !isNaN(movieTheaterId))
      return ['Invalid movieTheaterId'];

    if (!movieId) return ['Missing movieId'];
    if (!Validators.isMongoId(movieId) || !isNaN(movieId))
      return ['Invalid movieId'];

    if (!price) return ['Missing price'];
    if (isNaN(price)) return ['Invalid price'];

    if (!dateTime) return ['Missing dateTime'];
    if (!regularExps.isoDate.test(dateTime))
      return ['Invalid dateTime (ISO 8601 format required)'];

    const createProjectionDto = new CreateProjectionDto(
      movieTheaterId,
      movieId,
      price,
      new Date(dateTime)
    );

    return [undefined, createProjectionDto];
  }
}
