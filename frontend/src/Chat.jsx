import React, { useState } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

function formatDate(date) {
  return date.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
  });
}

export default function Chat() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const now = new Date();

    const userMessage = {
      id: Date.now(),
      sender: "user",
      name: "You",
      message: text,
      timestamp: now,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:4000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await res.json();

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        name: "Bot",
        message: data.answer || "No response from server.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage = {
        id: Date.now() + 2,
        sender: "bot",
        name: "Bot",
        message: "Error connecting to server.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        height: "600px",
        width: "100%",
        maxWidth: "700px",
        margin: "auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f9fafb",
        borderRadius: "10px",
        boxShadow: "0 0 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Bocadillo título */}
      <div
        style={{
          color: "black",
          padding: "14px 24px",
          maxWidth: "fit-content",
          fontWeight: "600",
          fontSize: "1.25rem",
        }}
      >
        Chat Telemetría de Microservicios
      </div>

      <MainContainer style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatContainer style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <MessageList scrollBehavior="smooth" typingIndicator={null} style={{ padding: "10px", flex: 1, overflowY: "auto" }}>
            {messages.map(({ id, sender, name, message, timestamp }) => (
              <div key={id} style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: sender === "user" ? "row-reverse" : "row",
                    marginBottom: "6px",
                  }}
                >
                  <Avatar
                    src={
                      sender === "user"
                        ? "https://ui-avatars.com/api/?name=You"
                        : "https://ui-avatars.com/api/?name=Bot&background=0D8ABC&color=fff"
                    }
                    name={name}
                    size="xs"
                    style={{ margin: "6px" }}
                  />
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#888",
                      textAlign: sender === "user" ? "right" : "left",
                      flex: 1,
                      userSelect: "none",
                    }}
                  >
                    <strong>{name}</strong> — {formatDate(timestamp)}
                  </div>
                </div>
                <Message
                  model={{
                    message,
                    direction: sender === "user" ? "outgoing" : "incoming",
                    sender: sender === "bot" ? "system" : "user",
                  }}
                />
              </div>
            ))}
          </MessageList>
          <MessageInput placeholder="Escribe tu pregunta..." onSend={sendMessage} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
