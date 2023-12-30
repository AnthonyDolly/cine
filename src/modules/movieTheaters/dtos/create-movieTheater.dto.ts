export class CreateMovieTheaterDto {
  private constructor(
    public readonly name: string,
    public readonly capacity: number
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateMovieTheaterDto?] {
    const { name, capacity } = object;

    if (!name) return ['Missing name'];
    if (capacity <= 0) return ['Capacity must be greater than 0'];
    if (!capacity) return ['Missing capacity'];

    const createMovieTheaterDto = new CreateMovieTheaterDto(name, capacity);

    return [undefined, createMovieTheaterDto];
  }
}
