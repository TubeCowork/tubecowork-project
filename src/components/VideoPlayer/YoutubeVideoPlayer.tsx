import React from "react"

interface VideoPlayerProps {
    src: string
    autoplay?: boolean
    controls?: boolean
    width?: string
    height?: string
    className?: string
}

const YoutubeVideoPlayer: React.FC<VideoPlayerProps> = ({
    src,
    autoplay = false,
    controls = true,
    width = "560",
    height = "auto", // 315
    className,
}) => {
    return (
        <div>
            <iframe
                width={width}
                height={height}
                src={`https://www.youtube.com/embed/${src}?rel=0`}
                title="YouTube video player"
                allow=" autoplay; gyroscope; picture-in-picture"
            ></iframe>
        </div>
    )
}

export default YoutubeVideoPlayer
