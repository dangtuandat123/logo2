"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Cta() {
    return (
        <section className="py-20 sm:py-32 border-t border-border/50 bg-background relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-heading)] text-balance mb-6 text-foreground">
                    Ready to create your stunning logo?
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-pretty text-lg sm:text-xl md:text-2xl leading-relaxed mb-10">
                    Join thousands of designers and founders using AI to build their brand identity instantly.
                </p>
                <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="h-14 text-base px-5 bg-background border-border shrink-0"
                        required
                    />
                    <Button size="lg" type="submit" className="gap-2 h-14 px-8 text-base w-full sm:w-auto shrink-0">
                        Start Free Trial
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                </form>
                <p className="text-sm text-muted-foreground mt-4">
                    No credit card required. 5 free logos on sign up.
                </p>
            </div>
        </section>
    )
}
