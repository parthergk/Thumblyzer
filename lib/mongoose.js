import mongoose from "mongoose";

let isConnected = false;

export const connectTodb = async () => {
  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL,
      { dbName: "thumbnail", useNewUrlParser: true, useUnifiedTopology: true }
    );
    isConnected = true;

    console.log("Database connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
