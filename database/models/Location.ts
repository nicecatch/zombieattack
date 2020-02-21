import mongoose, { Document, Model } from "mongoose";
import { IPlainLocation } from "../../generic/interfaces";

export interface ILocation extends Omit<IPlainLocation, "_id">, Document {}

const locationSchema = new mongoose.Schema<ILocation>(
  {
    name: { type: String, required: true },
    zombiesCount: { type: Number, required: true }
  },
  { collection: "locations" }
);

export default (mongoose.models.locations ||
  mongoose.model<ILocation>("locations", locationSchema)) as Model<ILocation>;
