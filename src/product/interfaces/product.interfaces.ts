import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: string;
  readonly description: string;
  readonly imageURL: string;
  readonly price: string;
  readonly createAt: Date;
}
