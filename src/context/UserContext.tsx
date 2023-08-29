"use client"

import { fetchUserDetails } from "@/backend/actions/user.actions"
import PageLoader from "@/components/Loader/PageLoader"
import { UserDetailsType } from "@/utils/types/user"
import { YoutubeChannelBasicType } from "@/utils/types/youtube/channel"
import { useSession } from "next-auth/react"
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react"

type UserDataContextType = {
    user: UserDetailsType | undefined
    updateUser: () => Promise<void>
    loading: boolean
}

const UserDataContext = createContext<UserDataContextType>({
    user: undefined,
    updateUser: async () => {},
    loading: false,
})

export const useUserData = () => {
    const context = useContext(UserDataContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDetailsType>()
    const [ownedChannels, setOwnedChannels] =
        useState<YoutubeChannelBasicType[]>()
    const [loading, setLoading] = useState(true)
    const { data: session } = useSession()

    const updateUser = async () => {
        const user = await fetchUserDetails(session?.user?.email as string)
        setUser(user)
        setLoading(false)
    }

    useEffect(() => {
        if (session?.user?.email) {
            updateUser()
        }
    }, [session])

    return (
        session && (
            <UserDataContext.Provider value={{ user, loading, updateUser }}>
                {loading ? <PageLoader text="Loading User..." /> : children}
            </UserDataContext.Provider>
        )
    )
}
