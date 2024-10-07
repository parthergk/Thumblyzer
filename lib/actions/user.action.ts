"use server";
import User from "@/database/user.model";
import { connectTodb } from "../mongoose";
import { IUser } from "@/database/user.model"; // Assuming IUser is exported from the user model file

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
    const newUser = await User.create({ clerkId, username, email });
    
    // Return the created user document
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}
