"use client"
import React from "react"

import { useSession, signIn, signOut } from "next-auth/react"
import Button from "@/components/Buttons/Button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

function Navbar() {
    const { data: session } = useSession()

    const router = useRouter()

    return (
        <nav className="flex justify-between items-center px-12 py-4 shadow-xl">
            <Link href="/">
                <Image
                    src="/logo/dark.png"
                    width={180}
                    height={40}
                    alt="logo"
                />
            </Link>
            <div className="flex gap-4">
                {session ? (
                    <>
                        <Link href="/dashboard">
                            <Button text="Dashboard" />
                        </Link>
                        {/* {session?.user?.name} */}
                        <Button
                            text="Sign Out"
                            className="btn_1_2"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        />
                        {/* <Image src={session?.user?.image || "/images/avatar.png"} width={40} height={40} alt="logo" /> */}
                        {/* <Image src={"/images/avatar.png"} width={40} height={40} alt="logo" /> */}
                    </>
                ) : (
                    <Button text="Sign In" onClick={() => signIn("google")} />
                )}
            </div>
        </nav>
    )
}

export default Navbar
