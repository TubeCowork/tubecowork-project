'use client'

import { setChannelAsVerified } from '@/backend/actions/youtube/youtubeChannel.actions';
import { channelIdForVerify } from '@/utils/constants/storage';
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';


export default function page() {
    const searchParams = useSearchParams()

    const code = searchParams.get('code');

    if (!code) {
        return <div>
            <h1>Not verifyed. Try Again.</h1>
        </div>
    }


    const verifyCode = async () => {
        try {
            console.log(code);

            console.log(localStorage.getItem(channelIdForVerify));


            // const isVeried = await setChannelAsVerified("", code);
        } catch (error) {
        }

    }

    verifyCode();


    return (
        <div>
            <h1>Verifying yourCode</h1>
            {code}
        </div>
    )
}
