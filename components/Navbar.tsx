'use client';

import { useState } from "react";
import Link from "next/link";
import { CartButton } from "./CartButton";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Top Flight Health
            </Link>
            <nav className="ml-8 hidden md:block">
              <ul className="flex space-x-4">
                <li>
                  <Link 
                    href="/products" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/provider/login" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Provider Portal
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <CartButton />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="px-4 py-2">
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/products" 
                  className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/provider/login" 
                  className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Provider Portal
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
} 