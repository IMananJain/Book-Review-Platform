import mongoose, { Schema } from "mongoose";
import { IReview } from "./interfaces";

const ReviewSchema: Schema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value for rating'
      }
    },
    comment: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    bookId : { type: Schema.Types.ObjectId, ref: 'Book', required: true} 
  },
  {
    timestamps: true,
    collection: "Review",
  }
);

const Review = mongoose.model<IReview>("Review", ReviewSchema);
export default Review;
