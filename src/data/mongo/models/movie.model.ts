import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be greater than 0'],
  },
  director: {
    type: String,
    required: [true, 'Director is required'],
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
  },
  synopsis: {
    type: String,
    required: [true, 'Synopsis is required'],
  },
  releaseDate: {
    type: Date,
    required: [true, 'Release date is required'],
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
});

movieSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const MovieModel = mongoose.model('Movie', movieSchema);
