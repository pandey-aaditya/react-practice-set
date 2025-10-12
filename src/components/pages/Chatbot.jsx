import { useState, useEffect, useRef } from "react";

const Chatbot = () => {
  const [chatData, setChatData] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [chatData]);

  const handleFetchApi = async () => {
    try {
      const res = await fetch("https://dummyjson.com/quotes/random/1");
      const data = await res.json();
      const newMessage = {
        text: data[0]?.quote,
        sender: "bot",
      };
      setChatData((prev) => [...prev, newMessage]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnKeyDown = (e) => {
    if (chatInput.trim() && e.key === "Enter") {
      const userMessage = {
        sender: "user",
        text: chatInput,
      };
      setChatData((prev) => [...prev, userMessage]);
      setChatInput("");
      handleFetchApi();
    }
  };

  const handleOnChange = (e) => {
    setChatInput(e.target.value);
  };

  return (
    <div id="chat-screen" className="chat-screen">
      <div id="chat-modal" className="chat-modal">
        <div id="chat-body" className="chat-body">
          {chatData.map((chat, index) => (
            <div
              className={`chat-item ${
                chat.sender === "user" ? "sender-item" : "bot-item"
              }`}
              key={index}
            >
              {chat.text && <span>{chat.text}</span>}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="input-conatiner">
          <input
            className="chat-field"
            type="text"
            placeholder="Please type your message"
            onKeyDown={handleOnKeyDown}
            onChange={handleOnChange}
            value={chatInput}
          ></input>
        </div>
      </div>
    </div>
  );
};
export default Chatbot;

// Reference image: https://freeimage.host/i/3GRrVzg
// UI - chat box positioned in bottom left of page.
// chat from user on right side, chat of bot on left.
// API - call api and render message in chatbox (https://dummyjson.com/quotes/random/1)
// Auto Scroll - Auto scroll to latest message when a new message comes
// Get response from bot at ranodom time. use "setTimeout"
// Error handling - what if messages are not sent?
