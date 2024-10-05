import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    // Clerk's unique identifier for the user
    userId: { type: String, required: true, unique: true },
    
    // Store the username
    userName: { type: String, required: true },
    
    // Additional fields (e.g., email from Clerk's user profile)
    email: { type: String, required: true, unique: true },
    
    // Optional fields: you can add more fields based on Clerk's user metadata
    createdAt: { type: Date, default: Date.now },
});

// Avoid model recreation if already exists
const User = models.User || model('User', userSchema);

export default User;
