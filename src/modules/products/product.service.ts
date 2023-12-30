import { ProductModel } from '../../data/mongo/models/product.model';
import { CustomError } from '../../errors/custom.error';
import { CreateProductDto } from './dtos/create-product.dto';

export class ProductService {
  constructor() {}

  async getProducts() {
    return await ProductModel.find();
  }

  async getProductById(id: string) {
    if (id.length !== 24) throw CustomError.badRequest('Invalid product id');

    const product = await ProductModel.findById(id);

    if (!product) throw CustomError.notFound('Product not found');

    return product;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const existProduct = await ProductModel.findOne({
      name: createProductDto.name,
    });

    if (existProduct) throw CustomError.badRequest('Name already exists');

    try {
      const product = new ProductModel(createProductDto);

      return await product.save();
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async updateProduct(id: string, data: any) {
    return 'updateProduct';
  }

  async deleteProduct(id: string) {
    return 'deleteProduct';
  }

  async getProductsByIds(ids: string[]) {
    const products = await ProductModel.find({ _id: { $in: ids } });

    if (products.length !== ids.length) return null;

    return products;
  }
}
