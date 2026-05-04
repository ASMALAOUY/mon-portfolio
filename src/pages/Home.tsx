import { profile } from "@/data/profile";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{profile.name} | Portfolio</title>
        <meta name="description" content={profile.about} />
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

        /* ── Boutons ── */
        .pf-btn { padding: 0.6rem 1.25rem; font-size: 0.8rem; font-weight: 500; border-radius: 2px; text-decoration: none; transition: opacity 0.2s, background 0.2s; display: inline-flex; align-items: center; gap: 0.4rem; white-space: nowrap; }
        .pf-btn-primary { background: hsl(var(--foreground)); color: hsl(var(--background)); }
        .pf-btn-primary:hover { opacity: 0.8; }
        .pf-btn-outline { border: 1px solid hsl(var(--border)); color: hsl(var(--foreground)); }
        .pf-btn-outline:hover { background: hsl(var(--secondary)); }

        /* ── Icônes réseaux sociaux ── */
        .pf-icon-btn {
          width: 2.2rem; height: 2.2rem;
          display: inline-flex; align-items: center; justify-content: center;
          border: 1px solid hsl(var(--border)); border-radius: 2px;
          color: hsl(var(--muted-foreground));
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          flex-shrink: 0;
          text-decoration: none;
        }
        .pf-icon-btn:hover {
          background: hsl(var(--secondary));
          color: hsl(var(--foreground));
          border-color: hsl(var(--foreground));
        }

        @keyframes pf-up { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .pf-a { animation: pf-up 0.45s ease both; }
        .pf-a1 { animation-delay: 0.05s; } .pf-a2 { animation-delay: 0.13s; }
        .pf-a3 { animation-delay: 0.21s; } .pf-a4 { animation-delay: 0.29s; }
        .pf-dot { display:inline-block; width:3px; height:3px; border-radius:50%; background:hsl(var(--muted-foreground)); vertical-align:middle; margin:0 0.45rem; opacity:0.35; }

        /* Badge disponibilité */
        .pf-avail {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.72rem; font-weight: 500;
          padding: 0.3rem 0.75rem;
          border: 1px solid #86efac;
          border-radius: 999px;
          background: #dcfce7;
          color: #166534;
        }
        .dark .pf-avail {
          background: #14532d;
          border-color: #16a34a;
          color: #86efac;
        }
        .pf-avail-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #22c55e;
          animation: pf-pulse 2s infinite;
        }
        @keyframes pf-pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.35; }
        }
      `}</style>

      <div className="pf-root py-12 space-y-20">

        {/* ── Hero ── */}
        <section className="grid md:grid-cols-[1fr_180px] gap-12 items-start">
          <div className="space-y-6">

            {/* Badge disponibilité */}
            <div className="pf-a pf-a1">
              <span className="pf-avail">
                <span className="pf-avail-dot" />
                Disponible — stage 2026
              </span>
            </div>

            {/* Nom */}
            <h1 className="pf-name pf-a pf-a2">{profile.name}</h1>

            {/* Rôle */}
            <p className="pf-a pf-a2" style={{
              fontSize: "0.95rem", fontWeight: 500,
              color: "hsl(var(--muted-foreground))",
              marginTop: "-0.75rem",
            }}>
              {profile.role}
            </p>

            {/* Bio */}
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg pf-a pf-a3"
              style={{ fontWeight: 300, lineHeight: 1.75 }}>
              {profile.about}
            </p>

            {/* Localisation + email */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground pf-a pf-a3">
              <span>📍 {profile.location}</span>
              <span className="pf-dot" />
              <a href={`mailto:${profile.email}`}
                className="hover:text-foreground transition-colors">
                {profile.email}
              </a>
            </div>

            {/* ── CTA boutons — corrigés mobile ── */}
            <div className="flex flex-wrap items-center gap-2 pf-a pf-a4">
              {/* Bouton primaire */}
              <Link to="/projects" className="pf-btn pf-btn-primary">
                Voir mes projets
              </Link>

              {/* Bouton secondaire */}
              <Link to="/contact" className="pf-btn pf-btn-outline">
                Me contacter
              </Link>

              {/* Icônes GitHub + LinkedIn séparées — ne cassent plus sur mobile */}
              <div className="flex gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voir mon GitHub"
                  className="pf-icon-btn"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voir mon LinkedIn"
                  className="pf-icon-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── Colonne droite : Langues ── */}
          <div className="hidden md:block pt-1 space-y-4">
            <span className="pf-label">Langues</span>
            <div className="space-y-4 mt-3">
              {profile.languages.map(({ name, level }) => {
                const w = level === "Langue maternelle" ? "100%"
                       : level === "Courant" ? "85%"
                       : "55%";
                return (
                  <div key={name} className="space-y-1.5">
                    <div className="flex justify-between" style={{ fontSize: "0.72rem" }}>
                      <span style={{ fontWeight: 500 }}>{name}</span>
                      <span className="text-muted-foreground">{level}</span>
                    </div>
                    <div className="pf-lang-bar">
                      <div className="pf-lang-fill" style={{ width: w }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Compétences ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-0">
            <span className="pf-accent" />
            <span className="pf-label">Compétences techniques</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((s) => (
              <span key={s} className="pf-skill">{s}</span>
            ))}
          </div>
        </section>

        {/* ── Navigation rapide ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-0">
            <span className="pf-accent" />
            <span className="pf-label">Explorer le portfolio</span>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { to: "/projects",       title: "Projets",        sub: "Réalisations & code" },
              { to: "/experience",     title: "Expérience",     sub: "Stages & missions" },
              { to: "/education",      title: "Formations",     sub: "Parcours académique" },
              { to: "/certifications", title: "Certifications", sub: "Badges & diplômes" },
            ].map(({ to, title, sub }) => (
              <Link key={to} to={to} className="pf-card">
                <p className="font-medium text-sm"
                  style={{ fontFamily: "'Playfair Display', serif", marginBottom: "0.2rem" }}>
                  {title}
                </p>
                <p className="pf-label"
                  style={{ textTransform: "none", letterSpacing: "0", fontSize: "0.72rem" }}>
                  {sub}
                </p>
                <span className="pf-arrow text-muted-foreground">→</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}