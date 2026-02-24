import { Sparkles } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-border/50 py-8 sm:py-12 bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                            <Sparkles className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-lg font-[family-name:var(--font-heading)]">
                            LogoAI
                        </span>
                    </div>
                    <div className="text-center sm:text-right">
                        <p className="text-sm font-medium text-foreground">
                            Built with AI. Designed for creators.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            &copy; {new Date().getFullYear()} LogoAI. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
