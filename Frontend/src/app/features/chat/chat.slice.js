import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: {},
        currentChatId: null,
        isLoading: false,
        error: null
    },
    reducers: {
        createNewChat: (state, action) => {
            const { chatId, title } = action.payload
            if (!state.chats[chatId]) {
                state.chats[chatId] = {
                    id: chatId,
                    title,
                    messages: [],
                    lastUpdated: new Date().toISOString()
                }
            }
        },
        addNewMessage: (state, action) => {
            const { chatId, content, role } = action.payload
            if (!state.chats[chatId]) {
                state.chats[chatId] = { id: chatId, title: 'New Chat', messages: [], lastUpdated: new Date().toISOString() }
            }
            if (!state.chats[chatId].messages) state.chats[chatId].messages = []
            state.chats[chatId].messages.push({ content, role })
        },
        addMessages: (state, action) => {
            const {chatId, messages} = action.payload
            if (!state.chats[chatId]) {
                state.chats[chatId] = { id: chatId, title: 'Chat', messages: [] }
            }
            if (!state.chats[chatId].messages) state.chats[chatId].messages = []
            // append only if there are no messages yet to avoid duplicates
            if (state.chats[chatId].messages.length === 0) {
                state.chats[chatId].messages.push(...messages)
            }
        },
        setMessages: (state, action) => {
            const { chatId, messages } = action.payload
            if (!state.chats[chatId]) {
                state.chats[chatId] = { id: chatId, title: 'Chat', messages: [] }
            }
            state.chats[chatId].messages = messages
        },
        removeChat: (state, action) => {
            const chatId = action.payload
            delete state.chats[chatId]
        },
        setChats: (state, action) => {
            state.chats = action.payload
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setChats, setCurrentChatId, setLoading, setError, createNewChat, addNewMessage, addMessages, setMessages, removeChat } = chatSlice.actions

export default chatSlice.reducer