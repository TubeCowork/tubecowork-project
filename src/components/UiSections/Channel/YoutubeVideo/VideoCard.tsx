"use client"
import { approveUploadedVideo } from "@/backend/actions/youtube/youtubeVideo.actions"
import Button from "@/components/Buttons/Button"
import { YoutubeVideoBasicType } from "@/utils/types/youtube/video"
import Image from "next/image"
import React, { useState } from "react"
import { FaEdit, FaVideo } from "react-icons/fa"

type VideoCardPropsType = {
    videoDetails: YoutubeVideoBasicType
    isOwner: boolean
    approveVideoFn?: (videoId: string) => Promise<Boolean>
}

function VideoCard({
    videoDetails,
    isOwner,
    approveVideoFn,
}: VideoCardPropsType) {
    const [approving, setApproving] = useState(false)
    const approveVideo = async () => {
        try {
            setApproving(true)
            if (!approveVideoFn) throw Error("no function for this")
            const isApproved = await approveVideoFn(videoDetails.id)
        } catch (error) {
            console.log("approveVideo", error)
        }
        setApproving(false)
    }

    console.log(videoDetails)

    return (
        <div className="w-full flex items-center justify-between h-24 bg-secondary-hover px-4 rounded-xl cursor-pointer hover:bg-secondary  transition">
            <div className="flex-1 flex gap-4">
                <Image
                    src={videoDetails.thumbnail}
                    alt="thumnail"
                    width={100}
                    height={20}
                />
                <div className="flex flex-col max-w-md">
                    <p className="text-lg line-clamp-1">{videoDetails.title}</p>
                    <p className="text-sm text-text-color-light line-clamp-2">
                        {videoDetails.description}
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                {(isOwner || videoDetails.isApproved) && (
                    <Button
                        icon={<FaVideo />}
                        className="btn_1_2"
                        onClick={() => {
                            window.open(
                                `https://www.youtube.com/watch?v=${videoDetails.videoYoutubeId}`,
                                "_blank"
                            )
                        }}
                    />
                )}
                <Button
                    icon={<FaEdit />}
                    className="btn_1_2"
                    onClick={() => {}}
                />

                {!videoDetails.isApproved &&
                    (isOwner ? (
                        <Button
                            text="Approve"
                            onClick={approveVideo}
                            loading={approving}
                        />
                    ) : (
                        <Button text="Not Approved Yet" className="btn_1_2" />
                    ))}
            </div>
        </div>
    )
}

export default VideoCard
