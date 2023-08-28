"use client"

import { setChannelAsVerified } from "@/backend/actions/youtube/youtubeChannel.actions"
import { useUserData } from "@/context/UserContext"
import { channelIdForVerify } from "@/utils/constants/storage"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const code = searchParams.get("code")
    const { updateUser } = useUserData()
    const channelid = localStorage.getItem(channelIdForVerify)

    if (code && channelid) {
        const verifyCode = async () => {
            try {
                const verifiedChannel = await setChannelAsVerified(
                    channelid,
                    code
                )
                console.log(verifiedChannel)

                router.push("/dashboard")
                updateUser()
            } catch (error) {
                console.log("verifyError: ", error)
            }
        }
        verifyCode()
    } else {
        return (
            <div>
                <h1>Not verifyed. Try Again.</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Verifying yourCode</h1>
        </div>
    )
}
