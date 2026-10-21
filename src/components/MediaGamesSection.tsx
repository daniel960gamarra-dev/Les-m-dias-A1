import React, { useState } from 'react';
import { MEDIA_VOCABULARY } from '../data/mediaVocabData';
import { speakFrench } from '../utils/speech';
import {
  Volume2,
  Trophy,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MediaGamesProps {
  onEarnScore: (pts: number) => void;
}

interface SpeedChallenge {
  sentence: string;
  missingSubject: string;
  options: string[];
  correct: string;
  ruleHint: string;
}

const SPEED_CHALLENGES: SpeedChallenge[] = [
  {
    sentence: 'Le rédacteur en chef cherch___ un scoop.',
    missingSubject: 'Il (Le rédacteur)',
    options: ['-e', '-es', '-ent', '-ons'],
    correct: '-e',
    ruleHint: 'Avec le sujet singulier (Il), la terminaison en -er est -e : cherche.',
  },
  {
    sentence: 'Les collégiens écout___ le podcast de la classe.',
    missingSubject: 'Ils (Les collégiens)',
    options: ['-ent', '-e', '-ez', '-es'],
    correct: '-ent',
    ruleHint: 'Au pluriel (Ils/Elles), la terminaison en -er est -ent : écoutent.',
  },
  {
    sentence: 'Tu regard___ le montage vidéo avec Hugo.',
    missingSubject: 'Tu',
    options: ['-es', '-e', '-ons', '-ez'],
    correct: '-es',
    ruleHint: 'Avec "Tu", les verbes du premier groupe prennent toujours -es : regardes.',
  },
  {
    sentence: 'Nous publi___ l\'interview exclusive demain.',
    missingSubject: 'Nous',
    options: ['-ons', '-ez', '-ent', '-e'],
    correct: '-ons',
    ruleHint: 'Avec "Nous", la terminaison est toujours -ons : publions.',
  },
  {
    sentence: 'Vous parl___ français avec le reporter québécois.',
    missingSubject: 'Vous',
    options: ['-ez', '-ons', '-es', '-e'],
    correct: '-ez',
    ruleHint: 'Avec "Vous", la terminaison est -ez : parlez.',
  },
  {
    sentence: 'Moi et mon binôme, nous _____ une caméra pour le direct.',
    missingSubject: 'Nous (verbe AVOIR)',
    options: ['avons', 'sommes', 'avez', 'ont'],
    correct: 'avons',
    ruleHint: 'Pour le matériel possédé, on utilise avoir : nous avons.',
  },
  {
    sentence: 'Elle _____ la présentatrice du journal de 18h.',
    missingSubject: 'Elle (verbe ÊTRE)',
    options: ['est', 'a', 'es', 'sont'],
    correct: 'est',
    ruleHint: 'Pour l\'état et le métier, on utilise être : elle est.',
  },
];

export const MediaGamesSection: React.FC<MediaGamesProps> = ({ onEarnScore }) => {
  const [activeGame, setActiveGame] = useState<'speed' | 'vocab'>('speed');

  // Speed Challenge State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Vocab card state
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  const currentChallenge = SPEED_CHALLENGES[currentChallengeIdx];

  const handleAnswerChallenge = (ans: string) => {
    if (feedback) return;

    if (ans === currentChallenge.correct) {
      setStreak((prev) => prev + 1);
      onEarnScore(15);
      setFeedback({
        isCorrect: true,
        message: `Excellent ! ${currentChallenge.ruleHint}`,
      });
      speakFrench(`Bravo ! ${ans}`, 1.0);

      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore
      }
    } else {
      setStreak(0);
      setFeedback({
        isCorrect: false,
        message: `Erreur. ${currentChallenge.ruleHint}`,
      });
      speakFrench('Attention, réessaie !', 0.9);
    }
  };

  const handleNextChallenge = () => {
    setFeedback(null);
    setCurrentChallengeIdx((prev) => (prev + 1) % SPEED_CHALLENGES.length);
  };

  const handleListenVocab = (word: string, sentence: string) => {
    speakFrench(`${word}. ${sentence}`, 0.9);
  };

  return (
    <div className="space-y-8">
      {/* Masthead Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-blue-700 tracking-wider mb-1">
            <span>Défis & Jeux FLE</span>
            <span>·</span>
            <span>Entraînement Ludique</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif mb-2">
            La Tribune des Jeux & Défis Médias
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Consolide tes connaissances à travers des mini-défis rapides : attrape la bonne terminaison 
            de verbe en plein vol et explore le lexique illustré des journalistes.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0">
          <button
            onClick={() => setActiveGame('speed')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeGame === 'speed' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chasse aux Terminaisons
          </button>
          <button
            onClick={() => setActiveGame('vocab')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeGame === 'vocab' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Boîte à Outils Presse
          </button>
        </div>
      </div>

      {/* GAME 1: Chasse aux terminaisons */}
      {activeGame === 'speed' && (
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Chasse aux Terminaisons
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>Série gagnante : {streak}</span>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Défi {currentChallengeIdx + 1} sur {SPEED_CHALLENGES.length} · Sujet :{' '}
            <strong className="text-slate-800">{currentChallenge.missingSubject}</strong>
          </div>

          {/* Prompt card */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl p-6 text-center space-y-3 shadow-inner">
            <span className="text-[10px] font-mono tracking-widest uppercase text-blue-300">
              TITRE DE PRESSE EN COURS D'ÉDITION
            </span>
            <div className="text-xl sm:text-2xl font-bold font-serif leading-snug">
              « {currentChallenge.sentence} »
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {currentChallenge.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswerChallenge(opt)}
                disabled={feedback !== null}
                className="py-3 px-4 text-center font-mono text-lg font-bold border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm space-y-3 ${
                feedback.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-start gap-2">
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <p className="leading-relaxed">{feedback.message}</p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextChallenge}
                  className="px-4 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer"
                >
                  Défi suivant →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: Boîte à Outils Presse (Vocab Interactive Cards) */}
      {activeGame === 'vocab' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-slate-600">
              Clique sur une carte pour découvrir son exemple d'utilisation et écouter sa prononciation.
            </p>
            <span className="text-xs font-mono text-slate-500">
              {MEDIA_VOCABULARY.length} fiches de presse
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {MEDIA_VOCABULARY.map((item) => {
              const isFlipped = flippedCardId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setFlippedCardId(isFlipped ? null : item.id)}
                  className={`border rounded-2xl p-5 cursor-pointer transition-all hover:shadow-sm ${
                    isFlipped
                      ? 'bg-blue-50/70 border-blue-300'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span
                      className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        item.gender === 'féminin'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {item.gender}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleListenVocab(
                          `${item.frenchArticle} ${item.word}`,
                          item.exampleSentence
                        );
                      }}
                      className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                      title="Écouter le mot"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-lg font-bold text-slate-900 font-serif mb-1">
                    <span className="text-blue-600 font-sans mr-1">{item.frenchArticle}</span>
                    {item.word}
                  </div>
                  <div className="text-xs text-slate-500 mb-3 italic">
                    « {item.translation} »
                  </div>

                  {isFlipped ? (
                    <div className="pt-2 border-t border-slate-200 text-xs text-slate-700 space-y-1">
                      <div className="font-semibold text-slate-900">En contexte :</div>
                      <p className="italic">« {item.exampleSentence} »</p>
                    </div>
                  ) : (
                    <div className="text-[11px] text-blue-600 font-medium">
                      Voir la phrase d'exemple →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
