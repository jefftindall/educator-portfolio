export const ndeoSessionTitle = 'Dance for Every Body: Dance for All Abilities';

/** NDEO 2025 slide deck, served from public/. */
export const presentationPdf = '/media/docs/dance-for-every-body-ndeo-2025.pdf';

export const ndeoSessionDescription =
  'Inclusive dance in a public-school setting: practical strategies for teaching the same standards to general and special education students in one room, with stories from Woodland High School and Karina’s Class.';

export const inclusiveStrategies = [
  {
    title: 'Accommodate the student, not the diagnosis',
    body:
      'Eric could not tolerate clapping because of sensory needs tied to a childhood injury. Instead of removing him from class rituals, we moved from snaps to golf claps to choreography that built clapping in gradually. By semester’s end he clapped on stage and attended professional performances with his classmates.',
  },
  {
    title: 'Use the people already around the student',
    body:
      'Danika’s Learning Ladder goals included fist bumps instead of hugs. I coordinated with her other teachers so dance class reinforced the same expectations she heard everywhere else, and she got one consistent message all day.',
  },
  {
    title: 'Embrace social emotional learning',
    body:
      'Students with prior studio training were taking over choreography projects while others felt they did not belong. Through Connected Arts Network action research, I asked how SEL practices could help every student feel valued regardless of training. Pair/Think/Create peer teaching and structured group roles gave every student a real part to play.',
  },
] as const;

export const learningLadderRungs = [
  'Enter and dress out',
  'Personal items',
  'Find your space',
  'Warm-up',
  'Spatial awareness',
  'Relational awareness',
  'Reverence',
  'Respect the space',
] as const;

export const inclusiveBenefits = {
  studentsWithDisabilities:
    'Access to grade-level standards, peer relationships, and performance experiences that build confidence and communication.',
  generalEducationStudents:
    'Empathy, collaboration, and leadership as they learn alongside classmates with different strengths and needs.',
  teachers:
    'A repeatable model for high expectations with flexible instruction - assessment focused on individual progress, not comparison.',
  specialEducationStaff:
    'A dance teacher who invites paras and therapists into the studio, lines up goals across settings, and celebrates with them at concerts.',
} as const;
