// src/models/YoutubeChannel.ts
import mongoose, { Schema, Document } from "mongoose"

export interface IYoutubeChannel extends Document {
    name: string
    image: string
    isVerified: boolean
    access_token: string
    refresh_token: string
    expiry: number
    owner: mongoose.Types.ObjectId
    editors: mongoose.Types.ObjectId[]
    videos: mongoose.Types.ObjectId[]
}

const youtubeChannelSchema = new Schema<IYoutubeChannel>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    access_token: {
        type: String,
    },
    refresh_token: {
        type: String,
    },
    expiry: {
        type: Number, //milisecs
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    editors: [{ type: Schema.Types.ObjectId, ref: "User" }],
    videos: [{ type: Schema.Types.ObjectId, ref: "YoutubeVideo" }], // Reference to Video documents
})

const YoutubeChannelModel =
    mongoose.models?.YoutubeChannel ||
    mongoose.model<IYoutubeChannel>("YoutubeChannel", youtubeChannelSchema)

export default YoutubeChannelModel
