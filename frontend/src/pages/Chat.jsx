import { useState } from "react";
import { sendChatMessage } from "../services/api";

function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm your AI CRM Assistant. You can tell me about your doctor interactions.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const data = await sendChatMessage(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.response,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      {/* Scoped animations + scrollbar (can't be expressed via inline style objects) */}
      <style>{`
        @keyframes chatFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.85); }
          40% { opacity: 1; transform: scale(1); }
        }
        .aura-chatbox::-webkit-scrollbar { width: 8px; }
        .aura-chatbox::-webkit-scrollbar-track { background: transparent; }
        .aura-chatbox::-webkit-scrollbar-thumb { background: #d6d3fb; border-radius: 10px; }
        .aura-chatbox::-webkit-scrollbar-thumb:hover { background: #6d5bf6; }
        .aura-send-btn:hover { box-shadow: 0 10px 24px rgba(109, 91, 246, 0.45); transform: translateY(-2px); }
        .aura-send-btn:active { transform: translateY(0); }
        .aura-input:focus { outline: none; border-color: #6d5bf6 !important; box-shadow: 0 0 0 4px #eef0ff; background: #ffffff !important; }
        .aura-msg { animation: chatFadeIn 0.3s ease both; }
      `}</style>

      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.headerIcon}>✦</span>
          <h2 style={styles.headerText}>AI CRM Assistant</h2>
        </div>

        <div className="aura-chatbox" style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className="aura-msg"
              style={{
                display: "flex",
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.message,
                  ...(msg.sender === "user" ? styles.userMessage : styles.aiMessage),
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={styles.typingBubble}>
                <span style={{ ...styles.dot, animationDelay: "0s" }} />
                <span style={{ ...styles.dot, animationDelay: "0.15s" }} />
                <span style={{ ...styles.dot, animationDelay: "0.3s" }} />
              </div>
            </div>
          )}
        </div>

        <div style={styles.inputArea}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            className="aura-input"
            style={styles.input}
          />

          <button onClick={handleSend} className="aura-send-btn" style={styles.button}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#f3f4fb",
    height: "100vh",
    padding: "20px",
  },

  container: {
    maxWidth: "760px",
    margin: "0 auto",
    height: "calc(100% - 40px)",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
  },

  headerIcon: {
    fontSize: "20px",
    color: "#6d5bf6",
  },

  headerText: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    background: "linear-gradient(90deg, #10101c, #4f46e5)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },

  chatBox: {
    flex: 1,
    border: "1px solid rgba(16,16,28,0.08)",
    borderRadius: "20px",
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    background: "#ffffff",
    marginBottom: "16px",
    boxShadow: "0 4px 14px rgba(16,16,28,0.06)",
  },

  message: {
    padding: "12px 16px",
    borderRadius: "16px",
    maxWidth: "70%",
    fontSize: "15px",
    lineHeight: 1.45,
    boxShadow: "0 2px 8px rgba(16,16,28,0.06)",
  },

  userMessage: {
    background: "linear-gradient(90deg, #4f46e5, #6d5bf6)",
    color: "white",
    borderBottomRightRadius: "4px",
  },

  aiMessage: {
    background: "#eef0ff",
    color: "#10101c",
    borderBottomLeftRadius: "4px",
  },

  typingBubble: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "14px 16px",
    borderRadius: "16px",
    borderBottomLeftRadius: "4px",
    background: "#eef0ff",
    width: "fit-content",
  },

  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#6d5bf6",
    display: "inline-block",
    animation: "dotPulse 1.2s ease-in-out infinite",
  },

  inputArea: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "13px 16px",
    borderRadius: "12px",
    border: "1.5px solid rgba(16,16,28,0.08)",
    fontSize: "15px",
    background: "#fafafe",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
  },

  button: {
    padding: "13px 26px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg, #4f46e5, #6d5bf6)",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "14.5px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
};

export default Chat;
