"use client"

import { fetchUserDetails } from "@/backend/actions/user.actions"
import { UserDetailsType } from "@/utils/types/user"
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
    loading: boolean
}

const UserDataContext = createContext<UserDataContextType>({
    user: undefined,
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
    const [loading, setLoading] = useState(true)
    const { data: session } = useSession()

    useEffect(() => {
        const loadUser = async () => {
            const user: UserDetailsType = await fetchUserDetails(
                session?.user?.email as string
            )
            setUser(user)
            setLoading(false)
        }
        if (session?.user?.email) {
            loadUser()
        }
    }, [session])

    return (
        session && (
            <UserDataContext.Provider value={{ user, loading }}>
                {children}
            </UserDataContext.Provider>
        )
    )
}