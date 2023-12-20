import { useEffect, useState, useRef } from "react";
import socket from "../socket";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initializeSocket = () => {
      socket.auth = {
        access_token: localStorage.access_token,
        username: localStorage.username,
      };

      socket.connect();

      socket.on("message:update", (newMessage) => {
        setMessages((current) => [...current, newMessage]);
        scrollToBottom();
      });

      socket.emit("hello", "masuk ga bang");
    };

    if (!socket.connected) {
      initializeSocket();
    }

    return () => {
      socket.off("message:update");
      socket.disconnect();
    };
  }, []);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      socket.emit("message:new", message);
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="bg-gray-200 flex-1 overflow-y-scroll px-4 py-2">
          {messages.map((isi, i) => (
            <div key={i} className={`flex ${isi.from === socket.auth.username ? "justify-end" : "justify-start"} items-center mb-2`}>
              <div className={`bg-${isi.from === socket.auth.username ? "blue-500" : "white"} text-${isi.from === socket.auth.username ? "white" : "black"} rounded-lg p-2 shadow mb-2 max-w-sm`}>
                {isi.from !== socket.auth.username && <div className="font-medium">{isi.from}</div>}
                {isi.message}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-gray-100 px-4 py-2">
          <form className="flex items-center" onSubmit={handleSendChat}>
            <input
              className="w-full border rounded-full py-2 px-4 mr-2"
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

