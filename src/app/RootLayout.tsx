import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { to: "/projects",       label: "Projets" },
  { to: "/experience",     label: "Expérience" },
  { to: "/education",      label: "Formations" },
  { to: "/certifications", label: "Certifications" },
  { to: "/contact",        label: "Contact" },
];

export default function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background text-foreground">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl flex items-center justify-between p-4 gap-4">

          {/* Logo */}
          <NavLink to="/" className="font-bold text-xl shrink-0">
            Asma Laouy
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm transition-colors ${isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Droite : toggle + burger */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Burger — visible uniquement mobile */}
            <button
              className="md:hidden flex flex-col items-center justify-center gap-1.5"
              style={{
                width: "2.25rem",
                height: "2.25rem",
                border: "1px solid hsl(var(--border))",
                borderRadius: "2px",
                background: "transparent",
                cursor: "pointer",
                padding: 0,
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu navigation"
              aria-expanded={menuOpen}
            >
              <span style={{
                display: "block", width: "1.1rem", height: "2px",
                background: "hsl(var(--foreground))", borderRadius: "1px",
                transition: "all 0.25s",
                transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
              }} />
              <span style={{
                display: "block", width: "1.1rem", height: "2px",
                background: "hsl(var(--foreground))", borderRadius: "1px",
                transition: "all 0.25s",
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: "block", width: "1.1rem", height: "2px",
                background: "hsl(var(--foreground))", borderRadius: "1px",
                transition: "all 0.25s",
                transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
              }} />
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        {menuOpen && (
          <div
            className="md:hidden border-t"
            style={{ background: "hsl(var(--background))" }}
          >
            <nav className="mx-auto max-w-6xl px-4 py-2 flex flex-col">
              {navLinks.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `py-3 text-sm border-b transition-colors ${isActive
                      ? "font-medium text-foreground border-border"
                      : "text-muted-foreground hover:text-foreground border-border"
                    } last:border-0`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ── Main ── */}
      <main className="mx-auto max-w-6xl p-6">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} • Asma Laouy • Tous droits réservés
      </footer>
    </div>
  );
}