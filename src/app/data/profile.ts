/**
 * Contenu du portfolio, repris du CV.
 * Pour mettre le site à jour, il suffit de modifier ce fichier.
 */

export interface Stat {
  value: string;
  label: string;
}

export interface Role {
  title: string;
  period: string;
}

export interface Project {
  name: string;
  audience: string;
}

export interface Highlight {
  title: string;
  text: string;
}

export interface Experience {
  company: string;
  client?: string;
  location: string;
  roles: Role[];
  context: string;
  projects: Project[];
  highlights: Highlight[];
  technologies: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  school: string;
  university: string;
  location: string;
  period: string;
}

export interface Course {
  title: string;
  provider: string;
  year: string;
}

export interface Profile {
  name: string;
  title: string;
  stack: string;
  location: string;
  email: string;
  linkedin: string;
  linkedinLabel: string;
  github: string;
  cvFile: string;
  tagline: string;
  summary: string;
  stats: Stat[];
  experiences: Experience[];
  skills: SkillGroup[];
  education: Education[];
  courses: Course[];
  languages: string[];
  interests: string[];
}

export const PROFILE: Profile = {
  name: 'Mohamed Ben Rhaiem',
  title: 'Développeur Full Stack',
  stack: 'Java / Spring Boot / Angular',
  location: 'Tunis, Tunisie',
  email: 'benrhaiem.med@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohamed-ben-rhaiem',
  linkedinLabel: 'linkedin.com/in/mohamed-ben-rhaiem',
  github: 'https://github.com/m-benrhaiem',
  cvFile: 'CV_Mohamed_Ben_Rhaiem.pdf',
  tagline:
    'Je développe des microservices Spring Boot, des applications Angular et des intégrations avec le core banking pour la banque digitale.',
  summary:
    'Ingénieur en informatique diplômé de l’ENSI, développeur Full Stack Java / Spring Boot et Angular avec près de trois ans d’expérience, principalement dans le secteur bancaire. Spécialisé dans le développement de microservices et d’API REST, l’intégration avec le core banking Temenos T24 et la réalisation d’applications web. J’évolue au sein d’équipes Agile / Scrum et participe aux processus CI/CD, notamment avec Jenkins, Nexus et OpenShift.',
  stats: [
    { value: 'Près de 3 ans', label: 'd’expérience, principalement dans le secteur bancaire' },
    { value: '550\u00a0000+', label: 'clients particuliers sur MyBIAT Retail' },
    { value: '30\u00a0000+', label: 'entreprises clientes sur MyBIAT Corporate' },
  ],
  experiences: [
    {
      company: 'Value Digital Services',
      client: 'BIAT, Banque Internationale Arabe de Tunisie',
      location: 'Tunis, Tunisie',
      roles: [
        { title: 'Développeur Full Stack', period: 'octobre 2024 – aujourd’hui' },
        { title: 'Stagiaire Développeur Full Stack', period: 'février 2024 – août 2024' },
      ],
      context: 'Plateformes de banque digitale de la BIAT basées sur Backbase · équipe Agile / Scrum',
      projects: [
        { name: 'MyBIAT Retail', audience: 'plus de 550\u00a0000 clients particuliers' },
        { name: 'MyBIAT Corporate', audience: 'plus de 30\u00a0000 entreprises' },
      ],
      highlights: [
        {
          title: 'Full Stack',
          text: 'Développement de microservices Java / Spring Boot et de fonctionnalités frontend Angular, avec des API REST conçues en contract-first (OpenAPI) pour permettre aux équipes backend et frontend de travailler en parallèle.',
        },
        {
          title: 'Sécurité',
          text: 'Réalisation d’extensions sur les authenticators Keycloak pour adapter les flux d’authentification.',
        },
        {
          title: 'Core banking',
          text: 'Intégration avec le core banking Temenos T24\u00a0: échanges sécurisés via API (flux entrants et sortants) et implémentation de consommateurs JMS (ActiveMQ Artemis) synchronisant en temps réel produits et transactions.',
        },
        {
          title: 'Évolution',
          text: 'Contribution à la montée de version majeure de la plateforme\u00a0: mise à niveau Angular et migration Spring Boot / Jakarta EE.',
        },
        {
          title: 'Qualité & CI/CD',
          text: 'Tests unitaires JUnit 5 / Mockito / AssertJ avec 80\u00a0% de couverture et analyse SonarQube\u00a0; participation aux pipelines CI/CD (build Jenkins, publication Nexus, déploiement OpenShift).',
        },
      ],
      technologies: [
        'Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA / Hibernate', 'Keycloak', 'OpenAPI',
        'JMS / ActiveMQ Artemis', 'Angular', 'TypeScript', 'JUnit 5', 'Mockito', 'AssertJ', 'SonarQube',
        'MSSQL', 'Jenkins', 'Nexus', 'OpenShift', 'Helm', 'Docker', 'Backbase', 'Temenos T24',
      ],
    },
    {
      company: 'Tunisia Fleet Management',
      location: 'Tunis, Tunisie',
      roles: [{ title: 'Stagiaire Développeur Full Stack', period: 'juin 2023 – août 2023' }],
      context: 'Application web de gestion de flotte',
      projects: [],
      highlights: [
        {
          title: 'Full Stack',
          text: 'Développement de bout en bout des modules de suivi des véhicules et de maintenance\u00a0: API REST sécurisées (Spring Boot, Spring Security) et interface React / Redux.',
        },
      ],
      technologies: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'React', 'Redux', 'Firebase'],
    },
  ],
  skills: [
    {
      category: 'Backend',
      items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA / Hibernate', 'Project Reactor', 'JMS', 'Keycloak'],
    },
    { category: 'Frontend', items: ['Angular', 'TypeScript', 'JavaScript'] },
    { category: 'Tests & qualité', items: ['JUnit 5', 'Mockito', 'AssertJ', 'Jasmine / Karma', 'SonarQube'] },
    { category: 'DevOps & CI/CD', items: ['Jenkins', 'Nexus', 'OpenShift (Kubernetes)', 'Helm', 'Docker'] },
    { category: 'Bases de données', items: ['MSSQL', 'PostgreSQL', 'MySQL', 'Cloud Firestore (NoSQL)'] },
    { category: 'Secteur bancaire', items: ['Backbase', 'Temenos T24'] },
    {
      category: 'Outils',
      items: ['Maven', 'Git', 'Bitbucket', 'Jira', 'Confluence', 'Claude Code (IA)'],
    },
  ],
  education: [
    {
      degree: 'Diplôme d’ingénieur en informatique',
      school: 'École Nationale des Sciences de l’Informatique (ENSI)',
      university: 'Université de la Manouba',
      location: 'Tunis, Tunisie',
      period: 'septembre 2021 – septembre 2024',
    },
    {
      degree: 'Cycle préparatoire Mathématiques – Physique',
      school: 'IPEIN Nabeul',
      university: 'Université de Carthage',
      location: 'Nabeul, Tunisie',
      period: '2019 – 2021',
    },
  ],
  courses: [
    { title: 'OAuth 2.0 in Spring Boot Applications', provider: 'Udemy', year: '2026' },
    { title: 'Angular Testing Masterclass – Angular\u00a019', provider: 'Udemy', year: '2025' },
    { title: 'Practical OpenShift for Developers – OpenShift\u00a04', provider: 'Udemy', year: '2025' },
  ],
  languages: ['Arabe\u00a0: langue maternelle', 'Français\u00a0: courant', 'Anglais\u00a0: courant'],
  interests: ['Échecs\u00a0: ancien membre de l’équipe nationale tunisienne U18 (2017)'],
};
