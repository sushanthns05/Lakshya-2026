export interface EventConfig {
  id: string;
  title: string;
  subtitle: string;
  institution: string;
  department: string;
  location: string;
  venue: string;
  startDate: string; // ISO String
  endDate: string; // ISO String
  duration: string;
  maxTeamSize: number;
  tentativePrizePool: string;
  registrationFee: string;
  registrationStatus: 'Not Announced' | 'Open' | 'Paused' | 'Closed';
  registrationDeadline: string; // ISO String
  socialLinks: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  contactEmail: string;
  contactPhone: string;
}

export interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  college?: string;
  course?: string;
  department?: string;
  yearOfStudy?: string;
}

export interface TeamRegistration {
  id: string;
  teamName: string;
  college: string;
  city: string;
  state: string;
  country: string;
  leader: TeamMember;
  members: TeamMember[];
  status: 'Qualified' | 'Disqualified' | 'Withdrawn';
  createdAt: string;
  updatedAt: string;
}

export interface ProblemStatement {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  requirements: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Draft' | 'Published';
  isOpenInnovation: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  status: 'Draft' | 'Published';
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'Title' | 'Platinum' | 'Gold' | 'Technology' | 'Knowledge' | 'Community' | 'Media';
  logoUrl: string;
  websiteUrl: string;
  status: 'Draft' | 'Published';
  order: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  status: 'Draft' | 'Published';
  order: number;
}

export interface ScheduleItem {
  id: string;
  title: string;
  description: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  location: string;
  status: 'Draft' | 'Published';
  isProvisional: boolean;
}
