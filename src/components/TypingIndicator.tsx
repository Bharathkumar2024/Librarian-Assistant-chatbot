import { Bot } from "lucide-react";

const TypingIndicator = () => (
  <div className="flex gap-3 animate-slide-up">
    <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/30 animate-glow-pulse">
      <Bot className="w-4 h-4 text-primary" />
    </div>
    <div className="message-assistant px-4 py-3 rounded-lg">
      <div className="text-xs font-display mb-1 tracking-wider text-primary/70">LIBERIN</div>
      <div className="flex gap-1.5 items-center h-5">
        <span className="w-2 h-2 rounded-full bg-primary typing-pulse" style={{ animationDelay: "0s" }} />
        <span className="w-2 h-2 rounded-full bg-primary typing-pulse" style={{ animationDelay: "0.3s" }} />
        <span className="w-2 h-2 rounded-full bg-primary typing-pulse" style={{ animationDelay: "0.6s" }} />
      </div>
    </div>
  </div>
);

export default TypingIndicator;
