import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useChat } from "../context/chatContext";
import {
  FaPlus,
  FaTrash,
  FaMoon,
  FaSun,
  FaCog,
  FaQuestionCircle,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const {
    chats,
    activeChat,
    setActiveChat,
    createNewChat,
    deleteChat,
    isDarkMode,
    toggleDarkMode,
    isSidebarOpen,
    toggleSidebar,
    setIsSidebarOpen,
  } = useChat();
  const [hoveredChat, setHoveredChat] = useState(null);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/");
  };

  // Function to get chat display title
  const getChatTitle = (chat) => {
    // If chat has a custom title, use it
    if (chat.title && chat.title !== "New Chat") {
      return chat.title;
    }

    // If chat has lastMessage, show it as title (means chat has been used)
    if (chat.lastMessage && chat.lastMessage.trim() !== "") {
      // Show the last message content as title
      if (chat.lastMessage.length > 35) {
        return chat.lastMessage.substring(0, 35) + "...";
      }
      return chat.lastMessage;
    }

    // Default: Show "New Chat" for unused chats
    return "New Chat";
  };

  // Function to get chat preview (only show if there's a second message or AI response)
  const getChatPreview = (chat) => {
    // Only show preview if chat has been used (has lastMessage)
    // AND if we want to show something different than the title
    // For example, we could show timestamp or status here
    if (chat.lastMessage && chat.lastMessage.trim() !== "") {
      // If you have a createdAt timestamp, you could show it here
      if (chat.createdAt) {
        const date = new Date(chat.createdAt);
        return date.toLocaleDateString([], { month: "short", day: "numeric" });
      }
      // Or show a simple indicator that it's been used
      return "Chat started";
    }

    // Return null or empty string to hide preview for new/unused chats
    return null;
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen w-64 flex flex-col backdrop-blur-md border-r border-gray-200 dark:border-gray-700 shadow-lg z-40 transform transition-all duration-300 ${
        isSidebarOpen
          ? "translate-x-0 bg-white/95 dark:bg-gray-800/95"
          : "-translate-x-full bg-transparent border-transparent"
      }`}
    >
      {/* Header Section */}
      <div className="flex-shrink-0">
        {/* Top Bar with Dashboard Icon and Close Button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <button
            onClick={handleDashboardClick}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-all duration-300 border border-gray-300 dark:border-gray-600 shadow-sm"
            aria-label="Go to Dashboard"
            title="Go to Dashboard"
          >
            <FaHome className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </button>

          <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close sidebar"
          >
            <FaTimes className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Button
            onClick={createNewChat}
            className="w-full bg-[#293379] dark:bg-blue-700 hover:bg-[#3a4a9c] dark:hover:bg-blue-600 text-white transition-all duration-300 shadow-md"
          >
            <FaPlus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Chat History - Scrollable Area with Hidden Scrollbar */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Custom scrollbar container */}
        <div className="h-full overflow-y-auto scrollbar-hide">
          <div className="p-3">
            {chats.length === 0 ? (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                <FaPlus className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium mb-1">No conversations yet</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Start your first conversation!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {chats.map((chat) => {
                  const title = getChatTitle(chat);
                  const preview = getChatPreview(chat);

                  return (
                    <div
                      key={chat.conversationId || chat.id}
                      className={`relative p-3 rounded-xl cursor-pointer transition-all duration-200 group border ${
                        activeChat === (chat.conversationId || chat.id)
                          ? "bg-[#293379] border-[#293379] text-white shadow-md"
                          : "bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                      }`}
                      onMouseEnter={() =>
                        setHoveredChat(chat.conversationId || chat.id)
                      }
                      onMouseLeave={() => setHoveredChat(null)}
                      onClick={() => {
                        setActiveChat(chat.conversationId || chat.id);
                        // Auto-close sidebar on mobile if needed
                        if (window.innerWidth < 768) {
                          setIsSidebarOpen(false);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          {/* Chat Title */}
                          <span className="truncate text-sm font-medium block">
                            {title}
                          </span>

                          {/* Chat Preview - Only show if there's preview content */}
                          {preview && (
                            <p className="truncate text-xs mt-1 opacity-70">
                              {preview}
                            </p>
                          )}
                        </div>

                        {hoveredChat === (chat.conversationId || chat.id) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteChat(chat.conversationId || chat.id);
                            }}
                            className={`ml-2 p-1.5 rounded-full transition-colors flex-shrink-0 ${
                              activeChat === (chat.conversationId || chat.id)
                                ? "hover:bg-[#3a4a9c] text-white"
                                : "hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 dark:text-red-400"
                            }`}
                          >
                            <FaTrash className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section - Circular Icons */}
      <div className="flex-shrink-0 p-5 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          {/* Left side - Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-all duration-300 border border-gray-300 dark:border-gray-600 shadow-sm"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <FaSun className="h-4 w-4 text-yellow-500" />
            ) : (
              <FaMoon className="h-4 w-4 text-[#293379]" />
            )}
          </button>

          {/* Right side - Settings and Help */}
          <div className="flex gap-3">
            <button
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-all duration-300 border border-gray-300 dark:border-gray-600 shadow-sm"
              aria-label="Settings"
              title="Settings"
            >
              <FaCog className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>

            <button
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-all duration-300 border border-gray-300 dark:border-gray-600 shadow-sm"
              aria-label="Help"
              title="Help"
            >
              <FaQuestionCircle className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
