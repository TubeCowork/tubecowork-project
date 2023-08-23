import { IUser } from "@/backend/models/User.model"
import { IYoutubeChannel } from "@/backend/models/YoutubeChannel.model"
import { ObjectId } from "mongoose"

export type UserBasicDetailsType = {
    id: ObjectId
    name: string
    email: string
    username?: string
    image?: string
}

export type UserDetailsType = IUser & {
    ownedChannels: IYoutubeChannel[]
    managedChannels: IYoutubeChannel[]
}
