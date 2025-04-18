import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscription extends Document {
    userId: string,
    name: string,
    price: number,
    isActive: boolean,
    dueDate: Date,
    createdAt?: Date,
}

const subscriptionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  });

export const Subscription = mongoose.model<ISubscription>('Subscription', subscriptionSchema);