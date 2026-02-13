import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import type { Msg } from "@/lib/streamChat";

interface ChatMessageProps {
  message: Msg;
  isLatest?: boolean;
}

const ChatMessage = ({ message, isLatest }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 animate-slide-up ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
          isUser
            ? "bg-neon-purple/20 border border-neon-purple/40"
            : "bg-primary/10 border border-primary/30 animate-glow-pulse"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-neon-purple" />
        ) : (
          <Bot className="w-4 h-4 text-primary" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-[80%] sm:max-w-[70%] px-4 py-3 rounded-lg ${
          isUser ? "message-user" : "message-assistant"
        }`}
      >
        <div className={`text-xs font-display mb-1 tracking-wider ${isUser ? "text-neon-purple/70 text-right" : "text-primary/70"}`}>
          {isUser ? "YOU" : "LIBERIN"}
        </div>
        <div className="prose-game text-sm leading-relaxed text-foreground">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              code: ({ children, className }) => {
                const isBlock = className?.includes("language-");
                return isBlock ? (
                  <pre className="bg-background/50 border border-hud-border rounded-md p-3 my-2 overflow-x-auto font-mono-game text-xs">
                    <code>{children}</code>
                  </pre>
                ) : (
                  <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono-game text-xs">
                    {children}
                  </code>
                );
              },
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
              strong: ({ children }) => <strong className="text-primary font-semibold">{children}</strong>,
              h1: ({ children }) => <h1 className="text-lg font-display text-primary mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base font-display text-primary mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-sm font-display text-primary mb-1">{children}</h3>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
