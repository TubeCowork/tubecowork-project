import { fetchChannelDetails } from "@/backend/actions/user.actions"
import { addEditorToChannel } from "@/backend/actions/youtube/youtubeChannel.actions"
import { uploadVideoOnYoutube } from "@/backend/actions/youtube/youtubeVideo.actions"
import { UserBasicDetailsType } from "@/utils/types/user"
import { YoutubeChannelType } from "@/utils/types/youtube/channel"
import { YoutubeVideoUploadDataType } from "@/utils/types/youtube/video"
import React, { useEffect, useState } from "react"

type useChannelReturnType = {
    loading: boolean
    channelDetails: YoutubeChannelType | null
    addEditor?: (email: string) => Promise<UserBasicDetailsType>
    uploadVideo?: (videoData: YoutubeVideoUploadDataType) => Promise<string>
}
type useChannelType = {
    (id: string, userid?: string): useChannelReturnType
}

const useChannel: useChannelType = (id, userid) => {
    const [loading, setLoading] = useState(true)
    const [channelDetails, setChannelDetails] =
        useState<YoutubeChannelType | null>(null)

    if (!id) {
        return {
            loading: false,
            channelDetails: null,
        }
    }

    const loadDetails = async () => {
        try {
            const _channel = await fetchChannelDetails(id)
            setChannelDetails(_channel)
            console.log("_channel", _channel)
            setLoading(false)
        } catch (error) {
            console.log("loadDetails error", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        loadDetails()
    }, [])

    const addEditor = async (
        useremail: string
    ): Promise<UserBasicDetailsType> => {
        try {
            if (!channelDetails?.id) throw Error("Channel id not provided")
            const _editor = await addEditorToChannel(
                channelDetails?.id,
                useremail
            )
            loadDetails()
            return _editor
        } catch (error) {
            throw error
        }
    }

    const uploadVideo = async (
        videoDetails: YoutubeVideoUploadDataType
    ): Promise<string> => {
        try {
            if (!channelDetails?.id || !userid)
                throw Error("Channel or User id not provided")
            // const _videoYtId = await uploadVideoOnYoutube(videoDetails, channelDetails?.id, userid)
            // return _videoYtId

            console.log("videoDetails", videoDetails)
            console.log("channelDetails?.id", channelDetails?.id)
            console.log("userid", userid)
            return "uploaded"
        } catch (error) {
            throw error
        }
    }

    return {
        loading: loading,
        channelDetails: channelDetails,
        addEditor,
        uploadVideo,
    }
}

export default useChannel
