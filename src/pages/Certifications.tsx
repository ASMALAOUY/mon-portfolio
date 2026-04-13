import { certifications } from "@/data/certifications";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";

// ── Color per tag ─────────────────────────────────────────────────────────────
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
  "Machine Learning": { bg: "#fdf4ff", text: "#701a75", border: "#f0abfc" },
  "Data Science":    { bg: "#fdf4ff", text: "#701a75", border: "#f0abfc" },
};

function getCatStyle(tags: string[]) {
  for (const t of tags) if (catColor[t]) return catColor[t];
  return { bg: "#f9fafb", text: "#374151", border: "#e5e7eb" };
}

// ── Issuer logo placeholder colors ───────────────────────────────────────────
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
        c.skills.some((s) => s.toLowerCase().includes(q));
      const matchTag = !activeTag || c.tags.includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [search, activeTag]);

  const activeCount = certifications.filter((c) => c.status === "active").length;
  const uniqueIssuers = [...new Set(certifications.map(c => c.issuer.split("/")[0].trim()))].length;

  return (
    <>
      <Helmet>
        <title>Certifications | Asma Laouy</title>
        <meta name="description" content="Mes certifications professionnelles et académiques" />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .cp { font-family: 'DM Sans', sans-serif; }

        /* Hero */
        .cp-hero {
          background: linear-gradient(135deg, #f0f4ff 0%, #fdf0ff 50%, #fff0f5 100%);
          border-radius: 16px; padding: 2.5rem 2rem; text-align: center;
          margin-bottom: 2.5rem; border: 1px solid #e9d5ff;
        }
        .cp-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 2.8rem); font-weight: 700;
          letter-spacing: -0.02em; margin-bottom: 0.4rem;
          color: hsl(var(--foreground));
        }
        .cp-hero-sub { font-size: 0.9rem; color: hsl(var(--muted-foreground)); font-weight: 300; }
        .cp-hero-stats {
          display: flex; justify-content: center; gap: 1.5rem;
          margin-top: 1.25rem; flex-wrap: wrap;
        }
        .cp-stat {
          display: flex; align-items: center; gap: 0.5rem;
          background: white; border: 1px solid hsl(var(--border));
          border-radius: 999px; padding: 0.35rem 1rem;
          font-size: 0.78rem; font-weight: 500;
        }
        .cp-stat-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; }

        /* Controls */
        .cp-controls { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
        .cp-search-wrap { position: relative; }
        .cp-search {
          width: 100%; padding: 0.72rem 1rem;
          border: 1.5px solid hsl(var(--border)); border-radius: 12px;
          background: hsl(var(--background)); color: hsl(var(--foreground));
          font-size: 0.85rem; font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cp-search:focus { border-color: #a78bfa; box-shadow: 0 0 0 3px #a78bfa20; }
        .cp-filters { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }
        .cp-filter-label { font-size: 0.7rem; color: hsl(var(--muted-foreground)); margin-right: 0.25rem; }
        .cp-ftag {
          padding: 0.28rem 0.75rem; border-radius: 999px; font-size: 0.73rem; font-weight: 500;
          cursor: pointer; border: 1.5px solid hsl(var(--border));
          background: hsl(var(--background)); color: hsl(var(--muted-foreground));
          font-family: 'DM Sans', sans-serif; transition: all 0.16s; line-height: 1.4;
        }
        .cp-ftag:hover { border-color: #a78bfa; color: #7c3aed; background: #f5f3ff; }
        .cp-ftag.on { background: #7c3aed; color: white; border-color: #7c3aed; }

        /* Grid */
        .cp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        /* Card */
        .cp-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-radius: 16px; overflow: hidden;
          display: flex; flex-direction: column;
          transition: transform 0.22s, box-shadow 0.22s;
        }
        .cp-card:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(124,58,237,0.12); }
        .cp-card-bar { height: 4px; }

        .cp-card-body { padding: 1.35rem; flex: 1; display: flex; flex-direction: column; gap: 0.8rem; }

        /* Issuer avatar */
        .cp-issuer-avatar {
          width: 46px; height: 46px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700; color: white;
          letter-spacing: 0.02em; flex-shrink: 0;
        }

        /* Header row */
        .cp-header { display: flex; gap: 0.75rem; align-items: flex-start; }
        .cp-header-text { flex: 1; min-width: 0; }
        .cp-title {
          font-size: 0.88rem; font-weight: 600; line-height: 1.35;
          color: hsl(var(--foreground));
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .cp-issuer-name { font-size: 0.76rem; color: hsl(var(--muted-foreground)); margin-top: 2px; }
        .cp-date { font-size: 0.72rem; color: hsl(var(--muted-foreground)); margin-top: 1px; }

        /* Verified */
        .cp-verified {
          display: inline-flex; align-items: center; gap: 0.4rem;
          color: #16a34a; font-size: 0.76rem; font-weight: 500;
        }
        .cp-v-icon {
          width: 17px; height: 17px; border-radius: 50%;
          background: #dcfce7; border: 1.5px solid #86efac;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.55rem; flex-shrink: 0;
        }

        /* Credential ID */
        .cp-cred-id {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.68rem; color: hsl(var(--muted-foreground));
          background: hsl(var(--secondary)); padding: 0.3rem 0.6rem;
          border-radius: 6px; overflow: hidden;
        }
        .cp-cred-id span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        /* Tags */
        .cp-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }
        .cp-tag {
          padding: 0.18rem 0.55rem; border-radius: 999px;
          font-size: 0.67rem; font-weight: 600; border: 1px solid;
        }

        /* Skills */
        .cp-skills { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: auto; }
        .cp-skill {
          padding: 0.18rem 0.5rem; border-radius: 6px; font-size: 0.67rem;
          background: hsl(var(--secondary)); color: hsl(var(--muted-foreground));
        }

        /* Footer */
        .cp-card-foot { padding: 0 1.35rem 1.2rem; }
        .cp-verify-btn {
          display: flex; align-items: center; justify-content: center; gap: 0.45rem;
          width: 100%; padding: 0.58rem 1rem;
          border: 1.5px solid hsl(var(--border)); border-radius: 10px;
          background: hsl(var(--background)); color: hsl(var(--foreground));
          font-size: 0.79rem; font-weight: 500; font-family: 'DM Sans', sans-serif;
          cursor: pointer; text-decoration: none; transition: all 0.18s;
        }
        .cp-verify-btn:hover { border-color: #7c3aed; color: #7c3aed; background: #f5f3ff; }
        .cp-verify-btn-off {
          display: flex; align-items: center; justify-content: center; gap: 0.45rem;
          width: 100%; padding: 0.58rem 1rem;
          border: 1.5px dashed hsl(var(--border)); border-radius: 10px;
          background: transparent; color: hsl(var(--muted-foreground));
          font-size: 0.79rem; font-weight: 400; opacity: 0.5; cursor: default;
        }

        /* Empty */
        .cp-empty { text-align: center; padding: 4rem 1rem; color: hsl(var(--muted-foreground)); }

        /* Animations */
        @keyframes cp-up { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .cp-card { animation: cp-up 0.38s ease both; }
        .cp-card:nth-child(2) { animation-delay:.06s }
        .cp-card:nth-child(3) { animation-delay:.12s }
        .cp-card:nth-child(4) { animation-delay:.18s }
        .cp-card:nth-child(5) { animation-delay:.24s }
        .cp-card:nth-child(6) { animation-delay:.30s }
        .cp-card:nth-child(7) { animation-delay:.36s }
        .cp-card:nth-child(8) { animation-delay:.40s }
        .cp-card:nth-child(n+9) { animation-delay:.44s }
      `}</style>

      <div className="cp">

        {/* Hero */}
        <div className="cp-hero">
          <h1 className="cp-hero-title">Certifications</h1>
          <p className="cp-hero-sub">Validation de mes compétences techniques et académiques.</p>
          <div className="cp-hero-stats">
            <div className="cp-stat">
              <span className="cp-stat-dot" />
              {activeCount} certifications actives
            </div>
            <div className="cp-stat">
              {uniqueIssuers} organismes
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="cp-controls">
          <div className="cp-search-wrap">
            <input
              type="text" className="cp-search"
              placeholder="Rechercher par titre, émetteur, compétence..."
              value={search} onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="cp-filters">
            <span className="cp-filter-label">Filtrer :</span>
            <button className={`cp-ftag${activeTag === null ? " on" : ""}`} onClick={() => setActiveTag(null)}>
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

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="cp-grid">
            {filtered.map((cert) => {
              const catStyle = getCatStyle(cert.tags);
              const issuerColor = getIssuerColor(cert.issuer);
              const initials = getIssuerInitials(cert.issuer);
              
              // Gradient bar color by first tag
              const barColors: Record<string, string> = {
                Web: "linear-gradient(90deg,#3b82f6,#60a5fa)",
                Frontend: "linear-gradient(90deg,#3b82f6,#818cf8)",
                Backend: "linear-gradient(90deg,#10b981,#34d399)",
                PHP: "linear-gradient(90deg,#7c3aed,#a78bfa)",
                Python: "linear-gradient(90deg,#f59e0b,#fbbf24)",
                Java: "linear-gradient(90deg,#ef4444,#f97316)",
                "C++": "linear-gradient(90deg,#8b5cf6,#a78bfa)",
                Database: "linear-gradient(90deg,#14b8a6,#2dd4bf)",
                SQL: "linear-gradient(90deg,#14b8a6,#2dd4bf)",
                Networking: "linear-gradient(90deg,#0ea5e9,#38bdf8)",
                IA: "linear-gradient(90deg,#d946ef,#e879f9)",
                "Machine Learning": "linear-gradient(90deg,#d946ef,#e879f9)",
                "Data Science": "linear-gradient(90deg,#d946ef,#8b5cf6)",
              };
              const barGradient = barColors[cert.tags[0]] ?? "linear-gradient(90deg,#7c3aed,#ec4899)";

              return (
                <div key={cert.id} className="cp-card">
                  <div className="cp-card-bar" style={{ background: barGradient }} />

                  <div className="cp-card-body">
                    {/* Header: avatar + title */}
                    <div className="cp-header">
                      <div className="cp-issuer-avatar" style={{ background: issuerColor }}>
                        {initials}
                      </div>
                      <div className="cp-header-text">
                        <p className="cp-title">{cert.title}</p>
                        <p className="cp-issuer-name">{cert.issuer}</p>
                        <p className="cp-date">Emise le {cert.issueDate}</p>
                      </div>
                    </div>

                    {/* Status */}
                    {cert.status === "active" ? (
                      <div className="cp-verified">
                        <div className="cp-v-icon">✓</div>
                        Certificat vérifié
                      </div>
                    ) : (
                      <div style={{ color: "#dc2626", fontSize: "0.76rem", fontWeight: 500 }}>
                        Certification expirée
                      </div>
                    )}

                    {/* Credential ID */}
                    {cert.credentialId && (
                      <div className="cp-cred-id">
                        <span>ID : {cert.credentialId}</span>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="cp-tags">
                      {cert.tags.map((tag) => (
                        <span
                          key={tag} className="cp-tag"
                          style={{ background: catStyle.bg, color: catStyle.text, borderColor: catStyle.border }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Skills */}
                    <div className="cp-skills">
                      {cert.skills.map((s) => (
                        <span key={s} className="cp-skill">{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Verify button */}
                  <div className="cp-card-foot">
                    {cert.credentialUrl && cert.credentialUrl !== "#" ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cp-verify-btn"
                      >
                        Afficher le diplôme
                      </a>
                    ) : (
                      <span className="cp-verify-btn-off">
                        Lien non disponible
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="cp-empty">
            <p>Aucune certification trouvée pour "{search}"</p>
          </div>
        )}

      </div>
    </>
  );
}