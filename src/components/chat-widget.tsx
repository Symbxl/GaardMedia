"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

interface Message {
  from: "them" | "me";
  text: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "them",
      text: "Hey, let me know if you need any help! Feel free to call or you can send me a message here.",
    },
    {
      from: "them",
      text: "My number is 407-255-4074",
    },
  ]);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show notification bubble after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!open) setShowBubble(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [open]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSend = async () => {
    if (!input.trim() || submitted || sending) return;

    const userMessage = input.trim();
    setInput("");
    setSending(true);
    setMessages((prev) => [...prev, { from: "me", text: userMessage }]);

    try {
      // TODO: Replace YOUR_FORM_ID with your Formspree form ID from https://formspree.io
      // Create a free form at formspree.io and set the recipient to inquirezach@gmail.com
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          _subject: "New Chat Message from Gaard Media Website",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setMessages((prev) => [
          ...prev,
          { from: "them", text: "Thanks! We'll get back to you asap!" },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: "them", text: "Something went wrong. Please try calling us at 407-255-4074!" },
        ]);
        setSending(false);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "them", text: "Something went wrong. Please try calling us at 407-255-4074!" },
      ]);
      setSending(false);
    }
  };

  return (
    <>
      {/* ── Chat Window ── */}
      <div
        className={`fixed bottom-24 right-5 z-[9999] w-[340px] sm:w-[370px] transition-all duration-300 origin-bottom-right ${
          open
            ? "scale-100 opacity-100 pointer-events-auto translate-y-0"
            : "scale-90 opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        <div className="rounded-2xl shadow-2xl border border-gray-200 overflow-hidden bg-white flex flex-col" style={{ maxHeight: "min(480px, calc(100vh - 140px))" }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4 flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20">
                <Image src="/pfp.webp" alt="Gaard Media" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-gray-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold">Gaard Media</p>
              <p className="text-green-400 text-xs">Online now</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors p-1 cursor-pointer"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50" style={{ minHeight: "200px" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                {msg.from === "them" && (
                  <div className="w-7 h-7 rounded-full overflow-hidden mr-2 mt-1 flex-shrink-0">
                    <Image src="/pfp.webp" alt="Gaard Media" width={28} height={28} className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.from === "me"
                      ? "bg-red-600 text-white rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 bg-white px-3 py-3">
            {submitted ? (
              <div className="text-center text-sm text-gray-500 py-1.5">
                <span className="text-green-600 font-medium">Message sent!</span> We&apos;ll be in touch soon.
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href="tel:4072554074"
                  className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  title="Call 407-255-4074"
                >
                  <PhoneIcon className="w-4 h-4 text-gray-600" />
                </a>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500/30 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || sending}
                  className="flex-shrink-0 w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 disabled:bg-gray-200 flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  <SendIcon className={`w-4 h-4 ${input.trim() && !sending ? "text-white" : "text-gray-400"}`} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Floating Button ── */}
      <button
        onClick={() => {
          setOpen(!open);
          setShowBubble(false);
        }}
        className="fixed bottom-5 right-5 z-[9999] group cursor-pointer"
      >
        {/* Notification bubble */}
        {showBubble && !open && (
          <div className="absolute -top-12 right-0 bg-gray-900 text-white text-xs font-medium rounded-xl px-3 py-2 whitespace-nowrap shadow-lg animate-bounce">
            Hey, need any help? 👋
            <div className="absolute -bottom-1 right-5 w-2.5 h-2.5 bg-gray-900 rotate-45" />
          </div>
        )}

        {/* Unread badge */}
        {!open && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
            <span className="text-[10px] font-bold text-white">1</span>
          </div>
        )}

        <div className={`w-14 h-14 rounded-full overflow-hidden shadow-lg ring-4 ring-white transition-all duration-300 ${open ? "scale-90 ring-red-100" : "hover:scale-110 hover:shadow-xl"}`}>
          <Image
            src="/pfp.webp"
            alt="Chat with us"
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Pulse ring */}
        {!open && (
          <div className="absolute inset-0 rounded-full animate-ping bg-red-400/20" style={{ animationDuration: "2s" }} />
        )}
      </button>
    </>
  );
}
