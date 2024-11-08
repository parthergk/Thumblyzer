"use server";

import Thumbnail from "../../database/thumbnail.model";
import User from "../../database/user.model";
import { connectTodb } from "../mongoose";

// Function to store a thumbnail URL in the database
export async function getThumbnailUrl({ imgUrl, userId }) {
  try {
    await connectTodb();
    // Ensure userId is a valid ObjectId
    const user = await User.findById(userId);
    if(!user){
      return { success: false, error: "User not found" };
    }
    // Upsert the thumbnail (create if doesn't exist)
    const result = await Thumbnail.findOneAndUpdate(
      { img: imgUrl, user: user._id },
      { img: imgUrl, user: user._id },
      { upsert: true, new: true }
    ).lean(); // Convert to plain object

    return { success: true, result: 'Image stored', data: result }; 

  } catch (error) {
    console.error("Error storing thumbnail URL:", error);
    return { success: false, error: "Error storing thumbnail" };
  }
}

export async function getAllThumbnail({ userId }) {
  try {
    await connectTodb();
    const thumbnails = await Thumbnail.find({ user: userId })
      .populate('user', 'username email')
      .lean();
    
    // Map each thumbnail to ensure all fields are serialized properly
    const serializedThumbnails = thumbnails.map(thumbnail => ({
      ...thumbnail,
      _id: thumbnail._id.toString(),  // Convert _id to a string
      user: {
        ...thumbnail.user,
        _id: thumbnail.user._id.toString(),  // Convert nested user _id to a string
      }
    }));
    
    return { success: true, thumbnails: serializedThumbnails };
  } catch (error) {
    console.error("Error fetching thumbnails:", error);
    return { success: false, error: "Error fetching thumbnails" };
  }
}

