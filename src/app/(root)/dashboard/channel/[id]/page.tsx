"use client"

import React, { useState } from "react"
import useChannel from "@/hooks/getChannel"
import { useUserData } from "@/context/UserContext"
import ChannelEditors from "@/components/UiSections/Channel/ChannelEditors"
import UploadVideoSection from "@/components/UiSections/Channel/YoutubeVideo/UploadVideoSection"
import { YoutubeVideoBasicType } from "@/utils/types/youtube/video"
import VideoCard from "@/components/UiSections/Channel/YoutubeVideo/VideoCard"
import PageLoader from "@/components/Loader/PageLoader"
import ChannelSidebar from "@/components/ChannelSidebar";

type ChannelSectionType = string | "videos" | "editors";

function page({ params }: { params: { id: string } }) {
    const { user } = useUserData()
    const { id: channelid } = params

    const [sectionToShow, setSectionToShow] = useState<ChannelSectionType>("videos")

    if (!channelid) return
    const { channelDetails, loading, addEditor, uploadVideo, approveVideo } =
        useChannel(channelid as string, user?.id)
    if (loading) {
        return <PageLoader text="Loading Channel Data..." />
    }
    const isOwner = user?.id === channelDetails?.owner

    if (!channelDetails) {
        return <PageLoader text="No channel data..." />
    }

    return (
        <div className="flex">
            <ChannelSidebar channelDetails={channelDetails} setSectionToShow={setSectionToShow} />

            <div className="flex-1 overflow-x-hidden overflow-y-auto">
                {sectionToShow === "editors" &&
                    <>
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
                    </>
                }

                {sectionToShow === "videos" &&
                    <div className="border px-4 py-6 m-4 border-red-500">
                        <h1 className="text_sub_heading_size">All Videos</h1>
                        <div className="flex flex-col gap-4">
                            {channelDetails?.videos?.map(
                                (video: YoutubeVideoBasicType, key) => (
                                    <VideoCard
                                        approveVideoFn={approveVideo}
                                        key={key}
                                        videoDetails={video}
                                        isOwner={isOwner}
                                    />
                                )
                            )}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default page
