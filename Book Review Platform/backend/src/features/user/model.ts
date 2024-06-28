import mongoose, { Schema } from "mongoose";
import { IUser } from "./interfaces";
import { USER_STATUS } from "../../utils/commonConstants";

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    image: { type: String, required: true},
    status: { type: String, required: true, enum: Object.values(USER_STATUS), default: USER_STATUS.ACTIVE},
  },
  {
    timestamps: true,
    collection: "User",
  }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
