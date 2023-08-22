"use client"
import React from 'react';

import { useSession, signIn, signOut } from "next-auth/react"
import Button from '@/components/Buttons/Button';


function Navbar() {
    const { data: session } = useSession()

    return (
        <nav>
            {session ?
                <>
                    {session?.user?.email}
                    <Button text='Sign Out'
                        onClick={() => signOut()}
                    />
                </>
                :
                <Button text='Sign In'
                    onClick={() => signIn("google")}
                />
            }
        </nav>
    )
}

export default Navbar