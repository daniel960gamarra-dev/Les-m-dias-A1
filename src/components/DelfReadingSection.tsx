import React, { useState } from 'react';
import { DELF_READING_DATA } from '../data/delfReadingData';
import { speakFrench } from '../utils/speech';
import { CheckCircle2, XCircle, Volume2, Award, RotateCcw, HelpCircle, Eye, Newspaper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { IMAGES } from '../assets';

interface DelfReadingProps {
  onEarnScore: (pts: number) => void;
}

export const DelfReadingSection: React.FC<DelfReadingProps> = ({ onEarnScore }) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [activeVocabWord, setActiveVocabWord] = useState<string | null>(null);

  const handleSelectAnswer = (questionId: number, answer: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let earned = 0;
    DELF_READING_DATA.questions.forEach((q) => {
      const userAns = userAnswers[q.id];
      if (userAns && userAns.toString() === q.correctAnswer.toString()) {
        earned += q.points;
      }
    });
    return earned;
  };

  const totalPoints = DELF_READING_DATA.questions.reduce((sum, q) => sum + q.points, 0);
  const currentEarnedPoints = calculateScore();

  const handleSubmit = () => {
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

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setActiveVocabWord(null);
  };

  const handleListenText = (text: string) => {
    speakFrench(text, 0.85);
  };

  return (
    <div className="space-y-8">
      {/* DELF Junior Masthead Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-blue-700 tracking-wider mb-1">
            <span>Épreuve Officielle d'Entraînement</span>
            <span>·</span>
            <span>DELF Scolaire & Junior A1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif mb-2">
            Compréhension des Écrits : La Presse Scolaire
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Lis attentivement l'article de presse ci-dessous puis réponds aux questions. 
            Tu peux cliquer sur le lexique pour écouter la prononciation et voir la traduction.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex md:flex-col items-center justify-between md:justify-center gap-2 shrink-0 min-w-44 text-center">
          <div className="text-xs text-slate-500 uppercase font-semibold">Note d'épreuve</div>
          <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
            {isSubmitted ? currentEarnedPoints : '—'} <span className="text-sm font-sans text-slate-400">/ {totalPoints} pts</span>
          </div>
          <div className="text-xs text-slate-400">Seuil de réussite : 12.5 / 25</div>
        </div>
      </div>

      {/* Main 2-Column Split: Article on Left / Questionnaire on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The Newspaper Article */}
        <article className="lg:col-span-6 bg-amber-50/30 border border-amber-900/15 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Newspaper Masthead */}
          <div className="border-b-2 border-slate-900 pb-4 text-center">
            <div className="text-xs font-mono font-semibold tracking-widest text-slate-500 uppercase mb-1">
              Collège Saint-Louis · Journal des Élèves
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 uppercase">
              {DELF_READING_DATA.newspaperName}
            </h2>
            <div className="flex items-center justify-between text-xs text-slate-600 mt-2 border-t border-slate-300 pt-1 font-mono">
              <span>{DELF_READING_DATA.issueNumber}</span>
              <span>{DELF_READING_DATA.date}</span>
              <span>Prix : Gratuit</span>
            </div>
          </div>

          {/* Article Cover Image */}
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-4/3 relative">
            <img
              src={IMAGES.newspaperArticleCover}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = IMAGES.fallback.newspaper;
              }}
              alt="Une du journal Le Flash Collège avec les jeunes reporters"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Headline & Lead */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Reportage Exclusif
              </span>
              <button
                onClick={() => handleListenText(DELF_READING_DATA.title)}
                title="Écouter le titre"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {DELF_READING_DATA.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed bg-white border border-slate-200 p-3 rounded-lg">
              {DELF_READING_DATA.editorialLead}
            </p>
          </div>

          {/* Article Sections (columns) */}
          <div className="space-y-6 text-xs sm:text-sm text-slate-800 leading-relaxed">
            {DELF_READING_DATA.sections.map((section, idx) => (
              <div key={idx} className="space-y-2 border-t border-slate-200/80 pt-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                    {section.heading}
                  </h4>
                  <button
                    onClick={() => handleListenText(section.paragraphs.join(' '))}
                    title="Écouter le paragraphe"
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-justify">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Interactive Vocabulary Glossary */}
          <div className="border-t-2 border-slate-300 pt-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
              <Newspaper className="w-4 h-4 text-blue-600" />
              <span>Boîte à Outils Lexique de la Presse (Clique pour explorer)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {DELF_READING_DATA.vocabulary.map((v) => (
                <button
                  key={v.word}
                  onClick={() => {
                    setActiveVocabWord(activeVocabWord === v.word ? null : v.word);
                    handleListenText(v.word);
                  }}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer border ${
                    activeVocabWord === v.word
                      ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {v.word}
                </button>
              ))}
            </div>

            {/* Vocab details card */}
            {activeVocabWord && (
              <div className="bg-white border border-blue-200 rounded-xl p-4 text-xs space-y-1">
                {(() => {
                  const vocab = DELF_READING_DATA.vocabulary.find((v) => v.word === activeVocabWord);
                  if (!vocab) return null;
                  return (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 capitalize text-sm">{vocab.word}</span>
                        <span className="text-slate-400 italic">{vocab.type}</span>
                      </div>
                      <div className="text-blue-700 font-medium">Traduction : {vocab.translation}</div>
                      <p className="text-slate-600">{vocab.definition}</p>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </article>

        {/* Right Column: The DELF Questionnaire */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-2xs">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Questionnaire de Compréhension
                </h3>
                <p className="text-xs text-slate-500">
                  Coche la bonne réponse pour chaque question.
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-500">
                {DELF_READING_DATA.questions.length} questions
              </span>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {DELF_READING_DATA.questions.map((q, idx) => {
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
                              name={`question-${q.id}`}
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

                    {/* Justification and Correction details */}
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
                            <strong>Extrait du texte :</strong> « {q.justificationQuote} »
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Actions Bar */}
            <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                {Object.keys(userAnswers).length} sur {DELF_READING_DATA.questions.length} questions répondues
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={Object.keys(userAnswers).length === 0}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Valider et Corriger l'épreuve
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Recommencer l'épreuve</span>
                  </button>
                )}
              </div>
            </div>

            {/* Final Grade Card */}
            {isSubmitted && (
              <div
                className={`p-5 rounded-xl border text-center space-y-2 ${
                  currentEarnedPoints >= 15
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}
              >
                <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-white shadow-xs">
                  <Award className={`w-6 h-6 ${currentEarnedPoints >= 15 ? 'text-emerald-600' : 'text-amber-600'}`} />
                </div>
                <h4 className="font-serif text-xl font-bold">
                  {currentEarnedPoints >= 15 ? 'Épreuve Validée avec Succès !' : 'Continue tes efforts !'}
                </h4>
                <p className="text-xs sm:text-sm max-w-md mx-auto">
                  Tu as obtenu <strong>{currentEarnedPoints} / {totalPoints} points</strong>. 
                  {currentEarnedPoints >= 20
                    ? ' Mention Très Bien ! Tu lis les articles en français avec une excellente précision !'
                    : currentEarnedPoints >= 15
                    ? ' Bon travail ! Tu as acquis les bases de la lecture journalistique en français.'
                    : ' Révise le vocabulaire et les citations avant de retenter ta chance.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
