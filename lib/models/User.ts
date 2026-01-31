import mongoose, { Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
  phone?: string;
  department?: string;
  year?: number;
  registeredEvents?: mongoose.Types.ObjectId[];
  clubMemberships?: mongoose.Types.ObjectId[];
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["admin", "organizer", "participant"],
    required: true 
  },
  avatar: { type: String },
  phone: { type: String },
  department: { type: String },
  year: { type: Number },
  registeredEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  clubMemberships: [{ type: Schema.Types.ObjectId, ref: 'Club' }],
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
