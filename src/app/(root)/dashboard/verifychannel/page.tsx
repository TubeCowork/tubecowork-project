'use client'

import { setChannelAsVerified } from '@/backend/actions/youtube/youtubeChannel.actions';
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';


export default function page() {
    const searchParams = useSearchParams()

    const code = searchParams.get('code');


    useEffect(() => {

        if (code) {
            // const isVeried = await setChannelAsVerified(code);
        }

    }, [code])


    return (
        <div>
            <h1>Verfiy Yt channel</h1>
            {code}
        </div>
    )
}
