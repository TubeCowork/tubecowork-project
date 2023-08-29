import { UserBasicDetailsType, UserDetailsType } from "../user"
import { YoutubeVideoBasicType } from "./video"

export type YoutubeChannelBasicType = {
    id: string
    name: string
    image?: string
    isVerified: boolean
}

export type YoutubeChannelType = YoutubeChannelBasicType & {
    owner: string
    editors?: UserBasicDetailsType[]
    videos?: YoutubeVideoBasicType[]
}

export type YoutubeChannelVerifedDataType = {
    name: string
    image: string
    access_token: string
    refresh_token: string
    expiry_date: number
}
