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
      "Réalisation d’une application web de gestion des incidents.",
      "Analyse des besoins et modélisation du système",
      "Développement de l’application en utilisant l’architecture MVC.",
      
    ],
    technologies: ["php", "html", "css","MySQL"]
  },
  {
    id: "lycee-zineb",
    company: "Lycée Zineb Ennafzaoui",
    position: "Stagiaire",
    location: "Maroc",
    startDate: "2024-11",
    endDate: "2025-06",
    current: false,
    description: [
      "Initiation des élèves à l'usage de l'outil informatique",
      "Création de supports pédagogiques",
      "Assistance technique"
    ],
    technologies: ["Support informatique", "Pédagogie"]
  }
];