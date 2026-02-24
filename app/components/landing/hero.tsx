import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const showcaseLogos = [
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#6366f1"/><path d="M30 60 L60 30 L90 60 L60 90Z" fill="white" opacity="0.9"/><circle cx="60" cy="60" r="12" fill="#6366f1"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#10b981"/><path d="M60 25 C40 45 35 75 60 95 C85 75 80 45 60 25Z" fill="white" opacity="0.9"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#f59e0b"/><circle cx="60" cy="65" r="25" fill="white" opacity="0.9"/><rect x="55" y="30" width="10" height="15" rx="5" fill="white" opacity="0.7"/><rect x="30" y="55" width="15" height="10" rx="5" fill="white" opacity="0.7"/><rect x="75" y="55" width="15" height="10" rx="5" fill="white" opacity="0.7"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#8b5cf6"/><polygon points="60,25 90,75 30,75" fill="white" opacity="0.9"/><polygon points="60,45 75,70 45,70" fill="#8b5cf6" opacity="0.8"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#ec4899"/><circle cx="60" cy="55" r="12" fill="white" opacity="0.9"/><circle cx="48" cy="42" r="10" fill="white" opacity="0.6"/><circle cx="72" cy="42" r="10" fill="white" opacity="0.6"/><circle cx="45" cy="58" r="10" fill="white" opacity="0.6"/><circle cx="75" cy="58" r="10" fill="white" opacity="0.6"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#1e293b"/><circle cx="60" cy="55" r="20" fill="none" stroke="white" stroke-width="3" opacity="0.9"/><circle cx="60" cy="55" r="8" fill="white" opacity="0.9"/><rect x="30" y="85" width="60" height="4" rx="2" fill="white" opacity="0.5"/></svg>`,
]

export function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 md:pt-36 pb-12 sm:pb-16 md:pb-24 text-center">
                <Badge className="mb-6 sm:mb-8 font-medium gap-2 py-1.5 px-3 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    AI-Powered Logo Creation
                </Badge>

                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight font-[family-name:var(--font-heading)] text-balance max-w-5xl mx-auto leading-[1.1] text-foreground">
                    Create stunning logos in seconds
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mt-6 sm:mt-8 max-w-2xl mx-auto text-pretty leading-relaxed">
                    Describe your brand, pick your style, and let AI generate a
                    professional logo. Edit with natural language until it is perfect.
                </p>

                <Separator className="max-w-xs mx-auto my-8 sm:my-10" />

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" asChild className="gap-2 h-14 px-8 text-base w-full sm:w-auto">
                        <Link href="/register">
                            Start Creating
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="lg" asChild className="h-14 px-8 text-base w-full sm:w-auto">
                                    <Link href="#showcase">View Examples</Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>See what others are building</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                {/* Logo Showcase Row */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 mt-16 sm:mt-24 overflow-x-auto no-scrollbar px-2 py-4">
                    {showcaseLogos.map((svg, i) => (
                        <div
                            key={i}
                            className="w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border border-border bg-background shrink-0 flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: svg }}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
