import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const showcaseLogos = [
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#6366f1"/><path d="M30 60 L60 30 L90 60 L60 90Z" fill="white" opacity="0.9"/><circle cx="60" cy="60" r="12" fill="#6366f1"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#10b981"/><path d="M60 25 C40 45 35 75 60 95 C85 75 80 45 60 25Z" fill="white" opacity="0.9"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#f59e0b"/><circle cx="60" cy="65" r="25" fill="white" opacity="0.9"/><rect x="55" y="30" width="10" height="15" rx="5" fill="white" opacity="0.7"/><rect x="30" y="55" width="15" height="10" rx="5" fill="white" opacity="0.7"/><rect x="75" y="55" width="15" height="10" rx="5" fill="white" opacity="0.7"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#8b5cf6"/><polygon points="60,25 90,75 30,75" fill="white" opacity="0.9"/><polygon points="60,45 75,70 45,70" fill="#8b5cf6" opacity="0.8"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#ec4899"/><circle cx="60" cy="55" r="12" fill="white" opacity="0.9"/><circle cx="48" cy="42" r="10" fill="white" opacity="0.6"/><circle cx="72" cy="42" r="10" fill="white" opacity="0.6"/><circle cx="45" cy="58" r="10" fill="white" opacity="0.6"/><circle cx="75" cy="58" r="10" fill="white" opacity="0.6"/></svg>`,
    `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#1e293b"/><circle cx="60" cy="55" r="20" fill="none" stroke="white" stroke-width="3" opacity="0.9"/><circle cx="60" cy="55" r="8" fill="white" opacity="0.9"/><rect x="30" y="85" width="60" height="4" rx="2" fill="white" opacity="0.5"/></svg>`,
]

export function Showcase() {
    return (
        <section id="showcase" className="py-16 sm:py-24 bg-muted/30 border-t border-border/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-balance">
                        Logos created with LogoAI
                    </h2>
                    <p className="text-muted-foreground mt-4 text-base sm:text-lg">
                        See what our community has built
                    </p>
                </div>

                <div className="flex justify-center px-12">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-5xl"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {showcaseLogos.map((svg, i) => (
                                <CarouselItem key={i} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <Card className="overflow-hidden bg-card">
                                            <CardContent className="p-0">
                                                <div className="aspect-square flex items-center justify-center p-8 sm:p-12">
                                                    <div
                                                        className="w-full h-full"
                                                        dangerouslySetInnerHTML={{ __html: svg }}
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden sm:flex" />
                        <CarouselNext className="hidden sm:flex" />
                    </Carousel>
                </div>
            </div>
        </section>
    )
}
