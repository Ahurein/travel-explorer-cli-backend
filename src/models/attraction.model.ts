import mongoose from "mongoose";
import { IAttractions } from "../interfaces/models.interface";

const attractionSchema = new mongoose.Schema<IAttractions>({
    continent: mongoose.Types.ObjectId,
    country: String,
    attraction: mongoose.Schema.Types.Mixed
});


export const AttractionModel = mongoose.model<IAttractions>("attraction", attractionSchema)