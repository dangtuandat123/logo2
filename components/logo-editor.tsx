"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Download,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  ZoomIn,
  ZoomOut,
  FileCode,
  FileImage,
  ChevronDown,
  ArrowUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"

const colorPalettes = {
  blue: ["#3B82F6", "#1D4ED8", "#93C5FD"],
  emerald: ["#10B981", "#047857", "#6EE7B7"],
  amber: ["#F59E0B", "#D97706", "#FCD34D"],
  rose: ["#F43F5E", "#BE123C", "#FDA4AF"],
  indigo: ["#6366F1", "#4338CA", "#A5B4FC"],
  slate: ["#334155", "#1E293B", "#94A3B8"],
}

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

import { toast } from "sonner"
import api from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"

export function LogoEditor({ projectId }: { projectId: string }) {
  const [svgContent, setSvgContent] = useState<string>("")
  const [originalSvg, setOriginalSvg] = useState<string>("")
  const [brandInfo, setBrandInfo] = useState({ name: "Đang tải...", palette: [] as string[] })
  const [command, setCommand] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastResponse, setLastResponse] = useState("")
  const { fetchUser, user } = useAuth()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
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
    if (lastResponse) textareaRef.current?.focus()
  }, [lastResponse])

  // On mount, load config from sessionStorage and generate base SVG
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${projectId}`)
        const data = res.data
        if (data.svg_content) {
          setSvgContent(data.svg_content)
          setOriginalSvg(data.svg_content)
          setBrandInfo({ name: data.brand_name, palette: data.palette || [] })
        } else {
          toast.error("Logo đang được tạo hoặc bị lỗi.")
        }
      } catch (error) {
        toast.error("Không thể tải thông tin dự án.")
        console.error(error)
      }
    }
    fetchProject()
  }, [projectId])

  // Tự động điều chỉnh chiều cao textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
  }, [])

  const processCommand = async (text: string) => {
    if (!text.trim() || isProcessing) return

    const userMsg = text.trim()
    setCommand("")
    setIsProcessing(true)

    try {
      const res = await api.post('/edit-logo', {
        project_id: projectId,
        command: userMsg
      })

      setSvgContent(res.data.project.svg_content)
      setLastResponse(`✅ ${userMsg}`)
      fetchUser() // Refresh diamonds balance
    } catch (error: any) {
      console.error(error)
      if (error.response?.status === 402) {
        toast.error("Không đủ Kim Cương! Cần 2💎 để chỉnh sửa bằng AI.")
      } else {
        toast.error(error.response?.data?.message || "Lỗi khi gọi AI định hình lại. Xin thử lại.")
      }
      setLastResponse(`❌ Lỗi: Không thể thực hiện "${userMsg}"`)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownloadSVG = async () => {
    try {
      toast.info("Đang xử lý xuất file Vector chất lượng cao...")
      const res = await api.post(`/projects/${projectId}/export`)

      const blob = new Blob([res.data.svg_content], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Slox_Vector_${brandInfo.name}.svg`
      a.click()
      URL.revokeObjectURL(url)

      toast.success(res.data.message || "Đã tải SVG thành công")
      fetchUser() // Refresh balance because we spent 5 diamonds
    } catch (error: any) {
      if (error.response?.status === 402) {
        toast.error("Bạn không đủ Kim Cương! Cần 5💎 để xuất file Vector.")
      } else {
        toast.error("Không thể xuất file lúc này.")
      }
    }
  }

  const handleDownloadPNG = (scale: number = 1) => {
    const size = 400 * scale
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    const svgBlob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size)
      URL.revokeObjectURL(url)
      const a = document.createElement("a")
      a.href = canvas.toDataURL("image/png")
      a.download = `logo-${size}x${size}.png`
      a.click()
    }
    img.src = url
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
            <span className="sr-only">Trở lại dự án</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-sm font-semibold truncate">{brandInfo.name}</h1>
        </div>
        <TooltipProvider delayDuration={0}>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg text-muted-foreground"
                  onClick={() => setSvgContent(originalSvg)}
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="sr-only">Khôi phục</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Khôi phục bản gốc</TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      className="rounded-lg gap-1.5 h-8 text-xs font-medium"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Xuất file</span>
                      <ChevronDown className="h-3 w-3 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Xuất file logo</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDownloadSVG}>
                  <FileCode />
                  SVG (vector)
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDownloadPNG(1)}>
                  <FileImage />
                  PNG 400×400
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownloadPNG(2)}>
                  <FileImage />
                  PNG 800×800
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownloadPNG(4)}>
                  <FileImage />
                  PNG 1600×1600
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              <span className="text-xs font-medium text-muted-foreground">Đang cập nhật...</span>
            </div>
          )}
        </div>

        {/* Floating prompt — ChatGPT style */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none p-3 md:p-4" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          <div className="max-w-2xl mx-auto pointer-events-auto">
            {(zoom !== 100 || pan.x !== 0 || pan.y !== 0) && (
              <div className="flex justify-start mb-2">
                <button
                  onClick={resetView}
                  className="flex items-center gap-1.5 bg-background/80 backdrop-blur-sm rounded-full border border-border shadow-sm px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  Đặt lại góc nhìn
                </button>
              </div>
            )}
            {(isProcessing || lastResponse) && (
              <div className="text-[11px] text-muted-foreground text-center mb-1.5 truncate">
                {isProcessing ? "Đang cập nhật logo..." : lastResponse}
              </div>
            )}
            <div className="rounded-3xl border border-border bg-background/95 backdrop-blur-xl shadow-lg focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/50 transition-all">
              <div className="flex items-end gap-3 pl-5 pr-3 py-2.5">
                <textarea
                  ref={textareaRef}
                  value={command}
                  onChange={(e) => {
                    setCommand(e.target.value)
                    adjustTextareaHeight()
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      processCommand(command)
                    }
                  }}
                  placeholder="Mô tả các thay đổi cho logo của bạn..."
                  rows={1}
                  disabled={isProcessing}
                  autoComplete="off"
                  className="flex-1 resize-none bg-transparent text-sm leading-6 py-1.5 placeholder:text-muted-foreground/50 focus:outline-none disabled:opacity-50 max-h-[120px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                />
                <Button
                  type="button"
                  size="icon"
                  disabled={!command.trim() || isProcessing}
                  onClick={() => processCommand(command)}
                  className="rounded-full h-9 w-9 shrink-0 mb-0.5"
                >
                  <ArrowUp className="h-4 w-4" />
                  <span className="sr-only">Gửi</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
