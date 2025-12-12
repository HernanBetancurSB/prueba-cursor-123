"use client";

import { useState, useRef, useEffect, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

type ChatInputProps = {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
};

const ChatInput = memo(({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize del textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
    }
  }, [message]);

  const handleSubmit = useCallback(() => {
    if (!message.trim() || isLoading) return;

    onSendMessage(message.trim());
    setMessage("");

    // Reset altura del textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [message, isLoading, onSendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="relative flex items-end gap-3 glass-effect rounded-2xl p-2 focus-within:ring-2 focus-within:ring-primary-500/50 transition-smooth">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje..."
          disabled={isLoading}
          rows={1}
          className="
            flex-1 resize-none
            bg-transparent
            text-white placeholder-dark-400
            px-4 py-3
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            text-sm leading-relaxed
            max-h-[200px]
          "
          aria-label="Escribe tu mensaje"
        />

        <button
          onClick={handleSubmit}
          disabled={!message.trim() || isLoading}
          className={`
            flex-shrink-0 p-3 rounded-xl
            transition-smooth
            ${
              message.trim() && !isLoading
                ? "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white glow-subtle hover:glow"
                : "bg-dark-700/50 text-dark-500 cursor-not-allowed"
            }
          `}
          aria-label={isLoading ? "Enviando mensaje" : "Enviar mensaje"}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Contador de caracteres (opcional, se muestra después de 500 caracteres) */}
      {message.length > 500 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`
            text-xs mt-2 text-right
            ${message.length > 4000 ? "text-red-400" : "text-dark-500"}
          `}
        >
          {message.length} / 4000
        </motion.p>
      )}
    </motion.div>
  );
});

ChatInput.displayName = "ChatInput";

export default ChatInput;

