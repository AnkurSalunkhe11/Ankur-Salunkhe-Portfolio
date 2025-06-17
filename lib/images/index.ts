// Central image management and helper functions
import { csImages, type CSImageKeys } from './cs-images';
import { mechanicalImages, type MechanicalImageKeys } from './mechanical-images';
import type { PortfolioDomain } from '@/lib/data-loader';

// Combined image types
export type ImageDomain = 'cs' | 'mechanical';
export type ImageCategory = 'projects' | 'hero' | 'backgrounds';

// Helper function to get domain-specific images
export const getDomainImages = (domain: PortfolioDomain) => {
  return domain === 'cs' ? csImages : mechanicalImages;
};

// Helper function to get project image by title
export const getProjectImage = (domain: PortfolioDomain, projectTitle: string): string => {
  const images = getDomainImages(domain);
  
  // Map project titles to image keys
  const projectImageMap: Record<string, string> = {
    // CS Projects
    'Financial Statement Analysis Chatbot': images.projects.financialChatbot || csImages.projects.financialChatbot,
    'LogCount W - Log Analysis System': images.projects.logAnalysis || csImages.projects.logAnalysis,
    'Numerical Solver for Transient Heat Transfer': images.projects.heatTransferSolver || csImages.projects.heatTransferSolver,
    'AI Virtual Assistant': images.projects.aiAssistant || csImages.projects.aiAssistant,
    'Lid Driven Cavity Simulation': images.projects.lidDrivenCavity || csImages.projects.lidDrivenCavity,
    'Space Wars Game': images.projects.spaceWarsGame || csImages.projects.spaceWarsGame,
    
    // Mechanical Projects
    'Implementation of an Organic Rankine Cycle as a Waste Heat Recovery System': mechanicalImages.projects.organicRankineCycle,
    'Transient Thermal Analysis of Braking Systems Using ANSYS': mechanicalImages.projects.thermalAnalysis,
    'Heat Exchanger Performance Optimization using CFD': mechanicalImages.projects.heatExchanger,
    'Hybrid Air-conditioning System for Passenger Vehicles': mechanicalImages.projects.hybridAirConditioning,
  };

  return projectImageMap[projectTitle] || images.backgrounds.codeBackground || mechanicalImages.backgrounds.engineeringBackground;
};

// Helper function to get hero image
export const getHeroImage = (domain: PortfolioDomain): string => {
  const images = getDomainImages(domain);
  return images.hero.profileImage;
};

// Helper function to get background image
export const getBackgroundImage = (domain: PortfolioDomain, type: 'primary' | 'secondary' = 'primary'): string => {
  const images = getDomainImages(domain);
  
  if (domain === 'cs') {
    return type === 'primary' ? images.backgrounds.codeBackground : images.backgrounds.techBackground;
  } else {
    return type === 'primary' ? images.backgrounds.engineeringBackground : images.backgrounds.thermalBackground;
  }
};

// Image optimization helper
export const optimizeImageUrl = (url: string, width: number = 800, quality: number = 80): string => {
  if (url.includes('pexels.com')) {
    // For Pexels images, we can modify the URL parameters
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=compress&cs=tinysrgb&w=${width}&q=${quality}`;
  }
  return url;
};

// Preload critical images
export const preloadCriticalImages = (domain: PortfolioDomain) => {
  const images = getDomainImages(domain);
  
  // Preload hero image
  const heroImg = new Image();
  heroImg.src = images.hero.profileImage;
  
  // Preload first few project images
  Object.values(images.projects).slice(0, 3).forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Export all images for direct access
export { csImages, mechanicalImages };
export type { CSImageKeys, MechanicalImageKeys };