"use client"

import { useEffect } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  PlusCircle,
  FolderOpen,
  Settings,
  Sparkles,
  LogOut,
  Moon,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CommandMenu } from "@/components/command-menu"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { href: "/app", icon: Home, label: "Tổng quan" },
  { href: "/app/create", icon: PlusCircle, label: "Tạo mới" },
  { href: "/app/projects", icon: FolderOpen, label: "Logo của tôi" },
  { href: "/app/settings", icon: Settings, label: "Cài đặt" },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  // Khóa scroll trên html/body khi AppShell mount, mở lại khi unmount
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    html.style.overflow = 'hidden'
    html.style.height = '100%'
    body.style.overflow = 'hidden'
    body.style.height = '100%'
    return () => {
      html.style.overflow = ''
      html.style.height = ''
      body.style.overflow = ''
      body.style.height = ''
    }
  }, [])

  return (
    <div className="app-shell flex fixed inset-0 overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[72px] flex-col items-center border-r border-border bg-sidebar py-4 lg:py-6 gap-1">
        <Link
          href="/app"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary mb-3 shrink-0"
        >
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </Link>

        <Separator className="w-8 mb-2" />

        <TooltipProvider delayDuration={0}>
          <nav className="flex flex-col gap-1 flex-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/app" && pathname.startsWith(item.href))
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-150",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </nav>

          <div className="flex flex-col gap-1 mt-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                Đổi giao diện
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Sign out</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                Đăng xuất
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-border bg-sidebar/95 backdrop-blur-xl">
        <div className="flex items-center justify-between h-12 px-4">
          <div className="flex items-center gap-2.5">
            <Link href="/app" className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            </Link>
            <span className="font-semibold text-sm font-[family-name:var(--font-heading)]">
              {pathname === "/app" && "Tổng quan"}
              {pathname === "/app/create" && "Tạo Logo"}
              {pathname.startsWith("/app/create/generating") && "Đang tạo..."}
              {pathname === "/app/projects" && "Logo của tôi"}
              {pathname === "/app/settings" && "Cài đặt"}
              {pathname.startsWith("/app/editor") && "Chỉnh sửa"}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-lg text-muted-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Đổi giao diện</span>
          </Button>
        </div>
      </div>

      {/* Main Content - safe area for mobile header + bottom nav */}
      <main className="flex-1 flex flex-col overflow-hidden pt-12 pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pt-0 md:pb-0">
        {children}
      </main>

      {/* Ctrl+K Command Menu */}
      <CommandMenu />

      {/* Mobile Bottom Nav - with safe area insets */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-sidebar/95 backdrop-blur-xl">
        <div className="flex items-center justify-around h-14 px-1" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/app" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 min-w-[3.5rem] py-1 rounded-lg transition-colors active:scale-95",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground active:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "drop-shadow-sm")} />
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
