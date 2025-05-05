import mongoose, { Schema } from "mongoose";
import { ICMDB } from "../types/cmdb.types";

const CMDBSchema: Schema = new Schema<ICMDB>(
  {
    addressIP: {
      type: String,
      required: true,
      unique: true
    },
    addressType: {
      type: String,
      required: false
    },
    organization: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false
    },
    countryCode: {
      type: String,
      required: false
    },
    continentCode: {
      type: String,
      required: false
    },
    usageType: {
      type: String,
      required: false
    },
    threatLevel: {
      type: String,
      required: false
    },
    threatDetails: {
      type: Schema.Types.Mixed, // Can be an array or JSON string
      required: false
    },
    firstSeen: {
      type: Date,
      required: false
    },
    lastSeen: {
      type: Date,
      required: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Create index for faster queries
CMDBSchema.index({ addressIP: 1 });
CMDBSchema.index({ addressType: 1 });
CMDBSchema.index({ organization: 1 });
CMDBSchema.index({ country: 1 });
CMDBSchema.index({ threatLevel: 1 });
CMDBSchema.index({ lastSeen: -1 });

export default mongoose.model<ICMDB>("CMDB", CMDBSchema);
