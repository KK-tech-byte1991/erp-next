const fetcher = async (url: string) => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url)

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        // Attach extra info to the error object.
        //@ts-ignore
        error.info = await res.json()
        //@ts-ignore
        error.status = res.status
        throw error
    }

    return res.json()
}

export default fetcher