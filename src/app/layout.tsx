import Navbar from "@/components/Navbar"
import NextAuthProvider from "@/components/providers/NextAuthProvider"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { Session } from "next-auth"

export const metadata: Metadata = {
    title: "TubeCowork",
    description: "",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <NextAuthProvider>
                <body>
                    <Navbar />
                    {children}
                </body>
            </NextAuthProvider>
        </html>
    )
}
