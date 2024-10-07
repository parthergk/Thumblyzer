"use server";
import User from "@/database/user.model";
import { connectTodb } from "../mongoose";

// Set a new user in the database
export async function setUser({ clerkId, username, email }) {
    try {
        await connectTodb();
        const newUser = await User.create({ clerkId, username, email });
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
}

// Get a user by userId (not MongoDB's default _id)
// export async function getUser({ user }) {
//     const { userId } = user; // Clerk userId

//     try {
//         await connectTodb(); // Connect to the DB
//         const foundUser = await User.findOne({ userId }); // Query by userId field
//         if (!foundUser) {
//             throw new Error('User not found');
//         }
//         return foundUser;
//     } catch (error) {
//         console.error('Error fetching user:', error);
//         throw new Error('Failed to fetch user');
//     }
// }
