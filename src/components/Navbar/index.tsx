"use client"
import React, { useState } from "react"

import { useSession, signIn, signOut } from "next-auth/react"
import Button from "@/components/Buttons/Button"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

function Navbar() {
    const { data: session } = useSession()
    const pathname = usePathname()
    const [showLogOut, setShowLogOut] = useState<boolean>(false)
    return (
        <nav className="flex justify-between items-center px-12 py-4 shadow-xl h-[8vh]">
            <Link href="/">
                <Image
                    src="/logo/dark.png"
                    width={180}
                    height={40}
                    alt="logo"
                />
            </Link>
            <div className="flex gap-4 items-center">
                {session ? (
                    <>
                        <Link href="/dashboard">
                            <Button
                                text="Dashboard"
                                className={`${
                                    pathname.startsWith("/dashboard")
                                        ? "btn_1"
                                        : "btn_1_2"
                                }`}
                            />
                        </Link>
                        {/* {session?.user?.name} */}
                        {/* <Button
                            text="Sign Out"
                            className="btn_1_2"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        /> */}
                        <Image
                            src={session?.user?.image || "/images/avatar.png"}
                            width={50}
                            height={50}
                            alt="logo"
                            onClick={() => setShowLogOut(!showLogOut)}
                            className="rounded-full cursor-pointer"
                        />
                        {showLogOut && (
                            <div className="absolute mt-28 right-4">
                                <div className="relative inline-block">
                                    <Button
                                        text="Sign Out"
                                        onClick={() =>
                                            signOut({ callbackUrl: "/" })
                                        }
                                        className="px-4 py-2 bg-b lue-500 text-white rounded-md focus:outline-none"
                                    ></Button>
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mt-2">
                                        <div className="w-3 h-3 bg-primary transform rotate-45"></div>
                                    </div>
                                </div>
                            </div>
                        )}
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
