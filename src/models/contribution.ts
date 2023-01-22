import {Document, model, Schema} from 'mongoose';

export interface ContributionInterface extends Document {
  title: string;
  description: string;
  author: Schema.Types.ObjectId;
  noteRef: Schema.Types.ObjectId;
  changes: string;
  approved: boolean;
  created: Date;
}

export const ContributionSchema = new Schema<ContributionInterface>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  noteRef: {
    type: Schema.Types.ObjectId,
    ref: 'Note',
    required: true,
  },
  changes: {
    type: String,
    required: true,
    trim: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export const Contribution = model<ContributionInterface>('Contribution', ContributionSchema);