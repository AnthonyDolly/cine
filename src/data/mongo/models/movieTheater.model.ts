import mongoose from 'mongoose';

const movieTheaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be greater than 0'],
  },
});

movieTheaterSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const MovieTheaterModel = mongoose.model(
  'MovieTheater',
  movieTheaterSchema
);
