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

export const maxVideoTitleCharacters = 100
export const maxVideoDescriptionCharacters = 5000
export const maxVideoTagsCharacters = 500

const videoSchema = new Schema<IVideo>({
    videoYoutubeId: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: maxVideoTitleCharacters,
    },
    description: {
        type: String,
        trim: true,
        default: "",
        maxlength: maxVideoDescriptionCharacters,
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
        maxlength: 300,
    },
    thumbnail: {
        type: String,
        maxlength: 300,
    },
    tags: {
        type: String,
        trim: true,
        maxlength: maxVideoTagsCharacters,
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
