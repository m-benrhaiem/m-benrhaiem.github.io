/**
 * Contenu du portfolio, repris du CV.
 * Pour mettre le site à jour, il suffit de modifier ce fichier.
 */

import type { IconName } from '../icons';

export interface Stat {
  value: string;
  label: string;
  /** Valeur numérique pour le compteur animé (si la statistique est un nombre). */
  count?: number;
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
  icon: IconName;
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
  certificateUrl: string;
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
  sourceCode: string;
  cvFile: string;
  photo: string;
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
  title: 'Ingénieur Full Stack',
  stack: 'Java / Spring Boot / Angular',
  location: 'Tunis, Tunisie',
  email: 'benrhaiem.med@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohamed-ben-rhaiem',
  linkedinLabel: 'linkedin.com/in/mohamed-ben-rhaiem',
  github: 'https://github.com/m-benrhaiem',
  sourceCode: 'https://github.com/m-benrhaiem/m-benrhaiem.github.io',
  cvFile: 'CV_Mohamed_Ben_Rhaiem.pdf',
  photo: 'images/mohamed-ben-rhaiem.webp',
  tagline:
    'Je développe des microservices Spring Boot, des applications Angular et des intégrations avec le core banking pour la banque digitale.',
  summary:
    'Ingénieur en informatique diplômé de l’ENSI, développeur Full Stack spécialisé en Java / Spring Boot et Angular, avec plus de deux ans d’expérience professionnelle dans la banque digitale. Expérience dans la conception de microservices, l’intégration de systèmes bancaires complexes et la modernisation d’applications. Habitué aux environnements Agile et aux exigences de sécurité et de qualité logicielle.',
  stats: [
    { value: 'Plus de 2 ans', label: 'd’expérience professionnelle dans la banque digitale' },
    { value: '415\u00a0000+', count: 415000, label: 'clients particuliers sur MyBIAT Retail' },
    { value: '19\u00a0000+', count: 19000, label: 'entreprises clientes sur MyBIAT Corporate' },
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
      context: 'Plateformes de banque digitale de la BIAT basées sur Backbase · équipe Scrum',
      projects: [
        { name: 'MyBIAT Retail', audience: 'plus de 415\u00a0000 clients particuliers' },
        { name: 'MyBIAT Corporate', audience: 'plus de 19\u00a0000 entreprises' },
      ],
      highlights: [
        {
          title: 'Développement full stack',
          text: 'Microservices Java / Spring Boot et fonctionnalités Angular, avec des API REST contract-first (OpenAPI) facilitant le développement parallèle des équipes frontend et backend.',
        },
        {
          title: 'Plateforme d’approbation',
          text: 'Conception et développement en autonomie d’une application Full Stack (Angular / Spring Boot) automatisant les processus d’approbation et remplaçant des interventions SQL manuelles, permettant de gagner plus d’une heure par mise en production et de réduire certaines opérations de 3\u00a0jours-homme à quelques minutes.',
        },
        {
          title: 'Intégration bancaire',
          text: 'Intégration sécurisée avec le core banking Temenos T24 et développement de consommateurs JMS (ActiveMQ Artemis) pour synchroniser les données bancaires en temps réel.',
        },
        {
          title: 'Sécurité',
          text: 'Extensions d’authenticators Keycloak pour adapter l’authentification aux besoins fonctionnels de la plateforme.',
        },
        {
          title: 'Modernisation',
          text: 'Contribution à la migration Spring Boot / Jakarta EE et à la montée de version Angular de la plateforme bancaire, avec adaptation du code et des dépendances.',
        },
        {
          title: 'Qualité & déploiement',
          text: 'Développement de tests unitaires JUnit 5, Mockito et AssertJ, avec 80\u00a0% de couverture sur les microservices développés, suivi de la qualité via SonarQube et participation aux processus CI/CD (Jenkins, Nexus, OpenShift).',
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
      category: 'Compétences clés',
      icon: 'star',
      items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA / Hibernate', 'API REST / OpenAPI', 'Angular', 'TypeScript', 'JavaScript'],
    },
    {
      category: 'Tests & qualité',
      icon: 'shield',
      items: ['JUnit 5', 'Mockito', 'AssertJ', 'SonarQube', 'Jasmine / Karma'],
    },
    {
      category: 'Intégration bancaire',
      icon: 'bank',
      items: ['Temenos T24', 'JMS / ActiveMQ Artemis', 'Keycloak', 'Backbase'],
    },
    {
      category: 'Bases de données',
      icon: 'database',
      items: ['MSSQL', 'PostgreSQL', 'MySQL'],
    },
    {
      category: 'CI/CD & déploiement',
      icon: 'cycle',
      items: ['Jenkins', 'Nexus', 'OpenShift (Kubernetes)', 'Docker', 'Helm'],
    },
    {
      category: 'Outils',
      icon: 'sliders',
      items: ['Git', 'Maven', 'Bitbucket', 'Jira', 'Confluence', 'Claude Code (IA)'],
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
    {
      title: 'OAuth 2.0 in Spring Boot Applications',
      provider: 'Udemy',
      year: '2026',
      certificateUrl: 'https://www.udemy.com/certificate/UC-0a063094-e2d4-4cfd-9d9c-e81661f1699a/',
    },
    {
      title: 'Angular Testing Masterclass – Angular\u00a019',
      provider: 'Udemy',
      year: '2025',
      certificateUrl: 'https://www.udemy.com/certificate/UC-79433449-5edc-4940-9af1-a9d30b4225ea/',
    },
    {
      title: 'Practical OpenShift for Developers – OpenShift\u00a04',
      provider: 'Udemy',
      year: '2025',
      certificateUrl: 'https://www.udemy.com/certificate/UC-c0f99883-73ea-4898-b1ee-2ee19181a66f/',
    },
  ],
  languages: ['Arabe\u00a0: langue maternelle', 'Français\u00a0: courant', 'Anglais\u00a0: courant'],
  interests: ['Échecs\u00a0: ancien membre de l’équipe nationale tunisienne U18 (2017)'],
};
