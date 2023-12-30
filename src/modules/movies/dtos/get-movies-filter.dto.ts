import { regularExps } from '../../../config';

export class GetMoviesFilterDto {
  private constructor(
    public readonly genre?: string,
    public readonly status?: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, GetMoviesFilterDto?] {
    const { genre, status } = object;

    if (genre && typeof genre !== 'string') return ['Invalid genre'];
    if (status && regularExps.movieStatus.test(status) === false)
      return ['Invalid status'];

    return [undefined, new GetMoviesFilterDto(genre, status)];
  }
}
