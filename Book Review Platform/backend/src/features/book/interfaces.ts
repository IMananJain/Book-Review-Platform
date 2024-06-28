import Document from "mongoose";
import { Request } from "express";

export interface IBook extends Document {
  title: string;
  image: string;
  author: string;
  description: string;
  genre: string;
}

export interface IBookData {
  id: string;
  title: string;
  image: string;
  author: string;
  description: string;
  genre: string;
}