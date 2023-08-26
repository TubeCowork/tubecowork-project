import Button from "@/components/Buttons/Button"
import { YoutubeVideoBasicType } from "@/utils/types/youtube/video"
import React from "react"

function VideoCard({
    videoDetails,
    isOwner,
}: {
    videoDetails: YoutubeVideoBasicType
    isOwner: boolean
}) {
    const approveVideo = async () => {}
    return (
        <div className="border border-blue-400">
            <p>Title: {videoDetails.title}</p>

            {videoDetails.isApproved ? (
                isOwner ? (
                    <Button text="Approve" onClick={approveVideo} />
                ) : (
                    <p>Owner has not approved yet</p>
                )
            ) : (
                <p>Video uploaded publically</p>
            )}
            <Button
                text="Watch Video"
                onClick={() => {
                    window.open(
                        `https://www.youtube.com/watch?v=${videoDetails.videoYoutubeId}`,
                        "_blank"
                    )
                }}
            />
        </div>
    )
}

export default VideoCard
