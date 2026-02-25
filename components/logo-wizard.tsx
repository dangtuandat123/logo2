"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"
import { cn } from "@/lib/utils"

const logoStyles = [
  { id: "minimal", label: "Tối giản", desc: "Gọn gàng & đơn giản" },
  { id: "modern", label: "Hiện đại", desc: "Táo bạo & xu hướng" },
  { id: "classic", label: "Cổ điển", desc: "Đẹp với thời gian" },
  { id: "playful", label: "Vui nhộn", desc: "Vui nhộn & sáng tạo" },
  { id: "geometric", label: "Hình khối", desc: "Dựa trên hình học" },
  { id: "abstract", label: "Trừu tượng", desc: "Hình dạng nghệ thuật" },
]

const colorPalettes = [
  { id: "blue", colors: ["#3B82F6", "#1D4ED8", "#93C5FD"], label: "Xanh Đại Dương" },
  { id: "emerald", colors: ["#10B981", "#047857", "#6EE7B7"], label: "Ngọc Lục Bảo" },
  { id: "amber", colors: ["#F59E0B", "#D97706", "#FCD34D"], label: "Vàng Hổ Phách" },
  { id: "rose", colors: ["#F43F5E", "#BE123C", "#FDA4AF"], label: "Hồng Hoa Hồng" },
  { id: "indigo", colors: ["#6366F1", "#4338CA", "#A5B4FC"], label: "Chàm" },
  { id: "slate", colors: ["#334155", "#1E293B", "#94A3B8"], label: "Xám Đá" },
]

const industries = [
  { value: "", label: "Chọn ngành nghề", icon: "" },
  { value: "technology", label: "Công nghệ", icon: "💻" },
  { value: "healthcare", label: "Y tế", icon: "🏥" },
  { value: "finance", label: "Tài chính", icon: "💰" },
  { value: "education", label: "Giáo dục", icon: "📚" },
  { value: "food-beverage", label: "Ăn uống", icon: "🍔" },
  { value: "fashion", label: "Thời trang", icon: "👗" },
  { value: "sports", label: "Thể thao", icon: "⚽" },
  { value: "music", label: "Âm nhạc", icon: "🎵" },
  { value: "travel", label: "Du lịch", icon: "✈️" },
  { value: "real-estate", label: "Bất động sản", icon: "🏠" },
  { value: "consulting", label: "Tư vấn", icon: "💼" },
  { value: "e-commerce", label: "TMĐT", icon: "🛒" },
]

const steps = [
  { id: 1, label: "Thương hiệu" },
  { id: 2, label: "Phong cách" },
  { id: 3, label: "Màu sắc" },
  { id: 4, label: "Chi tiết" },
]

interface LogoWizardProps {
  onGenerate: (config: Record<string, string>) => void
  isGenerating: boolean
}

export function LogoWizard({ onGenerate, isGenerating }: LogoWizardProps) {
  const [step, setStep] = useState(1)
  const [brandName, setBrandName] = useState("")
  const [tagline, setTagline] = useState("")
  const [industry, setIndustry] = useState("")
  const [style, setStyle] = useState("")
  const [palette, setPalette] = useState("")
  const [description, setDescription] = useState("")
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Auto scroll to top when step changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [step])

  const canNext =
    (step === 1 && brandName.trim().length > 0) ||
    (step === 2 && style.length > 0) ||
    (step === 3 && palette.length > 0) ||
    step === 4

  const progressValue = (step / steps.length) * 100

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Fixed Top Progress Bar */}
      <div className="shrink-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/30 px-4 sm:px-6 md:px-8 py-3 sm:py-4 shadow-sm">
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between mb-2.5 sm:mb-3 text-sm font-medium">
            <Badge className="bg-primary/10 text-primary border-primary/20 backdrop-blur-md px-3 py-1 shadow-sm font-semibold tracking-wide">
              Bước {step}/{steps.length} — {steps[step - 1].label}
            </Badge>
            <span className="text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full border border-border/50 text-xs font-bold tracking-wider">{Math.round(progressValue)}%</span>
          </div>
          <Progress value={progressValue} className="h-2 bg-muted/50 border border-border/50 overflow-hidden rounded-full [&>div]:bg-gradient-to-r [&>div]:from-primary/80 [&>div]:to-primary [&>div]:shadow-[0_0_10px_rgba(var(--color-primary),0.5)]" />
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-scroll overflow-x-hidden"
      >
        <div className="p-4 sm:p-5 md:p-8 max-w-5xl mx-auto">
          {/* Step Content wrapped in Card */}
          <Card className="bg-card/40 backdrop-blur-sm border-border/60 shadow-lg relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-48 h-48 bg-primary/10 rounded-full blur-[48px] animate-[pulse_6s_ease-in-out_infinite]" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-48 h-48 bg-purple-500/10 rounded-full blur-[48px] animate-[pulse_6s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />

            <CardContent className="p-4 sm:p-5 relative z-10">
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] mb-2 text-foreground">
                      Hãy kể về thương hiệu của bạn
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground/80 font-medium">
                      Bắt đầu với những thông tin cơ bản về định vị thương hiệu
                    </p>
                  </div>
                  <Separator className="opacity-50" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 md:col-span-2">
                      <div className="space-y-2 relative group">
                        <Label htmlFor="brandName" className="text-sm font-semibold text-foreground/90 ml-1">Tên Thương Hiệu *</Label>
                        <Input
                          id="brandName"
                          placeholder="vd: TechFlow"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          autoComplete="off"
                          className="h-14 text-lg bg-background/50 border-border/50 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all rounded-xl shadow-sm group-hover:bg-background/80"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 relative group">
                      <Label htmlFor="tagline" className="text-sm font-semibold text-foreground/90 ml-1">Slogan (tùy chọn)</Label>
                      <Input
                        id="tagline"
                        placeholder="vd: Đổi mới dễ dàng"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        autoComplete="off"
                        className="h-12 bg-background/50 border-border/50 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all rounded-xl shadow-sm group-hover:bg-background/80"
                      />
                    </div>

                    <div className="space-y-2 relative group">
                      <Label className="text-sm font-semibold text-foreground/90 ml-1">Ngành Nghề</Label>
                      <Combobox items={industries} defaultValue={industries[0]}>
                        <ComboboxTrigger render={
                          <Button variant="outline" className="w-full justify-between font-normal h-12 bg-background/50 border-border/50 hover:bg-background/80 hover:text-foreground rounded-xl shadow-sm transition-all focus-visible:ring-primary/30 focus-visible:border-primary/50">
                            <ComboboxValue />
                          </Button>
                        } />
                        <ComboboxContent className="!min-w-[var(--anchor-width)] rounded-xl border-border/50 bg-background/95 backdrop-blur-xl shadow-xl">
                          <ComboboxInput showTrigger={false} placeholder="Tìm ngành nghề..." className="h-11" />
                          <ComboboxEmpty className="py-6 text-sm">Không tìm thấy ngành nghề.</ComboboxEmpty>
                          <ComboboxList className="p-1">
                            {industries.map((item) => (
                              <ComboboxItem key={item.value} value={item} className="rounded-lg py-2.5 cursor-pointer data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary">
                                {item.icon && <span className="mr-3 text-lg">{item.icon}</span>}
                                <span className="font-medium">{item.label}</span>
                              </ComboboxItem>
                            ))}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] mb-2 text-foreground">
                      Chọn phong cách của bạn
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground/80 font-medium">
                      Chọn hướng thiết kế hình ảnh cho logo của bạn
                    </p>
                  </div>
                  <Separator className="opacity-50" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {logoStyles.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setStyle(s.id)}
                        className={cn(
                          "relative p-5 sm:p-6 rounded-2xl text-left transition-all duration-300 overflow-hidden group outline-none",
                          style === s.id
                            ? "bg-primary/10 border-primary shadow-[0_0_20px_-5px_var(--color-primary)] scale-[1.02] ring-2 ring-primary/40 border-transparent"
                            : "bg-background/40 border border-border/50 hover:border-primary/40 hover:bg-muted/30 hover:shadow-md hover:-translate-y-1"
                        )}
                      >
                        {style === s.id && (
                          <div className="absolute top-3 right-3 text-primary animate-in zoom-in-50 duration-300">
                            <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                        )}
                        <p className={cn("font-bold text-base sm:text-lg mb-1 transition-colors", style === s.id ? "text-primary" : "text-foreground group-hover:text-primary/90")}>{s.label}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground/80">{s.desc}</p>

                        {/* Decorative background glow on hover or active */}
                        <div className={cn(
                          "absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none",
                          style === s.id ? "opacity-100" : "group-hover:opacity-100"
                        )} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] mb-2 text-foreground">
                      Chọn màu sắc
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground/80 font-medium">
                      Chọn bảng màu đại diện cho thương hiệu của bạn
                    </p>
                  </div>
                  <Separator className="opacity-50" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {colorPalettes.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPalette(p.id)}
                        className={cn(
                          "relative p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 overflow-hidden group outline-none",
                          palette === p.id
                            ? "bg-primary/5 shadow-[0_0_20px_-5px_var(--color-primary)] scale-[1.02] ring-2 ring-primary/40 border-transparent"
                            : "bg-background/40 border border-border/50 hover:border-primary/40 hover:bg-muted/30 hover:shadow-md hover:-translate-y-1"
                        )}
                      >
                        {palette === p.id && (
                          <div className="absolute top-2 right-2 text-primary animate-in zoom-in-50 duration-300">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                        <div className="flex gap-2 sm:gap-3 mb-4 justify-center sm:justify-start">
                          {p.colors.map((c) => (
                            <div
                              key={c}
                              className={cn("w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md transition-transform duration-300",
                                palette === p.id ? "scale-110" : "group-hover:scale-105"
                              )}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                        <p className={cn("font-semibold text-sm sm:text-base text-center sm:text-left transition-colors", palette === p.id ? "text-primary" : "text-foreground group-hover:text-primary/90")}>{p.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] mb-2 text-foreground">
                      Thêm chi tiết nào khác không?
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground/80 font-medium">
                      Mô tả bất kỳ chi tiết cụ thể nào bạn muốn có trong logo
                    </p>
                  </div>
                  <Separator className="opacity-50" />
                  <div className="space-y-2 relative group">
                    <Label htmlFor="description" className="text-sm font-semibold text-foreground/90 ml-1">Mô tả Bổ Sung (tùy chọn)</Label>
                    <Input
                      id="description"
                      placeholder="vd: phong cách tối giản, neon v.v..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1.5 h-14 text-base bg-background/50 border-border/50 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all rounded-xl shadow-sm group-hover:bg-background/80"
                      autoComplete="off"
                    />
                  </div>

                  <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20 shadow-md rounded-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[32px] -mr-10 -mt-10" />
                    <CardContent className="p-5 sm:p-6 space-y-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Tóm Tắt Yêu Cầu</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm sm:text-base bg-background/40 p-4 rounded-xl border border-border/40">
                        <div className="flex flex-col gap-1">
                          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Thương Hiệu</span>
                          <span className="font-bold text-foreground text-base truncate">{brandName}</span>
                        </div>
                        {tagline && (
                          <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Slogan</span>
                            <span className="font-medium text-foreground truncate">{tagline}</span>
                          </div>
                        )}
                        {industry && (
                          <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Ngành Nghề</span>
                            <span className="font-medium text-foreground truncate">{industry}</span>
                          </div>
                        )}
                        <div className="flex flex-col gap-1">
                          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Phong Cách</span>
                          <span className="font-medium text-foreground capitalize flex items-center gap-2">
                            {logoStyles.find(s => s.id === style)?.label || style}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Bảng Màu</span>
                          <span className="font-medium text-foreground capitalize flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {colorPalettes.find(p => p.id === palette)?.colors.map(c => (
                                <div key={c} className="w-3 h-3 rounded-sm shadow-sm" style={{ backgroundColor: c }} />
                              ))}
                            </div>
                            {colorPalettes.find(p => p.id === palette)?.label || palette}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky bottom navigation */}
      <div className="shrink-0 border-t border-border/50 bg-background/80 backdrop-blur-xl px-4 sm:px-6 md:px-8 py-4 sm:py-5 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="gap-2 h-12 px-6 rounded-xl font-semibold bg-background/50 hover:bg-muted/50 border-border/50 transition-all hover:-translate-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Quay Lại</span>
          </Button>

          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canNext}
              className="gap-2 h-12 px-8 rounded-xl font-bold text-base shadow-[0_0_20px_-5px_var(--color-primary)] hover:shadow-[0_0_30px_-5px_var(--color-primary)] transition-all hover:translate-x-1"
            >
              Tiếp Tục
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() =>
                onGenerate({
                  brandName,
                  tagline,
                  industry,
                  style,
                  palette,
                  description,
                })
              }
              disabled={isGenerating}
              className="gap-2 h-12 px-8 rounded-xl font-bold text-base bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-[0_0_30px_-5px_var(--color-primary)] hover:shadow-[0_0_40px_-5px_var(--color-primary)] transition-all hover:-translate-y-1 relative overflow-hidden group border-0 text-white"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out z-0" />
              <Sparkles className="h-5 w-5 relative z-10 animate-pulse" />
              <span className="relative z-10">Tạo Logo Ngay</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
