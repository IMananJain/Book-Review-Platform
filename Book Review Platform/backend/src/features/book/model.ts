import mongoose, { Schema } from "mongoose";
import { IBook } from "./interfaces";
import { GENRE } from "../../utils/commonConstants";

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true},
    image: { type: String, required: true },
    author: { type: String, default: null },
    description: { type: String, required: true},
    genre: { type: String, required: true, enum: GENRE},
  },
  {
    timestamps: true,
    collection: "Book",
  }
);

const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;
