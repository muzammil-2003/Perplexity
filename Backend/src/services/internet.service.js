import { tavily } from '@tavily/core'


const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY
})

export const searchInternet = async ({query}) => {
    try {
        return await tvly.search(query, {
            maxResults: 5,
            searchDepth: "advanced"
        })
    } catch (error) {
        console.error('Error searching the internet:', error)
        throw error
    }
}