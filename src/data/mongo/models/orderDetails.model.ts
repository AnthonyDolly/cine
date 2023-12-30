import mongoose from 'mongoose';

const orderDetailsSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Types.ObjectId,
    ref: 'Order',
    required: [true, 'Order id is required'],
  },
  ticketId: {
    type: [mongoose.Types.ObjectId],
    ref: 'Ticket',
    required: [true, 'Ticket id is required'],
  },
});

orderDetailsSchema.index({ orderId: 1, ticketId: 1 }, { unique: true });

orderDetailsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const OrderDetailsModel = mongoose.model(
  'OrderDetails',
  orderDetailsSchema
);
