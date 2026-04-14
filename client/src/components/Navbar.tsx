import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const cartItems = useCart((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/category/mens-watches", label: "ساعات رجالية" },
    { href: "/category/womens-watches", label: "ساعات نسائية" },
    { href: "/category/perfumes", label: "العطور" },
    { href: "/category/cosmetics", label: "مستحضرات تجميل" },
  ];

  const NavContent = ({ mobile = false }) => (
    <div className={cn("flex", mobile ? "flex-col space-y-4" : "items-center space-x-8 space-x-reverse")}>
      {navLinks.map((link) => (
        <Link 
          key={link.href} 
          href={link.href} 
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location === link.href ? "text-primary" : "text-muted-foreground",
            mobile && "text-lg py-2"
          )}
          onClick={() => mobile && setIsMobileMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l border-white/10 bg-background">
              <div className="flex flex-col h-full pt-10">
                <NavContent mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="text-2xl font-display font-bold text-primary tracking-widest hover:opacity-90 transition-opacity">
          فخامة
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <NavContent />
        </nav>

        {/* Cart Icon */}
        <Link href="/cart">
          <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-colors">
            <ShoppingBag className="h-6 w-6 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
}
