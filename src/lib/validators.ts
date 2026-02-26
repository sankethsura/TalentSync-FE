import { z } from 'zod';

export const skillSchema = z.object({
  name:              z.string().min(1, 'Skill name is required'),
  proficiencyLevel:  z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  yearsOfExperience: z.coerce.number().min(0).max(50).optional(),
});

export const profileSchema = z.object({
  primaryJobTitle:       z.string().min(1, 'Job title is required'),
  phone:                 z.string().optional(),
  location:              z.string().optional(),
  yearsOfExperience:     z.coerce.number().min(0).max(50).optional(),
  remotePreference:      z.enum(['REMOTE', 'HYBRID', 'ONSITE', 'OPEN']).default('OPEN'),
  minExpectedSalary:     z.coerce.number().min(0).optional(),
  dailyApplicationLimit: z.coerce.number().min(1).max(100).default(10),
  skills:                z.array(skillSchema).default([]),
  preferredJobTitles:    z.array(z.string()).default([]),
  preferredLocations:    z.array(z.string()).default([]),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
