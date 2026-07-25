import type { IssueStatus } from './types';

export const STATUS_LABELS: Record<IssueStatus, string> = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  verified: 'Verified',
  in_progress: 'In Progress',
  completed: 'Completed',
  rejected: 'Rejected',
};

export const STATUS_STYLES: Record<IssueStatus, string> = {
  submitted: 'bg-slate-100 text-slate-700',
  under_review: 'bg-amber-100 text-amber-700',
  verified: 'bg-violet-100 text-violet-700',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
};

export const STATUS_FILTERS: ReadonlyArray<{ label: string; value?: IssueStatus }> = [
  { label: 'All Issues' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Verified', value: 'verified' },
  { label: 'Completed', value: 'completed' },
  { label: 'Rejected', value: 'rejected' },
];

export const ISSUE_CATEGORIES = ['Road Damage', 'Water Leakage', 'Garbage', 'Street Light', 'Fallen Tree'];
