import { Helmet } from "react-helmet-async";
import { profile } from "@/data/profile";

type ContactItem = {
  icon: string;
  label: string;
  value: string;
  href: string;
};

const items: ContactItem[] = [
  { icon: "✉", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  
   { icon: "📍", label: "LOCALISATION", value: ` ${profile.location}`, href: "#" },
  { icon: "⚙", label: "GitHub", value: profile.github.replace("https://", ""), href: profile.github },
  { icon: "in", label: "LinkedIn", value: "asma-laouy-9a903a331", href: profile.linkedin },
];

export default function Contact() {
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
          grid-template-columns: 2.5rem 5rem 1fr;
          align-items: center;
          gap: 0;
          padding: 1.1rem 0;
          border-bottom: 1px solid hsl(var(--border));
          text-decoration: none;
          color: inherit;
          transition: background 0.15s;
          border-radius: 2px;
        }
        .contact-row:first-child { border-top: 1px solid hsl(var(--border)); }
        .contact-row:hover { background: hsl(var(--secondary)); }
        .contact-icon {
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid hsl(var(--border));
          border-radius: 2px;
          font-size: 0.8rem;
          color: hsl(var(--muted-foreground));
          flex-shrink: 0;
        }
        .contact-label-col { font-size: 0.7rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: hsl(var(--muted-foreground)); padding-left: 0.5rem;  padding-right: 0.5rem;  }
        .contact-value { font-size: 0.85rem; color: hsl(var(--foreground)); padding-left: 1rem; word-break: break-word;}
        .contact-value:hover { color: hsl(var(--primary)); }
        .avail-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.9rem;
          border: 1px solid hsl(var(--border));
          border-radius: 2px;
          font-size: 0.75rem;
          color: hsl(var(--muted-foreground));
          margin-top: 1rem;
        }
        .avail-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; flex-shrink: 0; }
      `}</style>

      <div className="pf-root py-12 max-w-xl space-y-10">
        <div className="space-y-2">
          <span className="pf-label">Restons en contact</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
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

        <div>
          {items.map((item) => {
            const isLink = item.href !== "#";
            const Tag = isLink ? "a" : "div";
            const props = isLink
              ? { href: item.href, target: item.href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" }
              : {};
            return (
              <Tag key={item.label} className="contact-row" {...props}>
                <span className="contact-icon">{item.icon}</span>
                <span className="contact-label-col">{item.label}</span>
                <span className="contact-value">{item.value}</span>
              </Tag>
            );
          })}
        </div>

        <div className="space-y-3">
          <p className="pf-label">Langues</p>
          <div className="flex flex-wrap gap-2">
            {profile.languages.map(({ name, level }) => (
              <span key={name}
                style={{
                  display: 'inline-block',
                  padding: '0.3rem 0.75rem',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '2px',
                  fontSize: '0.78rem',
                }}
              >
                <span style={{ fontWeight: 500 }}>{name}</span>
                <span className="text-muted-foreground"> · {level}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}