import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import { useStreamingChat } from "@/hooks/useStreamingChat";
import Header from "@/components/Header";

const Index = () => {
  const { messages, isLoading, sendMessage } = useStreamingChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)] flex flex-col">
      <Header />

      {/* Chat Area */}
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col max-w-4xl">
        <div className="flex-1 overflow-y-auto mb-4 space-y-1">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Welcome to Aeromatrics! 👋
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  I'm your friendly AI assistant ready to help with questions, translations,
                  and recommendations. I speak English, हिंदी, and मराठी!
                </p>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="p-3 rounded-lg bg-card border border-border text-left">
                    💬 Ask me anything in your preferred language
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border text-left">
                    🌍 Get India-centric examples and insights
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border text-left">
                    🔄 Translate between English, Hindi, and Marathi
                  </div>
                </div>
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <ChatMessage key={idx} role={msg.role} content={msg.content} />
          ))}

          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
          <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;
