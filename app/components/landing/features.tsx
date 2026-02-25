import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, MessageSquare, Palette, Zap, Download, Shield } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

const features = [
    {
        icon: Sparkles,
        title: "AI-Powered Design",
        description: "Describe your brand and let our AI create professional logos in seconds.",
        hoverText: null,
    },
    {
        icon: MessageSquare,
        title: "Natural Language Editing",
        description: "Refine your logo by simply describing the changes you want to make.",
        hoverText: null,
    },
    {
        icon: Palette,
        title: "Unlimited Styles",
        description: "From minimal to bold, geometric to abstract. Every style at your fingertips.",
        hoverText: null,
    },
    {
        icon: Zap,
        title: "Instant Generation",
        description: "Get your logo in under 10 seconds. No waiting, no delays.",
        hoverText: null,
    },
    {
        icon: Download,
        title: "SVG Export",
        description: "Download crisp, scalable vector files ready for any use case.",
        hoverText: null,
    },
    {
        icon: Shield,
        title: "Full Ownership",
        description: "Every logo you create is yours. No licensing restrictions.",
        hoverText: "You hold the full copyright to the logos you generate, including commercial rights for the Pro plan.",
    },
]

export function Features() {
    return (
        <section id="features" className="snap-start min-h-[100dvh] w-full shrink-0 flex flex-col justify-center py-16 sm:py-24 border-t border-border/50 relative overflow-hidden bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-10 sm:mb-12">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-muted border border-border text-sm font-medium">
                        Powerful Features
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-balance text-foreground">
                        Everything you need for the perfect logo
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-pretty text-base sm:text-lg">
                        Powerful AI tools wrapped in a simple, intuitive interface
                    </p>
                </div>

                <Separator className="mb-10 sm:mb-16 max-w-sm mx-auto opacity-50" />

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[50vh] min-h-[400px]">
                    {/* Large Feature 1 (Spans 2 cols, 2 rows) */}
                    <Card className="col-span-1 md:col-span-2 md:row-span-2 relative overflow-hidden group bg-card/40 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all duration-500 shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-8 sm:p-10 h-full flex flex-col relative z-10">
                            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-8 border border-primary/20 shadow-[0_0_15px_-3px_var(--color-primary)]">
                                <Sparkles className="h-7 w-7 text-primary" />
                            </div>
                            <h3 className="font-bold text-2xl sm:text-3xl mb-4 text-foreground group-hover:text-primary transition-colors">AI-Powered Design</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Describe your brand and let our AI create professional logos in seconds.
                                Trained on millions of high-quality designs, it understands typography, layout, and color theory perfectly.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Medium Feature 1 (Spans 2 cols, 1 row) */}
                    <Card className="col-span-1 md:col-span-2 md:row-span-1 relative overflow-hidden group bg-card/40 backdrop-blur-xl border-border/50 hover:border-blue-500/50 transition-all duration-500 shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-6 h-full flex items-center gap-6 relative z-10">
                            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 shrink-0">
                                <MessageSquare className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-2 text-foreground group-hover:text-blue-500 transition-colors">Natural Language Editing</h3>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    Refine your logo by simply describing the changes you want to make.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Small Feature 1 */}
                    <Card className="col-span-1 md:col-span-1 md:row-span-1 relative overflow-hidden group bg-card/40 backdrop-blur-xl border-border/50 hover:border-emerald-500/50 transition-all duration-500 shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-6 h-full flex flex-col justify-center relative z-10">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                                <Palette className="h-5 w-5 text-emerald-500" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-foreground">Unlimited Styles</h3>
                            <p className="text-sm text-muted-foreground">Minimal to bold, geometric to abstract.</p>
                        </CardContent>
                    </Card>

                    {/* Small Feature 2 */}
                    <Card className="col-span-1 md:col-span-1 md:row-span-1 relative overflow-hidden group bg-card/40 backdrop-blur-xl border-border/50 hover:border-orange-500/50 transition-all duration-500 shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-6 h-full flex flex-col justify-center relative z-10">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 mb-4">
                                <Download className="h-5 w-5 text-orange-500" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-foreground">SVG Export</h3>
                            <p className="text-sm text-muted-foreground">Download crisp, scalable vector files.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
