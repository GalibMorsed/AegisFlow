import React, { useState } from "react";

function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;

    const q = input.toLowerCase();
    let reply = "";

    if (q.includes("alert")) {
      reply =
        "To check alerts, open the Alerts page. It shows warnings about crowd conditions.";
    } else if (
      q.includes("camera") ||
      q.includes("live") ||
      q.includes("feed")
    ) {
      reply = "Go to the Cameras section to view live monitoring of the crowd.";
    } else if (q.includes("crowd") || q.includes("density")) {
      reply =
        "The dashboard shows crowd density. Areas with more danger appear highlighted.";
    } else if (
      q.includes("navigate") ||
      q.includes("how") ||
      q.includes("use") ||
      q.includes("web")
    ) {
      reply = "Use the sidebar or buttons to move between pages of the app.";
    } else if (q.includes("safe") || q.includes("avoid")) {
      reply = "Follow the alerts and avoid high-risk areas shown in red.";
    } else {
      reply = "I can only guide you on how to use this web app.";
    }

    setMessages([
      ...messages,
      { sender: "user", text: input },
      { sender: "bot", text: reply },
    ]);

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "65px",
          height: "65px",
          background: "#2b5cff",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "26px",
          cursor: "pointer",
          boxShadow: "0px 5px 20px rgba(43,92,255,0.5)",
          zIndex: 999999,
          transition: "0.3s",
        }}
      >
        💬
      </div>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "110px",
            right: "30px",
            width: "320px",
            background: "white",
            borderRadius: "15px",
            boxShadow: "0px 0px 20px rgba(0,0,0,0.15)",
            padding: "0",
            zIndex: 999999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "#2b5cff",
              padding: "12px",
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Help Assistant
          </div>

          <div
            style={{
              height: "220px",
              overflowY: "auto",
              padding: "10px",
              background: "#f4f7ff",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  margin: "8px 0",
                  padding: "10px",
                  borderRadius: "10px",
                  maxWidth: "80%",
                  background: m.sender === "bot" ? "#e2edff" : "#d2f8d2",
                  alignSelf: m.sender === "bot" ? "flex-start" : "flex-end",
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #ddd",
              background: "white",
              gap: "5px",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccd8ff",
              }}
            />
            <button
              onClick={send}
              style={{
                padding: "10px 12px",
                background: "#2b5cff",
                color: "white",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBox;
