export const AUTHORITY_STATUSES = ['submitted', 'viewed', 'in_progress', 'completed', 'rejected'] as const;
export type AuthorityIssueStatus = (typeof AUTHORITY_STATUSES)[number];
export type IssuePriority = 'critical' | 'high' | 'medium' | 'low';

export interface AuthorityIssue {
  id: string;
  issueId: string;
  title: string;
  category: string;
  imageUrl: string;
  locationLabel: string;
  description: string;
  reportedAt: string;
  status: AuthorityIssueStatus;
  priority: IssuePriority;
}

export const AUTHORITY_STATUS_LABELS: Record<AuthorityIssueStatus, string> = { submitted: 'Submitted', viewed: 'Viewed', in_progress: 'In Progress', completed: 'Completed', rejected: 'Rejected' };
export const AUTHORITY_STATUS_STYLES: Record<AuthorityIssueStatus, string> = { submitted: 'bg-amber-100 text-amber-800', viewed: 'bg-blue-100 text-blue-700', in_progress: 'bg-violet-100 text-violet-700', completed: 'bg-emerald-100 text-emerald-700', rejected: 'bg-red-100 text-red-700' };
