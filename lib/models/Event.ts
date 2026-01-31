import mongoose, { Schema, Model, Document } from 'mongoose';
import './User'; // Ensure User model is registered
import './Club'; // Ensure Club model is registered

interface IEvent extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  maxParticipants?: number;
  currentParticipants?: number;
  organizer: mongoose.Types.ObjectId;
  club?: mongoose.Types.ObjectId;
  status: string;
  category?: string;
  tags?: string[];
  image?: string;
  budget?: number;
  resources?: mongoose.Types.ObjectId[];
  participants?: mongoose.Types.ObjectId[];
  collaborators?: mongoose.Types.ObjectId[];
  createdAt?: Date;
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  maxParticipants: { type: Number },
  currentParticipants: { type: Number, default: 0 },
  organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  club: { type: Schema.Types.ObjectId, ref: 'Club' },
  status: { 
    type: String, 
    enum: ["draft", "pending", "approved", "rejected", "completed", "cancelled"],
    default: "draft" 
  },
  category: { type: String },
  tags: [{ type: String }],
  image: { type: String },
  budget: { type: Number },
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
