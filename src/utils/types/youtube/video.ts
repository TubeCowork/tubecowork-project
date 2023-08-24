import { UserBasicDetailsType } from "../user"

export type YoutubeVideoBasicType = {
    videoYoutubeId: string
    title: string
    thumbnail: string
    isUploaded: boolean
    isApproved: boolean
}

export type YoutubeVideoType = {
    description: string
    video: string
    tags: string
    uploadedBy: UserBasicDetailsType
}

export type YoutubeVideoUploadDataType = {
    title: string
    description: string
    tags: string
    videoFile: File
    thumbnailFile: File
}
