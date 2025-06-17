// Optimized image configuration with proper resolutions
export const optimizedImageConfig = {
  // Hero/Profile Images - Square format for consistency
  hero: {
    cs: {
      src: "/images/thunder.png",
      alt: "Ankur Salunkhe - Software Developer",
      sizes: {
        mobile: { width: 320, height: 320 },
        tablet: { width: 480, height: 480 },
        desktop: { width: 640, height: 640 }
      }
    },
    mechanical: {
      src: "/images/thunder.png", 
      alt: "Ankur Salunkhe - Mechanical Engineer",
      sizes: {
        mobile: { width: 320, height: 320 },
        tablet: { width: 480, height: 480 },
        desktop: { width: 640, height: 640 }
      }
    }
  },

  // Project Images - 4:3 aspect ratio for cards
  projects: {
    cs: {
      "Financial Statement Analysis Chatbot": {
        src: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg",
        alt: "Financial analysis dashboard with charts and data",
        sizes: {
          thumbnail: { width: 300, height: 225 },
          card: { width: 400, height: 300 },
          detail: { width: 800, height: 600 }
        }
      },
      "LogCount W - Log Analysis System": {
        src: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
        alt: "Code editor with log analysis scripts",
        sizes: {
          thumbnail: { width: 300, height: 225 },
          card: { width: 400, height: 300 },
          detail: { width: 800, height: 600 }
        }
      },
      "Numerical Solver for Transient Heat Transfer": {
        src: "/images/numerical-solver-transient-heat-transfer.jpeg",
        alt: "Heat transfer simulation visualization",
        sizes: {
          thumbnail: { width: 300, height: 225 },
          card: { width: 400, height: 300 },
          detail: { width: 800, height: 600 }
        }
      },
      "AI Virtual Assistant": {
        src: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
        alt: "AI assistant interface with voice recognition",
        sizes: {
          thumbnail: { width: 300, height: 225 },
          card: { width: 400, height: 300 },
          detail: { width: 800, height: 600 }
        }
      },
      "Lid Driven Cavity Simulation": {
        src: "/images/lid-driven-cavity-simulation.jpeg",
        alt: "CFD simulation of lid driven cavity flow",
        sizes: {
          thumbnail: { width: 300, height: 225 },
          card: { width: 400, height: 300 },
          detail: { width: 800, height: 600 }
        }
      },
      "Space Wars Game": {
        src: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
        alt: "Space themed game interface",
        sizes: {
          thumbnail: { width: 300, height: 225 },
          card: { width: 400, height: 300 },
          detail: { width: 800, height: 600 }
        }
      }
    },
    mechanical: {
      "Implementation of an Organic Rankine Cycle as a Waste Heat Recovery System": {
        src: "/images/orc-image.jpeg",
        alt: "Organic Rankine Cycle system diagram",
        sizes: {
          thumbnail: { width: 300, height: 225 },
          card: { width: 400, height: 300 },
          detail: { width: 800, height: 600 }
        }
      },
      "Transient Thermal Analysis of Braking Systems Using ANSYS": {
        src: "/images/transient-thermal-braking.jpeg",
        alt: "ANSYS thermal analysis of brake system",
        sizes: {
          thumbnail: { width: 300, height: 225 },
          card: { width: 400, height: 300 },
          detail: { width: 800, height: 600 }
        }
      },
      "Heat Exchanger Performance Optimization using CFD": {
        src: "/images/heat-exchanger-performance-cfd.jpeg",
        alt: "CFD analysis of heat exchanger performance",
        sizes: {
          thumbnail: { width: 300, height: 225 },
          card: { width: 400, height: 300 },
          detail: { width: 800, height: 600 }
        }
      },
      "Hybrid Air-conditioning System for Passenger Vehicles": {
        src: "/images/hybrid-air-conditioning-system.jpeg",
        alt: "Hybrid HVAC system design for vehicles",
        sizes: {
          thumbnail: { width: 300, height: 225 },
          card: { width: 400, height: 300 },
          detail: { width: 800, height: 600 }
        }
      }
    }
  },

  // Background Images - Wide format for sections
  backgrounds: {
    cs: {
      primary: {
        src: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
        alt: "Technology background",
        sizes: {
          mobile: { width: 800, height: 600 },
          desktop: { width: 1920, height: 1080 }
        }
      }
    },
    mechanical: {
      primary: {
        src: "/images/orc-image.jpeg",
        alt: "Engineering background",
        sizes: {
          mobile: { width: 800, height: 600 },
          desktop: { width: 1920, height: 1080 }
        }
      }
    }
  },

  // Fallback images
  fallback: {
    project: {
      src: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
      alt: "Default project image",
      sizes: {
        thumbnail: { width: 300, height: 225 },
        card: { width: 400, height: 300 }
      }
    },
    hero: {
      src: "/images/thunder.png",
      alt: "Default profile image",
      sizes: {
        mobile: { width: 320, height: 320 },
        desktop: { width: 640, height: 640 }
      }
    }
  }
};

// Helper function to get optimized image config
export const getImageConfig = (
  domain: 'cs' | 'mechanical',
  category: 'hero' | 'projects' | 'backgrounds',
  key?: string
) => {
  try {
    if (category === 'hero') {
      return optimizedImageConfig.hero[domain];
    }
    
    if (category === 'projects' && key) {
      return optimizedImageConfig.projects[domain][key] || optimizedImageConfig.fallback.project;
    }
    
    if (category === 'backgrounds') {
      return optimizedImageConfig.backgrounds[domain].primary;
    }
    
    return optimizedImageConfig.fallback.project;
  } catch (error) {
    console.warn(`Failed to get image config for ${category}:${domain}:${key}`, error);
    return optimizedImageConfig.fallback.project;
  }
};