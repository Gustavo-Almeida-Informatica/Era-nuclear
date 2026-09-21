/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { HistoryPage } from './pages/HistoryPage';
import { PhysicsPage } from './pages/PhysicsPage';
import { FissionFusionPage } from './pages/FissionFusionPage';
import { WeaponsPage } from './pages/WeaponsPage';
import { ImpactsPage } from './pages/ImpactsPage';
import { EnergyPage } from './pages/EnergyPage';
import { CasesPage } from './pages/CasesPage';
import { GalleryPage } from './pages/GalleryPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { AboutPage } from './pages/AboutPage';
import { SourcesPage } from './pages/SourcesPage';
import { ContactPage } from './pages/ContactPage';
import { MapPage } from './pages/MapPage';

// Special Monographic Pages
import { OperationCastlePage } from './pages/OperationCastlePage';
import { TsarBombaPage } from './pages/TsarBombaPage';
import { IvyKingPage } from './pages/IvyKingPage';
import { IvyMikePage } from './pages/IvyMikePage';
import { ManhattanProjectPage } from './pages/ManhattanProjectPage';
import { B41Page } from './pages/B41Page';
import { ChernobylPage } from './pages/ChernobylPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Listen for hash changes for deep linking / bookmarking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'history',
        'physics',
        'fission-fusion',
        'weapons',
        'operation-castle',
        'tsar-bomba',
        'ivy-king',
        'ivy-mike',
        'manhattan-project',
        'b41',
        'chernobyl',
        'impacts',
        'nuclear-ranking',
        'map',
        'energy',
        'cases',
        'gallery',
        'glossary',
        'about',
        'sources',
        'contact'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'history':
        return <HistoryPage onNavigate={handleNavigate} />;
      case 'physics':
        return <PhysicsPage onNavigate={handleNavigate} />;
      case 'fission-fusion':
        return <FissionFusionPage onNavigate={handleNavigate} />;
      case 'weapons':
        return <WeaponsPage onNavigate={handleNavigate} />;
      case 'operation-castle':
        return <OperationCastlePage onNavigate={handleNavigate} />;
      case 'tsar-bomba':
        return <TsarBombaPage onNavigate={handleNavigate} />;
      case 'ivy-king':
        return <IvyKingPage onNavigate={handleNavigate} />;
      case 'ivy-mike':
        return <IvyMikePage onNavigate={handleNavigate} />;
      case 'manhattan-project':
        return <ManhattanProjectPage onNavigate={handleNavigate} />;
      case 'b41':
        return <B41Page onNavigate={handleNavigate} />;
      case 'chernobyl':
        return <ChernobylPage onNavigate={handleNavigate} />;
      case 'impacts':
        return <ImpactsPage onNavigate={handleNavigate} />;
      case 'nuclear-ranking':
      case 'map':
        return <MapPage onNavigate={handleNavigate} />;
      case 'energy':
        return <EnergyPage onNavigate={handleNavigate} />;
      case 'cases':
        return <CasesPage onNavigate={handleNavigate} />;
      case 'gallery':
        return <GalleryPage onNavigate={handleNavigate} />;
      case 'glossary':
        return <GlossaryPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'sources':
        return <SourcesPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FFFFFF] flex flex-col font-sans selection:bg-[#73CAE5]/30 selection:text-white">
      {/* Top Bar Header */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
