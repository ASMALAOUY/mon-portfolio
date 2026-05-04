import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { profile } from "@/data/profile";

// ── Remplacer par votre ID Formspree (créer compte gratuit sur formspree.io) ──
const FORMSPREE_URL = "https://formspree.io/f/xykoedvz";

type ContactItem = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
};

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(false);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  const items: ContactItem[] = [
    {
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
      label: "EMAIL",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
      label: "LOCALISATION",
      value: profile.location,
      href: "#",
    },
    {
      icon: <GithubIcon />,
      label: "GITHUB",
      value: profile.github.replace("https://", "").toLowerCase(),
      href: profile.github,
    },
    {
      icon: <LinkedinIcon />,
      label: "LINKEDIN",
      value: "asma-laouy-9a903a331",
      href: profile.linkedin,
    },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.65rem 0.85rem",
    border: "1px solid hsl(var(--border))",
    borderRadius: "4px",
    background: "hsl(var(--background))",
    color: "hsl(var(--foreground))",
    fontSize: "0.85rem",
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.2s",
  };

  return (
    <>
      <Helmet>
        <title>Contact | Asma Laouy</title>
        <meta name="description" content="Contactez Asma Laouy pour toute opportunité" />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        .pf-root { font-family: 'DM Sans', sans-serif; }
        .pf-label { font-size: 0.68rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: hsl(var(--muted-foreground)); }
        .contact-row {
          display: grid;
          grid-template-columns: 2.5rem 5.5rem 1fr;
          align-items: center;
          gap: 0;
          padding: 1rem 0;
          border-bottom: 1px solid hsl(var(--border));
          text-decoration: none;
          color: inherit;
          transition: background 0.15s;
          border-radius: 2px;
        }
        .contact-row:first-child { border-top: 1px solid hsl(var(--border)); }
        .contact-row:hover { background: hsl(var(--secondary)); }
        .contact-icon {
          width: 2rem; height: 2rem;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid hsl(var(--border)); border-radius: 2px;
          font-size: 0.8rem; color: hsl(var(--muted-foreground)); flex-shrink: 0;
        }
        .contact-label-col {
          font-size: 0.68rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: hsl(var(--muted-foreground));
          padding-left: 0.5rem; padding-right: 0.5rem;
        }
        .contact-value {
          font-size: 0.85rem; color: hsl(var(--foreground));
          padding-left: 0.75rem; word-break: break-word;
        }
        .avail-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.45rem 0.9rem; border: 1px solid #86efac;
          border-radius: 999px; font-size: 0.75rem;
          background: #dcfce7; color: #166534; margin-top: 0.75rem;
        }
        .dark .avail-badge {
          background: #14532d; border-color: #16a34a; color: #86efac;
        }
        .avail-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; flex-shrink: 0; }
        .cf-input:focus { border-color: hsl(var(--foreground)) !important; }
        .cf-btn {
          width: 100%; padding: 0.7rem 1rem;
          background: hsl(var(--foreground)); color: hsl(var(--background));
          border: none; border-radius: 4px; font-size: 0.85rem; font-weight: 500;
          cursor: pointer; transition: opacity 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .cf-btn:hover:not(:disabled) { opacity: 0.8; }
        .cf-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .cf-success {
          text-align: center; padding: 2rem;
          color: #166534; background: #dcfce7;
          border: 1px solid #86efac; border-radius: 8px;
        }
        .dark .cf-success { background: #14532d; border-color: #16a34a; color: #86efac; }
        .cf-error {
          font-size: 0.8rem; color: #dc2626;
          padding: 0.5rem 0.75rem; background: #fee2e2;
          border-radius: 4px; border: 1px solid #fca5a5;
        }
      `}</style>

      <div className="pf-root py-12">
        <div style={{ maxWidth: "42rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <span className="pf-label" style={{ display: "block", marginBottom: "0.4rem" }}>
              Restons en contact
            </span>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700, lineHeight: 1.1,
              letterSpacing: "-0.02em", marginBottom: "0.4rem",
              color: "hsl(var(--foreground))",
            }}>
              Contact
            </h1>
            <p className="text-sm text-muted-foreground" style={{ fontWeight: 300 }}>
              Disponible pour des opportunités de stage ou d'alternance.
            </p>
            <div className="avail-badge">
              <span className="avail-dot" />
              Disponible — ouverte aux opportunités
            </div>
          </div>

          {/* ── Infos contact ── */}
          <div style={{ marginBottom: "2.5rem" }}>
            {items.map((item) => {
              const isLink = item.href !== "#";
              const Tag = isLink ? "a" : "div";
              const props = isLink
                ? { href: item.href, target: item.href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" }
                : {};
              return (
                <Tag key={item.label} className="contact-row" {...(props as Record<string, string>)}>
                  <span className="contact-icon">{item.icon}</span>
                  <span className="contact-label-col">{item.label}</span>
                  <span className="contact-value">{item.value}</span>
                </Tag>
              );
            })}
          </div>

          {/* ── Formulaire ── */}
          <div>
            <p className="pf-label" style={{ marginBottom: "1rem" }}>
              Envoyer un message
            </p>

            {sent ? (
              <div className="cf-success">
                <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>✓</p>
                <p style={{ fontWeight: 600, marginBottom: "0.25rem" }}>Message envoyé !</p>
                <p style={{ fontSize: "0.85rem" }}>Je vous réponds dans les plus brefs délais.</p>
                <button
                  onClick={() => setSent(false)}
                  style={{ marginTop: "1rem", fontSize: "0.8rem", background: "none",
                           border: "none", cursor: "pointer", textDecoration: "underline",
                           color: "inherit" }}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <input
                  className="cf-input"
                  style={inputStyle}
                  placeholder="Votre nom"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                />
                <input
                  className="cf-input"
                  style={inputStyle}
                  type="email"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                />
                <textarea
                  className="cf-input"
                  style={{ ...inputStyle, resize: "none" }}
                  placeholder="Votre message..."
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                />
                {error && (
                  <div className="cf-error">
                    Une erreur est survenue. Contactez-moi directement par email.
                  </div>
                )}
                <button
                  className="cf-btn"
                  onClick={handleSubmit}
                  disabled={loading || !form.name || !form.email || !form.message}
                >
                  {loading ? "Envoi en cours…" : "Envoyer le message →"}
                </button>
                <p style={{ fontSize: "0.72rem", color: "hsl(var(--muted-foreground))", textAlign: "center" }}>
                </p>
              </div>
            )}
          </div>

          {/* ── Langues ── */}
          <div style={{ marginTop: "2.5rem" }}>
            <p className="pf-label" style={{ marginBottom: "0.75rem" }}>Langues</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {profile.languages.map(({ name, level }) => (
                <span key={name} style={{
                  display: "inline-block",
                  padding: "0.3rem 0.75rem",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "2px",
                  fontSize: "0.78rem",
                }}>
                  <span style={{ fontWeight: 500 }}>{name}</span>
                  <span className="text-muted-foreground"> · {level}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}