"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    Home,
    PlusCircle,
    FolderOpen,
    Settings,
    Search,
} from "lucide-react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

const navCommands = [
    { label: "Home", icon: Home, href: "/app" },
    { label: "Create Logo", icon: PlusCircle, href: "/app/create" },
    { label: "My Logos", icon: FolderOpen, href: "/app/projects" },
    { label: "Settings", icon: Settings, href: "/app/settings" },
]

export function CommandMenu() {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((o) => !o)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = (href: string) => {
        setOpen(false)
        router.push(href)
    }

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                    {navCommands.map((cmd) => (
                        <CommandItem
                            key={cmd.href}
                            onSelect={() => runCommand(cmd.href)}
                            className="gap-2"
                        >
                            <cmd.icon className="h-4 w-4 text-muted-foreground" />
                            <span>{cmd.label}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
