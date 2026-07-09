function ChatMessage({ sender, text }) {
  return (
    <div className={`message-row ${sender}`}>
      {sender === "ai" && (
        <div className="avatar ai-avatar">
          🤖
        </div>
      )}

      <div className={`message-bubble ${sender}`}>
        {text}
      </div>

      {sender === "user" && (
        <div className="avatar user-avatar">
          👤
        </div>
      )}
    </div>
  );
}

export default ChatMessage;