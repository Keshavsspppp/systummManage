import mongoose, { Schema, Model, Document } from 'mongoose';

interface IClub extends Document {
  name: string;
  description: string;
  category: string;
  president: mongoose.Types.ObjectId;
  members?: mongoose.Types.ObjectId[];
  memberCount?: number;
  logo?: string;
  coverImage?: string;
  email?: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
  isActive?: boolean;
  events?: mongoose.Types.ObjectId[];
  createdAt?: Date;
}

const ClubSchema = new Schema<IClub>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  president: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  memberCount: { type: Number, default: 0 },
  logo: { type: String },
  coverImage: { type: String },
  email: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  website: { type: String },
  isActive: { type: Boolean, default: true },
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Club: Model<IClub> = mongoose.models.Club || mongoose.model<IClub>('Club', ClubSchema);

export default Club;
