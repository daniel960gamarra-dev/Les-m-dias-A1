import React from 'react';
import { NavigationTab } from '../types';
import { Volume2 } from 'lucide-react';
import { speakFrench } from '../utils/speech';

interface HeaderProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  totalScore: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, totalScore }) => {
  const handleTestAudio = () => {
    speakFrench("Bienvenue au club journal des huitièmes ! C'est parti pour le français !");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('grammar')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="font-serif text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors whitespace-nowrap">
                Le Flash FLE
              </span>
            </button>
            <span className="hidden sm:inline-block text-xs font-medium text-slate-400">· Collège 8e</span>
          </div>

          {/* Zone 2: Nav links */}
          <nav className="flex items-center gap-1 md:gap-4 overflow-x-auto py-1 scrollbar-none">
            <button
              onClick={() => onSelectTab('grammar')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'grammar'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Rédaction Grammaire
            </button>
            <button
              onClick={() => onSelectTab('delf-reading')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'delf-reading'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Kiosque DELF Écrit
            </button>
            <button
              onClick={() => onSelectTab('audio-frederic')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'audio-frederic'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              3. Studio Audio
            </button>
            <button
              onClick={() => onSelectTab('press-badge')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'press-badge'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              4. Carte de Presse
            </button>
            <button
              onClick={() => onSelectTab('mini-games')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'mini-games'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              5. Défis Médias
            </button>
          </nav>

          {/* Zone 3: Single primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleTestAudio}
              title="Tester la voix française"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden md:inline">Prononciation</span>
            </button>
            <div className="text-xs font-mono tabular-nums text-slate-600 font-semibold bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md whitespace-nowrap">
              {totalScore} <span className="text-amber-700 font-sans font-medium">XP</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
