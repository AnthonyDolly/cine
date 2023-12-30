export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly image: string,
    public readonly stock: number
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, description, price, image, stock } = object;

    const requiredFields = ['name', 'description', 'price', 'image', 'stock'];

    for (const field of requiredFields) {
      if (!object[field]) return [`Missing ${field}`];
      if (typeof object[field] !== CreateProductDto.getFieldType(field))
        return [`Invalid ${field}`];
    }

    const createProductDto = new CreateProductDto(
      name,
      description,
      price,
      image,
      stock
    );

    return [undefined, createProductDto];
  }

  private static getFieldType(field: string): string {
    switch (field) {
      case 'name':
      case 'description':
      case 'image':
        return 'string';
      case 'price':
      case 'stock':
        return 'number';
      default:
        return 'unknown';
    }
  }
}
