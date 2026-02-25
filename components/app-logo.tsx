import { cn } from "@/lib/utils"

interface AppLogoProps {
    className?: string
    size?: number
}

/**
 * Logo chính của ứng dụng Slox.
 * Thiết kế: Chữ "S" động cách điệu trên nền gradient tím-xanh,
 * tượng trưng cho sự sáng tạo linh hoạt và hiện đại.
 */
export function AppLogo({ className, size = 32 }: AppLogoProps) {
    return (
        <svg
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={cn("shrink-0", className)}
            aria-label="Slox"
        >
            <defs>
                <linearGradient id="sloxBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <linearGradient id="sloxAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
            </defs>

            {/* Rounded square background */}
            <rect width="512" height="512" rx="120" fill="url(#sloxBg)" />

            {/* Inner subtle glow ring */}
            <rect x="20" y="20" width="472" height="472" rx="104" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1.5" />

            {/* Stylized "S" — fluid, dynamic, modern */}
            <path
                d="M320 135
           C 280 100, 200 100, 175 140
           C 145 190, 220 215, 260 240
           C 310 270, 380 295, 340 365
           C 310 410, 220 415, 185 380"
                stroke="white"
                strokeWidth="56"
                strokeLinecap="round"
                fill="none"
                opacity="0.95"
            />

            {/* Creative accent — diamond/rhombus shape top-right */}
            <g transform="translate(390, 100) rotate(45)">
                <rect x="-16" y="-16" width="32" height="32" rx="6" fill="url(#sloxAccent)" opacity="0.85" />
            </g>

            {/* Dot accent — bottom-left balance */}
            <circle cx="130" cy="420" r="14" fill="white" opacity="0.35" />
            <circle cx="400" cy="400" r="8" fill="white" opacity="0.2" />
        </svg>
    )
}
