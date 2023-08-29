import Button from "@/components/Buttons/Button"
import { YoutubeChannelBasicType } from "@/utils/types/youtube/channel"
import React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export type ChannelCardData = {
    name: string
}
function ChannelCard({
    channelData,
}: {
    channelData: YoutubeChannelBasicType
}) {
    const router = useRouter()

    return (
        <span className="cursor-pointer rounded-2xl flex flex-col justify-center items-center gap-2">
            <Image
                src={channelData.image || "/images/channelavatar.png"}
                width={100}
                height={100}
                alt="channelLogo"
                className="rounded-full"
            />

            <p className="text-xl">{channelData?.name}</p>
            {channelData.isVerified ? (
                <Button
                    text="Check details"
                    className="btn_1_2 px-4 py-2 text-sm bg-secondary hover:bg-secondary-hover border-0"
                    onClick={() => {
                        router.push(`/dashboard/channel/${channelData.id}`)
                    }}
                />
            ) : (
                <>
                    <p>Not linked with youtube channel</p>
                    <Button text="Link Now" />
                </>
            )}
        </span>
    )
}

export default ChannelCard
