"use client"
import { approveUploadedVideo } from "@/backend/actions/youtube/youtubeVideo.actions"
import Button from "@/components/Buttons/Button"
import PopUpModal from "@/components/Modal/PopUpModal"
import {
    YoutubeVideoBasicType,
    YoutubeVideoUpdateDetailsType,
    YoutubeVideoUploadDataType,
    YoutubeVideoUploadFormPartial,
    YoutubeVideoUploadFormType,
} from "@/utils/types/youtube/video"
import Image from "next/image"
import React, { useState } from "react"
import { FaEdit, FaVideo } from "react-icons/fa"
import VideoUploadForm from "./VideoUploadForm"
import { getChangedValuesInOjects } from "@/utils/helper/generic"

type VideoCardPropsType = {
    videoDetails: YoutubeVideoBasicType
    isOwner: boolean
    approveVideoFn?: (
        videoId: string,
        updateDetails: YoutubeVideoUpdateDetailsType
    ) => Promise<Boolean>
}

function VideoCard({
    videoDetails,
    isOwner,
    approveVideoFn,
}: VideoCardPropsType) {
    const [isApprovePopup, setIsApprovePopup] = useState(false)

    const [approving, setApproving] = useState(false)
    const approveVideo = async () => {
        if (videoDetails.isApproved) return
        try {
            setApproving(true)
            if (!approveVideoFn) throw Error("no function for this")

            const updateDetails: YoutubeVideoUpdateDetailsType = {
                ...getChangedValuesInOjects(videoDetails, videoFormDetails),
            } as YoutubeVideoUpdateDetailsType

            console.log(updateDetails)

            const isApproved = await approveVideoFn(
                videoDetails.id,
                updateDetails
            )
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
            // setVideoFormDetails((prev) => ({ ...prev, [id]: data }))
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

                {!videoDetails.isApproved &&
                    (isOwner ? (
                        <Button
                            icon={<FaEdit />}
                            text="Approve"
                            onClick={() => setIsApprovePopup(true)}
                            loading={approving}
                        />
                    ) : (
                        <Button text="Not Approved Yet" className="btn_1_2" />
                    ))}
            </div>

            <PopUpModal
                isOpen={isApprovePopup}
                closeModal={() => setIsApprovePopup(false)}
            >
                <div className="px-4 py-4  w-[90vw] sm:w-[85vw] lg:w-[75vw] xl:w-[60vw] ">
                    <p className="mt-2">
                        <span className="text-primary">
                            *
                        </span> {" "}
                        After approving, Video will be public on your channel.
                    </p>
                    <div className="flex items-center justify-between pb-4 border-b-2 border-secondary-hover">
                        <h2 className="text_sub_heading_size">
                            Update & Approve
                        </h2>
                        <span className="flex gap-4">
                            <Button
                                loading={approving}
                                text={videoDetails.isApproved ? "Approved" : "Approve"}
                                className={videoDetails.isApproved ? "" : "btn_1_2"}
                                onClick={approveVideo}
                            />
                        </span>
                    </div>
                    <div className="px-24 py-4 h-[80vh] overflow-y-auto">
                        <VideoUploadForm
                            formValues={videoFormDetails}
                            type="update"
                            handleOnChange={handleOnChange}
                        />
                    </div>
                </div>
            </PopUpModal>
        </div>
    )
}

export default VideoCard
