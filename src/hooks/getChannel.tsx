import { fetchChannelDetails } from "@/backend/actions/user.actions"
import { addEditorToChannel } from "@/backend/actions/youtube/youtubeChannel.actions"
import { UserBasicDetailsType } from "@/utils/types/user"
import { YoutubeChannelType } from "@/utils/types/youtube/channel"
import React, { useEffect, useState } from "react"

type useChannelReturnType = {
    loading: boolean
    channelDetails: YoutubeChannelType | null
    addEditor?: (email: string) => Promise<UserBasicDetailsType>
}
type useChannelType = {
    (id: string): useChannelReturnType
}

const useChannel: useChannelType = (id) => {
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
            return _editor
        } catch (error) {
            throw error
        }
    }

    return {
        loading: loading,
        channelDetails: channelDetails,
        addEditor,
    }
}

export default useChannel
