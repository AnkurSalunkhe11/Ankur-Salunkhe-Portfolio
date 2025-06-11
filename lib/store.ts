import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getDefaultLanding, type PortfolioDomain } from './data-loader';

interface PortfolioState {
  domain: PortfolioDomain;
  setDomain: (domain: PortfolioDomain) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      domain: getDefaultLanding(),
      setDomain: (domain) => set({ domain }),
    }),
    {
      name: 'portfolio-domain',
    }
  )
);