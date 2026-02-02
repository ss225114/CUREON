import React, { useEffect, useRef } from "react";
import { useChat } from "../context/chatContext";
import Message from "./chatMessage";
import ChatInput from "./chatInput";
import Lottie from "lottie-react";
import docbot from "@/assets/static/animabot.json";
import apiClient from "@/lib/apiClient";

const ChatArea = () => {
  const { messages, setMessages, activeChat, isSidebarOpen, chats } = useChat();
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!activeChat) return;

    let ignore = false;

    const fetchMessages = async () => {
      try {
        const response = await apiClient.get(
          `/message/get-messages/${activeChat}`
        );
        if (!ignore) {
          setMessages(response.data.conversations);
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    return () => {
      ignore = true;
    };
  }, [activeChat]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Determine if we should show chat input
  const shouldShowChatInput = activeChat !== null;

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Messages Container - Takes remaining space below navbar */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto"
        style={{ height: "calc(100vh - 64px)" }} // Full height minus navbar
      >
        <div className="min-h-full">
          {/* Full width when sidebar closed, centered with margin when open */}
          <div
            className={`mx-auto w-full px-4 py-6 transition-all duration-300 ${
              isSidebarOpen ? "max-w-4xl" : "max-w-6xl px-8"
            }`}
          >
            {activeChat ? (
              messages.length !== 0 ? (
                <div className="space-y-4 pb-24">
                  {/* Messages for active chat */}
                  {messages.map((message) => (
                    <Message key={message.id} message={message} />
                  ))}
                  {/* Invisible element for auto-scroll */}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                /* Empty chat state */
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <div className="max-w-xs mb-6">
                    <Lottie animationData={docbot} loop={true} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#293379] dark:text-white mb-3">
                    Start a conversation!
                  </h2>
                  <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                    This is the beginning of your chat
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                    Type your message below to start chatting with Curomate
                  </p>
                </div>
              )
            ) : (
              /* Welcome Animation when no chat is selected */
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="max-w-xs mb-6">
                  <Lottie animationData={docbot} loop={true} />
                </div>
                <h2 className="text-2xl font-bold text-[#293379] dark:text-white mb-3">
                  Welcome to Curomate!
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                  Your AI Health Companion
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                  {chats.length === 0
                    ? "Create your first chat or select an existing one from the sidebar to get started!"
                    : "Ask me anything about your health concerns, medications anytime!"}
                </p>
                {chats.length === 0 && (
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      💡 <strong>Tip:</strong> Click "New Chat" in the sidebar
                      to begin
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Chat Input - Only show when there's an active chat */}
      {shouldShowChatInput && (
        <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 via-white/90 to-transparent dark:from-gray-800/90 dark:via-gray-800/90 backdrop-blur-md z-10 pt-4 pb-4">
          {/* Adjust input width based on sidebar state */}
          <div
            className={`mx-auto w-full px-4 transition-all duration-300 ${
              isSidebarOpen ? "max-w-4xl" : "max-w-6xl px-8"
            }`}
          >
            <ChatInput />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
