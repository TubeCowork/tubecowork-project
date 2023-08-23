"use client"
import { createYoutubeChannel } from "@/backend/actions/youtube/youtubeChannel.actions"
import Button from "@/components/Buttons/Button"
import ChannelCard, {
    ChannelCardData,
} from "@/components/UiSections/Channel/ChannelCard"
import { useUserData } from "@/context/UserContext"
import React from "react"

function dashboard() {
    const { loading, user } = useUserData()

    console.log(user)

    if (loading) {
        return <h1>Loading</h1>
    }

    const createChannel = async () => {
        const channelName = prompt("channel Name")
        if (channelName && user?.email) {
            try {
                const createdChannel = await createYoutubeChannel(user?.email, {
                    name: channelName,
                })
                console.log(createdChannel)
            } catch (error) {
                console.log("createChannel", error)
            }
        }
    }

    return (
        <section className="">
            <h1>Dashboard</h1>

            <div className="border border-primary p-10 my-10 mx-4">
                <h3 className="text_sub_heading_size">
                    Channels which user own
                </h3>
                <Button text="Link Channel" onClick={createChannel} />
                {user?.ownedChannels.length ? (
                    user?.ownedChannels?.map(
                        (channel: ChannelCardData, key) => (
                            <ChannelCard key={key} channelData={channel} />
                        )
                    )
                ) : (
                    <p>No owned youtube channels</p>
                )}
            </div>

            <div className="border border-primary p-10 my-10 mx-4">
                <h3 className="text_sub_heading_size">
                    Channels which user Manage
                </h3>
                {user?.managedChannels.length ? (
                    user?.managedChannels?.map(
                        (channel: ChannelCardData, key) => (
                            <ChannelCard key={key} channelData={channel} />
                        )
                    )
                ) : (
                    <p>No managedChannels youtube channels</p>
                )}
            </div>
        </section>
    )
}

export default dashboard
