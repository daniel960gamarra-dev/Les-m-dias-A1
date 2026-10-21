import React, { useState } from 'react';
import { VERBS_DATA, FLASH_INFO_QUIZ } from '../data/grammarData';
import { speakFrench } from '../utils/speech';
import { Volume2, CheckCircle2, XCircle, RotateCcw, Lightbulb, Play, ArrowRight, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GrammarNewsroomProps {
  onEarnScore: (pts: number) => void;
}

export const GrammarNewsroom: React.FC<GrammarNewsroomProps> = ({ onEarnScore }) => {
  const [selectedVerbId, setSelectedVerbId] = useState<string>('parler');
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState<number>(0);
  
  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const activeVerb = VERBS_DATA.find((v) => v.id === selectedVerbId) || VERBS_DATA[0];
  const activeConjugation = activeVerb.conjugations[selectedSubjectIndex];

  const handlePronounce = (text: string) => {
    speakFrench(text, 0.85);
  };

  const currentQuiz = FLASH_INFO_QUIZ[currentQuizIndex];

  const handleSelectOption = (option: string) => {
    if (hasAnswered) return;
    setSelectedAnswer(option);
    setHasAnswered(true);

    const isCorrect = option === currentQuiz.correctAnswer;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      onEarnScore(10);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // confetti fallback
      }
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < FLASH_INFO_QUIZ.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="space-y-12">
      {/* Intro Editorial Banner */}
      <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 tracking-wider uppercase mb-2">
            <span>Salle de Rédaction FLE</span>
            <span>·</span>
            <span>Niveau 8e Collège (A1)</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 text-balance">
            La Grammaire des Jeunes Journalistes
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Pour écrire dans <span className="font-semibold text-amber-300">Le Flash Collège</span>, un reporter doit maîtriser trois piliers : 
            les verbes réguliers du <strong className="text-white">1er groupe (-ER)</strong>, le verbe <strong className="text-white">ÊTRE</strong> (pour ton identité) 
            et le verbe <strong className="text-white">AVOIR</strong> (pour ton matériel et ton âge).
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedVerbId('parler')}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Verbes en -ER (1er groupe)
            </button>
            <button
              onClick={() => setSelectedVerbId('etre')}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors"
            >
              Verbe ÊTRE
            </button>
            <button
              onClick={() => setSelectedVerbId('avoir')}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors"
            >
              Verbe AVOIR
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: Interactive Conjugation Laboratory */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              01. Le Laboratoire de Conjugaison
            </h2>
            <p className="text-sm text-slate-600">
              Sélectionne un verbe de la presse et clique sur un pronom pour écouter la prononciation.
            </p>
          </div>

          {/* Verb Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-xl max-w-full">
            {VERBS_DATA.map((verb) => (
              <button
                key={verb.id}
                onClick={() => {
                  setSelectedVerbId(verb.id);
                  setSelectedSubjectIndex(0);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedVerbId === verb.id
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {verb.name}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Split: Active Verb Stage & Full Conjugation Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Interactive Stage */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-mono uppercase font-semibold text-blue-600">
                  {activeVerb.group === '1er_groupe' ? 'Verbe du 1er groupe (-er)' : 'Verbe irrégulier indispensable'}
                </span>
                <span>{activeVerb.meaning}</span>
              </div>

              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-3xl font-bold text-slate-900 uppercase font-serif tracking-tight">
                  {activeVerb.infinitive}
                </h3>
                <button
                  onClick={() => handlePronounce(activeVerb.infinitive)}
                  title="Écouter l'infinitif"
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg p-3 mb-6">
                <strong>Rôle presse :</strong> {activeVerb.pressRole}
              </p>

              {/* Pronoun Selector Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {activeVerb.conjugations.map((conj, idx) => (
                  <button
                    key={conj.subject}
                    onClick={() => {
                      setSelectedSubjectIndex(idx);
                      handlePronounce(conj.full);
                    }}
                    className={`p-2.5 text-xs font-semibold rounded-lg text-center transition-all cursor-pointer ${
                      selectedSubjectIndex === idx
                        ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {conj.subject}
                  </button>
                ))}
              </div>

              {/* Focus Display Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/70 rounded-xl p-5 text-center mb-6">
                <div className="text-xs uppercase tracking-wider text-blue-600 font-semibold mb-1">
                  Forme au présent
                </div>
                <div className="text-3xl font-extrabold text-slate-900 mb-2 font-serif">
                  {activeVerb.group === '1er_groupe' ? (
                    <span>
                      <span className="text-slate-800">{activeConjugation.subject} </span>
                      <span className="text-slate-900">{activeConjugation.stem}</span>
                      <span className="text-blue-600 underline decoration-blue-400 decoration-2 underline-offset-4">
                        {activeConjugation.ending}
                      </span>
                    </span>
                  ) : (
                    <span>{activeConjugation.full}</span>
                  )}
                </div>
                <div className="text-xs text-slate-500 italic mb-3">
                  « {activeConjugation.translation} »
                </div>

                <button
                  onClick={() => handlePronounce(activeConjugation.full)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 shadow-2xs transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Écouter la prononciation</span>
                </button>
              </div>
            </div>

            {/* Journalist Example Context */}
            <div className="border-t border-slate-100 pt-4">
              <div className="text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span>Exemple dans le journal :</span>
                <button
                  onClick={() => handlePronounce(activeConjugation.pressExample)}
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                  title="Écouter l'exemple"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-600 italic bg-amber-50/70 border border-amber-200/60 rounded-lg p-3">
                « {activeConjugation.pressExample} »
              </p>
            </div>
          </div>

          {/* Right Column: Full Reference Table & Rule Cards */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            {/* Rule Callout */}
            <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-950 space-y-1.5">
                  <div className="font-bold text-amber-900">
                    {activeVerb.group === '1er_groupe'
                      ? 'L\'Astuce magique du 1er groupe (-ER) :'
                      : activeVerb.id === 'etre'
                      ? 'Règle d\'or pour le verbe ÊTRE :'
                      : 'Règle d\'or pour le verbe AVOIR :'}
                  </div>
                  {activeVerb.group === '1er_groupe' ? (
                    <p className="leading-relaxed">
                      On enlève la terminaison <strong>-er</strong> pour trouver le radical, puis on ajoute les terminaisons : 
                      <span className="font-mono font-bold text-blue-800"> -e, -es, -e, -ons, -ez, -ent</span>.
                      <br />
                      <strong className="text-amber-900">Attention à l'oral :</strong> Les terminaisons <em>-e</em>, <em>-es</em> et <em>-ent</em> sont <strong>silencieuses</strong> ! (Je parle = Tu parles = Il parle = Ils parlent se prononcent pareil).
                    </p>
                  ) : activeVerb.id === 'etre' ? (
                    <p className="leading-relaxed">
                      Le verbe <strong>être</strong> est irrégulier mais essentiel. On l'utilise pour se présenter : 
                      <em> « Je suis élève »</em>, <em> « Nous sommes journalistes »</em>, ou pour décrire une situation : 
                      <em> « Il est en direct »</em>.
                    </p>
                  ) : (
                    <p className="leading-relaxed">
                      En français, on utilise <strong>AVOIR</strong> pour donner son âge (<em>« J'ai 13 ans »</em>, JAMAIS « je suis 13 ans » !) 
                      et pour indiquer ce que l'on possède (<em>« J'ai un micro et un carnet »</em>).
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Conjugation Grid */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                <span>Pronom sujet</span>
                <span>Conjugaison complète</span>
                <span>Action</span>
              </div>
              <div className="divide-y divide-slate-100">
                {activeVerb.conjugations.map((conj, idx) => (
                  <div
                    key={conj.subject}
                    className={`px-4 py-3 flex items-center justify-between text-sm transition-colors ${
                      selectedSubjectIndex === idx ? 'bg-blue-50/70 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-medium text-slate-700 w-28">{conj.subject}</span>
                    <span className="text-slate-900 flex-1">
                      {activeVerb.group === '1er_groupe' ? (
                        <span>
                          {conj.stem}
                          <strong className="text-blue-600">{conj.ending}</strong>
                        </span>
                      ) : (
                        <strong>{conj.full}</strong>
                      )}
                      <span className="text-xs text-slate-400 font-normal ml-3 hidden sm:inline">
                        ({conj.translation})
                      </span>
                    </span>
                    <button
                      onClick={() => {
                        setSelectedSubjectIndex(idx);
                        handlePronounce(conj.full);
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-100/60 rounded-md transition-colors"
                      title="Écouter"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Flash Info Quiz (Newsroom Speed Challenge) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              Jeu d'entraînement interactif
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              02. Le Flash Info Express
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Complète les dépêches de presse avec la bonne terminaison ou le bon verbe. (+10 XP par bonne réponse !)
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-600 shrink-0">
            <span>Question {currentQuizIndex + 1} / {FLASH_INFO_QUIZ.length}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md">
              Score : {quizScore} / {FLASH_INFO_QUIZ.length}
            </span>
          </div>
        </div>

        {!isQuizCompleted ? (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Context Badge */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Dépêche :</span>
              <span>{currentQuiz.context}</span>
              <span>·</span>
              <span className="italic">Verbe ciblé : {currentQuiz.verbInfinitive.toUpperCase()}</span>
            </div>

            {/* Prompt sentence */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
              <div className="text-lg sm:text-xl font-medium text-slate-800 leading-relaxed mb-3">
                « {currentQuiz.sentenceBefore}{' '}
                <span className="inline-block px-3 py-1 font-bold text-blue-700 border-b-2 border-blue-600 bg-white rounded-sm min-w-24 text-center">
                  {selectedAnswer || '.......'}
                </span>{' '}
                {currentQuiz.sentenceAfter} »
              </div>
              <button
                onClick={() => handlePronounce(`${currentQuiz.sentenceBefore} ${currentQuiz.correctAnswer} ${currentQuiz.sentenceAfter}`)}
                className="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-800 font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Écouter la phrase complète</span>
              </button>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-3">
              {currentQuiz.options.map((opt) => {
                let btnStyle = 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200';
                if (hasAnswered) {
                  if (opt === currentQuiz.correctAnswer) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (opt === selectedAnswer) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                  } else {
                    btnStyle = 'bg-slate-50 text-slate-400 border-slate-100 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    disabled={hasAnswered}
                    className={`py-3.5 px-4 text-center text-base font-semibold border rounded-xl transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation card upon answering */}
            {hasAnswered && (
              <div
                className={`p-4 rounded-xl text-xs sm:text-sm border ${
                  selectedAnswer === currentQuiz.correctAnswer
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {selectedAnswer === currentQuiz.correctAnswer ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="font-bold">
                      {selectedAnswer === currentQuiz.correctAnswer
                        ? 'Bravo ! C\'est la bonne réponse.'
                        : `Oups ! La bonne réponse était : ${currentQuiz.correctAnswer}.`}
                    </div>
                    <p className="leading-relaxed">{currentQuiz.explanation}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleNextQuiz}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Question suivante</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Completed Screen */
          <div className="max-w-md mx-auto text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-serif">
              Défi Flash Info Terminé !
            </h3>
            <p className="text-sm text-slate-600">
              Tu as obtenu un score de <strong className="text-blue-700">{quizScore} / {FLASH_INFO_QUIZ.length}</strong>.
              {quizScore >= 8
                ? ' Félicitations ! Tu es prêt(e) pour intégrer la rédaction du journal !'
                : ' Continue à t\'entraîner pour mémoriser toutes les terminaisons.'}
            </p>
            <div className="pt-2">
              <button
                onClick={handleRestartQuiz}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Recommencer le défi</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
