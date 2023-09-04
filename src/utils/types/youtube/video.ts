import { UserBasicDetailsType } from "../user"

export type YoutubeVideoContentType = {
    title: string
    description: string
    tags?: string
}
export type YoutubeVideoBasicType = YoutubeVideoContentType & {
    id: string
    videoYoutubeId: string
    thumbnail: string
    isUploaded: boolean
    isApproved: boolean
    uploadedBy?: UserBasicDetailsType
}

// export type YoutubeVideoType = {
//     description: string
//     video: string
//     tags: string
//     uploadedBy: UserBasicDetailsType
// }

export type YoutubeVideoUploadDataType = YoutubeVideoContentType & {
    videoFile: File
    thumbnailFile: File
    // [index: string]: string | File
}

export type YoutubeVideoUploadFormType = {
    title: string | null
    description: string | null
    tags: string | null
    videoFile?: File | null
    videoURL?: string
    thumbnailFile?: File | null
    thumbnailURL?: string
}

export type YoutubeVideoUploadFormPartial = Partial<YoutubeVideoUploadFormType>

export type YoutubeVideoUpdateDetailsType = Partial<YoutubeVideoContentType>
