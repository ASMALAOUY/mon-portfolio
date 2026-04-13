import { experiences } from "@/data/experience";
import { Helmet } from "react-helmet-async";

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const months = [
    "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
    "Juil", "Août", "Sep", "Oct", "Nov", "Déc",
  ];
  return `${months[parseInt(month) - 1]} ${year}`;
}

function getDuration(startDate: string, endDate?: string, current?: boolean): string {
  const start = new Date(startDate + "-01");
  const end = current ? new Date() : endDate ? new Date(endDate + "-01") : new Date(startDate + "-01");
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) + 1;
  if (months <= 1) return "1 mois";
  if (months < 12) return `${months} mois`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m > 0 ? `${y} an${y > 1 ? "s" : ""} ${m} mois` : `${y} an${y > 1 ? "s" : ""}`;
}

// Color per company
const companyColors: Record<string, { grad: string; light: string; initials: string }> = {
  "GHM Labs":           { grad: "linear-gradient(135deg,#7c3aed,#a855f7)", light: "#f5f3ff", initials: "GH" },
  "Préfecture de Safi": { grad: "linear-gradient(135deg,#0369a1,#0ea5e9)", light: "#f0f9ff", initials: "PS" },
  "Lycée Zineb Ennafzaoui": { grad: "linear-gradient(135deg,#059669,#10b981)", light: "#f0fdf4", initials: "LZ" },
};
function getCompanyStyle(company: string) {
  for (const [k, v] of Object.entries(companyColors)) {
    if (company.includes(k.split(" ")[0])) return v;
  }
  return { grad: "linear-gradient(135deg,#6b7280,#9ca3af)", light: "#f9fafb", initials: company.substring(0, 2).toUpperCase() };
}

export default function Experience() {
  return (
    <>
      <Helmet>
        <title>Expérience | Asma Laouy</title>
        <meta name="description" content="Mon parcours professionnel en développement web" />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .ep { font-family: 'DM Sans', sans-serif; }

        /* ── Header ── */
        .ep-label {
          font-size: 0.68rem; font-weight: 500; letter-spacing: 0.16em;
          text-transform: uppercase; color: hsl(var(--muted-foreground));
          display: block; margin-bottom: 0.4rem;
        }
        .ep-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem); font-weight: 700;
          line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 0.4rem;
        }
        .ep-sub { font-size: 0.88rem; color: hsl(var(--muted-foreground)); font-weight: 300; margin-bottom: 3rem; }

        /* ── Timeline wrapper ── */
        .ep-timeline { position: relative; padding-left: 0; }

        /* ── Timeline vertical line (desktop only) ── */
        @media (min-width: 768px) {
          .ep-timeline::before {
            content: '';
            position: absolute;
            left: 28px;
            top: 28px;
            bottom: 0;
            width: 1px;
            background: linear-gradient(to bottom, hsl(var(--border)), transparent);
          }
        }

        /* ── Single entry ── */
        .ep-entry {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 0 1.5rem;
          margin-bottom: 2.5rem;
          position: relative;
          animation: ep-up 0.45s ease both;
        }
        .ep-entry:nth-child(2) { animation-delay: .1s }
        .ep-entry:nth-child(3) { animation-delay: .2s }
        .ep-entry:last-child { margin-bottom: 0; }

        @media (max-width: 767px) {
          .ep-entry { grid-template-columns: 1fr; gap: 0.75rem; }
        }

        /* ── Avatar column ── */
        .ep-avatar-col {
          display: flex; flex-direction: column; align-items: center; gap: 0;
        }
        .ep-avatar {
          width: 56px; height: 56px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; font-weight: 700; color: white;
          letter-spacing: 0.05em; flex-shrink: 0; position: relative; z-index: 1;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .ep-avatar-line {
          flex: 1; width: 1px;
          background: linear-gradient(to bottom, hsl(var(--border)), transparent);
          margin-top: 8px;
        }
        .ep-entry:last-child .ep-avatar-line { display: none; }

        @media (max-width: 767px) {
          .ep-avatar-col { flex-direction: row; gap: 0.75rem; }
          .ep-avatar-line { display: none; }
        }

        /* ── Card ── */
        .ep-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-radius: 16px; overflow: hidden;
          transition: box-shadow 0.22s, transform 0.22s;
          flex: 1;
        }
        .ep-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.08); transform: translateY(-2px); }

        /* Card top accent */
        .ep-card-accent { height: 4px; }

        /* Card body */
        .ep-card-body { padding: 1.4rem 1.5rem; }

        /* Top row: title + badge */
        .ep-card-top {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: 1rem; margin-bottom: 0.5rem;
        }
        .ep-position {
          font-size: 1.05rem; font-weight: 600; line-height: 1.3;
          color: hsl(var(--foreground));
        }
        .ep-badge {
          flex-shrink: 0; padding: 0.25rem 0.7rem; border-radius: 999px;
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.04em;
          border: 1px solid;
        }
        .ep-badge-stage {
          background: #fef3c7; color: #92400e; border-color: #fde68a;
        }
        .ep-badge-current {
          background: #dcfce7; color: #166534; border-color: #86efac;
        }

        /* Company + location row */
        .ep-company-row {
          display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 0.9rem; flex-wrap: wrap;
        }
        .ep-company { font-size: 0.9rem; font-weight: 500; color: hsl(var(--foreground)); }
        .ep-sep { color: hsl(var(--border)); font-size: 0.9rem; }
        .ep-location { font-size: 0.8rem; color: hsl(var(--muted-foreground)); }

        /* Date + duration row */
        .ep-meta-row {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 1.1rem; flex-wrap: wrap;
        }
        .ep-dates {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.78rem; color: hsl(var(--muted-foreground));
        }
        .ep-dates-icon { font-size: 0.8rem; }
        .ep-duration {
          font-size: 0.72rem; font-weight: 500; padding: 0.2rem 0.6rem;
          background: hsl(var(--secondary)); border-radius: 999px;
          color: hsl(var(--muted-foreground));
        }

        /* Divider */
        .ep-divider {
          height: 1px; background: hsl(var(--border));
          margin-bottom: 1.1rem;
        }

        /* Tasks */
        .ep-tasks { display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.1rem; }
        .ep-task {
          display: flex; gap: 0.75rem; align-items: flex-start;
        }
        .ep-task-dot {
          width: 6px; height: 6px; border-radius: 50%;
          flex-shrink: 0; margin-top: 0.45rem;
        }
        .ep-task-text { font-size: 0.83rem; color: hsl(var(--muted-foreground)); line-height: 1.55; font-weight: 300; }

        /* Supervisor */
        .ep-supervisor {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.76rem; color: hsl(var(--muted-foreground));
          background: hsl(var(--secondary)); padding: 0.5rem 0.75rem;
          border-radius: 8px; margin-bottom: 1rem;
        }
        .ep-supervisor-ico { font-size: 0.85rem; flex-shrink: 0; }

        /* Tech chips */
        .ep-techs { display: flex; flex-wrap: wrap; gap: 0.35rem; }
        .ep-tech {
          padding: 0.22rem 0.6rem; border: 1px solid hsl(var(--border));
          border-radius: 5px; font-size: 0.7rem; color: hsl(var(--muted-foreground));
        }

        /* Certificate */
        .ep-cert {
          margin-top: 1rem; padding: 0.8rem 1rem;
          border-radius: 10px; border: 1px solid;
          display: flex; gap: 0.6rem; align-items: flex-start;
        }
        .ep-cert-ico { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }
        .ep-cert-title { font-size: 0.72rem; font-weight: 600; margin-bottom: 0.2rem; }
        .ep-cert-text { font-size: 0.76rem; font-style: italic; line-height: 1.5; }

        /* Summary card (total XP) */
        .ep-summary {
          display: flex; gap: 1rem; flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .ep-stat-card {
          flex: 1; min-width: 120px;
          background: hsl(var(--secondary)/0.6);
          border: 1px solid hsl(var(--border));
          border-radius: 12px; padding: 1rem 1.25rem;
          text-align: center;
        }
        .ep-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem; font-weight: 700; line-height: 1;
          margin-bottom: 0.25rem;
        }
        .ep-stat-label { font-size: 0.72rem; color: hsl(var(--muted-foreground)); font-weight: 400; }

        @keyframes ep-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="ep py-12">

        {/* ── Header ── */}
        <span className="ep-label">Parcours professionnel</span>
        <h1 className="ep-title">Expérience</h1>
        <p className="ep-sub">Stages et missions en développement web et informatique</p>

        {/* ── Stats summary ── */}
        <div className="ep-summary">
          <div className="ep-stat-card">
            <div className="ep-stat-num">{experiences.length}</div>
            <div className="ep-stat-label">Expériences</div>
          </div>
          <div className="ep-stat-card">
            <div className="ep-stat-num">
              {experiences.reduce((acc, e) => {
                const start = new Date(e.startDate + "-01");
                const end = e.current ? new Date() : e.endDate ? new Date(e.endDate + "-01") : new Date(e.startDate + "-01");
                return acc + (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
              }, 0)}
            </div>
            <div className="ep-stat-label">Mois d'expérience</div>
          </div>
          <div className="ep-stat-card">
            <div className="ep-stat-num">
              {new Set(experiences.flatMap((e) => e.technologies)).size}
            </div>
            <div className="ep-stat-label">Technologies utilisées</div>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="ep-timeline">
          {experiences.map((exp) => {
            const style = getCompanyStyle(exp.company);
            const duration = getDuration(exp.startDate, exp.endDate, exp.current);

            return (
              <div key={exp.id} className="ep-entry">

                {/* Avatar column */}
                <div className="ep-avatar-col">
                  <div className="ep-avatar" style={{ background: style.grad }}>
                    {style.initials}
                  </div>
                  <div className="ep-avatar-line" />
                </div>

                {/* Card */}
                <div className="ep-card">
                  {/* Top accent bar */}
                  <div className="ep-card-accent" style={{ background: style.grad }} />

                  <div className="ep-card-body">

                    {/* Position + badge */}
                    <div className="ep-card-top">
                      <h2 className="ep-position">{exp.position}</h2>
                      <span className={`ep-badge ${exp.current ? "ep-badge-current" : "ep-badge-stage"}`}>
                        {exp.current ? "✦ En cours" : "Stage"}
                      </span>
                    </div>

                    {/* Company + location */}
                    <div className="ep-company-row">
                      <span className="ep-company">{exp.company}</span>
                      <span className="ep-sep">·</span>
                      <span className="ep-location"> {exp.location}</span>
                    </div>

                    {/* Dates + duration */}
                    <div className="ep-meta-row">
                      <div className="ep-dates">
                        <span className="ep-dates-icon"></span>
                        <span>
                          {formatDate(exp.startDate)}
                          {" — "}
                          {exp.current ? "Présent" : exp.endDate ? formatDate(exp.endDate) : ""}
                        </span>
                      </div>
                      <span className="ep-duration">⏱ {duration}</span>
                    </div>

                    <div className="ep-divider" />

                    {/* Tasks */}
                    <div className="ep-tasks">
                      {exp.description.map((task, i) => (
                        <div key={i} className="ep-task">
                          <div
                            className="ep-task-dot"
                            style={{
                              background: style.grad.includes("7c3aed") ? "#7c3aed"
                                : style.grad.includes("0369a1") ? "#0369a1"
                                : "#059669"
                            }}
                          />
                          <p className="ep-task-text">{task}</p>
                        </div>
                      ))}
                    </div>

                    {/* Supervisor */}
                    {exp.supervisor && (
                      <div className="ep-supervisor">
                        <span className="ep-supervisor-ico"></span>
                        <span>Encadré par : <strong>{exp.supervisor}</strong></span>
                      </div>
                    )}

                    {/* Technologies */}
                    {exp.technologies.length > 0 && (
                      <div className="ep-techs">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="ep-tech">{tech}</span>
                        ))}
                      </div>
                    )}

                    {/* Certificate */}
                    {exp.certificate && (
                      <div
                        className="ep-cert"
                        style={{
                          background: style.light,
                          borderColor: style.grad.includes("7c3aed") ? "#ddd6fe"
                            : style.grad.includes("0369a1") ? "#bae6fd"
                            : "#bbf7d0",
                        }}
                      >
                        <span className="ep-cert-ico"></span>
                        <div>
                          <p
                            className="ep-cert-title"
                            style={{
                              color: style.grad.includes("7c3aed") ? "#5b21b6"
                                : style.grad.includes("0369a1") ? "#0c4a6e"
                                : "#166534",
                            }}
                          >
                            Attestation de stage
                          </p>
                          <p className="ep-cert-text" style={{ color: "hsl(var(--muted-foreground))" }}>
                            {exp.certificate}
                          </p>
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