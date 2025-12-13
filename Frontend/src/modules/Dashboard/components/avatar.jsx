import React from "react";
import { useNavigate } from "react-router-dom";
import chatbotImg from "@/assets/static/chatbot.jpeg";

const Avatar = () => {
  const navigate = useNavigate();

  const openChat = () => {
    navigate("/chat");
  };

  return (
    <div className="fixed bottom-4 right-1 z-50 flex flex-row items-center gap-3">
      {/* ENHANCED CHAT BUBBLE ABOVE (BIGGER + BETTER TEXT) */}
      <div
        className="
    px-5 py-3
    rounded-xl
    text-sm sm:text-base font-semibold
    max-w-[220px] text-center

    bg-white text-black border border-gray-300 shadow-md
    dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:shadow-lg
  "
      >
        Hi, I'm your Curomate!
      </div>

      <div
        onClick={openChat}
        className="
          cursor-pointer hover:scale-110 
          transition-all duration-300
          bg-white rounded-full shadow-xl
          p-2
        "
        style={{
          width: "80px",
          height: "80px",
          backgroundImage: `url(${chatbotImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "9999px",
        }}
      ></div>
    </div>
  );
};

export default Avatar;
