"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Download,
  Send,
  RotateCcw,
  Copy,
  Check,
  ArrowLeft,
  Sparkles,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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


export function LogoEditor() {
  const [svgContent, setSvgContent] = useState(sampleSVG)
  const [command, setCommand] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [lastResponse, setLastResponse] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const [zoom, setZoom] = useState(100)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const lastTouchRef = useRef<{ dist: number; x: number; y: number } | null>(null)
  const lastPanRef = useRef<{ x: number; y: number } | null>(null)
  const isDragging = useRef(false)
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null)

  // Pinch-to-zoom & pan touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2
      lastTouchRef.current = { dist, x: cx, y: cy }
      lastPanRef.current = null
    } else if (e.touches.length === 1) {
      lastPanRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      lastTouchRef.current = null
    }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchRef.current) {
      e.preventDefault()
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const scale = dist / lastTouchRef.current.dist
      setZoom((z) => Math.round(Math.min(300, Math.max(50, z * scale))))
      lastTouchRef.current = { ...lastTouchRef.current, dist }
    } else if (e.touches.length === 1 && lastPanRef.current) {
      e.preventDefault()
      const deltaX = e.touches[0].clientX - lastPanRef.current.x
      const deltaY = e.touches[0].clientY - lastPanRef.current.y
      setPan((p) => ({ x: p.x + deltaX, y: p.y + deltaY }))
      lastPanRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    lastTouchRef.current = null
    lastPanRef.current = null
  }, [])

  const resetView = useCallback(() => {
    setZoom(100)
    setPan({ x: 0, y: 0 })
  }, [])

  // Mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    setZoom((z) => Math.round(Math.min(300, Math.max(50, z - e.deltaY * 0.5))))
  }, [])

  // Mouse drag pan
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return
    isDragging.current = true
    lastMouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !lastMouseRef.current) return
    const deltaX = e.clientX - lastMouseRef.current.x
    const deltaY = e.clientY - lastMouseRef.current.y
    setPan((p) => ({ x: p.x + deltaX, y: p.y + deltaY }))
    lastMouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
    lastMouseRef.current = null
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [lastResponse])

  const processCommand = (text: string) => {
    if (!text.trim() || isProcessing) return

    const userMsg = text.trim()
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
      setLastResponse(
        newSvg !== svgContent
          ? `✅ Done — "${userMsg}"`
          : `Applied — "${userMsg}"`
      )
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
        <TooltipProvider delayDuration={0}>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg text-muted-foreground"
                  onClick={() => setSvgContent(sampleSVG)}
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="sr-only">Reset</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset to original</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
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
              </TooltipTrigger>
              <TooltipContent>{copied ? "Copied!" : "Copy SVG code"}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  className="rounded-lg gap-1.5 h-8 text-xs font-medium"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Export SVG</span>
                  <span className="sm:hidden">Export</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download as SVG file</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </header>

      {/* Full-screen logo area with floating prompt */}
      <div className="flex-1 relative overflow-hidden">
        {/* Logo canvas with dot grid */}
        <div
          className="absolute inset-0 flex items-center justify-center touch-none pb-20 cursor-grab active:cursor-grabbing"
          style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className={cn(
              "drop-shadow-xl pointer-events-none select-none",
              isProcessing && "scale-95 opacity-40 blur-[2px] transition-all duration-500"
            )}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom / 100})`,
            }}
          >
            <div
              className="w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px]"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
          {isProcessing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/15 backdrop-blur-sm animate-pulse">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">Updating...</span>
            </div>
          )}
        </div>

        {/* Zoom controls — bottom right */}
        <div className="absolute bottom-24 right-3 md:bottom-20 md:right-4 z-20 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-sm p-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-md"
            onClick={() => setZoom((z) => Math.max(50, z - 25))}
            disabled={zoom <= 50}
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <button
            onClick={resetView}
            className="text-[10px] font-medium text-muted-foreground tabular-nums w-10 text-center hover:text-foreground transition-colors"
          >
            {zoom}%
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-md"
            onClick={() => setZoom((z) => Math.min(200, z + 25))}
            disabled={zoom >= 200}
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Floating prompt — bottom center */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none p-3 md:p-4" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          <div className="max-w-xl mx-auto pointer-events-auto">
            {(isProcessing || lastResponse) && (
              <div className="text-[11px] text-muted-foreground text-center mb-1.5 truncate">
                {isProcessing ? "Updating logo..." : lastResponse}
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                processCommand(command)
              }}
            >
              <div className="rounded-2xl border border-border bg-background/90 backdrop-blur-md shadow-lg focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/50 transition-all">
                <div className="flex items-center gap-2 px-3 py-2.5">
                  <Sparkles className="h-4 w-4 text-primary shrink-0" />
                  <Input
                    ref={inputRef}
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="Ex: change color to blue..."
                    className="border-0 shadow-none focus-visible:ring-0 h-auto p-0 text-sm bg-transparent placeholder:text-muted-foreground/60"
                    disabled={isProcessing}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!command.trim() || isProcessing}
                    className="rounded-xl h-8 w-8 shrink-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
