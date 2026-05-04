export type Experience = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  technologies: string[];
  supervisor?: string;
  certificate?: string;
};

export const experiences: Experience[] = [
  {
    id: "ghm-labs",
    company: "GHM Labs",
    position: "Stagiaire Développeur Web",
    location: "Kénitra, Maroc",
    startDate: "2025-8",
    
    current: false,
    description: [
      "Création d'articles de blog",
      "Développement et maintenance de sites web",
      "Intégration de fonctionnalités front-end et back-end",
      "Optimisation de l'expérience utilisateur et de la performance des sites"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    supervisor: "Zouhair ELMANTI - Leader Technique, Développeur Principal",
    certificate: "Stage de 1 mois effectué avec sérieux et assiduité. Attestation délivrée le 24/12/2025"
  },
   {
    id: "prefecture-safi",
    company: "Préfecture de Safi",
    position: "Stagiaire - Département Informatique",
    location: "Safi, Maroc",
    startDate: "2025-08",
    current: false,
    description: [
      "Conception et développement d'une application web complète de gestion des incidents pour la Province de Safi",
      "Analyse des besoins métier, modélisation UML (diagrammes de cas d'utilisation et de classes)",
      "Développement en architecture MVC : gestion des incidents, services, divisions et utilisateurs avec rôles différenciés",
      "Mise en place d'une interface d'administration avec authentification et tableau de bord",
    ],
    technologies: ["PHP", "HTML", "CSS", "MySQL", "MVC", "Bootstrap"],
  },
  {
    id: "lycee-zineb",
    company: "Lycée Zineb Ennafzaoui",
    position: "Stagiaire — Enseignement Informatique",
    location: "Maroc",
    startDate: "2024-11",
    endDate: "2025-06",
    current: false,
    description: [
      "Animation de séances d'initiation à l'informatique pour des classes de lycée (30+ élèves par groupe)",
      "Création de supports pédagogiques structurés (cours, exercices, QCM) sur les bases de l'informatique",
      "Assistance technique aux élèves sur les outils bureautiques et la navigation internet",
    ],
    technologies: ["Support informatique", "Pédagogie", "Suite Office"],
  },
];