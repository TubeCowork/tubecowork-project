import mongoose from "mongoose"

let isConnected = false

export const connectToDB = async () => {
    mongoose.set("strictQuery", true)

    if (isConnected) {
        return
    }
    try {
        const dbURL = process.env.DB_URL
        if (!dbURL) throw Error("Missing MongoDB URL")
        await mongoose.connect(dbURL)
        isConnected = true
        return
    } catch (error) {
        throw error
    }
}
