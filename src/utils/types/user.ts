import { YoutubeChannelBasicType } from "./youtube/channel"

export type UserBasicDetailsType = {
    id: string
    name: string
    email: string
    username?: string
    image?: string
}

export type UserDetailsType = UserBasicDetailsType & {
    ownedChannels: YoutubeChannelBasicType[]
    managedChannels: YoutubeChannelBasicType[]
}
