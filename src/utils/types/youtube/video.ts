import { UserBasicDetailsType } from "../user"

export type YoutubeVideoBasicType = {
    id: string
    videoYoutubeId: string
    title: string
    description: string
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
    videoFile: File
    thumbnailFile: File
    tags: string
    [index: string]: string | File
}
