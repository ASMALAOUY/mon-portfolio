export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  tags: string[];
  status: "active" | "expired" | "revoked";
};

export const certifications: Certification[] = [
  // ── MLIA Edu ──────────────────────────────────────────────────────────────
  {
    id: "php7-mlia",
    title: "Ingénierie Logicielle Web avec PHP 7 : Architecture Multicouche et Accès aux Données Sécurisé",
    issuer: "MLIA Edu",
    issueDate: "Mars 2026",
    credentialId: "44-aea4e157-1d11-4a49-8a4a-5bc875816e8c-813347",
    credentialUrl: "https://mliaedu.toubkalit.com/verify-certificate/44-aea4e157-1d11-4a49-8a4a-5bc875816e8c-677299",
    skills: ["PHP 7", "Architecture Multicouche", "MVC", "MySQL", "Sécurité Web"],
    tags: ["Web", "Backend", "PHP"],
    status: "active",
  },
  {
    id: "kotlin-mlia",
    title: "Fondamentaux de la programmation en Kotlin",
    issuer: "MLIA Edu",
    issueDate: "2026",
    credentialUrl: "https://mliaedu.toubkalit.com/verify-certificate/40-aea4e157-1d11-4a49-8a4a-5bc875816e8c-390513",
    skills: ["Kotlin", "POO", "Programmation fonctionnelle"],
    tags: ["Programming", "Kotlin"],
    status: "active",
  },
  {
    id: "java-mlia",
    title: "Java Programming",
    issuer: "MLIA Edu",
    issueDate: "2025",
    credentialUrl: "https://mliaedu.toubkalit.com/verify-certificate/6-aea4e157-1d11-4a49-8a4a-5bc875816e8c-464548",
    skills: ["Java", "POO", "Collections", "Héritage"],
    tags: ["Java", "Programming"],
    status: "active",
  },
  {
    id: "cpp-mlia",
    title: " C++ Programming",
    issuer: "MLIA Edu",
    issueDate: "8 novembre 2025",
    credentialUrl: "https://mliaedu.toubkalit.com/verify-certificate/12-aea4e157-1d11-4a49-8a4a-5bc875816e8c-538223",
    skills: ["C", "C++", "Pointeurs", "POO"],
    tags: ["C++", "Programming"],
    status: "active",
  },
  {
    id: "python-mlia",
    title: "Python & Python POO",
    issuer: "MLIA Edu",
    issueDate: "23 novembre 2025",
    credentialUrl: "https://mliaedu.toubkalit.com/verify-certificate/11-aea4e157-1d11-4a49-8a4a-5bc875816e8c-621777",
    skills: ["Python", "POO", "Classes", "Héritage"],
    tags: ["Python", "Programming"],
    status: "active",
  },
  {
    id: "mysql-mlia",
    title: "MySQL Database",
    issuer: "MLIA Edu",
    issueDate: "2024",
    credentialUrl: "https://mliaedu.toubkalit.com/verify-certificate/15-aea4e157-1d11-4a49-8a4a-5bc875816e8c-209811",
    skills: ["MySQL", "SQL", "Modélisation", "Jointures", "Database Design"],
    tags: ["Database", "SQL"],
    status: "active",
  },

  // ── Cisco (Credly) ────────────────────────────────────────────────────────
  {
    id: "python-essentials",
    title: "Python Essentials 1",
    issuer: "Cisco",
    issueDate: "Mai 2025",
    credentialUrl: "https://www.credly.com/badges/93d9d144-015b-4ef6-b0e3-37aa00bea4b8/linked_in_profile",
    skills: ["Python", "Langage de programmation", "Scripting"],
    tags: ["Python", "Programming"],
    status: "active",
  },
  {
    id: "networking-basics",
    title: "Networking Basics",
    issuer: "Cisco",
    issueDate: "Mai 2025",
    credentialUrl: "https://www.credly.com/badges/471d5a15-eff4-4236-8cd9-47a3f282afed/linked_in_profile",
    skills: ["Réseaux", "TCP/IP", "DNS", "Protocoles réseau"],
    tags: ["Networking", "Infrastructure"],
    status: "active",
  },

  // ── Programiz ─────────────────────────────────────────────────────────────
  {
    id: "learn-html",
    title: "Learn HTML",
    issuer: "Programiz",
    issueDate: "Fév. 2025",
    credentialId: "8511D8184F1E",
    credentialUrl: "https://programiz.pro/certificates/detail/8511D8184F1E",
    skills: ["HTML", "Structure Web", "Balises sémantiques"],
    tags: ["Web", "Frontend"],
    status: "active",
  },


];