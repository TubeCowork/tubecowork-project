"use server"

import { UserBasicDetailsType, UserDetailsType } from "@/utils/types/user"
import { connectToDB } from "../db"
import UserModel, { IUser } from "../models/User.model"
import YoutubeChannelModel, {
    IYoutubeChannel,
} from "../models/YoutubeChannel.model"
import {
    YoutubeChannelBasicType,
    YoutubeChannelType,
} from "@/utils/types/youtube/channel"
import { withTryCatch } from "@/utils/helper/trycatch"
import mongoose from "mongoose"
import VideoModel, { IVideo } from "../models/YoutubeVideo.model"

export const getObjectId = withTryCatch(
    async (id: string): Promise<mongoose.Types.ObjectId> => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error("Id is not valid")
        }
        return new mongoose.Types.ObjectId(id)
    }
)

export const fetchUserDetails = withTryCatch(
    async (userEmail: string): Promise<UserDetailsType> => {
        await connectToDB()
        const user = await UserModel.findOne({ email: userEmail })
            .populate({
                path: "ownedChannels",
                model: YoutubeChannelModel,
            })
            .populate({
                path: "managedChannels",
                model: YoutubeChannelModel,
            })

        if (!user) {
            throw Error("No user with this email")
        }
        const ownedChannels = user?.ownedChannels?.map(
            (channel: IYoutubeChannel) => {
                return {
                    id: String(channel._id),
                    name: channel.name,
                    isVerified: channel.isVerified,
                    image: channel.image,
                }
            }
        )

        const managedChannels = user?.managedChannels?.map(
            (channel: IYoutubeChannel) => {
                return {
                    id: String(channel._id),
                    name: channel.name,
                    isVerified: channel.isVerified,
                    image: channel.image,
                }
            }
        )
        return {
            id: String(user._id),
            name: user.name,
            email: user.email,
            username: user.username,
            image: user.image,
            ownedChannels,
            managedChannels,
        }
    }
)

export const fetchChannelDetails = withTryCatch(
    async (channelid: string): Promise<YoutubeChannelType> => {
        await connectToDB()
        const channelObjectId = await getObjectId(channelid)
        const channel = await YoutubeChannelModel.findById(channelObjectId)
            .populate({
                path: "editors",
                model: UserModel,
            })
            .populate({
                path: "videos",
                model: VideoModel,
            })

        if (!channel) {
            throw Error("no channel")
        }

        const editors = channel?.editors?.map((user: IUser) => {
            return {
                id: String(user._id),
                name: user.name,
                email: user.email,
                image: user.image,
            }
        })

        const videos = channel?.videos?.map((video: IVideo) => {
            return {
                id: String(video._id),
                videoYoutubeId: video.videoYoutubeId,
                title: video.title,
                description: video.description,
                thumbnail: video.thumbnail,
                isApproved: video.isApproved,
                isUploaded: video.isUploaded,
            }
        })
        return {
            id: String(channel._id),
            name: channel.name,
            image: channel.image,
            isVerified: channel.isVerified,
            owner: String(channel.owner),
            editors,
            videos,
        }
    }
)
