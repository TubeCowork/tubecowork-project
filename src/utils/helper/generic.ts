import { AnyObjectType } from "../types/generic"

export function mbToBytes(mb: number): number {
    const bytesInMB = 1024 * 1024
    return mb * bytesInMB
}

export function getFileExtension(fullFileName: string): string {
    const lastIndex = fullFileName.lastIndexOf(".")

    if (lastIndex === -1) {
        return ""
    }

    return fullFileName.substring(lastIndex + 1)
}

export const getYoutubeUrlFromId = (id: string) => {
    return `https://www.youtube.com/watch?v=${id}`
}

export function getChangedValuesInOjects(
    obj1: AnyObjectType,
    obj2: AnyObjectType
) {
    const changedValues: AnyObjectType = {}

    for (const key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            if (obj1[key] !== obj2[key]) {
                changedValues[key] = obj2[key]
            }
        }
    }

    return changedValues
}
