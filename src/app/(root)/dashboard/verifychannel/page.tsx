"use client"

import { setChannelAsVerified } from "@/backend/actions/youtube/youtubeChannel.actions"
import PageLoader from "@/components/Loader/PageLoader"
import { useUserData } from "@/context/UserContext"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const code = searchParams.get("code")
    const { updateUser, user } = useUserData()

    if (!code) {
        return (
            <div>
                <h1>Not verifyed. Try Again.</h1>
            </div>
        )
    }

    useEffect(() => {
        if (user?.id) {
            const verifyCode = async () => {
                try {
                    await setChannelAsVerified(user.id, code)
                    router.push("/dashboard")
                    updateUser()
                } catch (error) {
                    console.log("verifyError: ", error)
                }
            }
            verifyCode()
        }
    }, [user])

    return <PageLoader text="Verifying Your channel" />
}
