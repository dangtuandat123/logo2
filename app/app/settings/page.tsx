"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Monitor, User, Bell, CreditCard, Shield } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex-1 overflow-y-scroll overflow-x-hidden">
      <div className="p-3 sm:p-4 md:p-6 max-w-5xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
          Settings
        </h1>
        <Separator className="mb-6 animate-in fade-in duration-700" />

        <Tabs defaultValue="profile" className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          <TabsList className="bg-muted/50 backdrop-blur-md">
            <TabsTrigger value="profile" className="gap-1.5 data-[state=active]:shadow-sm">
              <User className="h-3.5 w-3.5" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-1.5 data-[state=active]:shadow-sm">
              <Sun className="h-3.5 w-3.5" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-1.5 data-[state=active]:shadow-sm">
              <CreditCard className="h-3.5 w-3.5" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="bg-card/40 backdrop-blur-sm border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your name and email address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 bg-background/50 focus-visible:ring-primary/30"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 bg-background/50 focus-visible:ring-primary/30"
                  />
                </div>
                <Button size="sm" className="shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all">Save Changes</Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-card/40 backdrop-blur-sm border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  Notifications
                </CardTitle>
                <CardDescription>Manage how you receive updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Email notifications", desc: "Receive updates about your logos" },
                  { label: "Logo generation alerts", desc: "Get notified when your logo is ready" },
                  { label: "Marketing emails", desc: "Tips and product updates" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked className="shrink-0 data-[state=checked]:bg-primary" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="bg-card/40 backdrop-blur-sm border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Choose your preferred color scheme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {themeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setTheme(opt.id)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 active:scale-[0.97]",
                        mounted && theme === opt.id
                          ? "border-primary bg-primary/10 shadow-[0_0_15px_-3px_var(--color-primary)] scale-[1.02]"
                          : "border-border/50 bg-background/50 hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <opt.icon className={cn("h-5 w-5 transition-colors duration-300", mounted && theme === opt.id ? "text-primary" : "text-muted-foreground")} />
                      <span className={cn("text-sm font-medium transition-colors duration-300", mounted && theme === opt.id ? "text-foreground" : "text-muted-foreground")}>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="bg-card/40 backdrop-blur-sm border-border/60 shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription and billing details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-background/50 border border-border/50">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">Pro Plan</p>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-0">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Unlimited logo generations & high-res exports</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-xl">$19<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    <p className="text-xs text-muted-foreground mt-0.5">Renews on Mar 15, 2026</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button className="w-full sm:w-auto shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all">Upgrade Plan</Button>
                  <Button variant="outline" className="w-full sm:w-auto bg-background/50 hover:bg-muted/50">Manage Billing</Button>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Shield className="h-4 w-4" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible actions for your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Separator className="mb-4" />
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Delete Account</p>
                    <p className="text-xs text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button variant="destructive" size="sm" className="shrink-0">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
