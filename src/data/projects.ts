export type Project = {
  id: string;
  title: string;
  period: string;
  tags: string[];
  summary: string;
  description?: string;
  repo?: string;
  link?: string;
};

export const projects: Project[] = [
  {
    id: "gestion-incidents",
    title: "Gestion des Incidents — Province de Safi",
    period: "2025",
    tags: ["PHP", "MySQL", "MVC", "Bootstrap", "JavaScript"],
    summary: "Application web de gestion des incidents pour la Province de Safi.",
    description:
      "Analyse des besoins et modélisation du système. Développement en architecture MVC. Gestion des incidents, services, divisions et utilisateurs avec interface d'administration complète.",
    repo: "https://github.com/ASMALAOUY/Gestion-des-Incidents.git", 
    link: "",
  },
  {
    id: "cabinet-medical",
    title: "Gestion Cabinet Médical",
    period: "2025",
    tags: ["PHP", "MySQL", "HTML/CSS", "JavaScript", "Bootstrap"],
    summary:
      "Site web de gestion d'un cabinet médical : comptes, rendez-vous et historique médical.",
    description:
      "Création de comptes patients et médecins, prise de rendez-vous en ligne, consultation de l'historique médical, interface responsive.",
    repo: "", 
    link: "",
  },
  {
    id: "recommandation-cours",
    title: "Système de Recommandation de Cours",
    period: "2026",
    tags: ["Python", "Machine Learning", "pandas", "scikit-learn"],
    summary:
      "Système de recommandation de cours personnalisés basé sur le Machine Learning.",
    description:
      "Analyse des besoins, modélisation et développement des algorithmes de recommandation. Interfaces interactives pour la visualisation des résultats.",
    repo: "https://github.com/ASMALAOUY/course-recommendation.git",
    link: "",
  },
  {
    id: "gestion-evenement",
    title: "Gestion des Événements",
    period: "2026",
    tags: ["java", "JDBC", "Java Swing", "JavaMail API", "JFreeChart"],
    summary:
      "Application web complète de gestion et planification d'événements.",
    description:
      "Création, modification et suppression d'événements. Gestion des participants, inscriptions en ligne et tableau de bord administrateur.",
    repo: "https://github.com/ASMALAOUY/gestion-des-evenement.git",
    link: "",
  },
];