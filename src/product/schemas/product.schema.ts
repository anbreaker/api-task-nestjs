import { Schema } from 'mongoose';

export const ProdutcSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  imageURL: String,
  price: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});
