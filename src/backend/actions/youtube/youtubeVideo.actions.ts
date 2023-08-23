import UserModel from "@/backend/models/User.model"
import YoutubeChannelModel from "@/backend/models/YoutubeChannel.model"
import { YoutubeVideoUploadDataType } from "@/utils/types/youtube/video"
import { ObjectId } from "mongoose"
import { makeVideoPublic, uploadVideoUnlisted } from "./youtubeHelper"
import VideoModel, { IVideo } from "@/backend/models/YoutubeVideo.model"

export const createYoutubeChannel = async (
    videoDetails: YoutubeVideoUploadDataType,
    channelId: ObjectId,
    userid: ObjectId
): Promise<IVideo> => {
    try {
        const { title, description, tags, videoFile, thumbnailFile } =
            videoDetails

        if (!title || !channelId || !videoFile || !thumbnailFile) {
            throw Error("Incomplete video data")
        }
        const channel = await YoutubeChannelModel.findById(channelId)
        if (!channel?.isVerified) {
            throw Error("YouTube channel is not verified")
        }
        const user = await UserModel.findById(userid)
        if (!user) {
            throw Error("User not found")
        }
        const { videoYoutubeId, videoURL, thumbnailURL } =
            await uploadVideoUnlisted(videoDetails, channel)
        const newVideo = new VideoModel({
            videoYoutubeId,
            title,
            video: videoURL,
            thumbnail: thumbnailURL,
            description,
            tags, // comma-separated
            isUploaded: true,
        })

        const savedVideo = await newVideo.save()
        channel.videos.push(savedVideo._id)

        // Save the updated channel
        await channel.save()
        return savedVideo
    } catch (error) {
        console.error("Error creating YouTube channel:", error)
        throw error
    }
}

export const approveUploadedVideo = async (
    channelId: ObjectId,
    videoId: ObjectId
) => {
    try {
        const channel = await YoutubeChannelModel.findById(channelId)
        const video = await VideoModel.findById(videoId)

        if (!channel || !video) {
            throw Error("Channel or video not found")
        }

        const isSuccess = await makeVideoPublic(video.videoYoutubeId, channel)

        if (isSuccess) {
            video.isApproved = true
            await video.save()
        } else {
            throw Error("some error in approving video")
        }
    } catch (error) {
        console.error("Error in makeVideoPublicController:", error)
        throw error
    }
}
