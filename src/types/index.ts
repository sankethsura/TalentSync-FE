export type RemotePreference = 'REMOTE' | 'HYBRID' | 'ONSITE' | 'OPEN';
export type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface Skill {
  id?:               string;
  name:              string;
  proficiencyLevel:  ProficiencyLevel;
  yearsOfExperience?: number;
}

export interface PreferredJobTitle {
  id?:   string;
  title: string;
}

export interface PreferredLocation {
  id?:      string;
  location: string;
}

export interface CandidateProfile {
  id:                   string;
  userId:               string;
  phone?:               string | null;
  location?:            string | null;
  yearsOfExperience?:   number | null;
  primaryJobTitle?:     string | null;
  remotePreference:     RemotePreference;
  minExpectedSalary?:   number | null;
  dailyApplicationLimit: number;
  resumeUrl?:           string | null;
  resumeFileName?:      string | null;
  skills:               Skill[];
  preferredJobTitles:   PreferredJobTitle[];
  preferredLocations:   PreferredLocation[];
  createdAt:            string;
  updatedAt:            string;
}

export interface User {
  id:              string;
  email:           string;
  name?:           string | null;
  picture?:        string | null;
  profileComplete: boolean;
}
