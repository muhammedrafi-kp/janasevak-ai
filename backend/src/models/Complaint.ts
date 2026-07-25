import { Schema, model, Document, Types } from "mongoose";

export enum ComplaintStatus {
  SUBMITTED = "Submitted",
  VERIFIED = "Verified",
  IN_PROGRESS = "In Progress",
  RESOLVED = "Resolved",
}

export enum ComplaintPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export interface IComplaint extends Document {
  title: string;
  description: string;
  imageUrl: string;

  location: {
    latitude: number;
    longitude: number;
    address: string;
  };

  aiAnalysis: {
    category: string;
    priority: ComplaintPriority;
    summary: string;
    assignedDepartment: string;
    confidence?: number;
  };

  status: ComplaintStatus;

  createdBy: Types.ObjectId;

  upvotes: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

const complaintSchema = new Schema<IComplaint>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },

    aiAnalysis: {
      category: {
        type: String,
        required: true,
      },

      priority: {
        type: String,
        enum: Object.values(ComplaintPriority),
        required: true,
      },

      summary: {
        type: String,
        required: true,
      },

      assignedDepartment: {
        type: String,
        required: true,
      },

      confidence: {
        type: Number,
      },
    },

    status: {
      type: String,
      enum: Object.values(ComplaintStatus),
      default: ComplaintStatus.SUBMITTED,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<IComplaint>("Complaint", complaintSchema);