import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Our Services", href: "#loan-products" },
  { label: "Become a Partner", href: "/become-a-partner" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/90 backdrop-blur-lg border-b border-sidebar-border/70 shadow-[0_8px_24px_rgba(15,23,42,0.18)]">
      <div className="container mx-auto flex items-center justify-between h-[72px] px-4 lg:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-secondary-foreground">
            Quick Fund<span className="text-primary">x</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-white hover:text-white/80 transition-colors px-3 py-1.5 rounded-full hover:bg-sidebar-accent/70"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button className="shadow-primary-glow h-10 px-5">
              Partner Login
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" className="text-secondary-foreground hover:bg-sidebar-accent h-10 px-5">
              Login
            </Button>
          </Link>
        </div>

        <button className="md:hidden text-secondary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-secondary/95 border-t border-sidebar-border px-4 pb-6 space-y-2 shadow-[0_18px_40px_rgba(15,23,42,0.2)]">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block py-2 text-sm text-white hover:text-white/80"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <Link to="/login" className="flex-1">
              <Button className="w-full shadow-primary-glow">Partner Login</Button>
            </Link>
            <Link to="/become-a-partner" className="flex-1">
              <Button className="w-full">Become a Partner</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
