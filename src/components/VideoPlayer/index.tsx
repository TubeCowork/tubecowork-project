// components/VideoPlayer.tsx
import React, { useRef, useState, useEffect, useCallback } from "react"

interface VideoPlayerProps {
    src: string
    autoplay?: boolean
    controls?: boolean
    width?: string
    height?: string
    className?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    src,
    autoplay = false,
    controls = true,
    width = "100%",
    height = "auto",
    className,
}) => {
    return (
        <div className={className} style={{ width, height }}>
            <video src={src} autoPlay={autoplay} controls={controls}></video>
        </div>
    )
}

export default VideoPlayer
