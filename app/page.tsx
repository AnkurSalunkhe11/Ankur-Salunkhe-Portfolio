'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import MechanicalAchievements from '@/components/MechanicalAchievements';
import Certifications from '@/components/Certifications';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { usePortfolioStore } from '@/lib/store';
import { getPersonalData, getDomainData } from '@/lib/data-loader';

export default function Home() {
  const { domain } = usePortfolioStore();
  const personalData = getPersonalData();
  const domainData = getDomainData(domain);

  // Dynamic Google Schema JSON-LD injection for rich SEO snippet indexing
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personalData.name,
    "gender": "Male",
    "jobTitle": personalData.title,
    "url": personalData.website,
    "sameAs": [
      personalData.linkedin,
      personalData.github,
      personalData.twitter,
      personalData.leetcode
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": personalData.location.split(',')[0].trim(),
      "addressRegion": personalData.location.split(',')[1]?.trim(),
      "addressCountry": "India"
    },
    "alumniOf": personalData.education.map(edu => ({
      "@type": "CollegeOrUniversity",
      "name": edu.school,
      "location": edu.location
    })),
    "description": domainData.about,
    "knowsAbout": [
      "Computational Fluid Dynamics (CFD)",
      "ANSYS Fluent Simulating",
      "Waste Heat Recovery engineering",
      "Organic Rankine Cycle (ORC) testing",
      "Software Development",
      "Python programming",
      "Machine Learning",
      "React Fullstack web apps"
    ]
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-200">
      {/* Rich structured metadata for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      {domain === 'mechanical' && <MechanicalAchievements />}
      <Certifications />
      <Resume />
      <Contact />
      <Footer />
      <Toaster />
    </main>
  );
}