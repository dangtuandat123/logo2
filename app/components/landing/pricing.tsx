"use client"
import Link from "next/link"

import { useState } from "react"
import { Check, Star, Download, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const faqs = [
    {
        question: "How does the AI logo generator work?",
        answer: "Our AI uses advanced machine learning models trained on millions of design concepts. You provide a description of your brand, and the AI generates unique, professional logos based on your input in seconds."
    },
    {
        question: "Can I use the generated logos for commercial purposes?",
        answer: "Yes, if you are on the Pro or Team plan, you hold full commercial rights to use the logos for your business, merchandise, social media, and any other commercial application."
    },
    {
        question: "What file formats do I get?",
        answer: "All plans include high-resolution PNG downloads. Pro and Team plans also include fully scalable SVG vector files, which are perfect for printing and professional design software."
    },
    {
        question: "Can I edit the logo after it's generated?",
        answer: "Absolutely! Our natural language editor allows you to refine colors, fonts, layouts, and icons simply by describing what you want to change."
    }
]

export function Pricing() {
    const [isYearly, setIsYearly] = useState(false)

    return (
        <section id="pricing" className="min-h-[100dvh] w-full shrink-0 flex flex-col justify-center py-16 sm:py-24 border-t border-border/50 relative overflow-hidden bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-balance">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-muted-foreground mt-4 text-base sm:text-lg mb-8">
                        Start free, upgrade when you need more power
                    </p>

                    <div className="flex items-center justify-center gap-3">
                        <Label htmlFor="billing-switch" className={`text-sm ${!isYearly ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
                            Monthly
                        </Label>
                        <Switch
                            id="billing-switch"
                            checked={isYearly}
                            onCheckedChange={setIsYearly}
                        />
                        <Label htmlFor="billing-switch" className={`text-sm flex items-center gap-1.5 ${isYearly ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
                            Yearly
                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary uppercase tracking-wider">
                                Save 20%
                            </span>
                        </Label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-20 sm:mb-32">
                    {[
                        {
                            name: "Free",
                            price: "$0",
                            desc: "Perfect for trying out",
                            features: ["5 logos per month", "Standard PNG export", "Basic styles", "Community support"],
                            cta: "Get Started Free",
                            popular: false,
                        },
                        {
                            name: "Pro",
                            price: isYearly ? "$9" : "$12",
                            desc: "For creators and startups",
                            features: ["Unlimited logos", "SVG export", "All AI styles", "Priority support", "No watermarks", "Commercial rights"],
                            cta: "Start Pro Trial",
                            popular: true,
                        },
                        {
                            name: "Team",
                            price: isYearly ? "$24" : "$29",
                            desc: "For teams and agencies",
                            features: ["Everything in Pro", "Up to 5 team members", "Team collaboration", "Brand kit management", "API access"],
                            cta: "Contact Sales",
                            popular: false,
                        },
                    ].map((plan) => (
                        <Card
                            key={plan.name}
                            className={cn(
                                "relative overflow-hidden transition-all duration-500 bg-card/40 backdrop-blur-xl border-border/50",
                                plan.popular ? "border-primary/60 shadow-[0_0_30px_-10px_var(--color-primary)] scale-100 md:scale-105 z-10 ring-1 ring-primary/20" : "scale-100 mt-0 md:mt-4 hover:border-primary/50"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
                            )}
                            {plan.popular && (
                                <div className="absolute top-5 right-5 z-20">
                                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0 shadow-sm backdrop-blur-md">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}
                            <CardContent className="p-8 relative z-10">
                                <h3 className="font-bold text-2xl mb-2">{plan.name}</h3>
                                <p className="text-muted-foreground text-sm mb-6 h-10">{plan.desc}</p>
                                <div className="mb-8 flex items-baseline gap-2">
                                    <span className="text-5xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight">
                                        {plan.price}
                                    </span>
                                    <span className="text-muted-foreground font-medium">/month</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-start gap-3 text-sm font-medium">
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 border border-primary/20 shadow-sm">
                                                <Star className="h-2.5 w-2.5 text-primary" />
                                            </div>
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    variant={plan.popular ? "default" : "outline"}
                                    size="lg"
                                    className={cn(
                                        "w-full h-12 text-base font-semibold transition-all",
                                        plan.popular ? "shadow-[0_0_15px_-3px_var(--color-primary)] hover:shadow-[0_0_25px_-3px_var(--color-primary)]" : "bg-background/50 backdrop-blur-sm"
                                    )}
                                    asChild
                                >
                                    <Link href="/register">{plan.cta}</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)]">
                            Frequently Asked Questions
                        </h3>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left font-medium text-base sm:text-lg">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
