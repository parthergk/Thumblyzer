"use server"
import User from "@/database/user.model"
import { connectTodb } from "../mongoose";

export async function setUser({user}) {
    const {userId, username} = user

    try {
        await connectTodb();
        const newUser = await User.create({id: userId, user: username});
        return newUser
    } catch (error) {
        console.log(error);
    }

}

export async function getUser({user}) {
    const {userId} = user

    try {
        await connectTodb();
        const user = await User.findById({id: userId});
        return user;
    } catch (error) {
        console.log(error);
    }

}
