'use server'

import mongoose, { Document, Schema } from 'mongoose';

interface ISubscriber extends Document {
  email: string;
  subscribedAt: Date;
}

const subscriberSchema = new Schema<ISubscriber>({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

const Subscriber = mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', subscriberSchema);

export default Subscriber; 