export class CreateMovieDto {
  private constructor(
    public readonly title: string,
    public readonly duration: number,
    public readonly director: string,
    public readonly genre: string,
    public readonly synopsis: string,
    public readonly releaseDate: Date
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateMovieDto?] {
    const { title, duration, director, genre, synopsis } = object;

    let { releaseDate } = object;

    releaseDate = CreateMovieDto.convertToDateISO(releaseDate);

    const requiredFields = [
      'title',
      'duration',
      'director',
      'genre',
      'synopsis',
      'releaseDate',
    ];

    for (const field of requiredFields) {
      if (!object[field]) return [`Missing ${field}`];
      if (typeof object[field] !== CreateMovieDto.getFieldType(field))
        return [`Invalid ${field}`];
    }

    const createMovieDto = new CreateMovieDto(
      title,
      duration,
      director,
      genre,
      synopsis,
      new Date(releaseDate)
    );

    return [undefined, createMovieDto];
  }

  private static getFieldType(field: string): string {
    switch (field) {
      case 'title':
      case 'director':
      case 'genre':
      case 'synopsis':
        return 'string';
      case 'duration':
        return 'number';
      case 'releaseDate':
        return 'string';
      default:
        return 'unknown';
    }
  }

  private static convertToDateISO(dateString: string): Date {
    const [day, month, year] = dateString.split('-');
    // Formatear la cadena de fecha al formato ISO 8601
    return new Date(`${year}-${month}-${day}T00:00:00.000Z`);
  }
}
