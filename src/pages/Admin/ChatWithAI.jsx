import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import axios from "axios";

const ChatWithAI = () => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello 👋.., How Can I Help You ....😊 " }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
     
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });

      const aiMessage = {
        role: "ai",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error: Unable to get response 😢" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="max-w-4xl mx-auto p-4 flex flex-col h-[90vh]">
        
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4 text-indigo-600">
          ChemFriend
        </h1>

        {/* Chat Box */}
        <div className="flex-1 overflow-y-auto bg-black rounded-xl shadow p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm ${
                  msg.role === "user"
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="text-gray-500 text-sm">AI is thinking...</div>
          )}
        </div>

        {/* Input Area */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Type your question..."
            className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAI;