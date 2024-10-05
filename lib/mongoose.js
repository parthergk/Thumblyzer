import mongoose from "mongoose";

let isConnected = false;

export const connectTodb = async () => {
  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(
      "mongodb+srv://gauravKumar:gaurav123@cluster0.swj1o.mongodb.net/?retryWrites=true&w=majority",
      { dbName: "thumbnail", useNewUrlParser: true, useUnifiedTopology: true }
    );
    isConnected = true;

    console.log("Database connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
