import { Router } from 'express';
import { ProductService } from '../modules/products/product.service';
import { ProductController } from '../modules/products/product.controller';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const productService = new ProductService();
    const productController = new ProductController(productService);

    // Define routes
    router.get('/', productController.getProducts);
    router.get('/:id', productController.getProductById);
    router.post('/', productController.createProduct);
    router.put('/:id', productController.updateProduct);
    router.delete('/:id', productController.deleteProduct);

    return router;
  }
}
