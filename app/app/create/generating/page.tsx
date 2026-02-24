"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"

const loadingMessages = [
  "Analyzing your brand identity...",
  "Exploring creative directions...",
  "Generating color harmonies...",
  "Crafting vector shapes...",
  "Refining typography...",
  "Polishing your logo...",
  "Almost there...",
]

export default function GeneratingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1.5
      })
    }, 50)

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) =>
        prev < loadingMessages.length - 1 ? prev + 1 : prev
      )
    }, 600)

    const timer = setTimeout(() => {
      router.push("/app/editor/new")
    }, 3800)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
      clearTimeout(timer)
    }
  }, [router])

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
      <div className="text-center w-full max-w-xs sm:max-w-sm mx-auto">
        {/* Animated Logo */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8">
          <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" />
          <div className="absolute inset-0 rounded-2xl bg-primary/10 animate-pulse" />
          <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary/15 backdrop-blur-sm">
            <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-primary animate-pulse" />
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)] mb-1.5 sm:mb-2">
          Creating Your Logo
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 transition-all duration-300 min-h-[1.25rem]">
          {loadingMessages[messageIndex]}
        </p>

        {/* Progress Bar */}
        <div className="w-full h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden mb-2 sm:mb-3">
          <div
            className="h-full bg-primary rounded-full transition-all duration-100 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground tabular-nums">
          {Math.min(Math.round(progress), 100)}%
        </p>
      </div>
    </div>
  )
}
