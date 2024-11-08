"use server";
import User from "../../database/user.model";
import { connectTodb } from "../mongoose";
import { IUser } from "../../database/user.model"; // Assuming IUser is exported from the user model file

// Define an interface for the parameters passed to setUser
interface SetUserParams {
  clerkId: string;
  username: string;
  email: string;
}

// Set a new user in the database
export async function setUser({ clerkId, username, email }: SetUserParams): Promise<IUser> {
  try {
    await connectTodb();
    
    // Create the new user document
    const data = await User.create({ clerkId, username, email });
    const newUser = data.toObject();
    // Return the created user document
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

export async function getUserId(clerkId: string) { 
  try {
    await connectTodb();

    const user = await User.findOne({ clerkId });
    if (!user) {
      return { success: false, error: "User not found" }; // Early return if user not found
    }

    const userID = user._id.toString(); // Move this line after checking if user exists
    return { success: true, userId: userID }; // Return the user ID in a structured object
  } catch (error) {
    console.error('Error fetching user ID:', error);
    throw new Error('Failed to retrieve user ID');
  }
}

