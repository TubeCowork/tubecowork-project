"use client"
import { approveUploadedVideo } from "@/backend/actions/youtube/youtubeVideo.actions"
import Button from "@/components/Buttons/Button"
import { YoutubeVideoBasicType } from "@/utils/types/youtube/video"
import Image from "next/image"
import React, { useState } from "react"

type VideoCardPropsType = {
    videoDetails: YoutubeVideoBasicType;
    isOwner: boolean;
    approveVideoFn?: (videoId: string) => Promise<Boolean>
}

function VideoCard({
    videoDetails,
    isOwner,
    approveVideoFn
}: VideoCardPropsType) {
    const [approving, setApproving] = useState(false);
    const approveVideo = async () => {
        try {
            if (!approveVideoFn) throw Error("no function for this")
            const isApproved = await approveVideoFn(videoDetails.id);
        } catch (error) {
            console.log(error);

        }
    }

    console.log(videoDetails.thumbnail);

    return (
        <div className="border border-blue-400 flex px-4 py-6 rounded-xl items-center">
            <div className="flex-1 flex">
                <Image src={videoDetails.thumbnail} alt="thumnail" width={40} height={30} />
                <p>Title: {videoDetails.title}</p>
            </div>
            <div className="flex gap-2">
                {videoDetails.isApproved ? (
                    <p>Video uploaded publically</p>
                ) : (
                    isOwner ? (
                        <Button text="Approve" onClick={approveVideo} />
                    ) : (
                        <p>Owner has not approved yet</p>
                    )
                )}
                <Button
                    text="Watch Video"
                    className=""
                    onClick={() => {
                        window.open(
                            `https://www.youtube.com/watch?v=${videoDetails.videoYoutubeId}`,
                            "_blank"
                        )
                    }}
                />
            </div>
        </div>
    )
}

export default VideoCard
