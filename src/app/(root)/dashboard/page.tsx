"use client"
import { createYoutubeChannel } from "@/backend/actions/youtube/youtubeChannel.actions"
import Button from "@/components/Buttons/Button"
import ChannelCard, {
    ChannelCardData,
} from "@/components/UiSections/Channel/ChannelCard"
import { useUserData } from "@/context/UserContext"
import React, { useState } from "react"

function dashboard() {
    const { loading, user, updateUser } = useUserData()

    const [creatingUser, setCreatingUser] = useState(false)

    if (loading) {
        return <h1>Loading</h1>
    }

    const createChannel = async () => {
        const channelName = prompt("channel Name")
        if (channelName && user?.email) {
            try {
                setCreatingUser(true)
                await createYoutubeChannel(user?.id, channelName)
                await updateUser()
                setCreatingUser(false)
            } catch (error) {
                console.log("createChannel", error)
            }
            setCreatingUser(false)
        }
    }

    return (
        <section className="">
            <div className="border border-primary p-10 my-10 mx-4">
                <h3 className="text_sub_heading_size">You Own</h3>
                <Button
                    loading={creatingUser}
                    text="Link Channel"
                    onClick={createChannel}
                />

                {user?.ownedChannels?.length ? (
                    <div className="flex gap-4 flex-wrap mt-4">
                        {user?.ownedChannels?.map((channel, key) => {
                            return (
                                <ChannelCard key={key} channelData={channel} />
                            )
                        })}
                    </div>
                ) : (
                    <p>No owned youtube channels</p>
                )}
            </div>

            <div className="border border-primary p-10 my-10 mx-4">
                <h3 className="text_sub_heading_size">You Manage</h3>
                {user?.managedChannels?.length ? (
                    <div className="flex gap-4 flex-wrap mt-4">
                        {user?.managedChannels?.map((channel, key) => (
                            <ChannelCard key={key} channelData={channel} />
                        ))}
                    </div>
                ) : (
                    <p>No managedChannels youtube channels</p>
                )}
            </div>
        </section>
    )
}

export default dashboard
