'use client';

import { track } from '@vercel/analytics';

// Local storage tracking helper for the custom Admin dashboard
function logLocalEvent(eventName: string, data: any = {}) {
  try {
    if (typeof window === 'undefined') return;
    const logs = JSON.parse(localStorage.getItem('portfolio_analytics_logs') || '[]');
    logs.push({
      id: Math.random().toString(36).substring(2, 9),
      event: eventName,
      data,
      timestamp: Date.now(),
    });
    // Keep last 1000 events to prevent localstorage memory bloat
    localStorage.setItem('portfolio_analytics_logs', JSON.stringify(logs.slice(-1000)));
  } catch (e) {
    console.error("Failed to write local analytics event:", e);
  }
}

export const analytics = {
  // Project interactions
  trackProjectView: (projectTitle: string, domain: string) => {
    track('project_view', { project: projectTitle, domain });
    logLocalEvent('project_view', { project: projectTitle, domain });
  },

  trackProjectDemo: (projectTitle: string) => {
    track('project_demo_click', { project: projectTitle });
    logLocalEvent('project_demo_click', { project: projectTitle });
  },

  trackProjectCode: (projectTitle: string) => {
    track('project_code_click', { project: projectTitle });
    logLocalEvent('project_code_click', { project: projectTitle });
  },

  // Contact form interactions
  trackContactFormStart: () => {
    track('contact_form_start');
    logLocalEvent('contact_form_start');
  },

  trackContactFormSubmit: () => {
    track('contact_form_submit');
    logLocalEvent('contact_form_submit');
  },

  // Resume downloads
  trackResumeDownload: (type: 'cs' | 'mechanical') => {
    track('resume_download', { type });
    logLocalEvent('resume_download', { type });
  },

  trackResumeView: (type: 'cs' | 'mechanical') => {
    track('resume_view', { type });
    logLocalEvent('resume_view', { type });
  },

  // Social media clicks
  trackSocialClick: (platform: string) => {
    track('social_click', { platform });
    logLocalEvent('social_click', { platform });
  },

  // Domain switching
  trackDomainSwitch: (from: string, to: string) => {
    track('domain_switch', { from, to });
    logLocalEvent('domain_switch', { from, to });
  },

  // Navigation
  trackNavigation: (section: string) => {
    track('navigation_click', { section });
    logLocalEvent('navigation_click', { section });
  },

  // Skills section interaction
  trackSkillHover: (skill: string, domain: string) => {
    track('skill_hover', { skill, domain });
    logLocalEvent('skill_hover', { skill, domain });
  },

  // Publication/Patent clicks
  trackPublicationClick: (title: string) => {
    track('publication_click', { title });
    logLocalEvent('publication_click', { title });
  },

  trackPatentClick: (title: string) => {
    track('patent_click', { title });
    logLocalEvent('patent_click', { title });
  },

  // Generic event tracking
  trackEvent: (eventName: string, category: string, label?: string) => {
    const props: Record<string, string> = { category };
    if (label) props.label = label;
    track(eventName, props as any);
    logLocalEvent(eventName, props);
  },
};