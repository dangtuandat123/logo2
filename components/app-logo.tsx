import { cn } from "@/lib/utils"

interface AppLogoProps {
    className?: string
    size?: number
}

/**
 * Logo chính của ứng dụng LogoAI.
 * Thiết kế: Chữ "L" cách điệu kết hợp bút vẽ nghệ thuật,
 * nằm trong khung vuông bo góc với gradient tím-xanh.
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
            aria-label="LogoAI"
        >
            {/* Background with premium gradient */}
            <defs>
                <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
                <linearGradient id="accentGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#818CF8" />
                </linearGradient>
                <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.7" />
                </linearGradient>
            </defs>

            {/* Rounded square background */}
            <rect width="512" height="512" rx="112" fill="url(#logoBg)" />

            {/* Subtle inner glow ring */}
            <rect
                x="24" y="24" width="464" height="464" rx="92"
                fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="2"
            />

            {/* Stylized "L" letterform — the core brand mark */}
            <path
                d="M160 120 L160 340 Q160 380 200 380 L340 380"
                stroke="white"
                strokeWidth="52"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.95"
            />

            {/* Creative pen stroke — artistic swash extending from the L */}
            <path
                d="M310 380 Q360 380 380 340 Q400 300 370 260 Q340 220 360 180 Q380 140 350 120"
                stroke="url(#accentGlow)"
                strokeWidth="36"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
            />

            {/* Sparkle star — top right */}
            <g transform="translate(380, 100)" opacity="0.95">
                <path
                    d="M0 -20 L5 -5 L20 0 L5 5 L0 20 L-5 5 L-20 0 L-5 -5 Z"
                    fill="url(#sparkGrad)"
                />
            </g>

            {/* Small sparkle — mid-right accent */}
            <g transform="translate(400, 220)" opacity="0.7">
                <path
                    d="M0 -10 L3 -3 L10 0 L3 3 L0 10 L-3 3 L-10 0 L-3 -3 Z"
                    fill="white"
                />
            </g>

            {/* Tiny sparkle dot — bottom accent */}
            <circle cx="260" cy="420" r="6" fill="white" opacity="0.5" />
            <circle cx="420" cy="310" r="4" fill="white" opacity="0.4" />
        </svg>
    )
}
