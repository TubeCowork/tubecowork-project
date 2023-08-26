"use client"
import React from "react"
import useChannel from "@/hooks/getChannel"
import { useUserData } from "@/context/UserContext"
import { UserBasicDetailsType } from "@/utils/types/user"
import Button from "@/components/Buttons/Button"
import PopUpModal from "@/components/Modal/PopUpModal"
import ChannelEditors from "@/components/UiSections/Channel/ChannelEditors"
import UploadVideoSection from "@/components/UiSections/Channel/YoutubeVideo/UploadVideoSection"
import { YoutubeVideoBasicType } from "@/utils/types/youtube/video"
import VideoCard from "@/components/UiSections/Channel/YoutubeVideo/VideoCard"

function page({ params }: { params: { id: string } }) {
    const { user } = useUserData()
    const { id: channelid } = params

    if (!channelid) return
    const { channelDetails, loading, addEditor, uploadVideo } = useChannel(
        channelid as string,
        user?.id
    )
    if (loading) {
        return <h1>Loading Channel data</h1>
    }
    const isOwner = user?.id === channelDetails?.owner

    return (
        <div>
            <h1 className="text_heading_size">{channelDetails?.name}</h1>

            {uploadVideo && <UploadVideoSection uploadVideoFn={uploadVideo} />}

            {isOwner ? (
                <>
                    <h1>You are Owner</h1>

                    <div className="border px-4 py-6 m-4 border-red-500">
                        <h1 className="text_sub_heading_size">All Editors</h1>
                        {addEditor && (
                            <ChannelEditors
                                addEditor={addEditor}
                                allEditors={channelDetails?.editors}
                            />
                        )}
                    </div>
                </>
            ) : (
                <h1>You are manager</h1>
            )}

            <div className="border px-4 py-6 m-4 border-red-500">
                <h1 className="text_sub_heading_size">All Videos</h1>
                <div className="flex flex-col">
                    {channelDetails?.videos?.map(
                        (video: YoutubeVideoBasicType, key) => (
                            <VideoCard videoDetails={video} isOwner={isOwner} />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default page
