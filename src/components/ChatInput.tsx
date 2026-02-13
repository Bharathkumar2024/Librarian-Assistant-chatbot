import { useState, useRef, useEffect } from "react";
import { Send, Zap } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
  }, [input]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="glass-panel rounded-xl p-2 neon-border">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your message, Commander..."
            disabled={disabled}
            rows={1}
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground font-body text-sm resize-none focus:outline-none px-3 py-2.5 scrollbar-game"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={disabled || !input.trim()}
          className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/30 hover:border-primary/60 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed group"
        >
          {disabled ? (
            <Zap className="w-4 h-4 animate-pulse" />
          ) : (
            <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
