import apiClient from "@/lib/apiClient";
import React, { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    getChats();
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Chat management
  const createNewChat = async () => {
    const newChat = await apiClient.post("/chat/create-chat");
    console.log(newChat.data.chat);
    setChats((prev) => [newChat.data.chat, ...prev]);
    setActiveChat(newChat.data.chat.conversationId);
    return newChat.data.chat.id;
  };

  const getChats = async () => {
    try {
      const { data } = await apiClient.get("/chat/get-chats");
      console.log(data);
      if (data.success) {
        setChats(data.chats);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteChat = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.conversationId !== chatId));
    if (activeChat === chatId) {
      setActiveChat(chats.length > 1 ? chats[1]?.conversationId : null);
    }
  };

  const sendMessage = async (message) => {
    if (!activeChat) return;

    const id = activeChat;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        isUser: true,
        message: message,
        createdAt: new Date(),
      },
    ]);

    const data = await apiClient.post(`/message/communicate/${id}`, {
      query: message,
    });

    console.log(data);

    setMessages((prev) => [...prev, data.data.newMessage2]);
  };

  const value = {
    chats,
    getChats,
    activeChat,
    setActiveChat,
    createNewChat,
    deleteChat,
    sendMessage,
    isDarkMode,
    toggleDarkMode,
    messages,
    setMessages,
    isSidebarOpen,
    toggleSidebar,
    setIsSidebarOpen,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
