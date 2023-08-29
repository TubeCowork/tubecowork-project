"use client"
import {
    createYoutubeChannel,
    getAuthUrl,
} from "@/backend/actions/youtube/youtubeChannel.actions"
import Button from "@/components/Buttons/Button"
import ChannelCard, {
    ChannelCardData,
} from "@/components/UiSections/Channel/ChannelCard"
import { useUserData } from "@/context/UserContext"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

function dashboard() {
    const router = useRouter()
    const { loading, user, updateUser } = useUserData()

    const [creatingUser, setCreatingUser] = useState(false)

    if (loading) {
        return <h1>Loading</h1>
    }

    const createChannel = async () => {
        if (user?.email) {
            try {
                setCreatingUser(true)
                const url = await getAuthUrl()
                router.push(url)
                setCreatingUser(false)
            } catch (error) {
                console.log("createChannel", error)
            }
            setCreatingUser(false)
        }
    }

    return (
        <section className="">
            <div className=" p-10 my-10 mx-4">
                <div className="flex mb-4">
                    <h3 className="text_sub_heading_size flex-1 ">You Own</h3>
                    <Button
                        className="btn_1_2"
                        loading={creatingUser}
                        text="Add Youtube Channel"
                        onClick={createChannel}
                    />
                </div>

                {user?.ownedChannels?.length ? (
                    <div className="flex gap-10 flex-wrap mt-4">
                        {user?.ownedChannels?.map((channel, key) => {
                            return (
                                <ChannelCard key={key} channelData={channel} />
                            )
                        })}
                    </div>
                ) : (
                    <p>No Channel, Please create a channel</p>
                )}
            </div>

            <div className="p-10 my-10 mx-4">
                <h3 className="text_sub_heading_size mb-4">You Manage</h3>
                {user?.managedChannels?.length ? (
                    <div className="flex gap-4 flex-wrap mt-4">
                        {user?.managedChannels?.map((channel, key) => (
                            <ChannelCard key={key} channelData={channel} />
                        ))}
                    </div>
                ) : (
                    <p>No Channels</p>
                )}
            </div>
        </section>
    )
}

export default dashboard
