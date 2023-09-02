"use client"
import { approveUploadedVideo } from "@/backend/actions/youtube/youtubeVideo.actions"
import Button from "@/components/Buttons/Button"
import PopUpModal from "@/components/Modal/PopUpModal"
import { YoutubeVideoBasicType, YoutubeVideoUploadFormType } from "@/utils/types/youtube/video"
import Image from "next/image"
import React, { useState } from "react"
import { FaEdit, FaVideo } from "react-icons/fa"
import VideoUploadForm from "./VideoUploadForm"

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
    const [isApprovePopup, setIsApprovePopup] = useState(false);

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

    const handleOnChange = (
        id: string,
        data: File | string | number | null
    ) => {
        if (id) {
            setVideoFormDetails((prev) => ({ ...prev, [id]: data }))
        }
    }


    const [videoFormDetails, setVideoFormDetails] =
        useState<YoutubeVideoUploadFormType>({
            title: videoDetails.title,
            description: videoDetails.description,
            tags: videoDetails.tags || "",
            videoURL: videoDetails.videoYoutubeId,
            thumbnailURL: videoDetails.thumbnail,
        })

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
                    onClick={() => { }}
                />

                <Button
                    icon={<FaEdit />}
                    text="Approve"
                    onClick={() => setIsApprovePopup(true)}
                    loading={approving}
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

            <PopUpModal isOpen={isApprovePopup} closeModal={() => setIsApprovePopup(false)}>
                <div className="">
                    <div className="flex items-center justify-between px-4 py-4">
                        <h2 className="text_sub_heading_size">Update & Approve</h2>
                        <span className="flex gap-4">
                            <Button text="Approve" className="btn_1_2" onClick={approveVideo} />
                        </span>
                    </div>
                    <div className="px-24 w-[90vw] sm:w-[85vw] lg:w-[75vw] xl:w-[60vw] h-[86vh] overflow-y-auto py-4">
                        <VideoUploadForm formValues={videoFormDetails} type="update" handleOnChange={handleOnChange} />
                    </div>
                </div>
            </PopUpModal>
        </div>
    )
}

export default VideoCard
