import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import ChatBot from "./ChatBot";
import "../../../Style/Content.css";

const FloatingMessageButton = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(1);

  const handleButtonClick = () => {
    setIsChatVisible(!isChatVisible);
   
    if (isChatVisible) {
      setUnreadMessages(0);
    }
  };

  return (
    <div>
      {isChatVisible ? (
        <div className={`chat-bot-container fade-in`}>
          <ChatBot setIsChatVisible={setIsChatVisible} />
        </div>
      ) : (
        <div
          className={`fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center cursor-pointer transition-transform rotate ${
            isChatVisible ? "rotate-45" : ""
          }`}
          onClick={handleButtonClick}
        >
          <div
            className={`bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-600 transform hover:scale-105 ${
              isChatVisible ? "scale-0" : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faComment}
              className={`text-lg pulse ${isChatVisible ? "rotate" : ""}`}
            />
            {unreadMessages > 0 && ( 
              <div className="bg-red-500 text-white rounded-full w-5 h-5 absolute -top-1 -right-1 flex items-center justify-center">
                {unreadMessages}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingMessageButton;
