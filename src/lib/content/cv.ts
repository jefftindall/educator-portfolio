export type CvEntry = {
  title: string;
  organization?: string;
  dates: string;
  location?: string;
  details?: string;
};

export const experience: readonly CvEntry[] = [
  {
    title: 'Dance Director, Fine Arts Department Lead & Performing Arts Center Director',
    organization: 'Woodland High School, Bartow County School District',
    dates: '2020–present',
    location: 'Cartersville, Georgia',
    details:
      'Redesigned the class structure and rebuilt the dance program, teaching ballet, jazz, modern, and contemporary. As department lead I support all fine arts faculty, run department planning, observe and coach teachers, oversee fine arts events, and co-produce and choreograph fine arts productions. Secured a $5,000 Georgia Council for the Arts grant for a school-wide fine arts musical.',
  },
  {
    title: 'Dance Instructor',
    organization: 'Steps of Faith Dance Studio',
    dates: '2012–2021',
    location: 'Cartersville, Georgia',
    details: 'Started Karina’s Class, an inclusive class for dancers of all abilities that now continues at Woodland High School.',
  },
  {
    title: 'Adjunct Professor of Dance',
    organization: 'Reinhardt University School of Performing Arts',
    dates: '2013–2018',
    location: 'Waleska, Georgia',
    details:
      'Taught ballet, tap, and jazz to musical theatre students, most with no previous dance training, and choreographed department productions.',
  },
  {
    title: 'Founder & Managing Director',
    organization: 'Northwest Atlanta Lango',
    dates: '2011–2013',
    details:
      'Founded a program bringing research-based foreign language instruction to children in Bartow, Cherokee, and North Cobb counties.',
  },
  {
    title: 'Dance & Theatre Teacher',
    organization: 'Cobb County Schools',
    dates: '2002–2010',
    details:
      'Taught dance and theatre to grades 6–8 at three middle schools: ballet, jazz, and modern performance classes, nine-week cultural and social dance units, and musical theatre.',
  },
];

export const education: readonly CvEntry[] = [
  {
    title: 'Ed.S., Educational Administration',
    organization: 'Jacksonville State University',
    dates: '2008',
  },
  {
    title: 'M.S.Ed., Educational Administration',
    organization: 'Jacksonville State University',
    dates: '2005',
  },
  {
    title: 'B.S.Ed., Dance Education',
    organization: 'The University of Georgia',
    dates: '2000',
  },
];

export const honors: readonly CvEntry[] = [
  {
    title: 'High School Teacher of the Year',
    organization: 'Bartow County School System',
    dates: '2026–27',
  },
  {
    title: 'National Conference Presenter, “Dance for Every Body”',
    organization: 'National Dance Education Organization',
    dates: '2025',
  },
  {
    title: 'Teacher Participant, Connected Arts Network national PLC',
    organization: 'National Dance Education Organization',
    dates: '2024–present',
  },
  {
    title: 'Member, Performance Standards Writing Committee for Dance Education',
    organization: 'Georgia Department of Education',
    dates: '2008',
  },
  {
    title: 'Teacher of the Year',
    organization: 'Barber Middle School',
    dates: '2007–08',
  },
  {
    title: 'Member',
    organization: 'National Dance Education Organization',
    dates: '2003–present',
  },
];

export const volunteering: readonly CvEntry[] = [
  {
    title: 'Board Member',
    organization: 'Red Door Food Pantry',
    dates: '2020–2026',
    details:
      'Helped grow the pantry from a church ministry into an independent 501(c)(3), and supported strategic planning, budgeting, and fundraising while representing the pantry at community events.',
  },
  {
    title: 'Board Member & Human Resources Committee Representative',
    organization: 'The Etowah Foundation',
    dates: '2019–2025',
    details: 'Part of the board’s strategic planning and decision making, and counsel to the director on hiring, evaluation, and other HR matters.',
  },
  {
    title: 'Senior Warden (2020), Junior Warden (2019) & Vestry Member',
    organization: 'The Episcopal Church of the Ascension',
    dates: '2017–2020',
    details:
      'Led the church’s daily operations, budget, and staffing through the pandemic, and served as liaison to the Episcopal Diocese of Atlanta while the church was without a rector.',
  },
];
