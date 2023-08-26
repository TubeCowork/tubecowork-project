import { connectToDB } from "@/backend/db"
import UserModel from "@/backend/models/User.model"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authProviders: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account?.provider === "google") {
                    await connectToDB()
                    const _existingUser = await UserModel.findOne({
                        email: user.email,
                    })
                    if (!_existingUser) {
                        await UserModel.create({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                        })
                    }
                    return true
                }
            } catch (error) {
                console.log("signIn", error)
            }
            return false
        },
        async session({ session }) {
            //     const sessionUser = await User.findOne({ email: session.user.email });
            //     session.user.id = sessionUser._id.toString();
            //     session.user.username = sessionUser?.username?.toString();
            return session
        },
    },
}
const handler = NextAuth(authProviders)

export { handler as GET, handler as POST }
