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
