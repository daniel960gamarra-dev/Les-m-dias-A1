import React, { useState, useMemo } from 'react';
import { speakFrench } from '../utils/speech';
import {
  IdCard,
  Volume2,
  CheckCircle,
  Sparkles,
  Printer,
  Copy,
  Check,
  Camera,
  RefreshCw,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { IMAGES } from '../assets';

interface PressBadgeBuilderProps {
  onEarnScore: (pts: number) => void;
}

export const PressBadgeBuilder: React.FC<PressBadgeBuilderProps> = ({ onEarnScore }) => {
  const [firstName, setFirstName] = useState<string>('Alex');
  const [lastName, setLastName] = useState<string>('Martin');
  const [nickname, setNickname] = useState<string>('Scoop');
  const [age, setAge] = useState<number>(13);
  const [role, setRole] = useState<string>('Reporter d\'investigation');
  const [equipment, setEquipment] = useState<string[]>([
    'un micro',
    'un carnet de notes',
    'un appareil photo',
  ]);
  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    IMAGES.reporterBadgePhoto
  );
  const [copied, setCopied] = useState<boolean>(false);

  // Free-form presentation text initialized with a strong A1 model sentence
  const [presentationText, setPresentationText] = useState<string>(
    "Bonjour ! Je m'appelle Alex. J'ai 13 ans et je suis élève en 8e année. À la rédaction, je suis reporter. J'ai un micro et un carnet noir. J'aime observer la vie du collège. J'écoute les élèves et je parle avec les professeurs. Je publie des articles pour informer tout le monde !"
  );

  // Verbs analyzer
  const analysis = useMemo(() => {
    const text = presentationText.toLowerCase();

    // Verbe être forms
    const etreRegex = /\b(suis|es|est|sommes|êtes|sont)\b/gi;
    const etreMatches = presentationText.match(etreRegex) || [];

    // Verbe avoir forms
    const avoirRegex = /\b(ai|as|a|avons|avez|ont)\b/gi;
    const avoirMatches = presentationText.match(avoirRegex) || [];

    // Common 1er groupe present forms (-e, -es, -ons, -ez, -ent)
    const erRegex = /\b(parle|parles|parlons|parlez|parlent|écoute|écoutes|écoutons|écoutez|écoutent|regarde|regardes|regardons|regardez|regardent|aime|aimes|aimons|aimez|aiment|publie|publies|publions|publiez|publient|interviewe|interviewes|interviewons|interviewez|interviewent|cherche|cherches|cherchons|cherchez|cherchent|pose|poses|posons|posez|posent|adore|adores|adorons|adorez|adorent|joue|joues|jouons|jouez|jouent)\b/gi;
    const erMatches = presentationText.match(erRegex) || [];

    const hasEtre = etreMatches.length > 0;
    const hasAvoir = avoirMatches.length > 0;
    const hasEr = erMatches.length >= 2;

    return {
      hasEtre,
      etreCount: etreMatches.length,
      hasAvoir,
      avoirCount: avoirMatches.length,
      hasEr,
      erCount: erMatches.length,
      isComplete: hasEtre && hasAvoir && hasEr,
    };
  }, [presentationText]);

  const handleValidateBadge = () => {
    onEarnScore(30);
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const handleListenBio = () => {
    speakFrench(presentationText, 0.85);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(presentationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsertPhrase = (phrase: string) => {
    setPresentationText((prev) => (prev ? `${prev} ${phrase}` : phrase));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Editorial Mission Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-blue-700 tracking-wider mb-1">
            <span>Atelier de Production Écrite</span>
            <span>·</span>
            <span>Présentation Personnelle FLE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif mb-2">
            Ma Carte de Presse Officielle & Mon Portrait
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Crée ta carte de reporter pour le journal du collège ! Écris ton autoportrait en utilisant le verbe{' '}
            <strong className="text-blue-700">ÊTRE</strong> (qui tu es), le verbe{' '}
            <strong className="text-emerald-700">AVOIR</strong> (ton âge et ton matériel) et les{' '}
            <strong className="text-amber-700">verbes en -ER</strong> (tes actions de journaliste).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleValidateBadge}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Valider ma carte (+30 XP)</span>
          </button>
        </div>
      </div>

      {/* 2-Column Split: Writing Sandbox on Left / Live Badge Credential on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Verbs Coach */}
        <div className="lg:col-span-7 space-y-6">
          {/* Identity Quick Fields */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
            <h2 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              1. Informations du Reporter
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Surnom de Presse
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Âge (avec verbe AVOIR : J'ai ... ans)
                </label>
                <input
                  type="number"
                  min={11}
                  max={16}
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 13)}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rôle dans le journal
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                  <option value="Reporter d'investigation">Reporter d'investigation</option>
                  <option value="Photographe de presse">Photographe de presse</option>
                  <option value="Rédacteur / Rédactrice en chef">Rédacteur / Rédactrice en chef</option>
                  <option value="Chroniqueur / Chroniqueuse Sport">Chroniqueur Sport</option>
                  <option value="Animateur / Animatrice Radio FLE">Animateur Radio FLE</option>
                </select>
              </div>
            </div>
          </div>

          {/* Text Editor with Live Verb Coach */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h2 className="font-serif text-lg font-bold text-slate-900">
                  2. Ton Autoportrait Rédigé
                </h2>
                <p className="text-xs text-slate-500">
                  Écris 4 à 6 phrases complètes en français.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleListenBio}
                  title="Écouter mon texte"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Écouter</span>
                </button>
                <button
                  onClick={handleCopyText}
                  title="Copier le texte"
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Textarea */}
            <div>
              <textarea
                rows={5}
                value={presentationText}
                onChange={(e) => setPresentationText(e.target.value)}
                placeholder="Bonjour ! Je m'appelle... J'ai 13 ans... Je suis élève... J'ai un micro... J'écoute... Je regarde... Je parle..."
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed font-sans"
              />
            </div>

            {/* Beginner Quick Phrases Helper (Click to insert) */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-600">
                Idées de phrases prêtes à l'emploi (Clique pour ajouter) :
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  onClick={() => handleInsertPhrase("Je suis curieux et passionné par les actualités.")}
                  className="px-2 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  + Je suis curieux... (Être)
                </button>
                <button
                  onClick={() => handleInsertPhrase("J'ai un carnet pour noter les scoops.")}
                  className="px-2 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  + J'ai un carnet... (Avoir)
                </button>
                <button
                  onClick={() => handleInsertPhrase("J'écoute les avis de mes camarades.")}
                  className="px-2 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  + J'écoute les avis... (-ER)
                </button>
                <button
                  onClick={() => handleInsertPhrase("Je regarde les photos de la fête.")}
                  className="px-2 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  + Je regarde les photos... (-ER)
                </button>
              </div>
            </div>

            {/* Grammar Coach Live Checklist */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
              <div className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center justify-between">
                <span>Le Coach Grammaire de la Rédaction</span>
                <span className="font-mono text-slate-500">
                  {analysis.isComplete ? 'Objectif Atteint !' : 'En cours...'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {/* ÊTRE check */}
                <div
                  className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                    analysis.hasEtre
                      ? 'bg-blue-50/80 border-blue-300 text-blue-900 font-semibold'
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  <CheckCircle className={`w-4 h-4 ${analysis.hasEtre ? 'text-blue-600' : 'text-slate-300'}`} />
                  <div>
                    <div>Verbe ÊTRE</div>
                    <div className="text-xs text-slate-400 font-normal">
                      {analysis.etreCount} trouvé(s)
                    </div>
                  </div>
                </div>

                {/* AVOIR check */}
                <div
                  className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                    analysis.hasAvoir
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 font-semibold'
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  <CheckCircle className={`w-4 h-4 ${analysis.hasAvoir ? 'text-emerald-600' : 'text-slate-300'}`} />
                  <div>
                    <div>Verbe AVOIR</div>
                    <div className="text-xs text-slate-400 font-normal">
                      {analysis.avoirCount} trouvé(s)
                    </div>
                  </div>
                </div>

                {/* 1er GROUPE check */}
                <div
                  className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                    analysis.hasEr
                      ? 'bg-amber-50/80 border-amber-300 text-amber-900 font-semibold'
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  <CheckCircle className={`w-4 h-4 ${analysis.hasEr ? 'text-amber-600' : 'text-slate-300'}`} />
                  <div>
                    <div>Verbes en -ER (min. 2)</div>
                    <div className="text-xs text-slate-400 font-normal">
                      {analysis.erCount} trouvé(s)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Printable Press Badge Credential */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Aperçu en temps réel de ton badge
            </span>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Imprimer mon badge</span>
            </button>
          </div>

          {/* The Physical Card Design */}
          <div className="bg-white border-2 border-slate-800 rounded-2xl overflow-hidden shadow-md max-w-sm mx-auto text-slate-900 font-sans print:shadow-none print:border-black">
            {/* Lanyard Clip Hole */}
            <div className="bg-slate-100 border-b border-slate-200 py-2 flex justify-center">
              <div className="w-12 h-2.5 bg-slate-300 rounded-full border border-slate-400"></div>
            </div>

            {/* Card Header Strip */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white px-5 py-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] tracking-widest uppercase font-mono text-blue-200">
                  RÉPUBLIQUE DU COLLÈGE
                </div>
                <div className="text-base font-bold font-serif tracking-tight">
                  CARTE DE PRESSE SCOLAIRE
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs border border-white/40">
                8e
              </div>
            </div>

            {/* Photo & Identity Section */}
            <div className="p-5 space-y-4">
              <div className="flex gap-4 items-center">
                {/* Photo Frame */}
                <div className="w-24 h-28 rounded-xl border-2 border-slate-800 overflow-hidden shrink-0 bg-slate-100 shadow-xs relative">
                  <img
                    src={selectedAvatar}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = IMAGES.fallback.reporter;
                    }}
                    alt="Photo du reporter"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[8px] text-white text-center py-0.5 uppercase tracking-wider font-mono">
                    PRESSE 2026
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1 text-xs">
                  <div className="text-[10px] uppercase font-mono text-slate-400">Reporter Titulaire</div>
                  <div className="text-base font-bold text-slate-950 font-serif leading-tight">
                    {firstName || 'Prénom'} {lastName || 'Nom'}
                  </div>
                  <div className="text-xs text-blue-700 font-semibold italic">
                    « {nickname || 'Scoop'} »
                  </div>
                  <div className="text-slate-600 text-[11px] pt-1">
                    <strong>Âge :</strong> {age} ans
                  </div>
                  <div className="text-slate-600 text-[11px]">
                    <strong>Statut :</strong> Élève de 8e
                  </div>
                  <div className="text-slate-700 font-medium text-[11px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block">
                    {role}
                  </div>
                </div>
              </div>

              {/* Bio snippet on card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs leading-relaxed text-slate-800 font-sans">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">
                  Déclaration du journaliste :
                </div>
                <p className="line-clamp-4 italic text-slate-700">
                  « {presentationText} »
                </p>
              </div>

              {/* Barcode & Official Stamp */}
              <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-mono text-[9px] text-slate-400 tracking-widest uppercase">
                    ID-PRESSE-8E-2026-FR
                  </div>
                  <div className="font-mono text-lg tracking-tighter text-slate-800 select-none">
                    |||||||||||||||||||||||||||||
                  </div>
                </div>

                {/* Stamp */}
                <div className="border-2 border-emerald-600 text-emerald-700 font-serif font-black text-[9px] uppercase px-2 py-1 rounded rotate-[-6deg] tracking-wider text-center">
                  VALIDÉ PAR LA
                  <br />
                  RÉDACTION
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
