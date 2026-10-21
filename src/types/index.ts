export type NavigationTab = 'grammar' | 'delf-reading' | 'audio-frederic' | 'press-badge' | 'mini-games';

export interface VerbConjugation {
  subject: string;
  stem: string;
  ending: string;
  full: string;
  translation: string;
  pressExample: string;
}

export interface VerbModel {
  id: string;
  name: string;
  infinitive: string;
  group: '1er_groupe' | 'etre' | 'avoir';
  meaning: string;
  pressRole: string;
  conjugations: VerbConjugation[];
}

export interface QuizQuestion {
  id: string;
  category: '1er_groupe' | 'etre' | 'avoir';
  prompt: string;
  sentenceBefore: string;
  sentenceAfter: string;
  options: string[];
  correctAnswer: string;
  verbInfinitive: string;
  explanation: string;
  context: string;
}

export interface DelfQuestion {
  id: number;
  type: 'qcm' | 'vrai-faux' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
  points: number;
  explanation: string;
  justificationQuote?: string;
}

export interface DelfArticle {
  title: string;
  newspaperName: string;
  issueNumber: string;
  date: string;
  editorialLead: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  vocabulary: {
    word: string;
    type: string;
    translation: string;
    definition: string;
  }[];
  questions: DelfQuestion[];
}

export interface AudioSegment {
  id: number;
  speaker: string;
  french: string;
  translation: string;
  highlightWords?: string[];
}

export interface JournalistProfile {
  firstName: string;
  lastName: string;
  pressNickname: string;
  age: number;
  grade: string;
  schoolName: string;
  role: string;
  qualities: string[];
  equipment: string[];
  interests: string[];
  favoriteActivity: string;
  presentationText: string;
  avatarType: string;
}

export interface MediaVocabItem {
  id: string;
  word: string;
  gender: 'masculin' | 'féminin';
  frenchArticle: string;
  translation: string;
  exampleSentence: string;
  iconName: string;
}
