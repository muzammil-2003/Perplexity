import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, SystemMessage, AIMessage, tool, createAgent } from 'langchain'
import { searchInternet } from './internet.service.js'
import * as zod from 'zod'

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
  model: 'mistral-small',
  apiKey: process.env.MISTRAL_API_KEY
})

const searchInternetTool = tool(
  searchInternet,
  {
    name: "search_internet",
    description: "Use this tool to get the latest information from the internet.",
    schema: zod.object({
      query: zod.string().describe("The search query to find information on the internet.")
    })
  }
)

const agent = createAgent({
  model: geminiModel,
  tools: [searchInternetTool],
  llm: geminiModel
})

export const generateResponse = async (messages) => {

  const response = await agent.invoke({
    messages: messages.map(msg => {
      if (msg.role === 'user') {
        return new HumanMessage(msg.content)
      } else if (msg.role === 'ai') {
        return new AIMessage(msg.content)
      } else {
        throw new Error(`Unknown message role: ${msg.role}`)
      }
    })
  })
  return response.messages[response.messages.length - 1].content
}

export const generateChatTitle = async (message) => {
  const response = await mistralModel.invoke([
    new SystemMessage(`You are a helpful assistant that generates concise and descriptive titles for chat conversations.
        User will provide you with the first message of the conversation, and you will generate a title that captures the essence of the discussion in a few words. The title should be clear, informative, and engaging, giving users a quick understanding of the chat's topic.`),
    new HumanMessage(`Generate a title for a chat conversation based on the following first message:
      ${message}`)
  ])
  return response.content
}