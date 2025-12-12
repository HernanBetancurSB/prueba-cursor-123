"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MessageSquare,
  Trash2,
  X,
  Sparkles,
} from "lucide-react";
import { Conversation } from "@/types";

type SidebarProps = {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = memo(({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  isOpen,
  onClose,
}: SidebarProps) => {
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Hoy";
    if (days === 1) return "Ayer";
    if (days < 7) return `Hace ${days} días`;
    return new Date(date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDeleteConversation(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  return (
    <>
      {/* Sidebar Desktop */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-80 flex flex-col
          glass-effect
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center glow-subtle">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white text-lg">Nexus Chat</h1>
              <p className="text-xs text-dark-400">Asistente de IA</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-dark-700/50 transition-smooth"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5 text-dark-400" />
          </button>
        </div>

        {/* Botón Nueva Conversación */}
        <div className="p-4">
          <button
            onClick={onNewConversation}
            onKeyDown={(e) => handleKeyDown(e, onNewConversation)}
            tabIndex={0}
            className="
              w-full flex items-center justify-center gap-2 
              py-3 px-4 rounded-xl
              bg-gradient-to-r from-primary-600 to-primary-500
              hover:from-primary-500 hover:to-primary-400
              text-white font-medium
              transition-smooth glow-subtle hover:glow
              focus:ring-2 focus:ring-primary-400/50
            "
            aria-label="Iniciar nueva conversación"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva conversación</span>
          </button>
        </div>

        {/* Lista de Conversaciones */}
        <div className="flex-1 overflow-y-auto px-3 pb-4">
          <AnimatePresence mode="popLayout">
            {conversations.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-40 text-center px-4"
              >
                <MessageSquare className="w-12 h-12 text-dark-600 mb-3" />
                <p className="text-dark-400 text-sm">
                  No hay conversaciones aún
                </p>
                <p className="text-dark-500 text-xs mt-1">
                  Inicia una nueva conversación
                </p>
              </motion.div>
            ) : (
              <div className="space-y-1">
                {conversations.map((conversation, index) => (
                  <motion.div
                    key={conversation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => onSelectConversation(conversation.id)}
                      onKeyDown={(e) =>
                        handleKeyDown(e, () => onSelectConversation(conversation.id))
                      }
                      className={`
                        group relative flex items-center gap-3 p-3 rounded-xl
                        cursor-pointer transition-smooth
                        ${
                          activeConversationId === conversation.id
                            ? "bg-primary-600/20 border border-primary-500/30"
                            : "hover:bg-dark-700/50 border border-transparent"
                        }
                      `}
                      aria-label={`Conversación: ${conversation.title}`}
                      aria-selected={activeConversationId === conversation.id}
                    >
                      <div
                        className={`
                          w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                          ${
                            activeConversationId === conversation.id
                              ? "bg-primary-500/30 text-primary-400"
                              : "bg-dark-700/50 text-dark-400"
                          }
                        `}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`
                            text-sm font-medium truncate
                            ${
                              activeConversationId === conversation.id
                                ? "text-white"
                                : "text-dark-200"
                            }
                          `}
                        >
                          {conversation.title}
                        </p>
                        <p className="text-xs text-dark-500 mt-0.5">
                          {formatDate(conversation.updatedAt)}
                        </p>
                      </div>

                      <button
                        onClick={(e) => handleDeleteClick(e, conversation.id)}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          handleKeyDown(e, () => onDeleteConversation(conversation.id));
                        }}
                        tabIndex={0}
                        className="
                          opacity-0 group-hover:opacity-100
                          p-2 rounded-lg
                          hover:bg-red-500/20 text-dark-400 hover:text-red-400
                          transition-smooth
                        "
                        aria-label={`Eliminar conversación: ${conversation.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-dark-700/50">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-dark-800/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Usuario</p>
              <p className="text-xs text-dark-400">Plan Gratuito</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;

