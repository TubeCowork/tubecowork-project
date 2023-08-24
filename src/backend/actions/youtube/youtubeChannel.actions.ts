"use server"
import { connectToDB } from "@/backend/db"
import UserModel from "@/backend/models/User.model"
import YoutubeChannelModel from "@/backend/models/YoutubeChannel.model"
import { UserBasicDetailsType } from "@/utils/types/user"
import {
    YoutubeChannelBasicType,
    YoutubeChannelVerifedDataType,
} from "@/utils/types/youtube/channel"
import mongoose from "mongoose"
import { getYoutubeAuthUrl } from "./youtubeHelper"

export const createYoutubeChannel = async (
    userid: string,
    channelName: string
): Promise<YoutubeChannelBasicType> => {
    try {
        await connectToDB();
        const user = await UserModel.findOne(new mongoose.Types.ObjectId(userid));
        if (!user) {
            throw Error("User not found")
        }

        const newChannel = new YoutubeChannelModel({
            name: channelName,
            owner: user._id, // Associate the channel with the user
        })

        const savedChannel = await newChannel.save()
        user.ownedChannels.push(savedChannel._id)
        await user.save()

        return savedChannel
    } catch (error) {
        console.error("Error creating YouTube channel:", error)
        throw error
    }
}

export const getAuthUrl = async (): Promise<string> => {
    try {
        const authUrl = await getYoutubeAuthUrl();
        return authUrl
    } catch (error) {
        console.error("Error creating YouTube channel:", error)
        throw error
    }
}

export const setChannelAsVerified = async (
    channelId: string,
    verificationData: YoutubeChannelVerifedDataType
): Promise<YoutubeChannelBasicType> => {
    try {
        await connectToDB()

        const channel = await YoutubeChannelModel.findById(channelId)
        if (!channel) {
            throw Error("Channel not found")
        }
        channel.isVerified = true
        channel.access_token = verificationData.access_token
        channel.refresh_token = verificationData.refresh_token
        channel.expiry = verificationData.expiry_date
        await channel.save()
        return channel
    } catch (error) {
        console.error("Error creating YouTube channel:", error)
        throw error
    }
}

export const addEditorToChannel = async (
    channelId: string,
    editorId: string
): Promise<UserBasicDetailsType> => {
    try {
        await connectToDB()

        const channel = await YoutubeChannelModel.findById(channelId)
        if (!channel) {
            throw Error("YouTube channel not found")
        }
        const editor = await UserModel.findById(editorId)
        if (!editor) {
            throw Error("Editor user not found")
        }

        if (!channel.editors.includes(editor._id)) {
            channel.editors.push(editor._id)
            await channel.save()
        }
        if (!editor.managedChannels.includes(channel._id)) {
            editor.managedChannels.push(channel._id)
            await editor.save()
        }
        return editor
    } catch (error) {
        console.error("Error creating YouTube channel:", error)
        throw error
    }
}
