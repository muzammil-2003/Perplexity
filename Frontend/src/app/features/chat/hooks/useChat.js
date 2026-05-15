import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
import { setChats, setCurrentChatId, setLoading, setError, createNewChat, addNewMessage, addMessages } from '../chat.slice'
import { useDispatch, useSelector } from "react-redux";

export const useChat = () => {

    const dispatch = useDispatch()
    const { chats } = useSelector((state) => state.chat);

    const handleSendMessage = async ({ message, chatId }) => {
        dispatch(setLoading(true))
        const data = await sendMessage({ message, chatId })
        const { chat, aiMessage } = data
        dispatch(createNewChat({
            chatId: chat._id,
            title: chat.title
        }))
        dispatch(addNewMessage({
            chatId: chat._id,
            content: message,
            role: 'user'
        }))
        dispatch(addNewMessage({
            chatId: chat._id,
            content: aiMessage.content,
            role: aiMessage.role
        }))
        dispatch(setCurrentChatId(chat._id))
    }

    const handleGetChats = async () => {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[chat._id] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt
            }
            return acc
        }, {})))
        dispatch(setLoading(false))
    }

    const handleOpenChat = async (chatId) => {
        const data = await getMessages(chatId)
        const { messages } = data
        const formattedMessages = messages.map((message) => ({
            content: message.content,
            role: message.role
        }))
        dispatch(addMessages({
            chatId,
            messages: formattedMessages
        }))
        dispatch(setCurrentChatId(chatId))
    }

    return { initializeSocketConnection, handleSendMessage, handleGetChats, handleOpenChat }
}