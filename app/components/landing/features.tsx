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
        <section id="features" className="py-16 sm:py-24 border-t border-border/50 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-16">
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

                <Separator className="mb-10 sm:mb-16 max-w-sm mx-auto" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {features.map((feature, i) => (
                        <Card
                            key={feature.title}
                            className="bg-card hover:bg-muted/50 transition-colors"
                        >
                            <CardContent className="p-6 sm:p-8">
                                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-muted mb-6">
                                    {feature.hoverText ? (
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <div className="cursor-help flex items-center justify-center w-full h-full">
                                                    <feature.icon className="h-6 w-6 text-foreground" />
                                                </div>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-80">
                                                <div className="flex justify-between space-x-4">
                                                    <div className="space-y-1">
                                                        <h4 className="text-sm font-semibold">{feature.title}</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {feature.hoverText}
                                                        </p>
                                                    </div>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                    ) : (
                                        <feature.icon className="h-6 w-6 text-foreground" />
                                    )}
                                </div>
                                <h3 className="font-bold text-lg sm:text-xl mb-3">{feature.title}</h3>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
