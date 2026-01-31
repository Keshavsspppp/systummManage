import mongoose, { Schema, Model, Document } from 'mongoose';

interface IBooking extends Document {
  resource: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  event?: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status: string;
  purpose?: string;
  notes?: string;
  createdAt?: Date;
}

const BookingSchema = new Schema<IBooking>({
  resource: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: Schema.Types.ObjectId, ref: 'Event' },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected", "completed", "cancelled"],
    default: "pending" 
  },
  purpose: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
