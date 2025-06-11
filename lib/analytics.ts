'use client';

import { track } from '@vercel/analytics';

// Simple analytics wrapper using only Vercel Analytics
export const analytics = {
  // Project interactions
  trackProjectView: (projectTitle: string, domain: string) => {
    track('project_view', { project: projectTitle, domain });
  },

  trackProjectDemo: (projectTitle: string) => {
    track('project_demo_click', { project: projectTitle });
  },

  trackProjectCode: (projectTitle: string) => {
    track('project_code_click', { project: projectTitle });
  },

  // Contact form interactions
  trackContactFormStart: () => {
    track('contact_form_start');
  },

  trackContactFormSubmit: () => {
    track('contact_form_submit');
  },

  // Resume downloads
  trackResumeDownload: (type: 'cs' | 'mechanical') => {
    track('resume_download', { type });
  },

  trackResumeView: (type: 'cs' | 'mechanical') => {
    track('resume_view', { type });
  },

  // Social media clicks
  trackSocialClick: (platform: string) => {
    track('social_click', { platform });
  },

  // Domain switching
  trackDomainSwitch: (from: string, to: string) => {
    track('domain_switch', { from, to });
  },

  // Navigation
  trackNavigation: (section: string) => {
    track('navigation_click', { section });
  },

  // Skills section interaction
  trackSkillHover: (skill: string, domain: string) => {
    track('skill_hover', { skill, domain });
  },

  // Publication/Patent clicks
  trackPublicationClick: (title: string) => {
    track('publication_click', { title });
  },

  trackPatentClick: (title: string) => {
    track('patent_click', { title });
  },

  // Generic event tracking
  trackEvent: (eventName: string, category: string, label?: string) => {
    track(eventName, { category, label });
  },
};