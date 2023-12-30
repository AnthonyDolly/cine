import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  projectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projection',
    required: [true, 'Projection is required'],
  },
  seatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seat',
    required: [true, 'Seat is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'sold'],
    default: 'available',
  },
});

ticketSchema.index({ projectionId: 1, seatId: 1 }, { unique: true });

ticketSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const TicketModel = mongoose.model('Ticket', ticketSchema);
