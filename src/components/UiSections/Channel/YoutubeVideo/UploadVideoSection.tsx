"use client"

import Button from "@/components/Buttons/Button"
import FileInput from "@/components/Inputs/FileInput"
import Input from "@/components/Inputs/Input"
import TextareaInput from "@/components/Inputs/TextareaInput"
import PopUpModal from "@/components/Modal/PopUpModal"
import React, { useState } from "react"

type VideoUploadFormData = {
    title: string | null;
    description: string | null;
    video: File | null;
    thumbnail: File | null;
    tags: string | null;
}

function UploadVideoSection() {
    const [isUploadVideoPopupOpen, setIsUploadVideoPopupOpen] = useState(false);

    const [videoFormDetails, setVideoFormDetails] = useState<VideoUploadFormData>({
        title: null,
        description: null,
        video: null,
        thumbnail: null,
        tags: null
    });

    const handleOnChange = (
        id: string,
        data: File | string | number | null
    ) => {
        setVideoFormDetails((prev)=>({...prev,[id]:data}))
    }

    const submitVideo = async () => {
        console.log(videoFormDetails);
        
    }

    return (
        <div>
            <Button
                text="Upload Video"
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
                <div className="px-24">
                    <h1>Upload Video</h1>
                    <FileInput
                        label="Upload Video File"
                        required={true}
                        instructions="File types supported: WEBM, MP4. Max size: 1024 MB = 1GB"
                        onChange={handleOnChange}
                        id="video"
                        accept=".webm, .mp4"
                        isVideo={true}
                        maxSize={1024}
                    />

                    <Input
                        label="Video Title"
                        required={true}
                        id="title"
                        placeholder="Provide a brief Title of video"
                        onChange={handleOnChange}
                    />

                    <TextareaInput
                        label="Video Description"
                        required={true}
                        id="description"
                        placeholder="Provide a brief summary of your video"
                        onChange={handleOnChange}
                    />

                    <Input
                        label="Video Tags"
                        required={true}
                        id="tags"
                        placeholder="Write all tags sparated by ,"
                        onChange={handleOnChange}
                    />

                    <FileInput
                        label="Add Video Thumbnail"
                        required={true}
                        instructions="1920x1080 or 16:9 ratio. File types supported: JPG, PNG. Max size: 2 MB"
                        onChange={handleOnChange}
                        id="thumbnail"
                        accept=".png, .jpg"
                        isImage={true}
                        maxSize={2}
                    />

                    <Button text="Upload Now" onClick={submitVideo} />
                </div>
            </PopUpModal>
        </div>
    )
}

export default UploadVideoSection
