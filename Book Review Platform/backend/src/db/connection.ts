import mongoose from "mongoose";
import envConfig from "../config/envConfig";
import Review from "../features/review/model";

const connectDB = async () => {
  try {
    const env = envConfig();
    const MONGODB_URI = env.mongodb_url;
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;