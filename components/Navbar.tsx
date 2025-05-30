import Link from "next/link";
import { CartButton } from "./CartButton";

export function Navbar() {
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
          <CartButton />
        </div>
      </div>
    </header>
  );
} 