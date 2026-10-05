import { honors, type CvEntry } from './cv';

export { volunteering as communityService } from './cv';

/** Newest first. */
export const teachingHonors: readonly CvEntry[] = [
  {
    title: 'High School Teacher of the Year',
    organization: 'Bartow County School System',
    dates: '2026–27',
  },
  {
    title: 'Teacher of the Year',
    organization: 'Woodland High School',
    dates: '2026',
  },
  {
    title: 'Teacher of the Year',
    organization: 'Barber Middle School',
    dates: '2007–08',
  },
];

export const standardsAndService: readonly CvEntry[] = honors.filter(
  (entry) => !entry.title.includes('Teacher of the Year'),
);
