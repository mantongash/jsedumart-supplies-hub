import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { cartCount } = useStore();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home", icon: "fa-house" },
    { to: "/shop", label: "Shop", icon: "fa-store" },
    { to: "/offers", label: "Offers", icon: "fa-tags" },
    { to: "/blog", label: "Blog", icon: "fa-newspaper" },
    { to: "/about", label: "About", icon: "fa-info-circle" },
    { to: "/contact", label: "Contact", icon: "fa-envelope" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-sm">
      {/* Top bar */}
      <div className="bg-primary">
        <div className="container mx-auto flex items-center justify-between py-1.5 text-xs text-primary-foreground">
          <span className="hidden sm:inline">
            <i className="fa-solid fa-truck-fast mr-1" /> Free delivery in Nairobi CBD for orders over KSh 2,000
          </span>
          <span className="sm:hidden text-center w-full">
            <i className="fa-solid fa-truck-fast mr-1" /> Free delivery over KSh 2,000
          </span>
          <div className="hidden sm:flex items-center gap-4">
            <a href="tel:+254712345678" className="hover:underline">
              <i className="fa-solid fa-phone mr-1" /> +254 712 345 678
            </a>
            <Link to="/track-order" className="hover:underline">
              <i className="fa-solid fa-location-dot mr-1" /> Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto flex items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <i className="fa-solid fa-book-open text-primary-foreground text-lg" />
          </div>
          <div>
            <span className="font-display text-xl font-bold text-foreground leading-none">JSEdumart</span>
            <span className="block text-[10px] text-muted-foreground leading-none">Books & Stationery</span>
          </div>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search books, stationery, supplies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
            <button type="submit" className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity">
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link to={user.isAdmin ? "/admin" : "/account"} className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
                <i className="fa-solid fa-user" />
                <span className="hidden lg:inline">{user.name}</span>
              </Link>
              <button onClick={logout} className="px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground">
                <i className="fa-solid fa-right-from-bracket" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
              <i className="fa-solid fa-user" />
              <span className="hidden lg:inline">Login</span>
            </Link>
          )}
          <Link to="/wishlist" className="relative px-3 py-2 rounded-lg hover:bg-muted transition-colors">
            <i className="fa-solid fa-heart text-lg" />
          </Link>
          <Link to="/cart" className="relative px-3 py-2 rounded-lg hover:bg-muted transition-colors">
            <i className="fa-solid fa-bag-shopping text-lg" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-in">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden px-3 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"} text-lg`} />
          </button>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:block border-t border-border">
        <div className="container mx-auto flex items-center gap-1 py-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <i className={`fa-solid ${link.icon} mr-1.5`} />
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          <form onSubmit={handleSearch} className="p-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                <i className="fa-solid fa-magnifying-glass" />
              </button>
            </div>
          </form>
          <div className="flex flex-col pb-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-muted text-accent"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <i className={`fa-solid ${link.icon} mr-2 w-5`} />
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="px-6 py-3 text-sm font-medium text-foreground hover:bg-muted">
                <i className="fa-solid fa-user mr-2 w-5" /> Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
