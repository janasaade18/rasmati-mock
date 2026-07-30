"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, Menu, UserRound } from "lucide-react";
import { NAV_LINKS } from "@/lib/brand";
import { Monogram } from "@/components/ui/logo";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useAuth } from "@/contexts/auth-context";
import { AnnouncementBar } from "./announcement-bar";
import { SearchOverlay } from "./search-overlay";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ivory/85 text-ink backdrop-blur-md">
        <div className="relative">
          <div className="border-b border-line-soft">
            <AnnouncementBar />
          </div>

          <div className="container-luxe">
            <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-[4.75rem]">
              <div className="flex items-center gap-9">
                <button
                  onClick={() => setNavOpen(true)}
                  aria-label="Open menu"
                  className="lg:hidden"
                >
                  <Menu className="size-5" strokeWidth={1.4} />
                </button>
                <nav className="hidden items-center gap-9 lg:flex">
                  {NAV_LINKS.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "link-underline label-art text-[1.1rem] transition-opacity",
                          active ? "opacity-100" : "opacity-75 hover:opacity-100"
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <Link
                href="/"
                aria-label="Rasmati — home"
                className="flex flex-col items-center leading-none"
              >
                <Monogram className="text-[1.7rem] lg:text-[1.95rem]" />
                <span className="label-art mt-1 hidden text-[0.85rem] tracking-[0.06em] opacity-60 sm:block">
                  Rasmati
                </span>
              </Link>

              <div className="flex items-center justify-end gap-5 lg:gap-6">
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  className="transition-opacity hover:opacity-60"
                >
                  <Search className="size-[1.1rem]" strokeWidth={1.4} />
                </button>
                {isAuthenticated && (
                  <Link
                    href="/wishlist"
                    aria-label="Wishlist"
                    className="relative hidden transition-opacity hover:opacity-60 sm:block"
                  >
                    <Heart className="size-[1.1rem]" strokeWidth={1.4} />
                    {wishCount > 0 && (
                      <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-espresso text-[0.55rem] text-ivory">
                        {wishCount}
                      </span>
                    )}
                  </Link>
                )}
                <Link
                  href={isAuthenticated ? "/account" : "/sign-in"}
                  aria-label={isAuthenticated ? "My account" : "Sign in or create an account"}
                  className="transition-opacity hover:opacity-60"
                >
                  <UserRound className="size-[1.1rem]" strokeWidth={1.4} />
                </Link>
                <button
                  onClick={openCart}
                  aria-label="Open your wall"
                  className="relative transition-opacity hover:opacity-60"
                >
                  <ShoppingBag className="size-[1.1rem]" strokeWidth={1.4} />
                  {itemCount > 0 && (
                    <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-espresso text-[0.55rem] text-ivory">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
}