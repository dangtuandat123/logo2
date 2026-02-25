"use client"

import { useState } from "react"
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

  const canNext =
    (step === 1 && brandName.trim().length > 0) ||
    (step === 2 && style.length > 0) ||
    (step === 3 && palette.length > 0) ||
    step === 4

  const progressValue = (step / steps.length) * 100

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-scroll overflow-x-hidden">
        <div className="p-3 sm:p-4 md:p-6 max-w-5xl mx-auto">
          {/* Progress + Step Label */}
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center justify-between mb-3">
              <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 text-xs">
                Bước {step}/{steps.length} — {steps[step - 1].label}
              </Badge>
              <span className="text-xs text-muted-foreground">{Math.round(progressValue)}%</span>
            </div>
            <Progress value={progressValue} className="h-1.5" />
          </div>

          {/* Step Content wrapped in Card */}
          <Card className="bg-card/40 backdrop-blur-sm border-border/60 shadow-lg relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-48 h-48 bg-primary/10 rounded-full blur-[48px] animate-[pulse_6s_ease-in-out_infinite]" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-48 h-48 bg-purple-500/10 rounded-full blur-[48px] animate-[pulse_6s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />

            <CardContent className="p-4 sm:p-5 relative z-10">
              {step === 1 && (
                <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] mb-1">
                      Hãy kể về thương hiệu của bạn
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Bắt đầu với những thông tin cơ bản về định vị thương hiệu
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="brandName" className="text-sm">Tôn Thương Hiệu *</Label>
                      <Input
                        id="brandName"
                        placeholder="vd: TechFlow"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        autoComplete="off"
                        className="mt-1 h-10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tagline" className="text-sm">Slogan (tùy chọn)</Label>
                      <Input
                        id="tagline"
                        placeholder="vd: Đổi mới dễ dàng"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        autoComplete="off"
                        className="mt-1 h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Ngành Nghề</Label>
                      <div className="mt-1">
                        <Combobox items={industries} defaultValue={industries[0]}>
                          <ComboboxTrigger render={<Button variant="outline" className="w-full justify-between font-normal h-10"><ComboboxValue /></Button>} />
                          <ComboboxContent className="!min-w-[var(--anchor-width)]">
                            <ComboboxInput showTrigger={false} placeholder="Tìm ngành nghề..." />
                            <ComboboxEmpty>Không tìm thấy ngành nghề.</ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem key={item.value} value={item}>
                                  {item.icon && <span className="mr-2">{item.icon}</span>}
                                  {item.label}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] mb-1">
                      Chọn phong cách của bạn
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Chọn hướng thiết kế hình ảnh cho logo của bạn
                    </p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {logoStyles.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setStyle(s.id)}
                        className={cn(
                          "p-4 rounded-xl border text-left transition-all duration-300 active:scale-[0.97]",
                          style === s.id
                            ? "bg-primary/10 border-primary shadow-[0_0_15px_-3px_var(--color-primary)] scale-[1.02] ring-1 ring-primary/20"
                            : "bg-background/50 border-border/50 hover:border-primary/50 hover:bg-muted/50"
                        )}
                      >
                        <p className={cn("font-semibold text-sm transition-colors", style === s.id ? "text-primary" : "text-foreground")}>{s.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] mb-1">
                      Chọn màu sắc
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Chọn bảng màu đại diện cho thương hiệu của bạn
                    </p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {colorPalettes.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPalette(p.id)}
                        className={cn(
                          "p-4 rounded-xl border text-left transition-all duration-300 active:scale-[0.97]",
                          palette === p.id
                            ? "border-primary bg-primary/5 shadow-[0_0_15px_-3px_var(--color-primary)] scale-[1.02] ring-1 ring-primary/20"
                            : "bg-background/50 border-border/50 hover:border-primary/50 hover:bg-muted/50"
                        )}
                      >
                        <div className="flex gap-1.5 mb-3">
                          {p.colors.map((c) => (
                            <div
                              key={c}
                              className="w-8 h-8 rounded-lg shadow-sm"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                        <p className="font-medium text-sm">{p.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] mb-1">
                      Thêm chi tiết nào khác không?
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Mô tả bất kỳ chi tiết cụ thể nào bạn muốn có trong logo
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <Label htmlFor="description" className="text-sm">Mô tả Bổ Sung (tùy chọn)</Label>
                    <Textarea
                      id="description"
                      placeholder="vd: Tôi muốn logo có cảm giác tương lai với đường nét sắc gọn, kết hợp với hình tia chớp..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1.5 min-h-[100px] sm:min-h-[120px] resize-none"
                    />
                  </div>
                  <Card className="bg-muted/50 border-border">
                    <CardContent className="p-4 space-y-2">
                      <p className="text-sm font-semibold">Tóm Tắt</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                        <div>
                          <span className="text-muted-foreground">Thương Hiệu:</span>{" "}
                          <span className="font-medium">{brandName}</span>
                        </div>
                        {tagline && (
                          <div>
                            <span className="text-muted-foreground">Slogan:</span>{" "}
                            <span className="font-medium">{tagline}</span>
                          </div>
                        )}
                        {industry && (
                          <div>
                            <span className="text-muted-foreground">Ngành Nghề:</span>{" "}
                            <span className="font-medium">{industry}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Phong Cách:</span>{" "}
                          <span className="font-medium capitalize">{style}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Bảng Màu:</span>{" "}
                          <span className="font-medium capitalize">{palette}</span>
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
      <div className="shrink-0 border-t border-border bg-background px-3 sm:px-4 md:px-6 py-2.5 sm:py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="gap-2 h-10 sm:h-11"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Quay Lại</span>
          </Button>

          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canNext}
              className="gap-2 h-10 sm:h-11"
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
              className="gap-2 h-10 sm:h-11"
            >
              <Sparkles className="h-4 w-4" />
              Tạo Logo
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
