import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { profile } from "@/data/profile";

// URL Formspree
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
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSent(true);
        setForm({
          name: "",
          email: "",
          message: "",
        });
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
      icon: <span>✉</span>,
      label: "EMAIL",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: <span>📍</span>,
      label: "LOCALISATION",
      value: profile.location,
      href: "#",
    },
    {
      icon: <GithubIcon />,
      label: "GITHUB",
      value: profile.github.replace("https://", ""),
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
    padding: "0.8rem",
    border: "1px solid hsl(var(--border))",
    borderRadius: "6px",
    background: "transparent",
    color: "white",
    fontSize: "0.9rem",
    outline: "none",
  };

  return (
    <>
      <Helmet>
        <title>Contact | Asma Laouy</title>
      </Helmet>

      <div className="py-12">
        <div style={{ maxWidth: "700px" }}>
          
          {/* HEADER */}
          <div style={{ marginBottom: "2rem" }}>
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Contact
            </h1>

            <p style={{ color: "#aaa" }}>
              Disponible pour stage, alternance ou opportunités freelance.
            </p>
          </div>

          {/* CONTACT INFO */}
          <div style={{ marginBottom: "2rem" }}>
            {items.map((item) => {
              const isLink = item.href !== "#";
              const Tag = isLink ? "a" : "div";

              return (
                <Tag
                  key={item.label}
                  href={isLink ? item.href : undefined}
                  target="_blank"
                  style={{
                    display: "flex",
                    gap: "15px",
                    padding: "15px 0",
                    borderBottom: "1px solid #222",
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <span>{item.icon}</span>
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                </Tag>
              );
            })}
          </div>

          {/* FORM */}
          <div>
            <p
              style={{
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Envoyer un message
            </p>

            {sent ? (
              <div
                style={{
                  background: "#1f3d2b",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <h3>✅ Message envoyé avec succès</h3>
                <p>Je vous répondrai dès que possible.</p>

                <button
                  onClick={() => setSent(false)}
                  style={{
                    marginTop: "15px",
                    background: "none",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={form.name}
                  style={inputStyle}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={form.email}
                  style={inputStyle}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <textarea
                  rows={6}
                  placeholder="Votre message..."
                  value={form.message}
                  style={inputStyle}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />

                {error && (
                  <div
                    style={{
                      background: "#5a1d1d",
                      padding: "10px",
                      borderRadius: "6px",
                    }}
                  >
                    Une erreur est survenue. Essayez plus tard.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !form.name ||
                    !form.email ||
                    !form.message
                  }
                  style={{
                    padding: "14px",
                    background: "#d1d5db",
                    color: "#000",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {loading
                    ? "Envoi en cours..."
                    : "Envoyer le message →"}
                </button>

                <p
                  style={{
                    fontSize: "12px",
                    textAlign: "center",
                    color: "#999",
                  }}
                >
                  Vos informations restent confidentielles.
                </p>
              </form>
            )}
          </div>

          {/* LANGUES */}
          <div style={{ marginTop: "3rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>Langues</h3>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {profile.languages.map((lang) => (
                <div
                  key={lang.name}
                  style={{
                    border: "1px solid #333",
                    padding: "8px 14px",
                    borderRadius: "6px",
                  }}
                >
                  {lang.name} • {lang.level}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}