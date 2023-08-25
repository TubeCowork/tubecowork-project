import Button from "@/components/Buttons/Button"
import { YoutubeChannelBasicType } from "@/utils/types/youtube/channel"
import React from "react"
import { useRouter } from "next/navigation"
import { getAuthUrl } from "@/backend/actions/youtube/youtubeChannel.actions"
import { channelIdForVerify } from "@/utils/constants/storage"

export type ChannelCardData = {
    name: string
}
function ChannelCard({
    channelData,
}: {
    channelData: YoutubeChannelBasicType
}) {
    const router = useRouter()

    const authUser = async () => {
        localStorage.setItem(channelIdForVerify, channelData.id)
        const url = await getAuthUrl()
        router.push(url)
    }
    return (
        <span className="border border-blue-500 px-2 py-4 cursor-pointer rounded-2xl bg-blue-200">
            <p className="text-xl">{channelData?.name}</p>

            {channelData.isVerified ? (
                <Button
                    text="Check details"
                    onClick={() => {
                        router.push(`/dashboard/channel/${channelData.id}`)
                    }}
                />
            ) : (
                <>
                    <p>Not linked with youtube channel</p>
                    <Button text="Link Now" onClick={authUser} />
                </>
            )}
        </span>
    )
}

export default ChannelCard
