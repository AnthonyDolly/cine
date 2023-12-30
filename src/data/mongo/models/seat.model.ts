import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  movieTheaterId: {
    type: mongoose.Types.ObjectId,
    ref: 'MovieTheater',
    required: [true, 'Movie theater id is required'],
  },
  seatNumber: {
    type: Number,
    required: [true, 'Seat number is required'],
    min: [1, 'Seat number must be greater than 0'],
  },
  row: {
    type: String,
    required: [true, 'Row is required'],
    minlength: [1, 'Row must be only a character'],
    maxlength: [1, 'Row must be only a character'],
  },
  status: {
    type: String,
    enum: ['free', 'occupied'],
    default: 'free',
  },
});

seatSchema.index(
  { movieTheaterId: 1, seatNumber: 1, row: 1 },
  { unique: true }
);

seatSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const SeatModel = mongoose.model('Seat', seatSchema);
