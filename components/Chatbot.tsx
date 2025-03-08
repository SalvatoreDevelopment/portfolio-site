"use client";
import { useState, useContext } from "react";
import { ThemeContext } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { Bot, X } from "lucide-react"; // Icone bot e chiusura

export default function ChatbotComponent() {
  const themeContext = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false); // Controlla se la chat è aperta
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  if (!themeContext) {
    return <div className="text-white">⚠️ Errore: Il tema non può essere cambiato.</div>;
  }

  const { setTheme, setFont, setBorderRadius, setTransitionSpeed, setNeonEffect, setGlitchEffect } = themeContext;

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, `Tu: ${input}`]);
  
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
  
      const data = await response.json();
      if (!data) {
        setMessages([...messages, `Tu: ${input}`, `🤖: Errore: Nessuna risposta dal server.`]);
        return;
      }
      
      if (typeof data === "object" && data.theme) {
        setTheme(data.theme);
        setMessages([...messages, `Tu: ${input}`, `🤖: Ho applicato il tema ${data.theme}!`]);
      } else if (typeof data.reply === "string") {
        try {
          const styleChanges = JSON.parse(data.reply);
      
          if (styleChanges.theme) {
            setTheme(styleChanges.theme);
            setMessages([...messages, `Tu: ${input}`, `🤖: Ho applicato il tema ${styleChanges.theme}!`]);
          } else {
            setMessages([...messages, `Tu: ${input}`, `🤖: ${data.reply}`]);
          }
        } catch (error) {
          setMessages([...messages, `Tu: ${input}`, `🤖: ${data.reply}`]);
        }
      } else {
        setMessages([...messages, `Tu: ${input}`, `🤖: ${data.reply || "Errore sconosciuto."}`]);
      }
      
  
      try {
        const styleChanges = JSON.parse(data.reply);
        if (styleChanges.theme) {
          setTheme(styleChanges.theme);
          console.log("Tema impostato a:", styleChanges.theme);
          setMessages([...messages, `Tu: ${input}`, `🤖: Ho applicato il tema ${styleChanges.theme}!`]);
        } else if (styleChanges.neonEffect !== undefined) {
          setNeonEffect(styleChanges.neonEffect);
          setMessages([...messages, `Tu: ${input}`, `🤖: Effetto Neon ${styleChanges.neonEffect ? "attivato" : "disattivato"}!`]);
        } else if (styleChanges.glitchEffect !== undefined) {
          setGlitchEffect(styleChanges.glitchEffect);
          setMessages([...messages, `Tu: ${input}`, `🤖: Effetto Glitch ${styleChanges.glitchEffect ? "attivato" : "disattivato"}!`]);
        } else {
          setMessages([...messages, `Tu: ${input}`, `🤖: ${data.reply}`]);
        }
      } catch {
        setMessages([...messages, `Tu: ${input}`, `🤖: ${data.reply}`]);
      }
    } catch (error) {
      setMessages([...messages, `Tu: ${input}`, `🤖: Errore nel chatbot.`]);
    }
  
    setInput("");
  };
  

  return (
    <>
      {/* Avatar del bot fisso in basso a destra */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-5 right-5 bg-blue-500 p-3 rounded-full shadow-lg cursor-pointer z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bot className="text-white w-10 h-10" />
      </motion.div>

      {/* Finestra del chatbot */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 right-5 bg-gray-900 text-white p-4 rounded-lg shadow-2xl w-72 z-50"
        >
          {/* Barra superiore con il titolo e il pulsante di chiusura */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">🤖 Robo-Chat</h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="text-white w-5 h-5" />
            </button>
          </div>

          {/* Area messaggi */}
          <div className="h-48 w-full overflow-y-auto custom-scrollbar mb-3 p-2 bg-gray-800 rounded-lg text-sm z-50">
            {messages.map((msg, index) => (
              <motion.p
                key={index}
                className={`mb-1 text-center ${msg.startsWith("🤖") ? "text-blue-400" : ""}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {msg}
              </motion.p>
            ))}
          </div>

          {/* Input e pulsante invio */}
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              className="w-full p-2 text-white rounded-lg text-sm border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Scrivi un comando..."
            />
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition z-50"
              onClick={handleSendMessage}
            >
              ➤
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}

