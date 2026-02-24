"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Monitor, User, Bell, CreditCard, Shield } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const themeOptions = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
]

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john@example.com")
  const [mounted, setMounted] = useState(false)

  // Chờ hydrate xong mới render theme-dependent styles
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-4 sm:mb-6">
          Settings
        </h1>

        {/* Profile */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 shrink-0">
                <User className="h-4 w-4 text-primary" />
              </div>
              <h2 className="font-semibold text-sm sm:text-base">Profile</h2>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 h-10 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 h-10 rounded-xl"
                />
              </div>
              <Button size="sm" className="rounded-xl">Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 shrink-0">
                <Sun className="h-4 w-4 text-primary" />
              </div>
              <h2 className="font-semibold text-sm sm:text-base">Appearance</h2>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {themeOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTheme(opt.id)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-xl border transition-all active:scale-[0.97]",
                    mounted && theme === opt.id
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <opt.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 shrink-0">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <h2 className="font-semibold text-sm sm:text-base">Notifications</h2>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {[
                { label: "Email notifications", desc: "Receive updates about your logos" },
                { label: "Logo generation alerts", desc: "Get notified when your logo is ready" },
                { label: "Marketing emails", desc: "Tips and product updates" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked className="shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 shrink-0">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <h2 className="font-semibold text-sm sm:text-base">Subscription</h2>
            </div>
            <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/50 border border-border">
              <div className="min-w-0">
                <p className="text-sm font-semibold">Free Plan</p>
                <p className="text-[11px] sm:text-xs text-muted-foreground">5 logos per month</p>
              </div>
              <Button size="sm" variant="outline" className="rounded-xl shrink-0">
                Upgrade
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/30">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-destructive/10 shrink-0">
                <Shield className="h-4 w-4 text-destructive" />
              </div>
              <h2 className="font-semibold text-sm sm:text-base">Danger Zone</h2>
            </div>
            <Separator className="mb-3 sm:mb-4" />
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium">Delete Account</p>
                <p className="text-[11px] sm:text-xs text-muted-foreground">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="destructive" size="sm" className="rounded-xl shrink-0">
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
