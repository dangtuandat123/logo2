"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Loader2 } from "lucide-react"
import { toast } from "sonner"
import api from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"

const loadingMessages = [
  "Đang phân tích định vị thương hiệu...",
  "Đang khám phá các hướng sáng tạo...",
  "Đang tạo bảng màu...",
  "Đang thiết kế các hình dạng vector...",
  "Tinh chỉnh phông chữ...",
  "Đang hoàn thiện logo...",
  "Sắp xong rồi...",
]

export default function GeneratingPage() {
  const router = useRouter()
  const { fetchUser } = useAuth()
  const [errorStatus, setErrorStatus] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    let progressInterval: NodeJS.Timeout
    let messageInterval: NodeJS.Timeout

    if (!errorStatus) {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return 95 // Hold at 95% until API returns
          return prev + 1.5
        })
      }, 500)

      messageInterval = setInterval(() => {
        setMessageIndex((prev) =>
          prev < loadingMessages.length - 1 ? prev + 1 : prev
        )
      }, 3000)
    }

    const generateLogo = async () => {
      try {
        const configStr = sessionStorage.getItem("logoConfig")
        if (!configStr) {
          toast.error("Không tìm thấy cấu hình logo. Đang quay lại...")
          router.push("/app/create")
          return
        }

        const config = JSON.parse(configStr)
        // Ensure palette is an array of strings
        if (typeof config.palette === 'string') {
          config.palette = [config.palette]
        }

        // Map frontend keys to backend expected keys
        const apiPayload = {
          brand_name: config.brandName,
          slogan: config.tagline,
          industry: config.industry,
          style: config.style,
          palette: config.palette,
          description: config.description,
        }

        const response = await api.post('/generate-logo', apiPayload)

        // Success
        setProgress(100)
        setTimeout(() => {
          fetchUser() // Refresh diamonds
          sessionStorage.removeItem("logoConfig")
          router.push(`/app/editor/${response.data.project_id}`)
        }, 500)

      } catch (error: any) {
        console.error("Generate error", error)
        clearInterval(progressInterval)
        clearInterval(messageInterval)

        const status = error.response?.status
        setErrorStatus(status || 500)

        if (status === 402) {
          toast.error("Bạn không đủ 10 Kim cương để tạo logo. Vui lòng nạp thêm.")
          setTimeout(() => router.push("/app/billing"), 2000)
        } else {
          toast.error("Có lỗi xảy ra trong quá trình tạo logo. Vui lòng thử lại sau.")
          setTimeout(() => router.push("/app/create"), 2000)
        }
      }
    }

    generateLogo()

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [router, fetchUser, errorStatus])

  if (errorStatus === 402) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-2">Không đủ Kim Cương!</h2>
        <p className="text-muted-foreground mb-4">Bạn cần dùng 10💎 để tạo Logo AI. Đang chuyển hướng đến trang nạp...</p>
      </div>
    )
  }

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
          Đang Tạo Logo Của Bạn
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
