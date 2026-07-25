export const ISSUE_CATEGORIES = ['Road Damage', 'Water Leakage', 'Garbage', 'Street Light', 'Fallen Tree'] as const;

export type IssueCategory = (typeof ISSUE_CATEGORIES)[number];
export type ScanState = 'scanning' | 'complete';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationSelection extends Coordinates {
  label: string;
}

export interface ReportAttachment {
  id: string;
  file: File;
  previewUrl: string;
  scanState: ScanState;
}

export interface ReportDraft {
  category: IssueCategory;
  description: string;
  attachments: ReportAttachment[];
  location: LocationSelection;
  aiAnalysis: {
    suggestedCategory: IssueCategory;
    source: 'frontend-demo';
  };
}

export interface SubmissionResult {
  mode: 'demo';
  message: string;
}
