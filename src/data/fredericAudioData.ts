import { AudioSegment, DelfQuestion } from '../types';

export const FREDERIC_RESOURCE_URL = 'https://www.lepointdufle.net/ressources_fle/audio_frederic-nouvel-an.htm';

export const FREDERIC_TRANSCRIPT_SEGMENTS: AudioSegment[] = [
  {
    id: 1,
    speaker: 'Frédéric',
    french: 'Bonjour ! Bon, moi je m\'appelle Frédéric et je viens de Montréal au Québec.',
    translation: 'Hello! Well, my name is Frédéric and I come from Montreal in Quebec.',
    highlightWords: ['je m\'appelle', 'je viens de', 'Montréal'],
  },
  {
    id: 2,
    speaker: 'Frédéric',
    french: 'Je suis actuellement à Paris pour fêter le Nouvel An avec des amis français.',
    translation: 'I am currently in Paris to celebrate the New Year with French friends.',
    highlightWords: ['Je suis', 'à Paris', 'fêter', 'le Nouvel An'],
  },
  {
    id: 3,
    speaker: 'Frédéric',
    french: 'Là, je suis au supermarché en train de faire les courses pour notre repas de fête.',
    translation: 'Right now, I am at the supermarket doing the groceries for our festive meal.',
    highlightWords: ['je suis', 'au supermarché', 'faire les courses'],
  },
  {
    id: 4,
    speaker: 'Frédéric',
    french: 'Pour le réveillon du 31 décembre, nous préparons un délicieux bœuf Wellington et nous avons une bonne bouteille de champagne !',
    translation: 'For New Year\'s Eve on December 31st, we are preparing a delicious beef Wellington and we have a good bottle of champagne!',
    highlightWords: ['nous préparons', 'nous avons', 'bœuf Wellington', 'champagne'],
  },
  {
    id: 5,
    speaker: 'Frédéric',
    french: 'À minuit pile, nous crions tous « Bonne Année ! », nous trinquons et nous nous embrassons sous le gui.',
    translation: 'At midnight sharp, we all shout "Happy New Year!", we toast and we kiss under the mistletoe.',
    highlightWords: ['À minuit', 'Bonne Année', 'nous trinquons'],
  },
  {
    id: 6,
    speaker: 'Frédéric',
    french: 'Et pour la nouvelle année, mes bonnes résolutions sont simples : faire plus de sport, manger mieux et voyager beaucoup !',
    translation: 'And for the new year, my good resolutions are simple: do more sports, eat better and travel a lot!',
    highlightWords: ['résolutions', 'sport', 'manger mieux', 'voyager'],
  },
];

export const FREDERIC_QUESTIONS: DelfQuestion[] = [
  {
    id: 1,
    type: 'qcm',
    question: 'D\'où vient Frédéric ?',
    options: ['De Paris en France', 'De Montréal au Québec (Canada)', 'De Bruxelles en Belgique'],
    correctAnswer: 'De Montréal au Québec (Canada)',
    points: 4,
    explanation: 'Frédéric dit clairement dans sa présentation : « moi je m\'appelle Frédéric et je viens de Montréal au Québec ».',
    justificationQuote: 'moi je m\'appelle Frédéric et je viens de Montréal au Québec.',
  },
  {
    id: 2,
    type: 'qcm',
    question: 'Pourquoi Frédéric est-il actuellement en France ?',
    options: [
      'Pour passer un examen de médecine',
      'Pour acheter une voiture',
      'Pour fêter le Nouvel An avec des amis français',
    ],
    correctAnswer: 'Pour fêter le Nouvel An avec des amis français',
    points: 4,
    explanation: 'Il explique qu\'il est à Paris avec ses amis français pour célébrer le Nouvel An.',
    justificationQuote: 'Je suis actuellement à Paris pour fêter le Nouvel An avec des amis français.',
  },
  {
    id: 3,
    type: 'qcm',
    question: 'Où se trouve Frédéric au moment où il enregistre ce message ?',
    options: ['Dans un supermarché', 'Au sommet de la Tour Eiffel', 'Dans une salle de cinéma'],
    correctAnswer: 'Dans un supermarché',
    points: 4,
    explanation: 'Il précise : « Là, je suis au supermarché en train de faire les courses pour notre repas de fête ».',
    justificationQuote: 'Là, je suis au supermarché en train de faire les courses...',
  },
  {
    id: 4,
    type: 'qcm',
    question: 'Quel est le plat principal prévu pour le réveillon de la Saint-Sylvestre ?',
    options: ['Des pizzas surgelées', 'Un bœuf Wellington', 'Une soupe aux légumes verts'],
    correctAnswer: 'Un bœuf Wellington',
    points: 4,
    explanation: 'Frédéric prépare avec ses amis un délicieux bœuf Wellington accompagné de champagne.',
    justificationQuote: 'nous préparons un délicieux bœuf Wellington et nous avons une bonne bouteille de champagne !',
  },
  {
    id: 5,
    type: 'vrai-faux',
    question: 'VRAI ou FAUX : À minuit pile, la tradition est de crier « Bonne Année ! » et de trinquer.',
    options: ['VRAI', 'FAUX'],
    correctAnswer: 'VRAI',
    points: 4,
    explanation: 'C\'est la tradition française du réveillon : « À minuit pile, nous crions tous "Bonne Année !", nous trinquons et nous nous embrassons ».',
    justificationQuote: 'À minuit pile, nous crions tous « Bonne Année ! », nous trinquons...',
  },
  {
    id: 6,
    type: 'qcm',
    question: 'Quelles sont les bonnes résolutions de Frédéric pour la nouvelle année ?',
    options: [
      'Dormir 14 heures par jour et manger des bonbons',
      'Faire plus de sport, manger mieux et voyager',
      'Arrêter d\'apprendre les langues étrangères',
    ],
    correctAnswer: 'Faire plus de sport, manger mieux et voyager',
    points: 5,
    explanation: 'Ses résolutions pour la nouvelle année sont de faire plus d\'exercice physique, de manger plus sainement et de continuer à voyager.',
    justificationQuote: 'mes bonnes résolutions sont simples : faire plus de sport, manger mieux et voyager beaucoup !',
  },
];
