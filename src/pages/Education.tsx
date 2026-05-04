import { education } from "@/data/education";
import { Helmet } from "react-helmet-async";

const degreeLevel: Record<string, number> = {
  "Bac+1": 1, "DEUG": 2, "Licence": 3,
  "Licence Pro": 3, "Master 1": 4, "Master": 5, "Doctorat": 8,
};

// Couleurs par école — sans dégradé, juste une couleur unie
const schoolStyles: Record<string, { color: string; initials: string }> = {
  "ENS":  { color: "#7c3aed", initials: "ENS" },
  "FSTG": { color: "#0369a1", initials: "FST" },
};

function getSchoolStyle(school: string) {
  for (const [k, v] of Object.entries(schoolStyles)) {
    if (school.includes(k)) return v;
  }
  return { color: "#6b7280", initials: school.substring(0, 3).toUpperCase() };
}

export default function EducationPage() {
  const totalCours = new Set(education.flatMap(e => e.courses)).size;
  const enCours    = education.filter(e => e.endDate === "Présent").length;

  return (
    <>
      <Helmet>
        <title>Formations | Asma Laouy</title>
        <meta name="description" content="Mon parcours académique et formations" />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .edp { font-family: 'DM Sans', sans-serif; }

        .edp-label {
          font-size: 0.68rem; font-weight: 500; letter-spacing: 0.16em;
          text-transform: uppercase; color: hsl(var(--muted-foreground));
          display: block; margin-bottom: 0.4rem;
        }
        .edp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem); font-weight: 700;
          line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 0.4rem;
        }
        .edp-sub {
          font-size: 0.88rem; color: hsl(var(--muted-foreground));
          font-weight: 300; margin-bottom: 2.5rem;
        }

        /* ── Stats — fond neutre, PAS de dégradé ── */
        .edp-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }
        .edp-stat-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-radius: 12px;
          padding: 1.25rem 1rem;
          text-align: center;
        }
        .edp-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 700; line-height: 1; margin-bottom: 0.25rem;
          color: hsl(var(--foreground));
        }
        .edp-stat-lbl {
          font-size: 0.72rem; color: hsl(var(--muted-foreground));
        }

        /* ── Timeline ── */
        .edp-timeline { display: flex; flex-direction: column; gap: 1.5rem; position: relative; }
        .edp-timeline::before {
          content: ''; position: absolute;
          left: 27px; top: 28px; bottom: 0; width: 1px;
          background: hsl(var(--border));
        }
        @media (max-width: 640px) { .edp-timeline::before { display: none; } }

        /* ── Entry ── */
        .edp-entry {
          display: grid; grid-template-columns: 56px 1fr;
          gap: 0 1.25rem;
          animation: edp-up 0.42s ease both;
        }
        .edp-entry:nth-child(2) { animation-delay: .12s }
        .edp-entry:nth-child(3) { animation-delay: .24s }
        @media (max-width: 640px) {
          .edp-entry { grid-template-columns: 1fr; gap: 0.75rem; }
        }

        /* Avatar */
        .edp-avatar-col { display: flex; flex-direction: column; align-items: center; }
        .edp-avatar {
          width: 56px; height: 56px; border-radius: 14px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.04em; text-align: center; line-height: 1.2;
          position: relative; z-index: 1;
        }
        @media (max-width: 640px) {
          .edp-avatar-col { flex-direction: row; gap: 0.75rem; align-items: center; }
        }

        /* Card */
        .edp-card {
          background: hsl(var(--card)); border: 1px solid hsl(var(--border));
          border-radius: 16px; overflow: hidden;
          transition: transform 0.22s, box-shadow 0.22s; flex: 1;
        }
        .edp-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.07); }
        .edp-card-top-bar { height: 4px; }
        .edp-card-body { padding: 1.4rem 1.5rem; display: flex; flex-direction: column; gap: 1rem; }

        /* Top row */
        .edp-card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
        .edp-degree {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700; line-height: 1.25;
          color: hsl(var(--foreground));
        }
        .edp-degree-badge {
          flex-shrink: 0; padding: 0.25rem 0.75rem; border-radius: 999px;
          font-size: 0.7rem; font-weight: 600; white-space: nowrap;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--secondary));
          color: hsl(var(--muted-foreground));
        }

        /* School row */
        .edp-school-row { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .edp-school { font-size: 0.88rem; font-weight: 500; }
        .edp-location { font-size: 0.8rem; color: hsl(var(--muted-foreground)); }

        /* Date row */
        .edp-date-row { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
        .edp-date-pill {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.28rem 0.75rem; border-radius: 999px;
          background: hsl(var(--secondary)); font-size: 0.76rem;
          color: hsl(var(--muted-foreground));
        }
        .edp-current-badge {
          display: inline-flex; align-items: center; gap: 0.35rem;
          padding: 0.28rem 0.75rem; border-radius: 999px;
          background: #dcfce7; color: #166534;
          font-size: 0.72rem; font-weight: 600; border: 1px solid #86efac;
        }
        .dark .edp-current-badge {
          background: #14532d; border-color: #16a34a; color: #86efac;
        }
        .edp-current-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #22c55e;
          animation: edp-pulse 1.8s infinite;
        }

        /* Divider */
        .edp-divider { height: 1px; background: hsl(var(--border)); }

        /* Section label */
        .edp-section-label {
          font-size: 0.65rem; font-weight: 600; letter-spacing: 0.13em;
          text-transform: uppercase; color: hsl(var(--muted-foreground));
          margin-bottom: 0.55rem; display: block;
        }

        /* Courses */
        .edp-courses { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .edp-course {
          padding: 0.28rem 0.65rem; border: 1px solid hsl(var(--border));
          border-radius: 6px; font-size: 0.72rem; color: hsl(var(--muted-foreground));
          transition: border-color 0.18s, color 0.18s;
        }
        .edp-course:hover { border-color: hsl(var(--foreground)); color: hsl(var(--foreground)); }

        /* Highlights */
        .edp-highlights { display: flex; flex-direction: column; gap: 0.5rem; }
        .edp-highlight { display: flex; gap: 0.65rem; align-items: flex-start; }
        .edp-hl-star { font-size: 0.7rem; margin-top: 0.25rem; flex-shrink: 0; }
        .edp-hl-text { font-size: 0.81rem; color: hsl(var(--muted-foreground)); line-height: 1.55; font-weight: 300; }

        @keyframes edp-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes edp-pulse {
          0%,100% { opacity: 1; } 50% { opacity: 0.4; }
        }
      `}</style>

      <div className="edp py-12">

        {/* Header */}
        <span className="edp-label">Parcours académique</span>
        <h1 className="edp-title">Formations</h1>
        <p className="edp-sub">Mes diplômes et spécialisations</p>

        {/* ── Stats — fond neutre, SANS dégradé ── */}
        <div className="edp-stats">
          <div className="edp-stat-card">
            <div className="edp-stat-num">{education.length}</div>
            <div className="edp-stat-lbl">Formations</div>
          </div>
          <div className="edp-stat-card">
            <div className="edp-stat-num">{enCours}</div>
            <div className="edp-stat-lbl">En cours</div>
          </div>
          <div className="edp-stat-card">
            <div className="edp-stat-num">{totalCours}</div>
            <div className="edp-stat-lbl">Cours suivis</div>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="edp-timeline">
          {education.map((edu) => {
            const s = getSchoolStyle(edu.school);
            const isCurrent = edu.endDate === "Présent";
            const level = degreeLevel[edu.degree] ?? 1;

            return (
              <div key={edu.id} className="edp-entry">

                {/* Avatar */}
                <div className="edp-avatar-col">
                  <div className="edp-avatar" style={{ background: s.color }}>
                    {s.initials}
                  </div>
                </div>

                {/* Card */}
                <div className="edp-card">
                  {/* Barre couleur en haut */}
                  <div className="edp-card-top-bar" style={{ background: s.color }} />

                  <div className="edp-card-body">

                    {/* Diplôme + badge niveau */}
                    <div className="edp-card-top">
                      <h2 className="edp-degree">{edu.degree} en {edu.field}</h2>
                      <span className="edp-degree-badge">Bac +{level}</span>
                    </div>

                    {/* École + localisation */}
                    <div className="edp-school-row">
                      <span className="edp-school" style={{ color: s.color }}>
                        {edu.school}
                      </span>
                      <span style={{ color: "hsl(var(--border))" }}>·</span>
                      <span className="edp-location">📍 {edu.location}</span>
                    </div>

                    {/* Dates + badge "En cours" */}
                    <div className="edp-date-row">
                      <div className="edp-date-pill">
                        📅 {edu.startDate} — {edu.endDate}
                      </div>
                      {isCurrent && (
                        <div className="edp-current-badge">
                          <span className="edp-current-dot" />
                          En cours
                        </div>
                      )}
                    </div>

                    {/* ── BARRE DE PROGRESSION SUPPRIMÉE ── */}

                    <div className="edp-divider" />

                    {/* Cours */}
                    {edu.courses.length > 0 && (
                      <div>
                        <span className="edp-section-label">Cours principaux</span>
                        <div className="edp-courses">
                          {edu.courses.map((course) => (
                            <span key={course} className="edp-course">{course}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Highlights */}
                    {edu.highlights && edu.highlights.length > 0 && (
                      <div>
                        <span className="edp-section-label">Points forts</span>
                        <div className="edp-highlights">
                          {edu.highlights.map((h, i) => (
                            <div key={i} className="edp-highlight">
                              <span className="edp-hl-star" style={{ color: s.color }}>✦</span>
                              <p className="edp-hl-text">{h}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}