import { AcademicYear } from './types';
import { grade10Data } from './grade10';
import { grade11Data } from './grade11';
import { grade12Data } from './grade12';

export * from './types';
export * from './questionPool';

export const ALL_ACADEMIC_YEARS: AcademicYear[] = [
  grade10Data,
  grade11Data,
  grade12Data
];
