import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    userId: {type: Number, required: true},
    userName: {type: String, required: true},
})

const User = models.User ||  model('User', userSchema);

export default User;