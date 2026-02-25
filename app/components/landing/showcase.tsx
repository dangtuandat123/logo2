import { Card, CardContent } from "@/components/ui/card"

const showcaseLogos = [
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#6366f1"/><path d="M30 60 L60 30 L90 60 L60 90Z" fill="white" opacity="0.9"/><circle cx="60" cy="60" r="12" fill="#6366f1"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#10b981"/><path d="M60 25 C40 45 35 75 60 95 C85 75 80 45 60 25Z" fill="white" opacity="0.9"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#f59e0b"/><circle cx="60" cy="65" r="25" fill="white" opacity="0.9"/><rect x="55" y="30" width="10" height="15" rx="5" fill="white" opacity="0.7"/><rect x="30" y="55" width="15" height="10" rx="5" fill="white" opacity="0.7"/><rect x="75" y="55" width="15" height="10" rx="5" fill="white" opacity="0.7"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#8b5cf6"/><polygon points="60,25 90,75 30,75" fill="white" opacity="0.9"/><polygon points="60,45 75,70 45,70" fill="#8b5cf6" opacity="0.8"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#ec4899"/><circle cx="60" cy="55" r="12" fill="white" opacity="0.9"/><circle cx="48" cy="42" r="10" fill="white" opacity="0.6"/><circle cx="72" cy="42" r="10" fill="white" opacity="0.6"/><circle cx="45" cy="58" r="10" fill="white" opacity="0.6"/><circle cx="75" cy="58" r="10" fill="white" opacity="0.6"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#1e293b"/><circle cx="60" cy="55" r="20" fill="none" stroke="white" stroke-width="3" opacity="0.9"/><circle cx="60" cy="55" r="8" fill="white" opacity="0.9"/><rect x="30" y="85" width="60" height="4" rx="2" fill="white" opacity="0.5"/></svg>`,
]
export function Showcase() {
    // Duplicate the logos array to ensure seamless infinite scrolling
    const marqueeLine1 = [...showcaseLogos, ...showcaseLogos].slice(0, 8);
    const marqueeLine2 = [...showcaseLogos, ...showcaseLogos].reverse().slice(0, 8);

    return (
        <section id="showcase" className="snap-start min-h-[100dvh] w-full shrink-0 flex flex-col justify-center py-16 sm:py-24 bg-muted/10 border-t border-border/50 overflow-hidden relative">

            {/* Ambient background glow for showcase */}
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 mb-12 sm:mb-20">
                <div className="text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-heading)] text-balance mb-6">
                        Built by the community
                    </h2>
                    <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
                        Join thousands of creators generating stunning brand identities every single day.
                    </p>
                </div>
            </div>

            {/* Marquee Container */}
            <div className="relative flex flex-col gap-6 w-full -rotate-2 scale-[1.05] hover-pause">

                {/* Fade edges to trick the eye into seeing infinite scroll */}
                <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                {/* Line 1 (Scrolls Left) */}
                <div className="flex w-[200%] animate-marquee gap-6">
                    {marqueeLine1.map((svg, i) => (
                        <Card key={`l1-${i}`} className="w-48 h-48 sm:w-56 sm:h-56 shrink-0 overflow-hidden bg-white/5 backdrop-blur-md border-border/30 hover:border-primary/50 transition-colors shadow-xl">
                            <CardContent className="p-0 h-full flex items-center justify-center">
                                <div
                                    className="w-32 h-32 sm:w-40 sm:h-40"
                                    dangerouslySetInnerHTML={{ __html: svg }}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Line 2 (Scrolls Right) */}
                <div className="flex w-[200%] animate-marquee-reverse gap-6 -ml-[50%]">
                    {marqueeLine2.map((svg, i) => (
                        <Card key={`l2-${i}`} className="w-48 h-48 sm:w-56 sm:h-56 shrink-0 overflow-hidden bg-white/5 backdrop-blur-md border-border/30 hover:border-primary/50 transition-colors shadow-xl">
                            <CardContent className="p-0 h-full flex items-center justify-center">
                                <div
                                    className="w-32 h-32 sm:w-40 sm:h-40"
                                    dangerouslySetInnerHTML={{ __html: svg }}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
        </section>
    )
}
