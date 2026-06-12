"use client";

import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [reactions, setReactions] = useState<Record<number, string[]>>({});
  const [showReactionPicker, setShowReactionPicker] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const emojis = ["👍", "❤️", "😂", "😮", "😢", "🔥", "👏"];

  const addReaction = (msgIndex: number, emoji: string) => {
    setReactions((prev) => ({
      ...prev,
      [msgIndex]: [...(prev[msgIndex] || []), emoji],
    }));
    setShowReactionPicker(null);
  };

  const copyMessage = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: message.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
        }),
      });

      const data = await res.json();
      const aiMessage = {
        role: "assistant",
        content: data.reply || "Sorry, I could not get a response.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
      console.error("Chat send error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`h-screen flex ${theme === "dark" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950"}`}>
      <aside className={`flex w-48 flex-col gap-3 border-r px-3 py-4 ${theme === "dark" ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"}`}>
        <div className="px-3 pb-2 text-xs uppercase tracking-[0.3em] text-slate-400">
          Options
        </div>

        <button
          onClick={clearChat}
          className={`flex items-center gap-3 rounded-3xl border px-3 py-3 text-sm transition ${theme === "dark" ? "border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800" : "border-slate-300 bg-slate-100 text-slate-950 hover:bg-slate-200"}`}
        >
          <span>➕</span>
          <span>New Chat</span>
        </button>

        <button
          onClick={toggleTheme}
          className={`flex items-center gap-3 rounded-3xl border px-3 py-3 text-sm transition ${theme === "dark" ? "border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800" : "border-slate-300 bg-slate-100 text-slate-950 hover:bg-slate-200"}`}
        >
          <span>🌓</span>
          <span>Theme</span>
        </button>

        <button
          className={`flex items-center gap-3 rounded-3xl border px-3 py-3 text-sm transition ${theme === "dark" ? "border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800" : "border-slate-300 bg-slate-100 text-slate-950 hover:bg-slate-200"}`}
        >
          <span>🔍</span>
          <span>Search</span>
        </button>

        <button
          className={`flex items-center gap-3 rounded-3xl border px-3 py-3 text-sm transition ${theme === "dark" ? "border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800" : "border-slate-300 bg-slate-100 text-slate-950 hover:bg-slate-200"}`}
        >
          <span>💬</span>
          <span>Chat Project</span>
        </button>

        <button
          className={`flex items-center gap-3 rounded-3xl border px-3 py-3 text-sm transition ${theme === "dark" ? "border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800" : "border-slate-300 bg-slate-100 text-slate-950 hover:bg-slate-200"}`}
        >
          <span>⚙️</span>
          <span>Settings</span>
        </button>

        <button
          className={`flex items-center gap-3 rounded-3xl border px-3 py-3 text-sm transition ${theme === "dark" ? "border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800" : "border-slate-300 bg-slate-100 text-slate-950 hover:bg-slate-200"}`}
        >
          <span>👤</span>
          <span>Profile</span>
        </button>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className={`flex items-center justify-between gap-4 border-b px-5 py-4 ${theme === "dark" ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"}`}>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-sky-400">AI Chat</p>
            <h1 className="text-2xl font-semibold">🤖 Ibrahim AI</h1>
          </div>

          <button
            onClick={clearChat}
            className={`rounded-full border px-4 py-2 text-sm transition ${theme === "dark" ? "border-slate-700 bg-slate-800 text-slate-200 hover:border-slate-500 hover:text-white" : "border-slate-300 bg-slate-100 text-slate-950 hover:border-slate-400"}`}
          >
            Clear Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {messages.length === 0 ? (
            <div className={`mx-auto mt-16 max-w-xl rounded-3xl border border-dashed px-6 py-10 text-center ${theme === "dark" ? "border-slate-700 bg-slate-900/80 text-slate-400" : "border-slate-300 bg-white text-slate-500"}`}>
              Start the conversation by typing a message below.
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex group ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex flex-col">
                  <div className="flex items-end gap-2">
                    {msg.role === "user" && (
                      <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                        <button
                          onClick={() => setShowReactionPicker(showReactionPicker === index ? null : index)}
                          className={`rounded-full px-2 py-1 text-xs transition ${theme === "dark" ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-300 hover:bg-slate-400"}`}
                        >
                          😊
                        </button>
                        <button
                          onClick={() => copyMessage(msg.content, index)}
                          className={`rounded-full px-2 py-1 text-xs transition ${copiedIndex === index ? "bg-green-600" : theme === "dark" ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-300 hover:bg-slate-400"}`}
                        >
                          {copiedIndex === index ? "✓" : "📋"}
                        </button>
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                        msg.role === "user"
                          ? "bg-sky-500 text-slate-950 rounded-br-none"
                          : theme === "dark"
                          ? "bg-slate-800 text-slate-100 rounded-bl-none"
                          : "bg-slate-200 text-slate-950 rounded-bl-none"
                      }`}
                    >
                      <div className="mb-1 text-[11px] uppercase tracking-[0.15em] opacity-70">
                        {msg.role === "user" ? "You" : "AI"}
                      </div>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                    {msg.role !== "user" && (
                      <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                        <button
                          onClick={() => setShowReactionPicker(showReactionPicker === index ? null : index)}
                          className={`rounded-full px-2 py-1 text-xs transition ${theme === "dark" ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-300 hover:bg-slate-400"}`}
                        >
                          😊
                        </button>
                        <button
                          onClick={() => copyMessage(msg.content, index)}
                          className={`rounded-full px-2 py-1 text-xs transition ${copiedIndex === index ? "bg-green-600" : theme === "dark" ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-300 hover:bg-slate-400"}`}
                        >
                          {copiedIndex === index ? "✓" : "📋"}
                        </button>
                      </div>
                    )}
                  </div>

                  {showReactionPicker === index && (
                    <div className={`mt-2 flex gap-1 rounded-full px-2 py-1 ${theme === "dark" ? "bg-slate-800" : "bg-slate-300"}`}>
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => addReaction(index, emoji)}
                          className="text-lg transition hover:scale-125"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}

                  {reactions[index] && reactions[index].length > 0 && (
                    <div className="mt-1 flex gap-1">
                      {reactions[index].map((emoji, i) => (
                        <span key={i} className="text-sm">
                          {emoji}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={`border-t px-5 py-4 ${theme === "dark" ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"}`}>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className={`flex-1 rounded-full border px-4 py-3 text-sm outline-none placeholder:text-slate-500 ${theme === "dark" ? "border-slate-800 bg-slate-950 text-white" : "border-slate-300 bg-white text-slate-950"}`}
            />

            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}