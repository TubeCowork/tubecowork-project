import { ObjectId } from "mongoose"

export type YoutubeVideoUploadDataType = {
    title: string
    description: string
    tags: string
    videoFile: File
    thumbnailFile: File
}
