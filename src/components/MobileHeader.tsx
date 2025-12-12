"use client";

import { memo } from "react";
import { Menu, Sparkles } from "lucide-react";

type MobileHeaderProps = {
  conversationTitle?: string;
  onMenuClick: () => void;
};

const MobileHeader = memo(({ conversationTitle, onMenuClick }: MobileHeaderProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onMenuClick();
    }
  };

  return (
    <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-dark-700/50 glass-effect">
      <button
        onClick={onMenuClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="p-2 rounded-lg hover:bg-dark-700/50 transition-smooth"
        aria-label="Abrir menú"
      >
        <Menu className="w-6 h-6 text-dark-300" />
      </button>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bolivar-greenLight to-bolivar-green flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-medium text-white truncate">
          {conversationTitle || "Bolívar Chat"}
        </span>
      </div>
    </header>
  );
});

MobileHeader.displayName = "MobileHeader";

export default MobileHeader;

