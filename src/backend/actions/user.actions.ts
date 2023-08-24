"use server"

import { UserBasicDetailsType, UserDetailsType } from "@/utils/types/user"
import { connectToDB } from "../db"
import UserModel from "../models/User.model"
import YoutubeChannelModel, { IYoutubeChannel } from "../models/YoutubeChannel.model"
import { YoutubeChannelBasicType } from "@/utils/types/youtube/channel"

export const fetchUserDetails = async (
    userEmail: string
): Promise<UserDetailsType> => {
    try {
        await connectToDB()
        const user = await UserModel.findOne({ email: userEmail }).populate({
            path: "ownedChannels",
            model: YoutubeChannelModel,
        })
        console.log(user);
        const ownedChannels = user?.ownedChannels?.map((channel: IYoutubeChannel) => {
            return {
                id: String(channel._id),
                name: channel.name,
                isVerified: channel.isVerified
            }
        });

        const managedChannels = user?.managedChannels?.map((channel: IYoutubeChannel) => {
            return {
                id: String(channel._id),
                name: channel.name,
                isVerified: channel.isVerified
            }
        });
        return {
            id: String(user._id),
            name: user.name,
            email: user.email,
            username: user.username,
            image: user.image,
            ownedChannels,
            managedChannels
        };


    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}
