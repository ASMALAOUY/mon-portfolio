import { profile } from "@/data/profile";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{profile.name} | Portfolio</title>
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        .pf-root { font-family: 'DM Sans', sans-serif; }
        .pf-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.8rem, 7vw, 5rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.02em;
        }
        .pf-label {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: hsl(var(--muted-foreground));
        }
        .pf-accent { display: inline-block; width: 2rem; height: 2px; background: hsl(var(--primary)); margin-right: 0.6rem; vertical-align: middle; margin-bottom: 0.12em; }
        .pf-skill { display: inline-block; padding: 0.28rem 0.7rem; border: 1px solid hsl(var(--border)); border-radius: 2px; font-size: 0.72rem; color: hsl(var(--muted-foreground)); transition: border-color 0.2s, color 0.2s; }
        .pf-skill:hover { border-color: hsl(var(--foreground)); color: hsl(var(--foreground)); }
        .pf-card { display: block; padding: 1.25rem 1.5rem; border: 1px solid hsl(var(--border)); border-radius: 2px; text-decoration: none; color: inherit; position: relative; overflow: hidden; transition: background 0.2s; }
        .pf-card .pf-arrow { position: absolute; right: 1.1rem; top: 50%; transform: translateY(-50%) translateX(6px); opacity: 0; transition: all 0.2s; font-size: 1rem; }
        .pf-card:hover { background: hsl(var(--secondary)); }
        .pf-card:hover .pf-arrow { opacity: 1; transform: translateY(-50%) translateX(0); }
        .pf-lang-bar { height: 2px; background: hsl(var(--border)); border-radius: 1px; }
        .pf-lang-fill { height: 100%; background: hsl(var(--primary)); border-radius: 1px; }
        .pf-btn { padding: 0.6rem 1.25rem; font-size: 0.8rem; font-weight: 500; border-radius: 2px; text-decoration: none; transition: opacity 0.2s, background 0.2s; }
        .pf-btn-primary { background: hsl(var(--foreground)); color: hsl(var(--background)); }
        .pf-btn-primary:hover { opacity: 0.8; }
        .pf-btn-outline { border: 1px solid hsl(var(--border)); color: hsl(var(--foreground)); }
        .pf-btn-outline:hover { background: hsl(var(--secondary)); }
        @keyframes pf-up { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .pf-a { animation: pf-up 0.45s ease both; }
        .pf-a1 { animation-delay: 0.05s; } .pf-a2 { animation-delay: 0.13s; }
        .pf-a3 { animation-delay: 0.21s; } .pf-a4 { animation-delay: 0.29s; }
        .pf-dot { display:inline-block; width:3px; height:3px; border-radius:50%; background:hsl(var(--muted-foreground)); vertical-align:middle; margin:0 0.45rem; opacity:0.35; }
      `}</style>

      <div className="pf-root py-12 space-y-20">

        {/* Hero */}
        <section className="grid md:grid-cols-[1fr_180px] gap-12 items-start">
          <div className="space-y-6">
            <div className="pf-a pf-a1"><span className="pf-label">Portfolio — {new Date().getFullYear()}</span></div>
            <h1 className="pf-name pf-a pf-a2">{profile.name}</h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg pf-a pf-a3" style={{ fontWeight: 300, lineHeight: 1.75 }}>
              {profile.about}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground pf-a pf-a3">
              <span>📍 {profile.location}</span>
              <span className="pf-dot" />
              <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors">{profile.email}</a>
              <span className="pf-dot" />

            </div>
            <div className="flex flex-wrap gap-2 pf-a pf-a4">
              <Link to="/projects" className="pf-btn pf-btn-primary">Voir mes projets</Link>
              <Link to="/contact" className="pf-btn pf-btn-outline">Me contacter</Link>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn-outline">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn-outline">LinkedIn</a>
            </div>
          </div>

          {/* Language sidebar */}
          <div className="hidden md:block pt-1 space-y-4">
            <span className="pf-label">Langues</span>
            <div className="space-y-4 mt-3">
              {profile.languages.map(({ name, level }) => {
                const w = level === "Langue maternelle" ? "100%" : level === "Courant" ? "85%" : "55%";
                return (
                  <div key={name} className="space-y-1.5">
                    <div className="flex justify-between" style={{ fontSize: '0.72rem' }}>
                      <span style={{ fontWeight: 500 }}>{name}</span>
                      <span className="text-muted-foreground">{level}</span>
                    </div>
                    <div className="pf-lang-bar"><div className="pf-lang-fill" style={{ width: w }} /></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <div className="flex items-center gap-0">
            <span className="pf-accent" />
            <span className="pf-label">Compétences techniques</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((s) => <span key={s} className="pf-skill">{s}</span>)}
          </div>
        </section>

        {/* Nav cards */}
        <section className="space-y-4">
          <div className="flex items-center gap-0">
            <span className="pf-accent" />
            <span className="pf-label">Explorer le portfolio</span>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { to: "/projects",       title: "Projets",       sub: "Réalisations & code" },
              { to: "/experience",     title: "Expérience",    sub: "Stages & missions" },
              { to: "/education",      title: "Formations",    sub: "Parcours académique" },
              { to: "/certifications", title: "Certifications",sub: "Badges & diplômes" },
            ].map(({ to, title, sub }) => (
              <Link key={to} to={to} className="pf-card">
                <p className="font-medium text-sm" style={{ fontFamily: "'Playfair Display', serif", marginBottom: '0.2rem' }}>{title}</p>
                <p className="pf-label" style={{ textTransform: 'none', letterSpacing: '0', fontSize: '0.72rem' }}>{sub}</p>
                <span className="pf-arrow text-muted-foreground">→</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}