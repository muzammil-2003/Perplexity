import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
import { setChats, setCurrentChatId, setLoading, setError, createNewChat, addNewMessage, addMessages, setMessages, removeChat } from '../chat.slice'
import { useDispatch, useSelector } from "react-redux";

export const useChat = () => {

    const dispatch = useDispatch()
    const { chats, currentChatId } = useSelector((state) => state.chat);

    const handleSendMessage = async ({ message, chatId }) => {
        dispatch(setLoading(true))
        const isExistingChat = Boolean(chatId)
        if (isExistingChat) {
            dispatch(addNewMessage({ chatId, content: message, role: 'user' }))
        }

        try {
            const data = await sendMessage({ message, chatId })
            const { chat, aiMessage } = data
            const targetChatId = chat ? chat._id : chatId
            if (chat) {
                dispatch(createNewChat({ chatId: chat._id, title: chat.title }))
                dispatch(addNewMessage({ chatId: targetChatId, content: message, role: 'user' }))
            }

            dispatch(addNewMessage({ chatId: targetChatId, content: aiMessage.content, role: aiMessage.role }))
            dispatch(setCurrentChatId(targetChatId))
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleDeleteChat = async (chatId) => {
        await deleteChat(chatId)
        dispatch(removeChat(chatId))
        if (currentChatId === chatId) {
            dispatch(setCurrentChatId(null))
        }
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
        // replace messages for opened chat to avoid duplicates
        dispatch(setMessages({ chatId, messages: formattedMessages }))
        dispatch(setCurrentChatId(chatId))
    }

    const handleNewChat = () => {
        // clear selection so next send will create a new chat on backend
        dispatch(setCurrentChatId(null))
    }

    return { initializeSocketConnection, handleSendMessage, handleGetChats, handleOpenChat, handleNewChat, handleDeleteChat }
}