"use client";

import { useState } from "react";
import { useChat } from "@/hooks";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import MobileHeader from "@/components/MobileHeader";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chat = useChat();

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <main className="flex h-screen w-full overflow-hidden bg-dark-950">
      {/* Overlay para móvil */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={handleCloseSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        conversations={chat.conversations}
        activeConversationId={chat.activeConversationId}
        onSelectConversation={(id) => {
          chat.setActiveConversation(id);
          handleCloseSidebar();
        }}
        onNewConversation={() => {
          chat.createConversation();
          handleCloseSidebar();
        }}
        onDeleteConversation={chat.deleteConversation}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header móvil */}
        <MobileHeader
          conversationTitle={chat.activeConversation?.title}
          onMenuClick={handleToggleSidebar}
        />

        {/* Área de chat */}
        <ChatArea
          conversation={chat.activeConversation}
          isLoading={chat.isLoading}
          onSendMessage={chat.sendMessage}
          onNewConversation={chat.createConversation}
        />
      </div>
    </main>
  );
};

export default HomePage;

