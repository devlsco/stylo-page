"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun, MenuIcon } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [{ href: "/commands", label: "Commands" }];

  return (
    <header className="sticky top-0 z-50 w-full max-w-7xl bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-b-lg">
      <div className="container mx-auto flex h-16 px-2.5 items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open mobile menu"
                >
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[250px] sm:w-[300px] flex flex-col"
              >
                <SheetHeader>
                  <SheetTitle>
                    <Link
                      href="/"
                      className="flex items-center space-x-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="relative h-8 w-8">
                        <Image
                          src="/logo.png"
                          alt="Stylo Bot Logo"
                          fill
                          sizes="(max-width: 32px) 32px, (max-width: 64px) 64px, 128px"
                          className="object-contain"
                        />
                      </div>
                      <span className="hidden sm:inline-flex items-start gap-0.5">
                        <span className="text-xl font-extrabold tracking-tight gif-text inline-block">
                          stylo
                        </span>
                        <span className="text-[0.65rem] font-extrabold tracking-tight text-foreground uppercase leading-none pt-0.5">
                          Bot
                        </span>
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 text-base font-medium px-5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="hidden md:flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <Image
                src="/logo.png"
                alt="Stylo Bot Logo"
                fill
                sizes="(max-width: 32px) 32px, (max-width: 64px) 64px, 128px"
                className="object-contain"
              />
            </div>
            <span className="hidden sm:inline-flex items-start gap-0.5">
              <span className="text-xl font-extrabold tracking-tight gif-text inline-block">
                stylo
              </span>
              <span className="text-[0.65rem] font-extrabold tracking-tight text-foreground uppercase leading-none pt-0.5">
                Bot
              </span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground transition-colors hover:text-foreground/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {!mounted ? (
              <Moon className="h-5 w-5" />
            ) : theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>{" "}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
