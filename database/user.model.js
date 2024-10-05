import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    clerkId: {type: String, require: true},
    usename: {type:String, require: true, unique : true},
    email: {type: String, require: true, unique : true},
});

// Avoid model recreation if already exists
const User = models.User || model('User', userSchema);

export default User;
