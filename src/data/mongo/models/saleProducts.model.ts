import mongoose from 'mongoose';

const saleProductsSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Types.ObjectId,
    ref: 'Order',
    required: [true, 'Order id is required'],
  },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product id is required'],
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be greater than 0'],
      },
      price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [1, 'Price must be greater than 0'],
      },
    },
  ],
});

saleProductsSchema.index({ orderId: 1 }, { unique: true });

saleProductsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const SaleProductsModel = mongoose.model(
  'SaleProducts',
  saleProductsSchema
);
