"use server";

import { connectToDB } from "../db";
import UserModel from "../models/User.model";

const fetchUser = async (userEmail: string) => {
    try {
        await connectToDB();

        return await UserModel.findOne({ email: userEmail });
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}