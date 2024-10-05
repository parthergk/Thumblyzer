"use server";

import Thumbnail from "@/database/thumbnail.model";
import { connectTodb } from "../mongoose";

// Function to store a thumbnail URL in the database
export async function getThumbnailUrl({ imgUrl }) {
  try {
    await connectTodb();
    
    // Upsert the thumbnail (create if doesn't exist)
    const result = await Thumbnail.findOneAndUpdate(
      { img: imgUrl },
      { img: imgUrl },
      { upsert: true, new: true }
    );

    return { success: true, result: 'Image stored', data: result };

  } catch (error) {
    console.error("Error storing thumbnail URL:", error);
    return { success: false, error: "Error storing thumbnail" };
  }
}

// Function to fetch all stored thumbnail URLs
export async function getAllThumbnail() {
  try {
    await connectTodb();
    const allUrls = await Thumbnail.find({}, { img: 1, _id: 0 }).lean(); // Return only the `img` field
    return allUrls;
  } catch (error) {
    console.error("Error fetching thumbnails:", error);
    return { success: false, error: "Error fetching thumbnails" };
  }
}
