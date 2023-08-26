import Button from "@/components/Buttons/Button"
import FileInput from "@/components/Inputs/FileInput"
import NormalInput from "@/components/Inputs/NormalInput"
import TextareaInput from "@/components/Inputs/TextareaInput"
import PopUpModal from "@/components/Modal/PopUpModal"
import React, { useState } from "react"



function UploadVideoSection() {
    const [isUploadVideoPopupOpen, setIsUploadVideoPopupOpen] = useState(false)

    const handleOnChange = (
        id: string,
        data: File | string | number | null
    ) => {
        console.log(id);
        console.log(data);
    }


    const submitVideo = async () => {

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
                        id="videoFile"
                        accept=".webm, .mp4"
                        isVideo={true}
                        maxSize={1024}
                    />
                    

                    <NormalInput placeholder="Enter title" />

                    <TextareaInput
                        label="Video Description"
                        required={true}
                        id="videoDes"
                        placeholder="Provide a brief summary of your video"
                        onChange={handleOnChange}
                    />
                                        <FileInput
                                            label="Add Video Thumbnail"
                                            required={true}
                                            instructions="1920x1080 or 16:9 ratio. File types supported: JPG, PNG. Max size: 2 MB"
                                            onChange={handleOnChange}
                                            id="videoThumbnail"
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
