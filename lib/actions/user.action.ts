'use server'

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    userId: string;
    username: string;
    image: string;
    bio: string;
    email: string;
    phone_number: number;
    path: string;
}

export async function updateUser({
    userId,
    username,
    image,
    bio,
    email,
    phone_number,
    path

}: Params) : Promise<void>{
    connectToDB();

    try {
        

        const updateDetails =  await User.findOneAndUpdate(
            {id: userId},
            {
                username: username.toLowerCase(),
                email,
                phone_number,
                onboarded: true

            },
            {upsert: true}
        )
        
        updateDetails.image = image
        updateDetails.bio = bio

        await updateDetails.save();

        

        if(path === '/profile/edit'){
            revalidatePath(path)
        }


    } catch (error: any) {
        throw new Error(`User updation failed ${error.message}`);
        
    }
}

export async function fetchUser(userId: string){
    try {
        connectToDB();

        return await User.findOne({id: userId})
                           
    } catch (error: any) {
        throw new Error(`Failed to find the user ${error.message}`);
        
    }
}