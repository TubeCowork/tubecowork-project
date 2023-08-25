import { UserBasicDetailsType, UserDetailsType } from "../user"
import { YoutubeVideoBasicType } from "./video"

export type YoutubeChannelBasicType = {
    id: string
    name: string
    isVerified: boolean
}

export type YoutubeChannelType = {
    owner: string
    editors: UserBasicDetailsType[]
    videos: YoutubeVideoBasicType[]
}

export type YoutubeChannelVerifedDataType = {
    access_token: string
    refresh_token: string
    expiry_date: number
}
