import mongoose from "mongoose";
import { env } from "./env.js";

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000; // 2 seconds

export async function connectToDatabase() {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await mongoose.connect(env.mongoUri, {
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        retryWrites: true,
        w: "majority",
        serverSelectionTimeoutMS: 10000,
      });
      console.log("MongoDB connected successfully");
      return;
    } catch (error) {
      retries++;
      if (retries >= MAX_RETRIES) {
        console.error("Failed to connect to MongoDB after 5 retries");
        throw error;
      }
      console.log(`MongoDB connection attempt ${retries}/${MAX_RETRIES} failed. Retrying in 2 seconds...`);
      console.error(error.message);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }
}
