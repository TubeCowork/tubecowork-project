"use client"
import React from "react"

import { useSession, signIn, signOut } from "next-auth/react"
import Button from "@/components/Buttons/Button"
import { useRouter } from "next/navigation"

function Navbar() {
    const { data: session } = useSession()

    const router = useRouter()

    return (
        <nav>
            {session ? (
                <>
                    <Button
                        text="Dashboard"
                        onClick={() => {
                            router.push("/dashboard")
                        }}
                    />
                    {session?.user?.email}
                    <Button
                        text="Sign Out"
                        onClick={() => signOut({ callbackUrl: "/" })}
                    />
                </>
            ) : (
                <Button text="Sign In" onClick={() => signIn("google")} />
            )}
        </nav>
    )
}

export default Navbar
