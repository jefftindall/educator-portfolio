import type { CvEntry } from './cv';

export const actionResearchCycles = [
  {
    years: '2024–25',
    question: 'How can social emotional learning help every student feel valued, whatever their training?',
    body: 'Students with studio training were taking over choreography projects while others felt they did not belong. I tested Pair/Think/Create peer teaching and set group roles so every student had a real part to play.',
  },
  {
    years: '2025–26',
    question: 'Second cycle',
    body: 'My second action-research cycle is under way this school year.',
  },
] as const;

/** Newest first by start year. */
export const professionalLearning: readonly CvEntry[] = [
  {
    title: 'National Conference Presenter, “Dance for Every Body”',
    organization: 'National Dance Education Organization',
    dates: '2025',
  },
  {
    title: 'Connected Arts Network national PLC',
    organization: 'National Dance Education Organization',
    dates: '2024–present',
    details: 'Two cycles of action research on my own teaching.',
  },
  {
    title: 'Kinesiology for dance educators (OPDI 110)',
    organization: 'NDEO Online Professional Development Institute',
    dates: '2018',
  },
  {
    title: 'Leadership Bartow',
    dates: '2018',
  },
  {
    title: 'National Conference',
    organization: 'National Dance Education Organization',
    dates: '2017',
  },
  {
    title: 'Member since 2003',
    organization: 'National Dance Education Organization',
    dates: '2003–present',
  },
];

export const otherTraining = [
  'Bartow County Schools Aspiring Leaders program',
  'Cobb County School District Leadership Academy and Teacher Leader Institute',
  'Gholdy Muhammad’s five pursuits: identity, skills, intellect, criticality, and joy',
  'Liz Lerman’s Critical Response Process',
] as const;
