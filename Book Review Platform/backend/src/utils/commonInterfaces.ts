import { Types } from "mongoose";
import { Request } from "express";

export interface IResponse {
  message: string;
  data?: unknown;
  success: boolean;
}

export interface AuthRequest extends Request {
  email?: string;
}

export interface IObjectId {
  id: Types.ObjectId;
}
