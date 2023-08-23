"use server"

import { UserDetailsType } from "@/utils/types/user"
import { connectToDB } from "../db"
import UserModel, { IUser } from "../models/User.model"

export const fetchUserDetails = async (
    userEmail: string
): Promise<UserDetailsType> => {
    try {
        await connectToDB()
        const user = await UserModel.findOne({ email: userEmail })
        return user
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}
