// Centralized Image Configuration
// Update all website images from this single file

export const imageConfig = {
  // Hero/Profile Images
  hero: {
    cs: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    mechanical: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
  },

  // Project Images - CS Domain
  projects: {
    cs: {
      "Financial Statement Analysis Chatbot": "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
      "LogCount W - Log Analysis System": "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
      "Numerical Solver for Transient Heat Transfer": "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
      "AI Virtual Assistant": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      "Lid Driven Cavity Simulation": "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
      "Space Wars Game": "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    // Project Images - Mechanical Domain
    mechanical: {
      "Implementation of an Organic Rankine Cycle as a Waste Heat Recovery System": "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800",
      "Transient Thermal Analysis of Braking Systems Using ANSYS": "https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800",
      "Heat Exchanger Performance Optimization using CFD": "https://images.pexels.com/photos/1474993/pexels-photo-1474993.jpeg?auto=compress&cs=tinysrgb&w=800",
      "Hybrid Air-conditioning System for Passenger Vehicles": "https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  },

  // Background Images
  backgrounds: {
    cs: {
      primary: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200",
      secondary: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    mechanical: {
      primary: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1200",
      secondary: "https://images.pexels.com/photos/1474993/pexels-photo-1474993.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
  },

  // Section-specific Images
  sections: {
    about: {
      cs: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
      mechanical: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    skills: {
      cs: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
      mechanical: "https://images.pexels.com/photos/1474993/pexels-photo-1474993.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    contact: {
      cs: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
      mechanical: "https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  },

  // Fallback Images
  fallback: {
    project: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
    background: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1200",
    profile: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
};

// Helper function to get image by category and domain
export const getImage = (
  category: keyof typeof imageConfig,
  domain: 'cs' | 'mechanical',
  key?: string
): string => {
  try {
    const categoryImages = imageConfig[category];
    
    if (!categoryImages) {
      return imageConfig.fallback.background;
    }

    // Handle different category structures
    if (category === 'hero') {
      return (categoryImages as any)[domain] || imageConfig.fallback.profile;
    }

    if (category === 'projects' && key) {
      return (categoryImages as any)[domain]?.[key] || imageConfig.fallback.project;
    }

    if (category === 'backgrounds' || category === 'sections') {
      return (categoryImages as any)[domain]?.primary || imageConfig.fallback.background;
    }

    return imageConfig.fallback.background;
  } catch (error) {
    console.warn(`Failed to get image for ${category}:${domain}:${key}`, error);
    return imageConfig.fallback.background;
  }
};

// Specific helper functions for common use cases
export const getHeroImage = (domain: 'cs' | 'mechanical'): string => {
  return getImage('hero', domain);
};

export const getProjectImage = (domain: 'cs' | 'mechanical', projectTitle: string): string => {
  return getImage('projects', domain, projectTitle);
};

export const getBackgroundImage = (domain: 'cs' | 'mechanical', type: 'primary' | 'secondary' = 'primary'): string => {
  const categoryImages = imageConfig.backgrounds[domain];
  return categoryImages?.[type] || imageConfig.fallback.background;
};

export const getSectionImage = (domain: 'cs' | 'mechanical', section: 'about' | 'skills' | 'contact'): string => {
  const categoryImages = imageConfig.sections[section];
  return (categoryImages as any)?.[domain] || imageConfig.fallback.background;
};