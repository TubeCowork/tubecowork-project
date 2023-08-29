"use server"

import UserModel, { IUser } from "@/backend/models/User.model"
import YoutubeChannelModel, {
    IYoutubeChannel,
} from "@/backend/models/YoutubeChannel.model"
import {
    YoutubeVideoBasicType,
    YoutubeVideoUploadDataType,
} from "@/utils/types/youtube/video"
import { ObjectId } from "mongoose"
import { makeVideoPublic, uploadVideoUnlisted } from "./youtubeHelper"
import VideoModel from "@/backend/models/YoutubeVideo.model"
import { getObjectId } from "../user.actions"

export const uploadVideoOnYoutube = async (
    videoDetails: FormData,
    channelId: string,
    userid: string
): Promise<string> => {
    try {
        const title = videoDetails.get("title") as string
        const description = videoDetails.get("description") as string
        const tags = videoDetails.get("tags") as string
        const videoFile = videoDetails.get("videoFile") as File
        const thumbnailFile = videoDetails.get("thumbnailFile") as File

        console.log({ title, description, tags, videoFile, thumbnailFile })

        if (!title || !description || !tags || !videoFile || !thumbnailFile) {
            throw Error("Incomplete video data")
        }

        const _channelObjectId = await getObjectId(channelId)
        const channel: IYoutubeChannel | null =
            await YoutubeChannelModel.findById(_channelObjectId)
        if (!channel?.isVerified) {
            throw Error("YouTube channel is not verified")
        }
        const _userObjectId = await getObjectId(userid)
        const user: IUser | null = await UserModel.findById(_userObjectId)
        if (!user) {
            throw Error("User not found")
        }
        if (
            !channel.editors.includes(_userObjectId) &&
            !(channel.owner === _userObjectId)
        ) {
            throw Error(
                "You dont have any access to upload in this youtube channel"
            )
        }

        const uploadDetails = {
            title,
            description,
            tags,
            videoFile,
            thumbnailFile,
        }

        const { videoYoutubeId, videoURL, thumbnailURL } =
            await uploadVideoUnlisted(uploadDetails, channel)
        if (!videoYoutubeId) throw Error("There is no youtube id get")
        const newVideo = new VideoModel({
            videoYoutubeId,
            title,
            video: videoURL,
            thumbnail: thumbnailURL,
            description,
            tags, // comma-separated
            isUploaded: true,
            uploadedBy: user._id,
        })

        const savedVideo = await newVideo.save()
        channel.videos.push(savedVideo._id)
        await channel.save()
        return savedVideo.videoYoutubeId
    } catch (error) {
        console.error("uploadVideoOnYoutube:", error)
        throw error
    }
}

export const approveUploadedVideo = async (
    channelId: string,
    videoId: string
): Promise<boolean> => {
    try {
        const _channelObjectId = await getObjectId(channelId)
        const channel = await YoutubeChannelModel.findById(_channelObjectId)

        const _videoObjectId = await getObjectId(videoId)
        const video = await VideoModel.findById(_videoObjectId)

        if (!channel || !video) {
            throw Error("Channel or video not found")
        }

        const isSuccess = await makeVideoPublic(video.videoYoutubeId, channel)

        if (isSuccess) {
            video.isApproved = true
            await video.save()
            return true
        } else {
            throw Error("some error in approving video")
        }
    } catch (error) {
        console.error("Error in makeVideoPublicController:", error)
        throw error
    }
}
