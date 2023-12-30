import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [1, 'Price must be greater than 0'],
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    trim: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [1, 'Stock must be greater than 0'],
  },
});

ProductSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const ProductModel = mongoose.model('Product', ProductSchema);
