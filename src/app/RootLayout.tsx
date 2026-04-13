import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
          <NavLink to="/" className="font-bold text-xl">
            Asma Laouy
          </NavLink>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/projects" className="text-sm hover:text-primary transition-colors">
              Projets
            </NavLink>
            <NavLink to="/experience" className="text-sm hover:text-primary transition-colors">
              Expérience
            </NavLink>
            <NavLink to="/education" className="text-sm hover:text-primary transition-colors">
              Formations
            </NavLink>
            <NavLink to="/certifications" className="text-sm hover:text-primary transition-colors">
              Certifications
            </NavLink>
            <NavLink to="/contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </NavLink>
          </nav>
        </div>
      </header>
      
      <main className="mx-auto max-w-6xl p-6">
        <Outlet />
      </main>
      
    
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
  © {new Date().getFullYear()} • Asma Laouy • Tous droits réservés
 

</footer>
    </div>
  );
}