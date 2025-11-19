"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-shadow">
            <img
              src="/logo.png"
              alt="Logo de l'Église Esprit et Vie"
              width={48}
              height={48}
              className="w-12 h-12 object-cover rounded-full shadow-lg transition-transform duration-200 group-hover:scale-110 group-focus:scale-105"
              loading="eager"
              draggable={false}
            />
            <span className="sr-only">Accueil - Esprit et Vie</span>
            </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Accueil
            </Link>
            <Link href="/a-propos" className="text-foreground hover:text-primary transition-colors font-medium">
              À propos
            </Link>
            <Link href="/programmes" className="text-foreground hover:text-primary transition-colors font-medium">
              Programmes
            </Link>
            <Link href="/evenements" className="text-foreground hover:text-primary transition-colors font-medium">
              Événements
            </Link>
            <Link href="/sermons" className="text-foreground hover:text-primary transition-colors font-medium">
              Sermons
            </Link>
            <Link href="/galerie" className="text-foreground hover:text-primary transition-colors font-medium">
              Galerie
            </Link>
            <Link href="/temoignages" className="text-foreground hover:text-primary transition-colors font-medium">
              Témoignages
            </Link>
            <Link href="/blog" className="text-foreground hover:text-primary transition-colors font-medium">
              Blog
            </Link>
            <Link href="/prayer" className="text-foreground hover:text-primary transition-colors font-medium">
              Priere
            </Link>
            <Link href="/ressources" className="text-foreground hover:text-primary transition-colors font-medium">
              Ressources
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/don">Faire un don</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 animate-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Accueil
              </Link>
              <Link href="/a-propos" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                À propos
              </Link>
              <Link
                href="/programmes"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Programmes
              </Link>
              <Link
                href="/evenements"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Événements
              </Link>
              <Link href="/sermons" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Sermons
              </Link>
              <Link href="/galerie" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Galerie
              </Link>
              <Link
                href="/temoignages"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Témoignages
              </Link>
              <Link href="/blog" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Blog
              </Link>
              <Link
                href="/ressources"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Ressources
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Contact
              </Link>
              <Button asChild className="bg-primary hover:bg-primary/90 w-full">
                <Link href="/don">Faire un don</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
