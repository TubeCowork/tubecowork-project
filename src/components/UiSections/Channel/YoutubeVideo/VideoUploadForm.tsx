import {
    maxVideoDescriptionCharacters,
    maxVideoTagsCharacters,
    maxVideoTitleCharacters,
} from "@/backend/models/YoutubeVideo.model"
import Image from "@/components/Image/Image"
import FileInput from "@/components/Inputs/FileInput"
import Input from "@/components/Inputs/Input"
import TextareaInput from "@/components/Inputs/TextareaInput"
import VideoPlayer from "@/components/VideoPlayer"
import YoutubeVideoPlayer from "@/components/VideoPlayer/YoutubeVideoPlayer"
import { getYoutubeUrlFromId } from "@/utils/helper/generic"
import { YoutubeVideoUploadFormPartial } from "@/utils/types/youtube/video"
import React from "react"

// import YouTube, { YouTubeProps } from 'react-youtube';

type VideoUploadFormType = {
    handleOnChange: (id: string, data: File | string | number | null) => void
    type: "upload" | "update"
    formValues: YoutubeVideoUploadFormPartial
}

function VideoUploadForm({
    handleOnChange,
    type,
    formValues,
}: VideoUploadFormType) {
    // const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    // }

    // const opts: YouTubeProps['opts'] = {
    //     height: '300px',
    //     width: '600px',
    //     playerVars: {
    //         // https://developers.google.com/youtube/player_parameters
    //         autoplay: 1,
    //     },
    // };

    return (
        <div className="flex flex-col w-full gap-6">
            {type === "upload" ? (
                <>
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

                    <FileInput
                        label="Add Video Thumbnail"
                        required={true}
                        instructions="1920x1080 or 16:9 ratio. File types supported: JPG, PNG. Max size: 2 MB"
                        onChange={handleOnChange}
                        id="thumbnailFile"
                        accept=".png, .jpg"
                        isImage={true}
                        maxSize={4}
                    />
                </>
            ) : (
                <div className="gap-4 items-center justify-center flex">
                    <div className="">
                        <label htmlFor="">Video</label>
                        <YoutubeVideoPlayer
                            height="250"
                            width="360"
                            src={formValues.videoURL || ""}
                        />
                    </div>
                    {/* <VideoPlayer src={getYoutubeUrlFromId(formValues.videoURL || "")} /> */}

                    <div className="">
                        <label htmlFor="">Thumbnail</label>
                        <Image
                            src={formValues.thumbnailURL || ""}
                            alt=""
                            className=" w-[360px] h-[250px]"
                        />
                    </div>
                </div>
            )}

            {type === "update" &&
                <p>Currently you can't change details. Coming Soon....</p>
            }

            <Input
                label="Video Title"
                required={true}
                id="title"
                placeholder="Provide a brief Title of video"
                onChange={handleOnChange}
                maxlength={maxVideoTitleCharacters}
                value={formValues.title || ""}
            />

            <TextareaInput
                label="Video Description"
                required={true}
                id="description"
                placeholder="Provide a brief summary of your video"
                onChange={handleOnChange}
                value={formValues.description || ""}
                maxlength={maxVideoDescriptionCharacters}
            />

            <Input
                label="Video Tags"
                required={true}
                id="tags"
                placeholder="Write all tags sparated by ,"
                onChange={handleOnChange}
                value={formValues.tags || ""}
                maxlength={maxVideoTagsCharacters}
            />
        </div>
    )
}

export default VideoUploadForm
