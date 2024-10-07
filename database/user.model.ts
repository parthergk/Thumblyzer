import { Schema, model, models, Document, Model } from "mongoose";

// Define an interface for the User document
export interface IUser extends Document {
    clerkId: string;
    username: string;
    email: string;
}


// Create the user schema with type annotations
const userSchema = new Schema<IUser>({
    clerkId: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
});

// Define the User model with type safety
const User: Model<IUser> = models.User || model<IUser>('User', userSchema);

export default User;
