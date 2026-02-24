"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Grid3X3, List, MoreHorizontal, Trash2, Download, Copy, PlusCircle, FolderOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const logos = [
  {
    id: "1",
    name: "TechFlow",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#6366f1"/><path d="M30 60 L60 30 L90 60 L60 90Z" fill="white" opacity="0.9"/><circle cx="60" cy="60" r="12" fill="#6366f1"/></svg>`,
    date: "Feb 24, 2026",
    style: "Geometric",
  },
  {
    id: "2",
    name: "GreenLeaf",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#10b981"/><path d="M60 25 C40 45 35 75 60 95 C85 75 80 45 60 25Z" fill="white" opacity="0.9"/></svg>`,
    date: "Feb 23, 2026",
    style: "Minimal",
  },
  {
    id: "3",
    name: "Sunrise Co.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#f59e0b"/><circle cx="60" cy="65" r="25" fill="white" opacity="0.9"/><rect x="55" y="30" width="10" height="15" rx="5" fill="white" opacity="0.7"/><rect x="30" y="55" width="15" height="10" rx="5" fill="white" opacity="0.7"/><rect x="75" y="55" width="15" height="10" rx="5" fill="white" opacity="0.7"/></svg>`,
    date: "Feb 21, 2026",
    style: "Abstract",
  },
  {
    id: "4",
    name: "DarkMatter",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#1e293b"/><circle cx="60" cy="55" r="20" fill="none" stroke="white" stroke-width="3" opacity="0.9"/><circle cx="60" cy="55" r="8" fill="white" opacity="0.9"/><rect x="30" y="85" width="60" height="4" rx="2" fill="white" opacity="0.5"/></svg>`,
    date: "Feb 20, 2026",
    style: "Modern",
  },
  {
    id: "5",
    name: "Bloom",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#ec4899"/><circle cx="60" cy="55" r="12" fill="white" opacity="0.9"/><circle cx="48" cy="42" r="10" fill="white" opacity="0.6"/><circle cx="72" cy="42" r="10" fill="white" opacity="0.6"/><circle cx="45" cy="58" r="10" fill="white" opacity="0.6"/><circle cx="75" cy="58" r="10" fill="white" opacity="0.6"/></svg>`,
    date: "Feb 18, 2026",
    style: "Playful",
  },
  {
    id: "6",
    name: "Vertex",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#8b5cf6"/><polygon points="60,25 90,75 30,75" fill="white" opacity="0.9"/><polygon points="60,45 75,70 45,70" fill="#8b5cf6" opacity="0.8"/></svg>`,
    date: "Feb 15, 2026",
    style: "Geometric",
  },
]

export default function ProjectsPage() {
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")

  const filtered = logos.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)]">
              My Logos
            </h1>
            <Badge variant="secondary">{logos.length}</Badge>
          </div>
          <Tabs value={view} onValueChange={(v) => setView(v as "grid" | "list")}>
            <TabsList className="h-8 sm:h-9">
              <TabsTrigger value="grid" className="gap-1.5 text-xs px-2.5">
                <Grid3X3 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </TabsTrigger>
              <TabsTrigger value="list" className="gap-1.5 text-xs px-2.5">
                <List className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">List</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Separator className="mb-4 sm:mb-6" />

        {/* Search */}
        <div className="relative mb-4 sm:mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        {/* Empty State */}
        {filtered.length === 0 ? (
          <Card className="py-12">
            <CardContent className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-muted mb-4">
                <FolderOpen className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="font-semibold text-base mb-1">No logos found</p>
              <p className="text-sm text-muted-foreground mb-4">
                {search ? `No results for "${search}"` : "Create your first logo to get started"}
              </p>
              {!search && (
                <Button asChild>
                  <Link href="/app/create">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Logo
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((logo) => (
              <Card key={logo.id} className="group hover:border-primary/30 hover:shadow-lg transition-all duration-200 overflow-hidden py-0">
                <CardContent className="p-0">
                  <Link href={`/app/editor/${logo.id}`}>
                    <div className="aspect-square bg-muted/50 flex items-center justify-center p-5 sm:p-8 group-hover:bg-muted/80 transition-colors">
                      <div
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: logo.svg }}
                      />
                    </div>
                  </Link>
                  <div className="p-2.5 sm:p-3 border-t border-border/50 flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm truncate">{logo.name}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{logo.date}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((logo) => (
              <Link key={logo.id} href={`/app/editor/${logo.id}`}>
                <Card className={cn(
                  "group hover:border-primary/30 transition-all duration-200 active:scale-[0.99] py-0"
                )}>
                  <CardContent className="p-2.5 sm:p-3 flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted/50 rounded-lg flex items-center justify-center p-1 sm:p-1.5 shrink-0">
                      <div
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: logo.svg }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{logo.name}</p>
                      <p className="text-[11px] sm:text-xs text-muted-foreground">
                        {logo.style} · {logo.date}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
