"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const logoStyles = [
  { id: "minimal", label: "Minimal", desc: "Clean and simple" },
  { id: "modern", label: "Modern", desc: "Bold and trendy" },
  { id: "classic", label: "Classic", desc: "Timeless elegance" },
  { id: "playful", label: "Playful", desc: "Fun and creative" },
  { id: "geometric", label: "Geometric", desc: "Shape-based" },
  { id: "abstract", label: "Abstract", desc: "Artistic forms" },
]

const colorPalettes = [
  { id: "blue", colors: ["#3B82F6", "#1D4ED8", "#93C5FD"], label: "Ocean Blue" },
  { id: "emerald", colors: ["#10B981", "#047857", "#6EE7B7"], label: "Emerald" },
  { id: "amber", colors: ["#F59E0B", "#D97706", "#FCD34D"], label: "Amber Gold" },
  { id: "rose", colors: ["#F43F5E", "#BE123C", "#FDA4AF"], label: "Rose" },
  { id: "indigo", colors: ["#6366F1", "#4338CA", "#A5B4FC"], label: "Indigo" },
  { id: "slate", colors: ["#334155", "#1E293B", "#94A3B8"], label: "Slate" },
]

const industries = [
  "Technology", "Healthcare", "Finance", "Education",
  "Food & Beverage", "Fashion", "Sports", "Music",
  "Travel", "Real Estate", "Consulting", "E-commerce",
]

const steps = [
  { id: 1, label: "Brand" },
  { id: 2, label: "Style" },
  { id: 3, label: "Colors" },
  { id: 4, label: "Details" },
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Step Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-1.5 sm:gap-2 flex-1">
                <button
                  onClick={() => s.id < step && setStep(s.id)}
                  className={cn(
                    "flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0",
                    step === s.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : step > s.id
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s.id ? <Check className="h-3.5 w-3.5" /> : s.id}
                </button>
                <span
                  className={cn(
                    "text-xs sm:text-sm font-medium hidden xs:block",
                    step === s.id ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-px flex-1",
                      step > s.id ? "bg-primary/40" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[300px] sm:min-h-[360px]">
            {step === 1 && (
              <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] mb-0.5 sm:mb-1">
                    Tell us about your brand
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Start with the basics of your brand identity
                  </p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <Label htmlFor="brandName" className="text-sm">Brand Name *</Label>
                    <Input
                      id="brandName"
                      placeholder="e.g., TechFlow"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="mt-1.5 h-11 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tagline" className="text-sm">Tagline (optional)</Label>
                    <Input
                      id="tagline"
                      placeholder="e.g., Innovate with ease"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="mt-1.5 h-11 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Industry</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1.5">
                      {industries.map((ind) => (
                        <button
                          key={ind}
                          onClick={() => setIndustry(ind)}
                          className={cn(
                            "px-3 py-2.5 rounded-xl text-sm font-medium transition-all border active:scale-[0.97]",
                            industry === ind
                              ? "bg-primary text-primary-foreground border-primary shadow-sm"
                              : "bg-card border-border text-foreground hover:border-primary/50"
                          )}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] mb-0.5 sm:mb-1">
                    Choose your style
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Select the visual direction for your logo
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {logoStyles.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={cn(
                        "p-3.5 sm:p-4 rounded-xl border text-left transition-all active:scale-[0.97]",
                        style === s.id
                          ? "bg-primary/10 border-primary shadow-sm"
                          : "bg-card border-border hover:border-primary/50"
                      )}
                    >
                      <p className="font-semibold text-sm">{s.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] mb-0.5 sm:mb-1">
                    Pick your colors
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Choose a color palette that represents your brand
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {colorPalettes.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPalette(p.id)}
                      className={cn(
                        "p-3.5 sm:p-4 rounded-xl border text-left transition-all active:scale-[0.97]",
                        palette === p.id
                          ? "border-primary shadow-sm ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex gap-1.5 mb-2.5 sm:mb-3">
                        {p.colors.map((c) => (
                          <div
                            key={c}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shadow-sm"
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
              <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] mb-0.5 sm:mb-1">
                    Any extra details?
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Describe anything specific you want in your logo
                  </p>
                </div>
                <div>
                  <Label htmlFor="description" className="text-sm">Additional Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="e.g., I want a logo that feels futuristic with clean lines, incorporate a lightning bolt symbol..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1.5 min-h-[100px] sm:min-h-[120px] rounded-xl resize-none"
                  />
                </div>
                <div className="rounded-xl border border-border bg-muted/50 p-3 sm:p-4 space-y-2">
                  <p className="text-sm font-semibold">Summary</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                    <div>
                      <span className="text-muted-foreground">Brand:</span>{" "}
                      <span className="font-medium">{brandName}</span>
                    </div>
                    {tagline && (
                      <div>
                        <span className="text-muted-foreground">Tagline:</span>{" "}
                        <span className="font-medium">{tagline}</span>
                      </div>
                    )}
                    {industry && (
                      <div>
                        <span className="text-muted-foreground">Industry:</span>{" "}
                        <span className="font-medium">{industry}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Style:</span>{" "}
                      <span className="font-medium capitalize">{style}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Palette:</span>{" "}
                      <span className="font-medium capitalize">{palette}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky bottom navigation */}
      <div className="shrink-0 border-t border-border bg-background px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="rounded-xl gap-1.5 sm:gap-2 h-10 sm:h-11"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canNext}
              className="rounded-xl gap-1.5 sm:gap-2 h-10 sm:h-11"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
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
              className="rounded-xl gap-1.5 sm:gap-2 h-10 sm:h-11"
            >
              <Sparkles className="h-4 w-4" />
              Generate
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
