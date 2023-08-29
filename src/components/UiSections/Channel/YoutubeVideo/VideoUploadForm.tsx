import FileInput from "@/components/Inputs/FileInput"
import Input from "@/components/Inputs/Input"
import TextareaInput from "@/components/Inputs/TextareaInput"
import React from "react"

type VideoUploadFormType = {
    handleOnChange: (id: string, data: File | string | number | null) => void
}

function VideoUploadForm({ handleOnChange }: VideoUploadFormType) {
    return (
        <div className="flex flex-col w-full gap-6">
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
                id="thumbnailFile"
                accept=".png, .jpg"
                isImage={true}
                maxSize={2}
            />
        </div>
    )
}

export default VideoUploadForm
