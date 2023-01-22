import {Document, model, Schema} from 'mongoose';

type permission = 'read' | 'read-write' | 'admin';

export interface NoteInterface extends Document {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  collaborators: Schema.Types.ObjectId[];
  rating: number[];
  tags: string[];
  isPublic: boolean;
  sharedWith: [{ user: Schema.Types.ObjectId; permission: permission }];
  created: Date;
}

export const NoteSchema = new Schema<NoteInterface>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collaborators: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  rating: [
    {
      type: Number,
      min: 0,
      max: 5,
    },
  ],
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  isPublic: {
    type: Boolean,
    default: false,
  },
  sharedWith: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      permission: {
        type: String,
        enum: ['read', 'read-write', 'admin'],
      },
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

export const Note = model<NoteInterface>('Note', NoteSchema);