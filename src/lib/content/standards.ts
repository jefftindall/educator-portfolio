export const artisticProcesses: readonly {
  process: string;
  classroom: string | readonly string[];
  artifact: string;
}[] = [
  {
    process: 'Creating',
    classroom:
      'Mixed-ability groups each choreograph a section of a song; sections are stitched into one class dance for the concert. Every student contributes and explains their artistic choices.',
    artifact: 'Student-choreographed class dances performed at concerts',
  },
  {
    process: 'Performing',
    classroom: [
      'The advanced dance class performs a minimum of five dances each semester: ballet, jazz, contemporary, musical theater, and choreography project.',
      'The intermediate class performs a minimum of three dances each semester: ballet, jazz, and choreography project.',
      'The beginning class performs two to three dances each semester: one or two jazz dances, and one choreography project.',
    ],
    artifact: 'Winter and spring concert programs',
  },
  {
    process: 'Responding',
    classroom:
      'Self- and peer-assessment rubrics, end-of-semester reflections, Critical Response Process, and field trips to professional performances including Alvin Ailey American Dance Theater and Kennesaw State University Dance Department performances.',
    artifact: 'Course syllabi and Connected Arts Network action research',
  },
  {
    process: 'Connecting',
    classroom:
      'SEL competencies in improvisation and group work; kinesiology and injury prevention; cultural and social dance units that connect technique to community and history.',
    artifact: 'Dance I–IV course design, informed by NDEO conferences',
  },
];

export const standardsWriting =
  'Member, Georgia Department of Education Power Standards Writing Committee for Dance Education (2005). I wrote the power standards for dance. I teach daily to the Georgia Standards of Excellence and design Dance I–IV with sequenced objectives, 80% summative and 20% supportive grading, and self- and peer-assessment rubrics.';

export const assessmentPhilosophy =
  'I assess individual progress, not comparison between students. That lens keeps grade-band standards honest: every learner should show growth against the same expectations, with instruction adapted to how they learn best. I refine my teaching in research cycles: I reflect, try a change, assess what students show me, and revise. Student assessment data guides each revision to my curriculum.';

export const whyServe =
  'I have spent more than 30 years teaching dance from pre-K through university, and one belief runs through all of it: every student deserves an effective arts education. That belief has carried me beyond my own classroom - onto the committee that wrote Georgia’s dance power standards, into national action research with the Connected Arts Network, and to the NDEO national conference to share what inclusive teaching looks like. I serve because the work is bigger than any one program. When teachers have clear, practical standards and the support to teach them well, students of every ability get the chance to create, perform, and grow. Helping the field get there, from the studio floor to the wider profession, is work I care about deeply and will keep doing.';

export const technologyIntro = 'I use technology to facilitate my students’ education in the following ways:';

export const technologyUses = [
  {
    title: 'Reflective practices',
    body: 'We create videos for dance and use them to assess and revise work. We also use videos to document performances.',
  },
  {
    title: 'AI applications',
    body: 'We use AI to facilitate the creation of dance concert programs, advertising for concerts and performances, and to analyze ideas and help create ideas for choreography.',
  },
] as const;
