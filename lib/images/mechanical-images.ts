// Mechanical Engineering Images
export const mechanicalImages = {
  // Project images
  projects: {
    organicRankineCycle: "../lib/image/orc image.jpeg?auto=compress&cs=tinysrgb&w=800",
    thermalAnalysis: "../lib/image/transient thermal braking image.jpeg?auto=compress&cs=tinysrgb&w=800",
    heatExchanger: "../lib/image/heat exchanger performance using cfd.jpeg?auto=compress&cs=tinysrgb&w=800",
    hybridAirConditioning: "../lib/image/Performance Evaluation and Simulation Three Fluid Heat Exchanges for Hybrid Air-conditioning System for Passenger Vehicles.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  
  // Hero/Profile images
  hero: {
    profileImage: "../lib/image/thunder.png?auto=compress&cs=tinysrgb&w=600"
  },
  
  // Background/Section images
  backgrounds: {
    engineeringBackground: "../lib/image/orc image.jpeg?auto=compress&cs=tinysrgb&w=1200",
    thermalBackground: "../lib/image/heat exchanger performance using cfd.jpeg?auto=compress&cs=tinysrgb&w=1200"
  }
};

export type MechanicalImageKeys = keyof typeof mechanicalImages;