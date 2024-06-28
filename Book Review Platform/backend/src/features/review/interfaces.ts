import Document from "mongoose";
import { Request } from "express";
import { Types } from "mongoose";

export interface IReview extends Document {
  rating: number;
  comment: string;
  userId: Types.ObjectId;
  bookId: Types.ObjectId;
}
export interface IReviewData {
  id: Types.ObjectId;
  rating: number;
  comment: string;
  userId: Types.ObjectId;
  bookId: Types.ObjectId;
}