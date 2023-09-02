import { UserBasicDetailsType } from "../user"

export type YoutubeVideoBasicType = {
    id: string
    videoYoutubeId: string
    title: string
    description: string
    tags?: string,
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

export type YoutubeVideoUploadFormType = {
    title: string | null;
    description: string | null;
    tags: string | null;
    videoFile?: File | null;
    videoURL?: string;
    thumbnailFile?: File | null;
    thumbnailURL?: string;
}

export type YoutubeVideoUploadFormPartial = Partial<YoutubeVideoUploadFormType>;