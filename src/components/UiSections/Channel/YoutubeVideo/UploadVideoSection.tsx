"use client"

import Button from "@/components/Buttons/Button"
import FileInput from "@/components/Inputs/FileInput"
import Input from "@/components/Inputs/Input"
import TextareaInput from "@/components/Inputs/TextareaInput"
import SimpleLoader from "@/components/Loader/loader"
import PopUpModal from "@/components/Modal/PopUpModal"
import { YoutubeVideoUploadDataType } from "@/utils/types/youtube/video"
import React, { useState } from "react"
import VideoUploadForm from "./VideoUploadForm"
import { FaViadeo, FaVideo, FaVideoSlash } from "react-icons/fa"

type YoutubeVideoUploadFormType = {
    title: string | null
    description: string | null
    tags: string | null
    videoFile: File | null
    thumbnailFile: File | null
}

type uploadVideoSectionType = {
    uploadVideoFn: (videoData: YoutubeVideoUploadDataType) => Promise<string>
}

function UploadVideoSection({ uploadVideoFn }: uploadVideoSectionType) {
    const [isUploadVideoPopupOpen, setIsUploadVideoPopupOpen] = useState(false)

    const [videoFormDetails, setVideoFormDetails] =
        useState<YoutubeVideoUploadFormType>({
            title: null,
            description: null,
            tags: null,
            videoFile: null,
            thumbnailFile: null,
        })
    const [uploadingVideo, setUploadingVideo] = useState(false)
    const [uploadedVideoId, setUploadedVideoId] = useState("")

    const handleOnChange = (
        id: string,
        data: File | string | number | null
    ) => {
        if (id && data) {
            setVideoFormDetails((prev) => ({ ...prev, [id]: data }))
        }
    }

    const submitVideo = async () => {
        try {
            if (
                !videoFormDetails.title ||
                !videoFormDetails.description ||
                !videoFormDetails.thumbnailFile ||
                !videoFormDetails.videoFile
            ) {
                throw Error("All fileds are not added properly")
            }
            setUploadingVideo(true)
            const id = await uploadVideoFn({
                ...videoFormDetails,
                tags: videoFormDetails.tags || "tag",
            } as YoutubeVideoUploadDataType)
            setUploadedVideoId(id)
            // setIsUploadVideoPopupOpen(false);
        } catch (error) {
            console.log(error)
        }
        setUploadingVideo(false)
    }

    return (
        <div>
            <Button
                icon={<FaVideo />}
                text="Upload"
                className="btn_1_2"
                onClick={() => {
                    setIsUploadVideoPopupOpen(true)
                }}
            />

            <PopUpModal
                isOpen={isUploadVideoPopupOpen}
                closeModal={() => {
                    setIsUploadVideoPopupOpen(false)
                }}
            >
                <div className="px-24 w-[50vw] h-[80vh] overflow-y-auto ">
                    {uploadingVideo ? (
                        <>
                            <SimpleLoader className="w-24 h-24" />
                            <h1>Uploading Video... Please Wait...</h1>
                        </>
                    ) : uploadedVideoId ? (
                        <>
                            <h1 className="text_highlight_gradient text_heading_size">
                                Video Uploaded Successfully
                            </h1>
                        </>
                    ) : (
                        <>
                            <VideoUploadForm handleOnChange={handleOnChange} />
                            <Button
                                icon={<FaVideo />}
                                text="Upload Now"
                                className="mt-6 btn_1_2"
                                onClick={submitVideo}
                                loading={uploadingVideo}
                            />
                        </>
                    )}
                </div>
            </PopUpModal>
        </div>
    )
}

export default UploadVideoSection
