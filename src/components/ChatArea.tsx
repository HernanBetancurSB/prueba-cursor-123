"use client";

import { useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Brain, Code2, MessageCircle } from "lucide-react";
import { Conversation } from "@/types";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

type ChatAreaProps = {
  conversation: Conversation | undefined;
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onNewConversation: () => void;
};

const features = [
  {
    icon: Brain,
    title: "Inteligente",
    description: "Respuestas precisas y contextuales",
  },
  {
    icon: Zap,
    title: "Rápido",
    description: "Respuestas instantáneas",
  },
  {
    icon: Code2,
    title: "Código",
    description: "Ayuda con programación",
  },
  {
    icon: MessageCircle,
    title: "Natural",
    description: "Conversación fluida",
  },
];

const suggestedPrompts = [
  "¿Cómo puedo mejorar mi productividad?",
  "Explícame qué es React en términos simples",
  "Dame ideas para un proyecto personal",
  "¿Cuáles son las mejores prácticas de programación?",
];

const ChatArea = memo(({
  conversation,
  isLoading,
  onSendMessage,
  onNewConversation,
}: ChatAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll cuando hay nuevos mensajes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation?.messages, isLoading]);

  const handleSuggestedPrompt = (prompt: string) => {
    onSendMessage(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  const hasMessages = conversation && conversation.messages.length > 0;

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,120,255,0.1),transparent_50%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Área de mensajes */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto relative z-10"
      >
        <AnimatePresence mode="wait">
          {!hasMessages ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-full px-4 py-8"
            >
              {/* Logo y título */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-6 glow"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-white mb-2"
              >
                Bienvenido a <span className="text-gradient">Nexus Chat</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-dark-300 text-center max-w-md mb-8"
              >
                Tu asistente de inteligencia artificial para conversaciones
                inteligentes y productivas
              </motion.p>

              {/* Características */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl w-full"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="glass-effect-light rounded-xl p-4 text-center hover:border-primary-500/30 transition-smooth"
                  >
                    <feature.icon className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                    <h3 className="text-white font-medium text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-dark-400 text-xs mt-1">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Sugerencias */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full max-w-2xl"
              >
                <p className="text-dark-400 text-sm text-center mb-4">
                  Prueba con alguna de estas sugerencias:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suggestedPrompts.map((prompt, index) => (
                    <motion.button
                      key={prompt}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      onClick={() => handleSuggestedPrompt(prompt)}
                      onKeyDown={(e) =>
                        handleKeyDown(e, () => handleSuggestedPrompt(prompt))
                      }
                      tabIndex={0}
                      className="
                        p-4 rounded-xl text-left
                        glass-effect-light
                        hover:border-primary-500/30 hover:bg-dark-700/50
                        transition-smooth group
                      "
                      aria-label={`Usar sugerencia: ${prompt}`}
                    >
                      <p className="text-dark-200 text-sm group-hover:text-white transition-colors">
                        {prompt}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-4xl mx-auto px-4 py-6"
            >
              {conversation.messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isLast={index === conversation.messages.length - 1}
                />
              ))}

              {isLoading && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input de chat */}
      <div className="relative z-10 border-t border-dark-700/50 bg-dark-900/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
          <p className="text-center text-dark-500 text-xs mt-3">
            Nexus Chat puede cometer errores. Verifica la información importante.
          </p>
        </div>
      </div>
    </div>
  );
});

ChatArea.displayName = "ChatArea";

export default ChatArea;

