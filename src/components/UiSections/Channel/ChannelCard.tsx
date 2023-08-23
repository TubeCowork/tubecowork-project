import React from "react"

export type ChannelCardData = {
    name: string
}
function ChannelCard({ channelData }: { channelData: ChannelCardData }) {
    return (
        <div>
            <p>{channelData?.name}</p>
        </div>
    )
}

export default ChannelCard
