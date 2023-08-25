"use client"
import React from "react"
import { useSearchParams } from "next/navigation"

function page() {
    const searchParams = useSearchParams()
    const channelid = searchParams.get("id")

    if (!channelid) return

    const getChannelDetails = () => {}

    return <div>Owned channel</div>
}

export default page
