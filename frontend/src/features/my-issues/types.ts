export const ISSUE_STATUSES = ['submitted', 'under_review', 'verified', 'in_progress', 'completed', 'rejected'] as const;

export type IssueStatus = (typeof ISSUE_STATUSES)[number];

export interface MyIssue {
  id: string;
  issueId: string;
  title: string;
  category: string;
  imageUrl: string;
  locationLabel: string;
  createdAt: string;
  status: IssueStatus;
  statusUpdatedAt: string;
}

export interface MyIssuesFilters {
  status?: IssueStatus;
  category?: string;
  search?: string;
  page: number;
  limit: number;
}

export interface MyIssuesPage {
  issues: MyIssue[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
}
