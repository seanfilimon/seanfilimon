"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const transport = new DefaultChatTransport({ api: "/api/chat" });

const SUGGESTIONS = [
  "What has Sean built?",
  "Show me deployment guides",
  "Articles on version control",
];

export function AiChat() {
  const { messages, sendMessage, status } = useChat({ transport });
  const [input, setInput] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "submitted" || status === "streaming";
  const hasMessages = messages.length > 0;

  const send = useCallback(
    (text: string) => {
      if (!text.trim() || isLoading) return;
      sendMessage({ text: text.trim() });
      setInput("");
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
    },
    [isLoading, sendMessage],
  );

  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      send(input);
    },
    [input, send],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    },
    [],
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden border border-fd-border bg-fd-card/80 shadow-[0_0_80px_-20px_rgba(255,255,255,0.03)]">
        <AnimatePresence>
          {hasMessages && (
            <motion.div
              initial={{ height: 0, opacity: 0, filter: "blur(6px)" }}
              animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
              exit={{ height: 0, opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="gpu will-change-filter"
            >
              <div
                ref={scrollRef}
                className="max-h-80 overflow-y-auto border-b border-fd-border"
              >
                <div className="flex flex-col gap-px bg-fd-border">
                  {messages.map((msg) => {
                    const text = msg.parts
                      .filter(
                        (p): p is { type: "text"; text: string } =>
                          p.type === "text",
                      )
                      .map((p) => p.text)
                      .join("");

                    if (!text) return null;

                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, filter: "blur(8px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                        className="gpu will-change-filter bg-fd-card px-5 py-4"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 inline-block h-5 w-5 shrink-0 text-center text-[10px] font-bold leading-5 ${
                              msg.role === "user"
                                ? "bg-fd-foreground text-fd-background"
                                : "border border-fd-border text-fd-muted-foreground"
                            }`}
                          >
                            {msg.role === "user" ? "Y" : "A"}
                          </span>
                          <div className="min-w-0 flex-1 whitespace-pre-wrap text-sm leading-relaxed [&_a]:text-fd-foreground [&_a]:underline [&_a]:underline-offset-2">
                            {text}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  {isLoading &&
                    messages.length > 0 &&
                    messages[messages.length - 1]?.role === "user" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-fd-card px-5 py-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-block h-5 w-5 shrink-0 border border-fd-border text-center text-[10px] font-bold leading-5 text-fd-muted-foreground">
                            A
                          </span>
                          <span className="inline-flex items-center gap-1 pt-1">
                            <span className="h-1 w-1 animate-pulse bg-fd-muted-foreground" />
                            <span className="h-1 w-1 animate-pulse bg-fd-muted-foreground [animation-delay:150ms]" />
                            <span className="h-1 w-1 animate-pulse bg-fd-muted-foreground [animation-delay:300ms]" />
                          </span>
                        </div>
                      </motion.div>
                    )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form ref={formRef} onSubmit={submit} className="flex items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={
              hasMessages
                ? "Follow up..."
                : "Ask about projects, find guides, explore topics..."
            }
            rows={1}
            className="flex-1 resize-none bg-transparent px-5 py-4 text-sm text-fd-foreground outline-none placeholder:text-fd-muted-foreground"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center bg-fd-foreground text-fd-background transition-opacity disabled:opacity-20"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className={isLoading ? "animate-pulse" : ""}
            >
              <path
                d="M7 1v12M1 7l6-6 6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </button>
        </form>
      </div>

      <AnimatePresence>
        {!hasMessages && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.25 }}
            className="gpu will-change-filter flex flex-wrap items-center justify-center gap-2"
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="border border-fd-border/50 bg-fd-card/40 px-3 py-1.5 text-xs text-fd-muted-foreground transition-colors hover:border-fd-border hover:text-fd-foreground"
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
