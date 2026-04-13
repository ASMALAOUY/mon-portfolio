export type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  courses: string[];
  highlights?: string[];
};

export const education: Education[] = [
  {
    id: "licence-info",
    school: "ENS (École Normale Supérieure)",
    degree: "Licence",
    field: "Informatique",
    location: "Maroc",
    startDate: "2023",
    endDate: "Présent",
    courses: [
      "Programmation",
      "Bases de données",
      "Génie logiciel",
      "Réseaux",
      "Développement web",
    ],
    highlights: [
      "Projets concrets en gestion des incidents, applications médicales et systèmes de recommandation",
    ],
  },
  {
    id: "deug-ens",
    school: "ENS (École Normale Supérieure)",
    degree: "DEUG",
    field: "Informatique",
    location: "Maroc",
    startDate: "2023",
    endDate: "2025",
    courses: [
      "Programmation",
      "Structures de données",
      "Bases de données",
      "Systèmes d'exploitation",
      "Réseaux",
      "Mathématiques appliquées",
    ],
    highlights: [
      "Réalisation de projets académiques en développement web et gestion de bases de données",
      "Acquisition de solides bases en algorithmique et programmation",
      "Travaux pratiques en systèmes informatiques et réseaux",
    ],
  },
  {
    id: "bac-mipc",
    school: "Faculté des Sciences et Techniques de Marrakech (FSTG)",
    degree: "Bac+1",
    field: "MIPC (Mathématiques, Informatique, Physique, Chimie)",
    location: "Marrakech, Maroc",
    startDate: "2022",
    endDate: "2023",
    courses: ["Mathématiques", "Informatique", "Physique", "Chimie"],
    highlights: [],
  },
];