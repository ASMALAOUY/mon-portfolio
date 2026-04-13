import { projects } from "@/data/projects";
import { Helmet } from "react-helmet-async";

export default function Projects() {
  return (
    <>
      <Helmet>
        <title>Projets | Asma Laouy</title>
        <meta name="description" content="Découvrez mes projets en développement web et IA" />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .pp { font-family: 'DM Sans', sans-serif; }

        .pp-hero {
          margin-bottom: 2.5rem;
        }
        .pp-label {
          font-size: 0.68rem; font-weight: 500; letter-spacing: 0.16em;
          text-transform: uppercase; color: hsl(var(--muted-foreground));
          display: block; margin-bottom: 0.4rem;
        }
        .pp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -0.02em;
          margin-bottom: 0.4rem;
        }
        .pp-sub { font-size: 0.88rem; color: hsl(var(--muted-foreground)); font-weight: 300; }

        /* Grid */
        .pp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
        }

        /* Card */
        .pp-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-radius: 14px; overflow: hidden;
          display: flex; flex-direction: column;
          transition: transform 0.22s, box-shadow 0.22s;
          animation: pp-up 0.38s ease both;
        }
        .pp-card:nth-child(2) { animation-delay: .07s }
        .pp-card:nth-child(3) { animation-delay: .14s }
        .pp-card:nth-child(4) { animation-delay: .21s }
        .pp-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.09); }

        /* Top bar — color per stack */
        .pp-bar { height: 4px; }

        /* Card body */
        .pp-body { padding: 1.35rem; flex: 1; display: flex; flex-direction: column; gap: 0.75rem; }

        /* Number + period row */
        .pp-meta { display: flex; align-items: center; justify-content: space-between; }
        .pp-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem; font-weight: 700; line-height: 1;
          color: hsl(var(--border)); user-select: none;
        }
        .pp-period {
          font-size: 0.7rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: hsl(var(--muted-foreground));
          background: hsl(var(--secondary)); padding: 0.25rem 0.6rem;
          border-radius: 999px;
        }

        .pp-card-title { font-size: 0.95rem; font-weight: 600; line-height: 1.35; }
        .pp-summary { font-size: 0.82rem; color: hsl(var(--muted-foreground)); font-weight: 300; line-height: 1.6; }
        .pp-desc { font-size: 0.78rem; color: hsl(var(--muted-foreground)); line-height: 1.6; font-weight: 300; }

        /* Tags */
        .pp-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: auto; padding-top: 0.25rem; }
        .pp-tag {
          padding: 0.2rem 0.55rem; border: 1px solid hsl(var(--border));
          border-radius: 4px; font-size: 0.68rem; color: hsl(var(--muted-foreground));
        }

        /* Footer buttons */
        .pp-foot { padding: 0 1.35rem 1.2rem; display: flex; gap: 0.6rem; flex-wrap: wrap; }

        .pp-btn-gh {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.55rem 1rem; border-radius: 8px;
          border: 1.5px solid hsl(var(--border));
          background: hsl(var(--background)); color: hsl(var(--foreground));
          font-size: 0.78rem; font-weight: 500; font-family: 'DM Sans', sans-serif;
          text-decoration: none; cursor: pointer; transition: all 0.18s; flex: 1;
          justify-content: center;
        }
        .pp-btn-gh:hover { border-color: #333; background: #f6f8fa; color: #24292f; }

        .pp-btn-demo {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.55rem 1rem; border-radius: 8px;
          background: hsl(var(--foreground)); color: hsl(var(--background));
          font-size: 0.78rem; font-weight: 500; font-family: 'DM Sans', sans-serif;
          text-decoration: none; cursor: pointer; transition: opacity 0.18s; flex: 1;
          justify-content: center; border: none;
        }
        .pp-btn-demo:hover { opacity: 0.82; }

        .pp-btn-disabled {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.55rem 1rem; border-radius: 8px;
          border: 1.5px dashed hsl(var(--border));
          background: transparent; color: hsl(var(--muted-foreground));
          font-size: 0.78rem; font-weight: 400; flex: 1;
          justify-content: center; opacity: 0.45; cursor: default;
        }

        /* GitHub icon SVG */
        .gh-ico { width: 15px; height: 15px; flex-shrink: 0; }

        @keyframes pp-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="pp py-12">

        {/* Header */}
        <div className="pp-hero">
          <span className="pp-label">Réalisations</span>
          <h1 className="pp-title">Projets</h1>
          <p className="pp-sub">Sélection de mes réalisations personnelles et académiques</p>
        </div>

        {/* Grid */}
        <div className="pp-grid">
          {projects.map((project, i) => {
            // Bar gradient per main tech
            const barColors: Record<string, string> = {
              PHP:        "linear-gradient(90deg,#7c3aed,#a78bfa)",
              Python:     "linear-gradient(90deg,#f59e0b,#fbbf24)",
              JavaScript: "linear-gradient(90deg,#f59e0b,#eab308)",
              React:      "linear-gradient(90deg,#0ea5e9,#38bdf8)",
              MySQL:      "linear-gradient(90deg,#0891b2,#06b6d4)",
              Java:       "linear-gradient(90deg,#ef4444,#f97316)",
              "C++":      "linear-gradient(90deg,#8b5cf6,#a78bfa)",
            };
            const barGrad = barColors[project.tags[0]] ?? "linear-gradient(90deg,#6b7280,#9ca3af)";

            return (
              <div key={project.id} className="pp-card">
                {/* Color bar */}
                <div className="pp-bar" style={{ background: barGrad }} />

                <div className="pp-body">
                  {/* Number + period */}
                  <div className="pp-meta">
                    <span className="pp-num">0{i + 1}</span>
                    <span className="pp-period">{project.period}</span>
                  </div>

                  {/* Title */}
                  <h2 className="pp-card-title">{project.title}</h2>

                  {/* Summary */}
                  <p className="pp-summary">{project.summary}</p>

                  {/* Description */}
                  {project.description && project.description !== project.summary && (
                    <p className="pp-desc">{project.description}</p>
                  )}

                  {/* Tags */}
                  <div className="pp-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="pp-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="pp-foot">
                  {/* GitHub button */}
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pp-btn-gh"
                    >
                      <svg className="gh-ico" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      Voir sur GitHub
                    </a>
                  ) : (
                    <span className="pp-btn-disabled">
                      <svg className="gh-ico" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      Privé / non disponible
                    </span>
                  )}

                  {/* Demo button */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pp-btn-demo"
                    >
                      ↗ Démo
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}