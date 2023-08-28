export const withTryCatch = <T>(fn: (...args: any[]) => Promise<T>) => {
    return async (...args: any[]): Promise<T> => {
        try {
            return await fn(...args)
        } catch (error) {
            throw error
        }
    }
}
