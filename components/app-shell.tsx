"use client"

import { useEffect } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  PlusCircle,
  FolderOpen,
  Settings,
  LogOut,
  Moon,
  Sun,
  Gem,
  CreditCard,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { CommandMenu } from "@/components/command-menu"
import { AppLogo } from "@/components/app-logo"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { href: "/app", icon: Home, label: "Home" },
  { href: "/app/create", icon: PlusCircle, label: "Tạo" },
  { href: "/app/projects", icon: FolderOpen, label: "Dự án" },
  { href: "/app/billing", icon: Gem, label: "Nạp" },
  { href: "/app/settings", icon: Settings, label: "Cài đặt" },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()

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
          className="flex items-center justify-center mb-3 shrink-0"
        >
          <AppLogo size={40} />
        </Link>

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

          <div className="flex flex-col gap-1 w-full justify-center items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/app/billing" className="flex flex-col items-center justify-center p-2 mb-2 bg-primary/10 rounded-xl cursor-pointer hover:bg-primary/20 transition-colors">
                  <Gem className="h-5 w-5 text-primary mb-0.5" />
                  <span className="text-[10px] font-bold text-primary">{user?.diamonds ?? 0}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                Nhấn để nạp thêm kim cương
              </TooltipContent>
            </Tooltip>
          </div>

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
                <button
                  onClick={logout}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Sign out</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                Đăng xuất
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </aside>



      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
        {children}
      </main>

      {/* Ctrl+K Command Menu */}
      <CommandMenu />

      {/* Mobile Bottom Nav - with safe area insets */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-sidebar/95 backdrop-blur-xl">
        <div className="flex items-center justify-between h-16 px-2 sm:px-4 gap-1" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/app" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all active:scale-95",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]")} />
                <span className={cn("text-[10px] leading-none", isActive ? "font-bold" : "font-medium")}>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
