import { Schema, model, models } from "mongoose";

// Define the Thumbnail schema
const thumbnailSchema = new Schema({
  img: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
});

// Create the Thumbnail model
const Thumbnail = models.Thumbnail || model("Thumbnail", thumbnailSchema);

export default Thumbnail;
