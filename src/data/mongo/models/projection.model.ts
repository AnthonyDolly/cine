import mongoose from 'mongoose';

const projectionSchema = new mongoose.Schema({
  movieTheaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MovieTheater',
    required: [true, 'Movie theater is required'],
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'Movie is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  dateTime: {
    type: Date,
    required: [true, 'Date and time are required'],
  },
});

projectionSchema.index({ movieTheaterId: 1, dateTime: 1 }, { unique: true });

projectionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const ProjectionModel = mongoose.model('Projection', projectionSchema);
