// src/models/Video.ts
import mongoose, { Schema, Document } from "mongoose"

export interface IVideo extends Document {
    videoYoutubeId: string
    title: string
    description: string
    isUploaded: boolean
    isApproved: boolean
    video: string
    thumbnail: string
    tags: string
    uploadedBy: mongoose.Types.ObjectId
}

const videoSchema = new Schema<IVideo>({
    videoYoutubeId: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        default: "",
    },
    isUploaded: {
        type: Boolean,
        default: false,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    video: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    tags: {
        type: String,
        trim: true,
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

const VideoModel =
    mongoose.models?.YoutubeVideo ||
    mongoose.model<IVideo>("YoutubeVideo", videoSchema)

export default VideoModel
