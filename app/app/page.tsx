"use client"

import Link from "next/link"
import { PlusCircle, Sparkles, TrendingUp, Clock, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const recentLogos = [
  {
    id: "1",
    name: "TechFlow",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#6366f1"/><path d="M30 60 L60 30 L90 60 L60 90Z" fill="white" opacity="0.9"/><circle cx="60" cy="60" r="12" fill="#6366f1"/></svg>`,
    date: "2 hours ago",
  },
  {
    id: "2",
    name: "GreenLeaf",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#10b981"/><path d="M60 25 C40 45 35 75 60 95 C85 75 80 45 60 25Z" fill="white" opacity="0.9"/></svg>`,
    date: "Yesterday",
  },
  {
    id: "3",
    name: "Sunrise",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#f59e0b"/><circle cx="60" cy="65" r="25" fill="white" opacity="0.9"/><rect x="55" y="30" width="10" height="15" rx="5" fill="white" opacity="0.7"/><rect x="30" y="55" width="15" height="10" rx="5" fill="white" opacity="0.7"/><rect x="75" y="55" width="15" height="10" rx="5" fill="white" opacity="0.7"/></svg>`,
    date: "3 days ago",
  },
]

export default function DashboardPage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5 sm:mt-1">
              Create and manage your AI-generated logos
            </p>
          </div>
          <Button asChild className="hidden sm:flex gap-2 rounded-xl">
            <Link href="/app/create">
              <PlusCircle className="h-4 w-4" />
              New Logo
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
          {[
            { label: "Total Logos", value: "12", icon: Sparkles },
            { label: "This Month", value: "4", icon: TrendingUp },
            { label: "Last Created", value: "2h", icon: Clock },
            { label: "Projects", value: "3", icon: FolderOpen },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/50 bg-card">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 shrink-0">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] leading-none">
                      {stat.value}
                    </p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 truncate">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Create */}
        <Card className="mb-6 sm:mb-8 border-primary/20 bg-primary/5 overflow-hidden">
          <CardContent className="p-4 sm:p-6 flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 shrink-0">
              <Sparkles className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg font-semibold font-[family-name:var(--font-heading)]">
                Create a new logo with AI
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-1">
                Describe your brand and let AI generate a unique logo for you
              </p>
            </div>
            <Button asChild className="rounded-xl shrink-0">
              <Link href="/app/create">
                <PlusCircle className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Create</span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Logos */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold font-[family-name:var(--font-heading)]">
              Recent Logos
            </h2>
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground text-xs sm:text-sm">
              <Link href="/app/projects">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {recentLogos.map((logo) => (
              <Link key={logo.id} href={`/app/editor/${logo.id}`}>
                <Card className="group cursor-pointer border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-200 overflow-hidden active:scale-[0.98]">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted/50 flex items-center justify-center p-5 sm:p-8 group-hover:bg-muted/80 transition-colors">
                      <div
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: logo.svg }}
                      />
                    </div>
                    <div className="p-3 sm:p-4 border-t border-border/50">
                      <p className="font-medium text-sm truncate">{logo.name}</p>
                      <p className="text-[11px] sm:text-xs text-muted-foreground">{logo.date}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile FAB */}
        <div className="sm:hidden fixed bottom-[calc(3.5rem+env(safe-area-inset-bottom)+0.75rem)] right-4 z-40">
          <Button
            asChild
            size="lg"
            className="rounded-full h-14 w-14 shadow-xl shadow-primary/25 p-0"
          >
            <Link href="/app/create">
              <PlusCircle className="h-6 w-6" />
              <span className="sr-only">Create new logo</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
