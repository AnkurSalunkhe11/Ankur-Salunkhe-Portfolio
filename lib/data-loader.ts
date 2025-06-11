import personalData from '@/data/personal-data.json';
import csData from '@/data/cs-data.json';
import mechanicalData from '@/data/mechanical-data.json';
import config from '@/data/config.json';

export type PortfolioDomain = 'cs' | 'mechanical';

export interface PersonalData {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  twitter: string;
  website: string;
  leetcode: string;
  location: string;
  bio: string;
  education: Array<{
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa: string;
    coursework: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    credentialId: string;
    link: string;
  }>;
}

export interface DomainData {
  tagline: string;
  about: string;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    image: string;
    github?: string;
    demo?: string;
    link?: string;
    duration?: string;
    team?: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
  }>;
  publications?: Array<{
    title: string;
    journal: string;
    year: number;
    doi: string;
    description: string;
  }>;
  patents?: Array<{
    title: string;
    applicationNumber: string;
    status: string;
    year: number;
    description: string;
  }>;
}

export interface Config {
  defaultLanding: PortfolioDomain;
  contactEmail: string;
  analytics: {
    vercelAnalytics: boolean;
    speedInsights: boolean;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export const getPersonalData = (): PersonalData => personalData;
export const getCSData = (): DomainData => csData;
export const getMechanicalData = (): DomainData => mechanicalData;
export const getConfig = (): Config => config;

export const getDomainData = (domain: PortfolioDomain): DomainData => {
  return domain === 'cs' ? getCSData() : getMechanicalData();
};

export const getDefaultLanding = (): PortfolioDomain => {
  return getConfig().defaultLanding;
};