import { Schema, model, Document, Types } from "mongoose";

export interface IUpvote extends Document {
  user: Types.ObjectId;
  complaint: Types.ObjectId;
  createdAt: Date;
}

const upvoteSchema = new Schema<IUpvote>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    complaint: {
      type: Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

// Prevent duplicate upvotes
upvoteSchema.index(
  {
    user: 1,
    complaint: 1,
  },
  {
    unique: true,
  }
);

export default model<IUpvote>("Upvote", upvoteSchema);