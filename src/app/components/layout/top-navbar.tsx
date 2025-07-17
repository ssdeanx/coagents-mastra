"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { ThemeSwitch } from "./theme-switch";
import {
  Menu,
  X,
  Bot,
  Sparkles,
  BookOpen,
  Github,
  MessageSquare,
  User,
  LayoutDashboard,
  Search,
  Workflow,
  BarChart3,
  Code,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TopNavbarProps {
  className?: string;
  showAuthButtons?: boolean;
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "AI-powered workspace and chat interface",
    icon: LayoutDashboard,
  },
  {
    title: "Research",
    href: "/research",
    description: "Document analysis and research tools",
    icon: Search,
  },
  {
    title: "Workflows",
    href: "/workflows",
    description: "Multi-agent automation and orchestration",
    icon: Workflow,
  },
  {
    title: "Analytics",
    href: "/analytics",
    description: "Performance metrics and monitoring",
    icon: BarChart3,
  },
  {
    title: "Dev",
    href: "/dev",
    description: "AI-powered development workspace",
    icon: Code,
  },
  {
    title: "Agents",
    href: "/agents",
    description: "Agent management and configuration",
    icon: Settings,
  },
];

/**
 * Top navigation bar component
 *
 * @param className - Additional CSS classes
 * @param showAuthButtons - Whether to show authentication buttons
 */
export function TopNavbar({
  className,
  showAuthButtons = true
}: TopNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Mastra</span>
          <Badge variant="secondary" className="ml-2 text-xs">
            <Sparkles className="mr-1 h-3 w-3" />
            AI
          </Badge>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <div className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/dashboard"
                        >
                          <MessageSquare className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            AI Dashboard
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Experience the full power of our AI agent system.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </div>
                    {navigationItems.slice(0, 3).map((item) => (
                      <NavigationMenuLink key={item.title} asChild>
                        <a
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{item.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {item.description}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/docs"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Documentation
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <ThemeSwitch />

          {showAuthButtons && (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="sm" asChild className="hidden md:flex">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </Link>
          </Button>

          {/* Mobile menu trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Menu</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <nav className="flex flex-col space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </nav>

                {showAuthButtons && (
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Button variant="ghost" asChild>
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}