import { useState, useRef, useEffect } from "react";
import { Sparkles, Trash2, Terminal } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { streamChat, type Msg } from "@/lib/streamChat";
import { toast } from "sonner";

const WELCOME_SUGGESTIONS = [
  "What can you help me with?",
  "Tell me a fun tech fact",
  "Write a short story",
  "Help me brainstorm ideas",
];

const LiberinChat = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const send = async (input: string) => {
    const userMsg: Msg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let assistantSoFar = "";
    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => setIsLoading(false),
        onError: (err) => {
          toast.error(err);
          setIsLoading(false);
        },
      });
    } catch (e) {
      console.error(e);
      toast.error("Connection lost. Try again.");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <header className="flex-shrink-0 glass-panel border-b border-hud-border px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center animate-glow-pulse">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold tracking-wider text-primary neon-glow">
                THE HUMAN MADE
              </h1>
              <p className="text-[10px] font-mono-game text-muted-foreground tracking-widest uppercase">
                Assistant • Online
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="w-9 h-9 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-all"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto scrollbar-game px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-slide-up">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center animate-glow-pulse">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <div className="text-center">
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-primary neon-glow mb-2">
                  THE HUMAN MADE
                </h2>
                <p className="text-muted-foreground font-body text-base sm:text-lg max-w-md">
                  I am Liberin Assistant. What do you want?
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg mt-2">
                {WELCOME_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="glass-panel rounded-lg px-4 py-3 text-sm text-left font-body text-foreground/80 hover:border-primary/40 hover:text-primary transition-all duration-200 neon-border"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} isLatest={i === messages.length - 1} />
            ))
          )}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <TypingIndicator />
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input area */}
      <footer className="flex-shrink-0 px-4 sm:px-6 pb-4 pt-2">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSend={send} disabled={isLoading} />
          <p className="text-center text-[10px] font-mono-game text-muted-foreground mt-2 tracking-wider">
            THE HUMAN MADE v1.0 • POWERED BY HUMAN INGENUITY
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LiberinChat;
