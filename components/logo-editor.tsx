"use client"

import { useState, useRef, useEffect } from "react"
import {
  Download,
  Send,
  RotateCcw,
  Copy,
  Check,
  ArrowLeft,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"

const sampleSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="48" fill="url(#grad1)"/>
  <g transform="translate(200,200)">
    <polygon points="0,-80 69.3,40 -69.3,40" fill="white" opacity="0.95"/>
    <circle cx="0" cy="0" r="28" fill="url(#grad1)"/>
    <circle cx="0" cy="-80" r="8" fill="white" opacity="0.7"/>
    <circle cx="69.3" cy="40" r="8" fill="white" opacity="0.7"/>
    <circle cx="-69.3" cy="40" r="8" fill="white" opacity="0.7"/>
  </g>
  <text x="200" y="340" font-family="system-ui, sans-serif" font-size="36" font-weight="700" fill="white" text-anchor="middle" opacity="0.95">TECHFLOW</text>
</svg>`

const suggestions = [
  "Change color to blue",
  "Make the shape round",
  "Make text bigger",
  "Use dark background",
]

type Message = {
  role: "user" | "assistant"
  text: string
}

export function LogoEditor() {
  const [svgContent, setSvgContent] = useState(sampleSVG)
  const [command, setCommand] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Your logo is ready! Describe any changes you'd like to make." },
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isProcessing])

  const processCommand = (text: string) => {
    if (!text.trim() || isProcessing) return

    const userMsg = text.trim()
    setMessages((prev) => [...prev, { role: "user", text: userMsg }])
    setCommand("")
    setIsProcessing(true)

    setTimeout(() => {
      let newSvg = svgContent
      const lower = userMsg.toLowerCase()

      if (lower.includes("red") || lower.includes("warm")) {
        newSvg = svgContent.replace(/#6366f1/g, "#ef4444").replace(/#8b5cf6/g, "#f97316")
      } else if (lower.includes("green") || lower.includes("nature")) {
        newSvg = svgContent.replace(/#6366f1/g, "#10b981").replace(/#8b5cf6/g, "#059669")
      } else if (lower.includes("blue") || lower.includes("ocean")) {
        newSvg = svgContent.replace(/#6366f1/g, "#3b82f6").replace(/#8b5cf6/g, "#2563eb")
      } else if (lower.includes("dark") || lower.includes("black")) {
        newSvg = svgContent.replace(/#6366f1/g, "#1e293b").replace(/#8b5cf6/g, "#334155")
      } else if (lower.includes("round") || lower.includes("circle")) {
        newSvg = svgContent.replace(
          /<polygon[^/]*\/>/,
          '<circle cx="0" cy="0" r="65" fill="white" opacity="0.95"/>'
        )
      } else if (lower.includes("bigger") || lower.includes("larger")) {
        newSvg = svgContent.replace(/font-size="36"/, 'font-size="44"')
      } else if (lower.includes("smaller") || lower.includes("less")) {
        newSvg = svgContent.replace(/font-size="36"/, 'font-size="28"')
      }

      setSvgContent(newSvg)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            newSvg !== svgContent
              ? "Done! I've updated your logo."
              : "Changes applied. What else would you like to tweak?",
        },
      ])
      setIsProcessing(false)
    }, 1000)
  }

  const handleDownload = () => {
    const blob = new Blob([svgContent], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "logo.svg"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(svgContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Top bar - minimal, only essential actions */}
      <header className="flex items-center justify-between px-3 py-2 md:px-4 md:py-2.5 border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-2">
          <Link
            href="/app/projects"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to projects</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-sm font-semibold truncate">TECHFLOW Logo</h1>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground"
            onClick={() => setSvgContent(sampleSVG)}
          >
            <RotateCcw className="h-4 w-4" />
            <span className="sr-only">Reset</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy SVG</span>
          </Button>
          <Button
            size="sm"
            onClick={handleDownload}
            className="rounded-lg gap-1.5 h-8 text-xs font-medium"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export SVG</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </header>

      {/* Main content: logo + chat, side by side on desktop, stacked on mobile */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Logo display area - clean, centered, no decorations */}
        <div className="flex items-center justify-center bg-muted/30 md:flex-1 shrink-0 h-[35dvh] md:h-auto">
          <div
            className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px] drop-shadow-xl transition-all duration-300"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>

        {/* Chat panel - always fully visible, takes remaining space */}
        <div className="flex-1 flex flex-col min-h-0 border-t md:border-t-0 md:border-l border-border md:w-[360px] lg:w-[400px] md:flex-none bg-muted/30">
          {/* Chat header */}
          <div className="flex items-center gap-2 px-4 py-1.5 border-b border-border shrink-0">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold leading-none">AI Editor</h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">Describe changes naturally</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 min-h-0">
            <div className="flex flex-col gap-2.5">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "text-[13px] leading-relaxed rounded-2xl px-3.5 py-2.5 max-w-[85%] break-words",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  )}
                >
                  {msg.text}
                </div>
              ))}
              {isProcessing && (
                <div className="bg-muted text-foreground text-[13px] rounded-2xl rounded-bl-md px-3.5 py-2.5 max-w-[85%]">
                  <span className="flex items-center gap-2">
                    <span className="flex gap-0.5">
                      <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                    <span className="text-muted-foreground">Updating logo...</span>
                  </span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Suggestion chips - shown when no messages from user yet */}
          {messages.length <= 1 && !isProcessing && (
            <div className="flex flex-wrap gap-1.5 px-3 md:px-4 pb-2 shrink-0">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => processCommand(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors active:scale-95"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 md:p-4 pt-2 md:pt-2 border-t border-border shrink-0" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                processCommand(command)
              }}
              className="flex gap-2"
            >
              <Input
                ref={inputRef}
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Describe a change..."
                className="rounded-xl h-10 text-sm bg-card"
                disabled={isProcessing}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!command.trim() || isProcessing}
                className="rounded-xl h-10 w-10 shrink-0"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
