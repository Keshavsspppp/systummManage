import mongoose, { Schema, Model, Document } from 'mongoose';

interface IResource extends Document {
  name: string;
  type: string;
  description?: string;
  capacity?: number;
  location?: string;
  amenities?: string[];
  image?: string;
  available?: boolean;
  pricePerHour?: number;
  createdAt?: Date;
}

const ResourceSchema = new Schema<IResource>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  capacity: { type: Number },
  location: { type: String },
  amenities: [{ type: String }],
  image: { type: String },
  available: { type: Boolean, default: true },
  pricePerHour: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Resource: Model<IResource> = mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema);

export default Resource;
