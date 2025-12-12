"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { User, Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Message } from "@/types";

type MessageBubbleProps = {
  message: Message;
  isLast: boolean;
};

const MessageBubble = memo(({ message, isLast }: MessageBubbleProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCopy();
    }
  };

  // Formatear contenido con markdown básico
  const formattedContent = useMemo(() => {
    let content = message.content;

    // Código en bloque
    content = content.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      '<pre><code class="language-$1">$2</code></pre>'
    );

    // Código inline
    content = content.replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-dark-800 text-primary-300 text-sm">$1</code>'
    );

    // Negrita
    content = content.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

    // Cursiva
    content = content.replace(/\*([^*]+)\*/g, "<em>$1</em>");

    // Listas
    content = content.replace(/^- (.+)$/gm, "<li>$1</li>");
    content = content.replace(/(<li>.*<\/li>\n?)+/g, "<ul class=\"list-disc ml-6 my-2\">$&</ul>");

    // Listas numeradas
    content = content.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

    // Saltos de línea
    content = content.replace(/\n/g, "<br />");

    return content;
  }, [message.content]);

  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 mb-6 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`
          flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
          ${
            isUser
              ? "bg-gradient-to-br from-bolivar-greenBright to-bolivar-accent"
              : "bg-gradient-to-br from-bolivar-greenLight to-bolivar-green glow-subtle"
          }
        `}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Sparkles className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Contenido del mensaje */}
      <div className={`flex-1 max-w-[85%] ${isUser ? "text-right" : ""}`}>
        <div
          className={`
            inline-block rounded-2xl px-5 py-3 max-w-full
            ${
              isUser
                ? "bg-gradient-to-br from-bolivar-green to-bolivar-greenLight text-white rounded-tr-md"
                : "glass-effect text-dark-100 rounded-tl-md"
            }
          `}
        >
          <div
            className={`text-sm leading-relaxed markdown-content ${
              isUser ? "" : "text-left"
            }`}
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        </div>

        {/* Footer del mensaje */}
        <div
          className={`
            flex items-center gap-2 mt-2 text-xs text-dark-500
            ${isUser ? "justify-end" : "justify-start"}
          `}
        >
          <span>{formatTime(message.timestamp)}</span>

          {!isUser && (
            <button
              onClick={handleCopy}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              className="
                p-1.5 rounded-md
                hover:bg-dark-700/50 
                transition-smooth
                flex items-center gap-1
              "
              aria-label={copied ? "Copiado" : "Copiar mensaje"}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
});

MessageBubble.displayName = "MessageBubble";

export default MessageBubble;

