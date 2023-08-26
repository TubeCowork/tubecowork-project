import Navbar from "@/components/Navbar"
import { UserDataProvider } from "@/context/UserContext"
import "@/styles/globals.css"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <UserDataProvider>{children}</UserDataProvider>
}
