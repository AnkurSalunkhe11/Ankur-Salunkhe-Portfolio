// Mechanical Engineering Images - Fixed with exact matching filenames
export const mechanicalImages = {
  // Project images - using exact filenames from public/images/
  projects: {
    organicRankineCycle: "/images/orc-image.jpeg",
    thermalAnalysis: "/images/transient-thermal-braking.jpeg", 
    heatExchanger: "/images/heat-exchanger-performance-cfd.jpeg",
    hybridAirConditioning: "/images/hybrid-air-conditioning-system.jpeg",
    lidDrivenCavity: "/images/lid-driven-cavity-simulation.jpeg",
    numericalSolver: "/images/numerical-solver-transient-heat-transfer.jpeg",
    thermalFinned: "/images/thermal-analysis-finned-heat-sink.jpeg"
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