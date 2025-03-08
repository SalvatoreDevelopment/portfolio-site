"use client";
import { useState } from "react";

interface ChatbotProps {
  onUserMessage: (message: string) => void;
}

export default function ChatbotComponent({ onUserMessage }: ChatbotProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, `Tu: ${input}`]);

    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    if (data.reply) {
        try {
          const styleChanges = JSON.parse(data.reply);
          if (styleChanges.error) {
            setMessages([...messages, `Tu: ${input}`, `Bot: ${styleChanges.error}`]);
          } else {
            if (styleChanges.background) {
                document.body.style.backgroundColor = styleChanges.background;
                document.documentElement.style.backgroundColor = styleChanges.background;
                document.documentElement.offsetHeight; // Forza il ricalcolo dello stile
              }
              if (styleChanges.text) {
                document.body.style.color = styleChanges.text;
                document.documentElement.style.color = styleChanges.text;
              }
            setMessages([...messages, `Tu: ${input}`, `Bot: Ho cambiato lo stile!`]);
          }
        } catch (error) {
          setMessages([...messages, `Tu: ${input}`, `Bot: Non ho capito il comando.`]);
        }
      }

    setInput("");
  };

  return (
    <div className="w-full max-w-lg bg-gray-800 text-white p-3 rounded-lg shadow-lg">
      <div className="h-24 overflow-y-auto mb-2 text-sm">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 p-2 text-black rounded text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Scrivi un comando..."
        />
        <button
          className="bg-blue-500 px-4 py-2 rounded text-white text-sm"
          onClick={handleSendMessage}
        >
          Invia
        </button>
      </div>
    </div>
  );
}