import { Schema, model, models } from "mongoose";

const thumbnailSchema = new Schema({
  img: { type: String, required: true }, // Note: corrected the typo from "require" to "required"
});

const Thumbnail = models.Thumbnail || model("Thumbnail", thumbnailSchema);

export default Thumbnail;
