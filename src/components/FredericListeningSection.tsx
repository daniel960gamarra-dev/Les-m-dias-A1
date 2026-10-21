import React, { useState } from 'react';
import {
  FREDERIC_RESOURCE_URL,
  FREDERIC_TRANSCRIPT_SEGMENTS,
  FREDERIC_QUESTIONS,
} from '../data/fredericAudioData';
import { speakFrench, stopSpeech } from '../utils/speech';
import {
  Play,
  Square,
  Volume2,
  ExternalLink,
  Headphones,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { IMAGES } from '../assets';

interface FredericListeningProps {
  onEarnScore: (pts: number) => void;
}

export const FredericListeningSection: React.FC<FredericListeningProps> = ({ onEarnScore }) => {
  const [isPlayingFull, setIsPlayingFull] = useState<boolean>(false);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.9);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Play full text sentence by sentence
  const handlePlayFull = () => {
    stopSpeech();
    setIsPlayingFull(true);
    let index = 0;

    const playNext = () => {
      if (index >= FREDERIC_TRANSCRIPT_SEGMENTS.length) {
        setIsPlayingFull(false);
        setActiveSegmentIndex(null);
        return;
      }
      setActiveSegmentIndex(index);
      const segment = FREDERIC_TRANSCRIPT_SEGMENTS[index];
      speakFrench(segment.french, playbackSpeed, () => {
        index++;
        playNext();
      });
    };

    playNext();
  };

  const handleStopAudio = () => {
    stopSpeech();
    setIsPlayingFull(false);
    setActiveSegmentIndex(null);
  };

  const handlePlaySingleSegment = (index: number) => {
    stopSpeech();
    setIsPlayingFull(false);
    setActiveSegmentIndex(index);
    const segment = FREDERIC_TRANSCRIPT_SEGMENTS[index];
    speakFrench(segment.french, playbackSpeed, () => {
      setActiveSegmentIndex(null);
    });
  };

  const handleSelectAnswer = (qId: number, answer: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const calculateScore = () => {
    let pts = 0;
    FREDERIC_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id]?.toString() === q.correctAnswer.toString()) {
        pts += q.points;
      }
    });
    return pts;
  };

  const totalPoints = FREDERIC_QUESTIONS.reduce((sum, q) => sum + q.points, 0);
  const currentEarnedPoints = calculateScore();

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    onEarnScore(currentEarnedPoints * 2);
    if (currentEarnedPoints >= 15) {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-8">
      {/* Title & Official Source Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-blue-700 tracking-wider mb-1">
            <span>Exercice de Compréhension Orale</span>
            <span>·</span>
            <span>Ressource FLE Officielle</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif mb-2">
            Frédéric du Québec parle de son Nouvel An
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Écoute l'enregistrement audio où Frédéric (originaire de Montréal) raconte comment il prépare 
            le réveillon du 31 décembre à Paris. Réponds ensuite au questionnaire d'écoute type DELF !
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
          <a
            href={FREDERIC_RESOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Voir sur Le Point du FLE</span>
          </a>
          <div className="text-center text-xs font-mono text-slate-500">
            {isSubmitted ? `Score : ${currentEarnedPoints} / ${totalPoints} pts` : 'Barème : 25 points'}
          </div>
        </div>
      </div>

      {/* Audio Studio Player Section */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Illustration */}
          <div className="lg:col-span-5 rounded-xl overflow-hidden border border-slate-700/80 aspect-16/9 relative shadow-inner bg-slate-800">
            <img
              src={IMAGES.fredericNouvelAn}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = IMAGES.fallback.frederic;
              }}
              alt="Frédéric et ses amis fêtant le Nouvel An"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-medium text-slate-200">
                Frédéric à Paris pour le 31 décembre
              </span>
            </div>
          </div>

          {/* Right: Audio Control Deck */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Lecteur Audio Interactif
                </span>
              </div>

              {/* Speed Controller */}
              <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 p-1 rounded-lg text-xs">
                <span className="text-slate-400 px-2">Vitesse :</span>
                <button
                  onClick={() => setPlaybackSpeed(0.8)}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    playbackSpeed === 0.8 ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  0.8x (Lente)
                </button>
                <button
                  onClick={() => setPlaybackSpeed(0.95)}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    playbackSpeed === 0.95 ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  1.0x (Normale)
                </button>
              </div>
            </div>

            {/* Play / Pause Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {!isPlayingFull ? (
                <button
                  onClick={handlePlayFull}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Écouter le message complet</span>
                </button>
              ) : (
                <button
                  onClick={handleStopAudio}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-sm transition-all cursor-pointer shadow-sm"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Arrêter la lecture</span>
                </button>
              )}

              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="inline-flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium rounded-xl text-xs transition-colors cursor-pointer"
              >
                {showTranscript ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Masquer la transcription</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Afficher la transcription</span>
                  </>
                )}
              </button>
            </div>

            {/* Progress / Status feedback */}
            <div className="text-xs text-slate-300 flex items-center justify-between pt-2 border-t border-slate-800">
              <span>{isPlayingFull ? '🔊 Lecture en cours... Écoute bien chaque mot !' : 'Prêt pour l\'écoute.'}</span>
              <span>Format audio adapté aux collégiens de 8e FLE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Drawer (Toggleable) */}
      {showTranscript && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Transcription du Message Audio
              </h3>
              <p className="text-xs text-slate-500">
                Clique sur le bouton haut-parleur de chaque phrase pour l'écouter isolément.
              </p>
            </div>
            <span className="text-xs font-mono text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded">
              Aide à la compréhension
            </span>
          </div>

          <div className="space-y-3">
            {FREDERIC_TRANSCRIPT_SEGMENTS.map((seg, idx) => (
              <div
                key={seg.id}
                className={`p-3.5 rounded-xl border transition-colors flex items-start justify-between gap-4 ${
                  activeSegmentIndex === idx
                    ? 'bg-blue-50 border-blue-400 text-slate-950 font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="text-xs font-bold text-blue-700 uppercase">
                    {seg.speaker} (Phrase {idx + 1})
                  </div>
                  <div className="text-sm sm:text-base leading-relaxed">
                    « {seg.french} »
                  </div>
                  <div className="text-xs text-slate-500 italic">
                    Traduction : {seg.translation}
                  </div>
                </div>

                <button
                  onClick={() => handlePlaySingleSegment(idx)}
                  title="Écouter cette phrase"
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-colors shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comprehension Oral Quiz (DELF Style) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Questions de Compréhension Orale (DELF Junior A1/A2)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Réponds aux 6 questions pour tester ce que tu as compris en écoutant Frédéric.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
            Total : 25 points
          </span>
        </div>

        {/* Questions Grid */}
        <div className="space-y-6">
          {FREDERIC_QUESTIONS.map((q, idx) => {
            const currentAnswer = userAnswers[q.id];
            const isCorrect = isSubmitted && currentAnswer === q.correctAnswer;
            const isWrong = isSubmitted && currentAnswer !== q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border transition-colors ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-emerald-50/40 border-emerald-300'
                      : 'bg-rose-50/40 border-rose-300'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      Q{idx + 1}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                      {q.question}
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-500 whitespace-nowrap">
                    {q.points} pts
                  </span>
                </div>

                {/* Radio Options */}
                <div className="space-y-2 pl-7">
                  {q.options?.map((opt) => {
                    let optStyle = 'border-slate-200 hover:bg-white text-slate-700';
                    if (isSubmitted) {
                      if (opt === q.correctAnswer) {
                        optStyle = 'border-emerald-500 bg-emerald-50 font-bold text-emerald-950';
                      } else if (currentAnswer === opt) {
                        optStyle = 'border-rose-400 bg-rose-50 text-rose-950 line-through';
                      }
                    } else if (currentAnswer === opt) {
                      optStyle = 'border-blue-600 bg-blue-50/70 font-semibold text-blue-950';
                    }

                    return (
                      <label
                        key={opt}
                        className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${optStyle}`}
                      >
                        <input
                          type="radio"
                          name={`frederic-q-${q.id}`}
                          value={opt}
                          checked={currentAnswer === opt}
                          onChange={() => handleSelectAnswer(q.id, opt)}
                          disabled={isSubmitted}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Correction details */}
                {isSubmitted && (
                  <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs space-y-1 pl-7">
                    <div className="flex items-center gap-1.5 font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Exact ! (+{q.points} points)
                        </span>
                      ) : (
                        <span className="text-rose-700 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          Réponse attendue : {q.correctAnswer}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600">{q.explanation}</p>
                    {q.justificationQuote && (
                      <div className="text-slate-500 italic bg-white/70 p-2 rounded border border-slate-200">
                        <strong>Ce que Frédéric dit :</strong> « {q.justificationQuote} »
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action button */}
        <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {Object.keys(userAnswers).length} sur {FREDERIC_QUESTIONS.length} questions répondues
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(userAnswers).length === 0}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Valider les réponses audio
            </button>
          ) : (
            <button
              onClick={handleResetQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recommencer le questionnaire</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
