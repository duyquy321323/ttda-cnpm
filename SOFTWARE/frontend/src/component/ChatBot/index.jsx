import { marked } from "marked";
import React, { useEffect, useState } from "react";
import run from "../ChatGPT";
import "./Chatbot.css";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [warning, setWarning] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false); // dùng để hiển thị trong 3s


  const [environmentData, setEnvironmentData] = useState({
    temperature: 0,
    humidity: 0,
    light: 0
});

useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080"); // thay bằng đúng địa chỉ server
  
    ws.onopen = () => {
      console.log("🟢 WebSocket connected");
    };
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEnvironmentData(data); // Lưu vào state để render
    };
  
    ws.onclose = () => {
      console.log("🔴 WebSocket disconnected");
    };
  
    return () => {
      ws.close();
    };
  }, []);


  const handleSubmit = async () => {
    const userMessage = { sender: "user", text: input };
    if (input.trim()){
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
    }

    const botResponse = await run(input, environmentData);
  
    if (botResponse?.warning) {
      setWarning(botResponse.warning); // Cập nhật warning
    } else {
      setWarning(null);
    }
    console.log(botResponse);
    if (botResponse?.message !== "" && isOpen && !botResponse?.warning) {
      setMessages((prev) => [...prev, {
        sender: "bot",
        text: marked.parse(botResponse.message)
      }]);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setShowPrompt(true); // Hiện prompt
        
        setTimeout(() => {
          setShowPrompt(false); // Ẩn sau 3 giây
        }, 3000);
        handleSubmit();
      }, 30000); // Mỗi 30 giây
  
      return () => clearInterval(interval);
    }
  }, [isOpen]);
  

  return (
    <div className="chat-container">
      {/* Nút mở chat */}
      {!isOpen && (<button className="chat-icon" onClick={() => setIsOpen(true)}>
        💬
      </button>)}

      {!isOpen && showPrompt && (
      <>
    <div className="chat-warning">
      {warning ? (
        <span style={{ color: "red", fontSize: "0.8rem" }}>{warning}</span>
      ) : (
        <span style={{ fontSize: "0.8rem" }}>Bạn cần hỗ trợ gì không?</span>
      )}
    </div>
      </>
  )}

      {/* Khung chat */}
      {isOpen && (
        <div className="chatbox">
          {/* Header */}
          <div className="chat-header">
            <span>Trợ lý yolohome</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          {/* Danh sách tin nhắn */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}
              dangerouslySetInnerHTML={{ __html: msg.text }} />
         
            ))}
          </div>

          {/* Ô nhập tin nhắn */}
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Bạn cần hỗ trợ gì..."
            />
            <button onClick={handleSubmit}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
