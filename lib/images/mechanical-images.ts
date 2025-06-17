// Mechanical Engineering Images
export const mechanicalImages = {
  // Project images
  projects: {
    organicRankineCycle: "/images/orc-image.jpeg",
    thermalAnalysis: "/images/transient-thermal-braking.jpeg",
    heatExchanger: "/images/heat-exchanger-performance-cfd.jpeg",
    hybridAirConditioning: "/images/hybrid-air-conditioning-system.jpeg"
  },
  
  // Hero/Profile images
  hero: {
    profileImage: "/images/thunder.png"
  },
  
  // Background/Section images
  backgrounds: {
    engineeringBackground: "/images/orc-image.jpeg",
    thermalBackground: "/images/heat-exchanger-performance-cfd.jpeg"
  }
};

export type MechanicalImageKeys = keyof typeof mechanicalImages;