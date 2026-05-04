import { certifications } from "@/data/certifications";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";

const catColor: Record<string, { bg: string; text: string; border: string }> = {
  Web:               { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  Frontend:          { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  Backend:           { bg: "#f0fdf4", text: "#166534", border: "#bbf7d0" },
  PHP:               { bg: "#f5f3ff", text: "#5b21b6", border: "#ddd6fe" },
  Python:            { bg: "#fefce8", text: "#854d0e", border: "#fde68a" },
  Programming:       { bg: "#f0fdf4", text: "#166534", border: "#bbf7d0" },
  Java:              { bg: "#fff7ed", text: "#9a3412", border: "#fed7aa" },
  "C++":             { bg: "#faf5ff", text: "#6b21a8", border: "#e9d5ff" },
  Database:          { bg: "#f0fdfa", text: "#115e59", border: "#99f6e4" },
  SQL:               { bg: "#f0fdfa", text: "#115e59", border: "#99f6e4" },
  Networking:        { bg: "#f0f9ff", text: "#0c4a6e", border: "#bae6fd" },
  Infrastructure:    { bg: "#f0f9ff", text: "#0c4a6e", border: "#bae6fd" },
  IA:                { bg: "#fdf4ff", text: "#701a75", border: "#f0abfc" },
  "Machine Learning":{ bg: "#fdf4ff", text: "#701a75", border: "#f0abfc" },
  "Data Science":    { bg: "#fdf4ff", text: "#701a75", border: "#f0abfc" },
};

function getCatStyle(tags: string[]) {
  for (const t of tags) if (catColor[t]) return catColor[t];
  return { bg: "#f9fafb", text: "#374151", border: "#e5e7eb" };
}

const issuerColorMap: Record<string, string> = {
  Cisco: "#1ba0d8", Programiz: "#2ecc71", "MLIA Edu": "#7c3aed",
  MLIAEdu: "#7c3aed", ENS: "#e11d48", Udemy: "#a435f0", SoloLearn: "#23b4e8",
};

function getIssuerColor(issuer: string): string {
  for (const [k, v] of Object.entries(issuerColorMap)) {
    if (issuer.toLowerCase().includes(k.toLowerCase())) return v;
  }
  return "#6b7280";
}

function getIssuerInitials(issuer: string): string {
  const clean = issuer.split("/")[0].trim();
  return clean.substring(0, 2).toUpperCase();
}

export default function CertificationsPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    certifications.forEach((c) => c.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return certifications.filter((c) => {
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q)) ||
        c.tags.some((t) => t.toLowerCase().includes(q));
      const matchTag = !activeTag || c.tags.includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [search, activeTag]);

  const activeCount   = certifications.filter((c) => c.status === "active").length;
  const uniqueIssuers = new Set(certifications.map((c) => c.issuer)).size;

  return (
    <>
      <Helmet>
        <title>Certifications | Asma Laouy</title>
        <meta name="description" content="Mes certifications professionnelles et académiques" />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        .cp { font-family: 'DM Sans', sans-serif; padding-top: 2rem; }

        /* ── Page header — simple, sans dégradé ── */
        .cp-label {
          font-size: 0.68rem; font-weight: 500; letter-spacing: 0.16em;
          text-transform: uppercase; color: hsl(var(--muted-foreground));
          display: block; margin-bottom: 0.4rem;
        }
        .cp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem); font-weight: 700;
          line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 0.4rem;
          color: hsl(var(--foreground));
        }
        .cp-sub {
          font-size: 0.88rem; color: hsl(var(--muted-foreground));
          font-weight: 300; margin-bottom: 0.6rem;
        }
        .cp-header-stats {
          display: flex; align-items: center; gap: 1rem;
          font-size: 0.8rem; color: hsl(var(--muted-foreground));
          margin-bottom: 2rem;
        }
        .cp-active-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #22c55e; margin-right: 0.4rem; }
        .cp-header-sep { color: hsl(var(--border)); }

        /* ── Barre de recherche ── */
        .cp-controls { margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .cp-search-wrap { position: relative; }
        .cp-search {
          width: 100%; padding: 0.65rem 1rem 0.65rem 2.5rem;
          border: 1px solid hsl(var(--border)); border-radius: 8px;
          background: hsl(var(--background)); color: hsl(var(--foreground));
          font-size: 0.85rem; outline: none; transition: border-color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .cp-search:focus { border-color: hsl(var(--primary)); }
        .cp-search-icon {
          position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%);
          color: hsl(var(--muted-foreground)); pointer-events: none;
        }

        /* ── Filtres ── */
        .cp-filters { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
        .cp-filter-label { font-size: 0.75rem; color: hsl(var(--muted-foreground)); }
        .cp-ftag {
          padding: 0.3rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 500;
          border: 1px solid hsl(var(--border)); background: transparent;
          color: hsl(var(--muted-foreground)); cursor: pointer; transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .cp-ftag:hover { background: hsl(var(--secondary)); color: hsl(var(--foreground)); }
        .cp-ftag.on { background: hsl(var(--foreground)); color: hsl(var(--background)); border-color: hsl(var(--foreground)); }

        /* ── Grille ── */
        .cp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
        @media (max-width: 640px) { .cp-grid { grid-template-columns: 1fr; } }

        /* ── Carte ── */
        .cp-card {
          background: hsl(var(--card)); border: 1px solid hsl(var(--border));
          border-radius: 14px; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex; flex-direction: column;
          animation: cp-up 0.35s ease both;
        }
        .cp-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.07); }
        .cp-card-bar { height: 3px; }
        .cp-card-body { padding: 1.1rem 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; flex: 1; }

        /* Issuer + titre */
        .cp-issuer-row { display: flex; align-items: center; gap: 0.75rem; }
        .cp-issuer-badge {
          width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 0.65rem; font-weight: 700;
        }
        .cp-issuer-name { font-size: 0.75rem; color: hsl(var(--muted-foreground)); }
        .cp-issuer-date { font-size: 0.7rem; color: hsl(var(--muted-foreground)); }

        .cp-cert-title {
          font-family: 'Playfair Display', serif;
          font-size: 0.92rem; font-weight: 700; line-height: 1.35;
          color: hsl(var(--foreground));
        }

        /* Tags */
        .cp-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
        .cp-tag {
          padding: 0.2rem 0.55rem; border-radius: 4px;
          font-size: 0.68rem; font-weight: 500; border: 1px solid;
        }

        /* Skills */
        .cp-skills { display: flex; flex-wrap: wrap; gap: 0.3rem; }
        .cp-skill {
          padding: 0.18rem 0.5rem; font-size: 0.68rem;
          border: 1px solid hsl(var(--border)); border-radius: 4px;
          color: hsl(var(--muted-foreground));
        }

        /* Footer carte */
        .cp-card-footer {
          margin-top: auto;
          padding-top: 0.75rem;
          border-top: 1px solid hsl(var(--border));
          display: flex; align-items: center; justify-content: space-between;
        }
        .cp-verify {
          font-size: 0.75rem; font-weight: 500; color: hsl(var(--foreground));
          text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem;
          transition: opacity 0.15s;
        }
        .cp-verify:hover { opacity: 0.7; }
        .cp-status-active {
          display: inline-flex; align-items: center; gap: 0.3rem;
          font-size: 0.68rem; font-weight: 600; color: #16a34a;
        }
        .cp-status-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }

        /* Empty */
        .cp-empty { text-align: center; padding: 4rem 1rem; color: hsl(var(--muted-foreground)); }
        .cp-empty-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }

        @keyframes cp-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="cp">

        {/* ── Header simple — SANS dégradé ── */}
        <div style={{ marginBottom: "2rem" }}>
          <span className="cp-label">Badges &amp; diplômes</span>
          <h1 className="cp-title">Certifications</h1>
          <p className="cp-sub">Validation de mes compétences techniques et académiques.</p>
          <div className="cp-header-stats">
            <span>
              <span className="cp-active-dot" />
              {activeCount} certifications actives
            </span>
            <span className="cp-header-sep">·</span>
            <span>{uniqueIssuers} organismes</span>
          </div>
        </div>

        {/* ── Recherche + filtres ── */}
        <div className="cp-controls">
          <div className="cp-search-wrap">
            <span className="cp-search-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              className="cp-search"
              placeholder="Rechercher par titre, émetteur, compétence..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="cp-filters">
            <span className="cp-filter-label">Filtrer :</span>
            <button
              className={`cp-ftag${activeTag === null ? " on" : ""}`}
              onClick={() => setActiveTag(null)}
            >
              Toutes ({certifications.length})
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`cp-ftag${activeTag === tag ? " on" : ""}`}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grille de cartes ── */}
        {filtered.length === 0 ? (
          <div className="cp-empty">
            <div className="cp-empty-icon">🔍</div>
            <p>Aucune certification pour « {search} »</p>
          </div>
        ) : (
          <div className="cp-grid">
            {filtered.map((cert) => {
              const issuerColor = getIssuerColor(cert.issuer);
              const initials    = getIssuerInitials(cert.issuer);
              const tagStyle    = getCatStyle(cert.tags);
              const barGrad     = `linear-gradient(90deg, ${issuerColor}, ${issuerColor}99)`;

              return (
                <div key={cert.id} className="cp-card">
                  <div className="cp-card-bar" style={{ background: barGrad }} />

                  <div className="cp-card-body">
                    {/* Émetteur */}
                    <div className="cp-issuer-row">
                      <div
                        className="cp-issuer-badge"
                        style={{ background: issuerColor }}
                      >
                        {initials}
                      </div>
                      <div>
                        <div className="cp-issuer-name">{cert.issuer}</div>
                        <div className="cp-issuer-date">Emise le {cert.issueDate}</div>
                      </div>
                    </div>

                    {/* Titre */}
                    <p className="cp-cert-title">{cert.title}</p>

                    {/* Tags */}
                    <div className="cp-tags">
                      {cert.tags.map((tag) => {
                        const ts = catColor[tag] ?? tagStyle;
                        return (
                          <span
                            key={tag}
                            className="cp-tag"
                            style={{
                              background: ts.bg,
                              color: ts.text,
                              borderColor: ts.border,
                            }}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>

                    {/* Compétences */}
                    {cert.skills.length > 0 && (
                      <div className="cp-skills">
                        {cert.skills.slice(0, 4).map((s) => (
                          <span key={s} className="cp-skill">{s}</span>
                        ))}
                        {cert.skills.length > 4 && (
                          <span className="cp-skill">+{cert.skills.length - 4}</span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="cp-card-footer">
                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cp-verify"
                        >
                          Vérifier →
                        </a>
                      ) : (
                        <span />
                      )}
                      {cert.status === "active" && (
                        <span className="cp-status-active">
                          <span className="cp-status-dot" /> Active
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}