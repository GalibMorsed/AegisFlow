import React, { useState, useRef, useEffect } from "react";

function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Comprehensive knowledge base
  const getResponse = (query) => {
    const q = query.toLowerCase().trim();

    // Camera Management
    if (
      q.includes("camera") ||
      q.includes("add camera") ||
      q.includes("configure")
    ) {
      return "📹 **Camera Management**: Navigate to the Cameras section on the home page. Click 'Add Camera' to configure a new camera, select between Device Camera or IP Camera, enter location details with GPS coordinates, and start monitoring live feeds instantly.";
    }

    if (q.includes("live") || q.includes("stream") || q.includes("monitor")) {
      return "🔴 **Live Monitoring**: Access the Cameras page to view real-time video feeds from all configured cameras. Each feed displays location, device type, and live status. Click on any camera to view full-screen live stream.";
    }

    if (q.includes("device camera") || q.includes("ip camera")) {
      return "📷 **Camera Types**: AegisFlow supports two camera types:\n\n• **Device Camera**: Use your computer's webcam\n• **IP Camera**: Connect network cameras with IP address\n\nChoose the appropriate type based on your setup, then configure location details and GPS coordinates for accurate tracking.";
    }

    // Crowd & Analytics
    if (
      q.includes("crowd") ||
      q.includes("density") ||
      q.includes("analysis")
    ) {
      return "👥 **Crowd Analytics**: The Analysis page provides real-time crowd density visualization, heat maps showing congestion areas, and historical trends. Red zones indicate high-risk areas. Use this data to manage crowd flow and prevent dangerous situations.";
    }

    if (
      q.includes("alert") ||
      q.includes("notification") ||
      q.includes("warning")
    ) {
      return "⚠️ **Alerts System**: Receive real-time alerts when crowd density exceeds safe thresholds. Alerts appear on the dashboard and include:\n\n• Location of crowded areas\n• Current density level\n• Recommended actions\n• Timestamp\n\nCheck the Alerts section for complete alert history and status updates.";
    }

    // Profile & Account
    if (
      q.includes("profile") ||
      q.includes("account") ||
      q.includes("settings")
    ) {
      return "👤 **Profile Management**: Access your profile to view personal information, manage cameras, track tasks, oversee staff assignments, and review events. Update your details and monitor all operations from one central hub.";
    }

    if (q.includes("task") || q.includes("assignment") || q.includes("work")) {
      return "✅ **Task Management**: In your Profile section, manage tasks assigned to you or your team. View task status, deadlines, and progress. Create new tasks, assign them to staff members, and track completion.";
    }

    if (q.includes("staff") || q.includes("team") || q.includes("member")) {
      return "👥 **Staff Management**: Manage your team through the Profile page. View all staff members, their assignments, and work status. Coordinate team activities related to crowd monitoring and safety operations.";
    }

    if (q.includes("event") || q.includes("incident")) {
      return "📋 **Event Tracking**: All significant crowd monitoring events are logged and visible in your Profile. Review incident reports, crowd movements, and system activities for comprehensive operational awareness.";
    }

    // Navigation & General Usage
    if (
      q.includes("navigate") ||
      q.includes("how to") ||
      q.includes("where") ||
      q.includes("find")
    ) {
      return "🗺️ **Navigation Guide**: \n\n• **Home**: Dashboard with live camera feeds\n• **Cameras**: Add/manage cameras\n• **Analysis**: View crowd analytics\n• **Profile**: Manage account & team\n• **Help**: Get additional support\n\nUse the top navigation or sidebar to switch between sections.";
    }

    if (q.includes("dashboard") || q.includes("home page")) {
      return "🏠 **Dashboard Overview**: The Home page displays all your camera feeds, real-time crowd status, system alerts, and quick access buttons. Monitor the overall situation at a glance and take quick actions when needed.";
    }

    // Safety & Best Practices
    if (
      q.includes("safe") ||
      q.includes("safety") ||
      q.includes("risk") ||
      q.includes("danger")
    ) {
      return "🛡️ **Safety Guidelines**: \n\n• Monitor crowd density regularly\n• Act on red zone alerts immediately\n• Maintain communication with your team\n• Review analytics for patterns\n• Update camera positions for better coverage\n\nPrioritize safety and respond quickly to alerts.";
    }

    if (
      q.includes("emergency") ||
      q.includes("urgent") ||
      q.includes("critical")
    ) {
      return "🚨 **Emergency Response**: In critical situations:\n\n1. Monitor all camera feeds\n2. Check real-time crowd density\n3. Activate alerts to notify team\n4. Review Analysis for movement patterns\n5. Coordinate with staff members\n\nUse the system to make informed decisions quickly.";
    }

    // Technical Support
    if (
      q.includes("problem") ||
      q.includes("issue") ||
      q.includes("error") ||
      q.includes("bug")
    ) {
      return "🔧 **Troubleshooting**: \n\n• Check internet connection\n• Verify camera is powered on\n• Ensure GPS coordinates are correct\n• Clear browser cache if display issues occur\n• Contact support if problems persist\n\nFor detailed help, visit the Help page or contact our support team.";
    }

    if (
      q.includes("feature") ||
      q.includes("function") ||
      q.includes("capability")
    ) {
      return "✨ **Key Features**: \n\n• Real-time camera monitoring\n• Crowd density analysis\n• Live alerts system\n• Team management\n• Task tracking\n• Event logging\n• Analytics dashboard\n• Profile management\n\nExplore each section to leverage all features!";
    }

    if (
      q.includes("login") ||
      q.includes("sign") ||
      q.includes("auth") ||
      q.includes("password")
    ) {
      return "🔐 **Authentication**: Use your email and password to log in. If you forgot your password, click 'Forgot Password' on the login page and follow the recovery instructions sent to your email.";
    }

    if (q.includes("reset") || q.includes("forgot") || q.includes("recover")) {
      return "🔄 **Password Recovery**: On the login page, select 'Forgot Password', enter your email address, and follow the verification steps. You'll receive recovery instructions to reset your password securely.";
    }

    // Contact & Help
    if (q.includes("contact") || q.includes("support") || q.includes("help")) {
      return "📞 **Get Support**: Visit the Help page for frequently asked questions or contact our support team through the Contact page. We're here to assist with any questions or issues.";
    }

    if (q.includes("about") || q.includes("aegisflow")) {
      return "ℹ️ **About AegisFlow**: AegisFlow is an advanced crowd monitoring and safety management platform. It combines real-time video monitoring, AI-powered crowd analytics, and intelligent alerting to help you manage public spaces safely and efficiently.";
    }

    // Fallback with suggestions
    return "💡 **Need Help?** I can assist with:\n\n• 📹 Camera setup & monitoring\n• 👥 Crowd analysis & alerts\n• 🗺️ Navigation & features\n• 👤 Profile & account management\n• ✅ Tasks & team coordination\n• 🛡️ Safety guidelines\n• 🔧 Troubleshooting\n\nAsk me anything about AegisFlow!";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay for natural feel
    setTimeout(() => {
      const reply = getResponse(input);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "How to add camera?",
    "View crowd analysis",
    "Camera types",
    "How to navigate?",
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(!open)}
        className="chat-fab"
        aria-label={open ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          bottom: "clamp(20px, 5vw, 40px)",
          right: "clamp(20px, 5vw, 40px)",
          width: "clamp(55px, 12vw, 70px)",
          height: "clamp(55px, 12vw, 70px)",
          background: "linear-gradient(135deg, #2b5cff 0%, #0052cc 100%)",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          alignItems: "center",
          color: "white",
          fontSize: "clamp(24px, 6vw, 32px)",
          cursor: "pointer",
          boxShadow: open
            ? "0px 12px 32px rgba(43,92,255,0.8)"
            : "0px 8px 24px rgba(43,92,255,0.6)",
          zIndex: 999998,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          border: "3px solid rgba(255,255,255,0.2)",
          transform: open ? "scale(1.1) rotate(90deg)" : "scale(1)",
          padding: 0,
          pointerEvents: "auto",
        }}
        title="Help Assistant"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="chat-window"
          style={{
            position: "fixed",
            bottom: "clamp(80px, 15vw, 120px)",
            right: "clamp(15px, 5vw, 30px)",
            left: "auto",
            width: "clamp(280px, 90vw, 450px)",
            maxWidth: "calc(100vw - 40px)",
            height: "clamp(400px, 80vh, 700px)",
            maxHeight: "calc(100vh - clamp(100px, 20vh, 150px))",
            background: "white",
            borderRadius: "20px",
            boxShadow: "0px 15px 50px rgba(0,0,0,0.2)",
            padding: "0",
            zIndex: 999999,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            animation: "slideUp 0.3s ease-out",
            touchAction: "manipulation",
            pointerEvents: "auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #2b5cff 0%, #0052cc 100%)",
              padding: "clamp(12px, 3vw, 18px) clamp(14px, 4vw, 20px)",
              color: "white",
              fontWeight: "700",
              fontSize: "clamp(14px, 4vw, 16px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid rgba(0,0,0,0.05)",
              flexShrink: 0,
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", minWidth: 0 }}>
              <span
                style={{
                  fontSize: "clamp(16px, 5vw, 20px)",
                  marginRight: "8px",
                  flexShrink: 0,
                }}
              >
                🤖
              </span>
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                AegisFlow Assistant
              </span>
            </div>
            <span
              style={{
                fontSize: "clamp(10px, 2vw, 12px)",
                fontWeight: "400",
                opacity: 0.9,
                flexShrink: 0,
              }}
            >
              Ready
            </span>
          </div>

          {/* Messages Container */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "clamp(12px, 3vw, 16px)",
              background: "#f8fbff",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              willChange: "scroll-position",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {messages.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  textAlign: "center",
                  color: "#666",
                  padding: "clamp(15px, 5vw, 20px)",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(36px, 10vw, 48px)",
                    marginBottom: "12px",
                  }}
                >
                  👋
                </div>
                <div
                  style={{
                    fontSize: "clamp(12px, 3vw, 14px)",
                    fontWeight: "600",
                    marginBottom: "8px",
                  }}
                >
                  Welcome to AegisFlow!
                </div>
                <div
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    color: "#999",
                    marginBottom: "16px",
                    lineHeight: "1.4",
                  }}
                >
                  Ask basic questions about AegisFlow. This AI model is still in
                  training phase and may not have all the answers.
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "8px",
                    width: "100%",
                  }}
                >
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(q);
                      }}
                      style={{
                        padding: "clamp(8px, 2vw, 10px) clamp(10px, 3vw, 12px)",
                        background: "white",
                        border: "1.5px solid #2b5cff",
                        borderRadius: "8px",
                        color: "#2b5cff",
                        fontSize: "clamp(11px, 2.5vw, 12px)",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        touchAction: "manipulation",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = "#2b5cff";
                        e.target.style.color = "white";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = "white";
                        e.target.style.color = "#2b5cff";
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.sender === "user" ? "flex-end" : "flex-start",
                      marginBottom: "4px",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "85%",
                        padding:
                          "clamp(10px, 2vw, 12px) clamp(12px, 3vw, 14px)",
                        borderRadius:
                          msg.sender === "user"
                            ? "16px 16px 4px 16px"
                            : "16px 16px 16px 4px",
                        background:
                          msg.sender === "user"
                            ? "linear-gradient(135deg, #2b5cff 0%, #1d47b0 100%)"
                            : "#e8f0ff",
                        color: msg.sender === "user" ? "white" : "#1a1a1a",
                        fontSize: "clamp(12px, 2.5vw, 13px)",
                        lineHeight: "1.5",
                        wordBreak: "break-word",
                        boxShadow:
                          msg.sender === "user"
                            ? "0px 4px 12px rgba(43,92,255,0.3)"
                            : "0px 2px 8px rgba(0,0,0,0.08)",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {msg.text.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line.includes("•") ? (
                            <div
                              style={{
                                marginLeft: "0",
                                marginTop: i > 0 ? "6px" : "0",
                              }}
                            >
                              {line}
                            </div>
                          ) : line.includes("**") ? (
                            <strong
                              style={{
                                display: "block",
                                marginTop: i > 0 ? "6px" : "0",
                              }}
                            >
                              {line.replace(/\*\*/g, "")}
                            </strong>
                          ) : (
                            <div style={{ marginTop: i > 0 ? "4px" : "0" }}>
                              {line}
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginTop: "8px",
                    }}
                  >
                    <div
                      style={{
                        padding: "12px 14px",
                        borderRadius: "16px 16px 16px 4px",
                        background: "#e8f0ff",
                        display: "flex",
                        gap: "4px",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#2b5cff",
                          animation: "bounce 1.4s infinite",
                        }}
                      />
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#2b5cff",
                          animation: "bounce 1.4s infinite 0.2s",
                        }}
                      />
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#2b5cff",
                          animation: "bounce 1.4s infinite 0.4s",
                        }}
                      />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div
            style={{
              display: "flex",
              padding: "clamp(10px, 2.5vw, 12px)",
              borderTop: "1px solid #e0e8ff",
              background: "white",
              gap: "8px",
              alignItems: "flex-end",
              flexShrink: 0,
              touchAction: "manipulation",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask something..."
              disabled={isTyping}
              style={{
                flex: 1,
                padding: "clamp(10px, 2vw, 12px) clamp(12px, 3vw, 14px)",
                borderRadius: "12px",
                border: "1.5px solid #cce0ff",
                fontSize: "clamp(12px, 2.5vw, 13px)",
                fontFamily: "inherit",
                outline: "none",
                transition: "all 0.2s",
                background: isTyping ? "#f5f5f5" : "white",
                color: isTyping ? "#999" : "#1a1a1a",
                resize: "none",
                maxHeight: "100px",
                WebkitAppearance: "none",
                appearance: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2b5cff";
                e.target.style.boxShadow = "0 0 0 3px rgba(43,92,255,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#cce0ff";
                e.target.style.boxShadow = "none";
              }}
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              aria-label="Send message"
              style={{
                padding: "clamp(9px, 2vw, 11px) clamp(12px, 3vw, 16px)",
                background:
                  isTyping || !input.trim()
                    ? "#ccc"
                    : "linear-gradient(135deg, #2b5cff 0%, #0052cc 100%)",
                color: "white",
                borderRadius: "10px",
                border: "none",
                cursor: isTyping || !input.trim() ? "not-allowed" : "pointer",
                fontWeight: "600",
                fontSize: "clamp(11px, 2.5vw, 12px)",
                transition: "all 0.2s",
                boxShadow:
                  !isTyping && input.trim()
                    ? "0px 4px 12px rgba(43,92,255,0.3)"
                    : "none",
                touchAction: "manipulation",
                WebkitAppearance: "none",
                appearance: "none",
                whiteSpace: "nowrap",
              }}
              onMouseOver={(e) => {
                if (!isTyping && input.trim()) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0px 6px 16px rgba(43,92,255,0.4)";
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0px 4px 12px rgba(43,92,255,0.3)";
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        .chat-window::-webkit-scrollbar {
          width: clamp(4px, 1vw, 6px);
        }

        .chat-window::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .chat-window::-webkit-scrollbar-thumb {
          background: #2b5cff;
          border-radius: 3px;
        }

        .chat-window::-webkit-scrollbar-thumb:hover {
          background: #0052cc;
        }

        /* Tablet and below */
        @media (max-width: 768px) {
          .chat-fab {
            bottom: clamp(15px, 4vh, 30px) !important;
            right: clamp(15px, 4vw, 25px) !important;
          }

          .chat-window {
            bottom: clamp(70px, 12vh, 100px) !important;
            right: clamp(10px, 4vw, 20px) !important;
            left: auto !important;
          }
        }

        /* Mobile devices */
        @media (max-width: 480px) {
          .chat-fab {
            bottom: clamp(12px, 3vh, 20px) !important;
            right: clamp(12px, 3vw, 20px) !important;
            width: clamp(50px, 11vw, 65px) !important;
            height: clamp(50px, 11vw, 65px) !important;
          }

          .chat-window {
            width: clamp(260px, 95vw, 400px) !important;
            height: clamp(350px, 75vh, 600px) !important;
            bottom: clamp(65px, 10vh, 85px) !important;
            right: clamp(8px, 2.5vw, 15px) !important;
            left: auto !important;
            max-height: calc(100vh - clamp(60px, 15vh, 100px)) !important;
          }
        }

        /* Small phones */
        @media (max-width: 360px) {
          .chat-window {
            width: clamp(240px, 92vw, 350px) !important;
            height: clamp(320px, 70vh, 500px) !important;
          }
        }

        /* Landscape orientation */
        @media (max-height: 500px) {
          .chat-window {
            max-height: 90vh !important;
            height: auto !important;
          }
        }

        /* High DPI devices */
        @media (-webkit-min-device-pixel-ratio: 2) {
          .chat-fab,
          .chat-window {
            box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
          }
        }

        /* Touch devices */
        @media (hover: none) and (pointer: coarse) {
          .chat-fab {
            min-height: 44px;
            min-width: 44px;
          }
          
          button, input {
            min-height: 44px;
          }
        }
      `}</style>
    </>
  );
}

export default ChatBox;
