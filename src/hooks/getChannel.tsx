"use client"

import { fetchChannelDetails } from "@/backend/actions/user.actions"
import { addEditorToChannel } from "@/backend/actions/youtube/youtubeChannel.actions"
import {
    approveUploadedVideo,
    uploadVideoOnYoutube,
} from "@/backend/actions/youtube/youtubeVideo.actions"
import { UserBasicDetailsType } from "@/utils/types/user"
import { YoutubeChannelType } from "@/utils/types/youtube/channel"
import {
    YoutubeVideoUpdateDetailsType,
    YoutubeVideoUploadDataType,
    YoutubeVideoUploadFormPartial,
} from "@/utils/types/youtube/video"
import React, { useEffect, useState } from "react"

type useChannelReturnType = {
    loading: boolean
    channelDetails: YoutubeChannelType | null
    uploadVideo: (videoData: YoutubeVideoUploadDataType) => Promise<string>
    addEditor: (email: string) => Promise<UserBasicDetailsType>
    approveVideo: (
        videoId: string,
        videoData: YoutubeVideoUpdateDetailsType
    ) => Promise<boolean>
}
type useChannelType = {
    (id: string, userid?: string): useChannelReturnType
}

const useChannel: useChannelType = (id, userid) => {
    const [loading, setLoading] = useState(true)
    const [channelDetails, setChannelDetails] =
        useState<YoutubeChannelType | null>(null)
    const loadDetails = async () => {
        try {
            const _channel = await fetchChannelDetails(id)
            setChannelDetails(_channel)
            setLoading(false)
        } catch (error) {
            console.log("loadDetails error", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (id) {
            loadDetails()
        }
    }, [id])

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

    function getFormData(object: any) {
        const formData = new FormData()
        Object.keys(object).forEach((key) => formData.append(key, object[key]))
        return formData
    }

    const uploadVideo = async (
        videoDetails: YoutubeVideoUploadDataType
    ): Promise<string> => {
        try {
            if (!channelDetails?.id || !userid)
                throw Error("Channel or User id not provided")
            console.log("videoDetails", videoDetails)
            const formDataFromObj = getFormData(videoDetails)
            const _videoYtId = await uploadVideoOnYoutube(
                formDataFromObj,
                channelDetails?.id,
                userid
            )
            await loadDetails()
            return _videoYtId
        } catch (error) {
            throw error
        }
    }

    const approveVideo = async (
        videoId: string,
        videoData: YoutubeVideoUpdateDetailsType
    ): Promise<boolean> => {
        try {
            const isApproved = await approveUploadedVideo(
                id,
                videoId,
                videoData
            )
            loadDetails()
            return isApproved
        } catch (error) {
            throw error
        }
    }

    return {
        loading: loading,
        uploadVideo,
        channelDetails: channelDetails,
        addEditor,
        approveVideo,
    }
}

export default useChannel
