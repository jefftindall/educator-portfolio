export type AiIdea = { title: string; body: string; prompt: string };
export type AiAssistant = { name: string; purpose: string; instructions: string };
export type ArtForm = {
  id: 'dance' | 'theatre' | 'music' | 'visual-art';
  name: string;
  intro: string;
  ideas: readonly AiIdea[];
  assistant: AiAssistant;
};

export const aiPageTitle = 'AI in the Arts Classroom';

export const aiPageLede =
  'How I use AI to save planning time, and prompts any arts teacher can try in dance, theatre, music, and visual art.';

/** Temporary home card under Leadership and recognition. Retire ~Oct 2027. */
export const showHomeAiPromo = true;

export const homeAiPromoLabel = 'Thought leadership';

export const homeAiPromoBody =
  'I put tools to work on the planning that piles up: concert materials, one lesson shaped for every level in the room, and grant drafts built from my own program documents. Prompts and reusable assistants are ready for dance, theatre, music, and visual art.';

export const homeAiPromoCta = 'Read the prompts and assistants';

export const responsibleUse: readonly string[] = [
  'Never put student names, photos, grades, or IEP and 504 details into a prompt.',
  'Check your district’s AI policy and use the tools it approves.',
  'Review every output. Check facts, dates, and who gets credit.',
  'Student art, choreography, and writing stay theirs. AI can coach. It does not create for them.',
  'Don’t upload scripts, scores, or images you don’t have the rights to share.',
];

export const myUses: readonly AiIdea[] = [
  {
    title: 'Show collateral',
    body:
      'I use AI to draft posters, graphics, slideshows, concert programs, and social media posts. I give it the show facts once and get a starting draft for every format. I still choose the final words and images.',
    prompt:
      'I am a high school dance teacher. Our winter concert is [date] at [time] in [venue]. Tickets are [price]. The theme is [theme]. Write: (1) a poster headline and two short lines of copy, (2) a 60-word social media post, (3) a short welcome note for the printed program, and (4) a five-slide outline for a lobby slideshow. Keep the tone warm and family-friendly.',
  },
  {
    title: 'One lesson, every level',
    body:
      'My classes blend students with years of studio training and students who have never danced. I ask AI to rewrite one lesson plan for each level, so everyone learns the same content and standard at the right challenge.',
    prompt:
      'Here is my lesson plan on [topic]. Rewrite it three ways: for a beginner with no dance training, for an intermediate dancer, and for an advanced dancer. Keep the same learning target and standard. Change the vocabulary, the steps, and the challenge. Add one way a student can show what they learned at each level.',
  },
  {
    title: 'Grant writing',
    body:
      'I give AI access to my own program documents. It drafts grant responses from my words and data, so I start from a strong draft instead of a blank page. I check every fact before I submit.',
    prompt:
      'Using only the program documents I have shared, draft a 250-word answer to this grant question: “[paste the question]”. Lead with what students gained, include our numbers, and name the standards we teach. Flag anything you could not find in my documents instead of guessing.',
  },
];

export const ideasIntro =
  'These are starting points for any arts teacher. Copy a prompt, fill in the brackets, and adjust it to your students.';

export const artForms: readonly ArtForm[] = [
  {
    id: 'dance',
    name: 'Dance',
    intro: 'Use AI as a planning partner for choreography, cueing, and feedback.',
    ideas: [
      {
        title: 'Choreography starters',
        body: 'Get motif, formation, and structure ideas mapped to a song’s sections. Students still make the choices.',
        prompt:
          'The song “[title]” is [length] long with this structure: [intro, verse, chorus, bridge, and so on]. Suggest three movement motifs on the theme of [theme], two formation changes, and a way to map each section to 8-counts. Give options, not finished choreography.',
      },
      {
        title: 'One combination, two levels',
        body: 'Write teaching cues for the same combination at a beginner and an advanced level.',
        prompt:
          'Here is a [ballet/jazz/contemporary] combination: [describe it in counts]. Write teaching cues for a beginner class and an advanced class. Use simple words for beginners. Add one technique focus and one safety cue for each level.',
      },
      {
        title: 'Feedback stems',
        body: 'Build sentence starters for peer feedback using Liz Lerman’s Critical Response Process.',
        prompt:
          'Create sentence starters for high school dancers giving peer feedback with the Critical Response Process: statements of meaning, artist questions, neutral questions, and permissioned opinions. Write five starters for each step at an eighth-grade reading level.',
      },
      {
        title: 'Cultural and social dance units',
        body: 'Draft a unit outline with discussion questions. Check every historical fact against trusted sources.',
        prompt:
          'Outline a two-week unit on [dance form] for high school students. Include its origins, the community it comes from, three discussion questions, and one creating task. List the sources I should check to verify the history.',
      },
    ],
    assistant: {
      name: 'Choreography Partner',
      purpose: 'Suggests phrase variations, transitions, and formations for your class levels.',
      instructions:
        'You help a dance teacher plan choreography for high school classes at beginner, intermediate, and advanced levels. Ask for the song, the class level, the number of dancers, and the theme before you answer. Give options in 8-counts with formation ideas. Keep movement safe for the level. Never claim a phrase is finished; the teacher and students decide.',
    },
  },
  {
    id: 'theatre',
    name: 'Theatre',
    intro: 'Use AI to adapt texts, deepen character work, and organize productions.',
    ideas: [
      {
        title: 'One scene, many readers',
        body: 'Adapt a public-domain scene so every student can read it, without losing the conflict.',
        prompt:
          'Here is a public-domain scene from [play]: [paste scene]. Rewrite it at two reading levels: one for students reading below grade level and one for English learners. Keep the characters, the conflict, and the key lines. Add a short glossary for any hard words you keep.',
      },
      {
        title: 'Character questions',
        body: 'Build character analysis and given-circumstances questions for any role.',
        prompt:
          'Create a character worksheet for [character] in [play]. Include given-circumstances questions (who, what, where, when, why), three questions about what the character wants, and one movement or voice exploration activity.',
      },
      {
        title: 'Rehearsal schedules',
        body: 'Turn a conflict calendar into a draft rehearsal schedule.',
        prompt:
          'Here are the scenes, the characters in each scene, and the dates each actor cannot attend: [paste, using role names only]. Build a six-week rehearsal schedule that avoids conflicts, rehearses each scene at least three times, and leaves the last week for full runs.',
      },
      {
        title: 'Improv warm-ups',
        body: 'Get warm-ups and games that connect to the unit you are teaching.',
        prompt:
          'Suggest five improv warm-ups for a high school theatre class on the theme of [theme]. For each, give the rules, the time it takes, and the skill it builds. Include one that works for students who are nervous about performing.',
      },
    ],
    assistant: {
      name: 'Stage Management Helper',
      purpose: 'Drafts rehearsal reports, prop lists, and costume lists from your script notes.',
      instructions:
        'You help a theatre teacher stage-manage a school production. When given scene notes, build prop lists, costume lists, and rehearsal reports in clear tables. Use role names, not student names. Ask before assuming a scene’s setting or time period. Flag anything that looks like a safety concern.',
    },
  },
  {
    id: 'music',
    name: 'Music',
    intro: 'Use AI to plan practice, guide listening, and write for audiences.',
    ideas: [
      {
        title: 'Leveled practice plans',
        body: 'Turn the same piece into practice plans for beginning and advanced players.',
        prompt:
          'My [band/choir/orchestra] is preparing [piece]. Write a one-week practice plan for a beginning [instrument or voice part] and one for an advanced player. Include warm-ups, the measures to focus on, and one goal they can check off each day.',
      },
      {
        title: 'Listening guides',
        body: 'Create listening guides with compare-and-contrast questions.',
        prompt:
          'Create a listening guide comparing [recording A] and [recording B]. Include what to listen for (tempo, dynamics, instruments, form), five compare-and-contrast questions, and one question that asks students to explain their own preference.',
      },
      {
        title: 'Rhythm drills',
        body: 'Generate rhythm exercises for each level. Always check the notation before you use it.',
        prompt:
          'Write four-measure rhythm exercises in [time signature] for three levels: quarter and eighth notes only; adding sixteenth notes and rests; adding syncopation and dotted rhythms. Use counting syllables under each beat.',
      },
      {
        title: 'Concert program notes',
        body: 'Draft short program notes about each piece. Verify the composer facts.',
        prompt:
          'Write a 75-word program note for [piece] by [composer] for a school concert audience. Include when it was written and one thing to listen for. List the facts I should verify.',
      },
    ],
    assistant: {
      name: 'Practice Coach',
      purpose: 'Builds weekly practice plans for each section of your ensemble.',
      instructions:
        'You help a music teacher write practice plans for students in a school ensemble. Ask for the piece, the instrument or voice part, and the level. Give short daily plans with warm-ups, focus measures, and one checkable goal. Keep language encouraging and simple. Never invent measure numbers you were not given.',
    },
  },
  {
    id: 'visual-art',
    name: 'Visual art',
    intro: 'Use AI to plan artist studies, guide critique, and organize exhibits.',
    ideas: [
      {
        title: 'Artist studies at every reading level',
        body: 'Write the same artist study for different readers in one class.',
        prompt:
          'Write a short reading about [artist] for high school art students at two reading levels. Include their key works, techniques, and influence. End with two questions that connect their work to a project students will make. List the facts I should verify.',
      },
      {
        title: 'Critique question stems',
        body: 'Build questions for each step of the Feldman method: describe, analyze, interpret, judge.',
        prompt:
          'Create critique question stems for high school art students using the Feldman method: describe, analyze, interpret, and judge. Write four stems for each step at an eighth-grade reading level.',
      },
      {
        title: 'Standards-based rubrics',
        body: 'Draft a rubric aligned to the National Core Arts Standards anchor standards.',
        prompt:
          'Draft a four-level rubric for a [medium] project on [theme]. Align each row to a National Core Arts Standards anchor standard for visual art (creating, presenting, responding, or connecting). Use student-friendly language.',
      },
      {
        title: 'Exhibit planning',
        body: 'Plan signage, labels, and layout for a student show.',
        prompt:
          'I am hanging a student art show with [number] works in [space]. Suggest a layout that groups works by theme, a label template (title, medium, artist statement excerpt), and wording for an entrance sign. Use placeholders for student names.',
      },
    ],
    assistant: {
      name: 'Artist Statement Coach',
      purpose: 'Asks students questions about their work so they can write their own statements.',
      instructions:
        'You coach high school art students as they write artist statements. Never write the statement for them. Ask one question at a time about their materials, choices, and meaning. When they share a draft, point out what is strong and ask one question that would make it clearer.',
    },
  },
];

export const departmentIdeas: readonly AiIdea[] = [
  {
    title: 'One theme, four arts',
    body: 'Plan a cross-arts unit where dance, music, theatre, and visual art explore the same idea.',
    prompt:
      'Plan a three-week cross-arts unit on the theme of [theme] for a high school fine arts department. Give one project each for dance, music, theatre, and visual art, and one shared showcase at the end.',
  },
  {
    title: 'Family newsletters and calendars',
    body: 'Combine every program’s events into one newsletter and calendar.',
    prompt:
      'Here are this month’s events for our dance, music, theatre, and visual art programs: [paste]. Write a family newsletter with a short intro, a calendar by date, and one highlight from each program.',
  },
  {
    title: 'A one-page program summary',
    body: 'Turn your numbers into a clear summary for administrators.',
    prompt:
      'Using these numbers for our fine arts department: [enrollment, performances, exhibits, awards], write a one-page summary for administrators. Lead with what students gained. Use short sections and plain language.',
  },
  {
    title: 'Reuse your best grant answers',
    body: 'Adapt answers you have already written to a new application.',
    prompt:
      'Here is a past grant answer I wrote: [paste]. Adapt it to this new question: “[paste]” in [word limit] words. Keep my facts and voice. Tell me what new information the question asks for.',
  },
];

export const assistantPlatformsNote =
  'These steps work in ChatGPT (custom GPTs), Gemini (Gems), Microsoft Copilot (agents), and Claude (Projects). Use the one your district approves.';

export const buildAnAssistantSteps: readonly string[] = [
  'Give it a clear name, like “Choreography Partner.”',
  'Paste the instructions from one of the assistants above, then edit them to fit your classes.',
  'Add your own documents: syllabi, standards, and past programs. Never add student records.',
  'Test it with a real planning task and check every answer.',
  'Refine the instructions when it misses. Small edits make a big difference.',
];
