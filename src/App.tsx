import React, { useState } from 'react';
import { NavigationTab } from './types';
import { Header } from './components/Header';
import { GrammarNewsroom } from './components/GrammarNewsroom';
import { DelfReadingSection } from './components/DelfReadingSection';
import { FredericListeningSection } from './components/FredericListeningSection';
import { PressBadgeBuilder } from './components/PressBadgeBuilder';
import { MediaGamesSection } from './components/MediaGamesSection';
import {
  Newspaper,
  BookOpen,
  Headphones,
  IdCard,
  Gamepad2,
  Award,
  Volume2,
} from 'lucide-react';
import { speakFrench } from './utils/speech';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('grammar');
  const [totalScore, setTotalScore] = useState<number>(50);

  const handleEarnScore = (pts: number) => {
    setTotalScore((prev) => prev + pts);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-200">
      {/* Top Bar Contract Compliant Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        totalScore={totalScore}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Editorial Top Kicker & Quick Navigation Bar */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-blue-700 tracking-wider">
                <span>Le Club Presse FLE</span>
                <span>·</span>
                <span>8e Année de Collège</span>
                <span>·</span>
                <span>Débutants A1/A2</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 text-balance">
                Bienvenue à la rédaction du journal des jeunes reporters !
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                Ici, tu apprends le français à travers le journalisme : entraîne-toi sur le <strong>présent de l'indicatif</strong> (verbes en <em>-ER</em>, <em>être</em> et <em>avoir</em>), 
                lis un <strong>vrai article scolaire type DELF</strong>, écoute le <strong>message audio de Frédéric</strong> et crée ta <strong>carte de presse officielle</strong> !
              </p>

              {/* Navigation Action Pills / Interactive Segmented Controls */}
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('grammar')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                    activeTab === 'grammar'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Grammaire & Verbes</span>
                </button>
                <button
                  onClick={() => setActiveTab('delf-reading')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                    activeTab === 'delf-reading'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>Kiosque DELF Écrit</span>
                </button>
                <button
                  onClick={() => setActiveTab('audio-frederic')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                    activeTab === 'audio-frederic'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Studio Audio (Frédéric)</span>
                </button>
                <button
                  onClick={() => setActiveTab('press-badge')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                    activeTab === 'press-badge'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <IdCard className="w-3.5 h-3.5" />
                  <span>Carte de Presse</span>
                </button>
                <button
                  onClick={() => setActiveTab('mini-games')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                    activeTab === 'mini-games'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>Défis Médias</span>
                </button>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 rounded-xl overflow-hidden border border-slate-200 aspect-16/9 relative shadow-2xs">
              <img
                src="/src/assets/images/hero_press_club_1792611825786.jpg"
                alt="Les collégiens du club journal réunis dans la salle de presse"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-medium text-white">
                  Équipe de rédaction de 8e · Collège Saint-Louis
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Section based on Active Tab */}
        {activeTab === 'grammar' && (
          <GrammarNewsroom onEarnScore={handleEarnScore} />
        )}

        {activeTab === 'delf-reading' && (
          <DelfReadingSection onEarnScore={handleEarnScore} />
        )}

        {activeTab === 'audio-frederic' && (
          <FredericListeningSection onEarnScore={handleEarnScore} />
        )}

        {activeTab === 'press-badge' && (
          <PressBadgeBuilder onEarnScore={handleEarnScore} />
        )}

        {activeTab === 'mini-games' && (
          <MediaGamesSection onEarnScore={handleEarnScore} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-serif font-bold text-slate-800">Le Flash FLE</span>
            <span> — Plateforme d'apprentissage pour collégiens de 8e (FLE A1/A2)</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Présent de l'indicatif</span>
            <span aria-hidden="true">·</span>
            <span>Être & Avoir</span>
            <span aria-hidden="true">·</span>
            <span>DELF Scolaire Junior</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
