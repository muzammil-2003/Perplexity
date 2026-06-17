import React, { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown";
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import { MessageSquare, Plus, Send, Sparkles, Trash2 } from "lucide-react";

const Dashboard = () => {

  const { initializeSocketConnection, handleSendMessage, handleGetChats, handleOpenChat, handleNewChat, handleDeleteChat } = useChat()

  const [chatInput, setChatInput] = useState('')

  const { user } = useSelector((state) => state.auth)
  const { chats, currentChatId } = useSelector((state) => state.chat)

  const handleSubmitMesssage = async (event) => {
    event.preventDefault()
    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) {
      return
    }
    await handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  useEffect(() => {
    if (user) {
      initializeSocketConnection()
      handleGetChats()
    }
  }, [user])

  const openChat = (chatId) => {
    handleOpenChat(chatId)
  }

  return (
    <main className="h-screen bg-[#0f0f11] text-white flex flex-col md:flex-row overflow-hidden">

      {/* Sidebar */}
      <aside className="hidden md:flex w-75 bg-[#18181b] border-r border-zinc-800 flex-col">

        {/* Header */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
              <Sparkles size={20} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Perplexity
              </h1>

              <p className="text-sm text-zinc-400">
                AI Chat Assistant
              </p>
            </div>
          </div>

          {/* New Chat Button */}
          <button onClick={handleNewChat} className="mt-6 w-full bg-violet-600 hover:bg-violet-500 transition rounded-xl py-3 flex items-center justify-center gap-2 font-medium cursor-pointer">
            <Plus size={18} />
            New Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">

          {Object.values(chats).map((chat, index) => (
            <div
              onClick={() => {openChat(chat.id)}}
              key={index}
              className="w-full flex items-center justify-between gap-3 p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <MessageSquare size={18} className="text-zinc-300" />
                </div>

                <h2 className="font-medium">
                  <ReactMarkdown>
                    {chat.title}
                  </ReactMarkdown>
                </h2>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteChat(chat.id)
                }}
                // Don't let chat title overflow when long and push delete button out of view or cause layout issues like compressing width
                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition flex items-center justify-center cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

        </div>
      </aside>

      {/* Main Chat Section */}
      <section className="flex-1 flex flex-col bg-[#111113]">

        {/* Top Bar */}
        <header className="h-20 border-b border-zinc-800 px-8 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold">
              AI Conversation
            </h2>

            <p className="text-sm text-zinc-400">
              Ask anything you want
            </p>
          </div>

          {/* User */}
          <div className="flex items-center gap-3 bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800">

            <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-indigo-500 flex items-center justify-center font-bold">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>

            <div>
              <h3 className="font-medium">
                {user?.username || 'User'}
              </h3>

              <p className="text-xs text-zinc-400">
                {user?.email || 'user@example.com'}
              </p>
            </div>
            <button onClick={() => {
              document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
              window.location.reload()
              }}
              className="ml-4 px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 transition text-sm font-medium cursor-pointer"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8">
          {currentChatId ? (
            chats[currentChatId]?.messages?.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`flex items-start gap-4 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${message.role === "user" ? "bg-violet-600" : "bg-zinc-800"}`}
                  >
                    {message.role === "user" ? (
                      <Sparkles size={18} />
                    ) : (
                      <MessageSquare size={18} className="text-zinc-300" />
                    )}
                  </div>

                  {/* Message box */}
                  <div
                    className={`max-w-2xl ${message.role === "user" ? "bg-violet-600" : "bg-zinc-900 border border-zinc-800"} rounded-2xl px-6 py-5`}
                  >
                    <p className="leading-relaxed text-[17px]">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </p>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center text-zinc-400 py-20">
              Select a chat or create a new one to begin.
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 border-t border-zinc-800">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-end gap-4">

            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmitMesssage(e)
                }
              }}
              placeholder="Send a message..."
              className="flex-1 bg-transparent outline-none resize-none text-white placeholder:text-zinc-500 h-24"
            />

            <button
              onClick={handleSubmitMesssage}
              className="w-14 h-14 rounded-xl bg-violet-600 hover:bg-violet-500 transition flex items-center justify-center cursor-pointer"
            >

              <Send size={20} />

            </button>

          </div>
        </div>

      </section>
    </main>
  );
}

export default Dashboard