import mongoose, { Document, Schema } from 'mongoose';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  PAUSED = 'paused',
  EXPIRED = 'expired'
}

export interface ISubscription extends Document {
    userId: string,
    name: string,
    price: number,
    status: SubscriptionStatus
    dueDate: Date,
    createdAt?: Date,
}

const subscriptionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      default: SubscriptionStatus.ACTIVE,
    },
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  });

export const Subscription = mongoose.model<ISubscription>('Subscription', subscriptionSchema);