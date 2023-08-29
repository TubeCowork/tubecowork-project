import React from "react"
import SimpleLoader from "./loader"

function PageLoader({ text }: { text: string }) {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full min-h-[40vh]">
            <SimpleLoader className="w-16 mb-4" />
            <h1>{text}</h1>
        </div>
    )
}

export default PageLoader
