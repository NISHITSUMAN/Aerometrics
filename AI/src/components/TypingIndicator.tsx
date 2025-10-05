import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
        <Bot className="w-5 h-5 text-white" />
      </div>
      
      <div className="bg-[hsl(var(--ai-bubble))] text-foreground border border-border rounded-2xl px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
