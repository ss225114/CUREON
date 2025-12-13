import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useChat } from "../context/chatContext";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = () => {
  const [query, setQuery] = useState("");
  const { sendMessage } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      await sendMessage(query.trim());
      setQuery("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="px-4 pb-6 pt-2">
      <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
        <div className="relative flex items-center bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl focus-within:shadow-xl focus-within:border-[#293379]/30 dark:focus-within:border-blue-500/30">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Curomate..."
            className="flex-1 p-5 pl-6 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-base"
            autoComplete="off"
          />
          <div className="pr-3">
            <Button
              type="submit"
              className="h-12 w-12 rounded-full bg-gradient-to-br from-[#293379] to-[#3a4a9c] dark:from-blue-700 dark:to-blue-600 hover:from-[#3a4a9c] hover:to-[#4a5ab0] dark:hover:from-blue-600 dark:hover:to-blue-500 text-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-sm"
              disabled={!query.trim()}
            >
              <FaPaperPlane className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
