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
  imageUrls: string[];
  imageHashes: string[];

  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  geoLocation: { type: "Point"; coordinates: [number, number] };
  isAiDraft: boolean;
  aiSession?: {
    images: Array<{ mimeType: string; base64: string; hash: string }>;
    analysis: Record<string, unknown>;
    answers: Array<{ questionId: string; question: string; answer: string; createdAt: Date }>;
    round: number;
    expiresAt: Date;
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

    imageUrls: [{
      type: String,
      required: true,
    }],
    imageHashes: { type: [String], default: [] },

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
    geoLocation: { type: { type: String, enum: ["Point"], required: true }, coordinates: { type: [Number], required: true } },
    isAiDraft: { type: Boolean, default: false, index: true },
    aiSession: { type: Schema.Types.Mixed },

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
      required: false,
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
complaintSchema.index({ geoLocation: "2dsphere" });

export default model<IComplaint>("Complaint", complaintSchema);
