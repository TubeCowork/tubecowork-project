import { connectToDB } from "@/backend/db"
import UserModel from "@/backend/models/User.model"
import YoutubeChannelModel, {
    IYoutubeChannel,
} from "@/backend/models/YoutubeChannel.model"
import { UserBasicDetailsType } from "@/utils/types/user"
import {
    YoutubeChannelType,
    YoutubeChannelVerifedDataType,
} from "@/utils/types/youtube/channel"
import { ObjectId } from "mongoose"

export const createYoutubeChannel = async (
    userEmail: string,
    channel: YoutubeChannelType
): Promise<IYoutubeChannel> => {
    try {
        await connectToDB()
        const user = await UserModel.findOne({ email: userEmail })
        if (!user) {
            throw Error("User not found")
        }

        console.log("user", user)

        const newChannel = new YoutubeChannelModel({
            name: channel.name,
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

export const setChannelAsVerified = async (
    channelId: ObjectId,
    channel: YoutubeChannelVerifedDataType
): Promise<IYoutubeChannel> => {
    try {
        await connectToDB()

        const channel = await YoutubeChannelModel.findById(channelId)
        if (!channel) {
            throw Error("Channel not found")
        }
        channel.isVerified = true
        channel.access_token = channel.access_token
        channel.refresh_token = channel.refresh_token
        channel.expiry = channel.expiry_date
        await channel.save()
        return channel
    } catch (error) {
        console.error("Error creating YouTube channel:", error)
        throw error
    }
}

export const addEditorToChannel = async (
    channelId: ObjectId,
    editorId: ObjectId
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
