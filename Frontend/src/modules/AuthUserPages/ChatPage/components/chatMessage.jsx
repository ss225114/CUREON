import { useAuth } from "@/modules/Auth/context/authContext";
import React from "react";
import { useChat } from "../context/chatContext";
import { useNavigate } from "react-router-dom";

const Message = ({ message }) => {
  const { user } = useAuth();
  const { imageUrl } = useChat();

  const navigate = useNavigate();

  // Function to get the first letter of username
  const getFirstLetter = (username) => {
    if (
      !username ||
      typeof username !== "string" ||
      username.trim().length === 0
    ) {
      return "U"; // Fallback to "U" if username is invalid
    }
    return username.trim().charAt(0).toUpperCase();
  };

  const renderMessageWithLinks = (messageObj) => {
  const text = messageObj.message;

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <button
          key={index}
          onClick={() =>
            navigate("/find-doctors", {
              state: {
                filters: messageObj.doctorSearchPayload,
              },
            })
          }
          className="text-blue-400 underline"
        >
          this link
        </button>
      );
    }

    return part;
  });
};

  return (
    <div
      className={`flex ${
        message.isUser ? "justify-end" : "justify-start"
      } px-4 py-2`}
      onClick={() => console.log(message)}
    >
      <div
        className={`flex max-w-[85%] ${
          message.isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${
            message.isUser ? "bg-[#fa003f] ml-3" : "bg-[#293379] mr-3"
          }`}
        >
          {message.isUser ? getFirstLetter(user) : "C"}
        </div>

        {/* Message Content */}
        <div className="flex flex-col min-w-0">
          {/* Sender & Time - only show for chatbot or optionally for user */}
          {!message.isUser && (
            <div className="flex items-center gap-2 mb-1 ml-1">
              <span className="font-semibold text-gray-900 dark:text-white text-sm">
                Curomate
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          )}

          {/* Message Bubble */}
          <div
            className={`relative rounded-2xl px-4 py-2.5 ${
              message.isUser
                ? "bg-[#293379] text-white rounded-tr-none"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-tl-none"
            }`}
          >
            {/* WhatsApp-style bubble tip */}
            <div
              className={`absolute top-0 w-3 h-3 ${
                message.isUser
                  ? "-right-3 bg-[#293379]"
                  : "-left-3 bg-gray-100 dark:bg-gray-800"
              }`}
              style={{
                clipPath: message.isUser
                  ? "polygon(0 0, 100% 0, 0 100%)"
                  : "polygon(0 0, 100% 0, 100% 100%)",
              }}
            />

            <p className="leading-relaxed whitespace-pre-wrap text-sm relative z-10">
              {message.isImage ? (
                imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="w-30 h-30 rounded-lg"
                  />
                ) : (
                  <img
                    src={`http://localhost:5000/uploads/images/${message.imagePath
                      .split("\\")
                      .pop()}`}
                    alt="Uploaded"
                    className="w-30 h-30 rounded-lg"
                  />
                )
              ) : (
                renderMessageWithLinks(message)
              )}
            </p>

            {/* Time for user messages (inside bubble) */}
            {message.isUser && (
              <div className="flex justify-end mt-1">
                <span className="text-xs opacity-80">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Time for chatbot messages (outside bubble) */}
          {!message.isUser && (
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
