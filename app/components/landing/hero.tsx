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
        <section className="snap-start min-h-[100dvh] w-full shrink-0 flex flex-col justify-center relative overflow-hidden bg-background">
            {/* Massive Ambient Glow Base */}
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-[pulse_8s_ease-in-out_infinite]" />
            <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10 w-full flex flex-col items-center">
                <Badge className="mb-8 font-semibold gap-2 py-2 px-4 shadow-[0_0_20px_-5px_var(--color-primary)] bg-primary/10 text-primary border-primary/30 backdrop-blur-md animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <Sparkles className="h-4 w-4" />
                    AI-Powered Design Generation
                </Badge>

                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter font-[family-name:var(--font-heading)] text-balance max-w-6xl mx-auto leading-[0.95] text-foreground animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 fill-mode-both">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-500 to-pink-500 animate-gradient bg-300%">future</span> of <br className="hidden md:block" /> logo design.
                </h1>

                <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mt-8 max-w-3xl mx-auto text-pretty leading-snug animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 fill-mode-both font-medium">
                    Stop paying agencies thousands. Generate striking, professional, production-ready vector logos in exactly 10 seconds.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 fill-mode-both">
                    <Button size="lg" asChild className="group h-16 px-10 rounded-2xl text-lg font-bold w-full sm:w-auto shadow-[0_0_40px_-10px_var(--color-primary)] hover:shadow-[0_0_60px_-10px_var(--color-primary)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                        <Link href="/register">
                            <span className="relative z-10 flex items-center gap-3">
                                Start Building Free
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="h-16 px-10 rounded-2xl text-lg font-bold w-full sm:w-auto bg-card/40 backdrop-blur-md border-border/60 hover:bg-muted/60 transition-all duration-300 hover:-translate-y-1 shadow-xl">
                        <Link href="#features">See How It Works</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
