"use client"
import React from "react"

import { useSession, signIn, signOut } from "next-auth/react"
import Button from "@/components/Buttons/Button"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

function Navbar() {
    const { data: session } = useSession()
    const pathname = usePathname()
    return (
        <nav className="flex justify-between items-center px-12 py-4 shadow-2xl">
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
                            className="rounded-full cursor-pointer"
                        />
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
