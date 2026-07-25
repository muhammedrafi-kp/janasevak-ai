import type { ReportDraft, SubmissionResult } from '../types';

/**
 * Temporary frontend adapter. Replace this function's implementation with the
 * complaints API request when the backend contract is available.
 */
export async function submitReportDraft(draft: ReportDraft): Promise<SubmissionResult> {
  console.info('Report Issue demo payload:', {
    ...draft,
    attachments: draft.attachments.map(({ file, ...attachment }) => ({
      ...attachment,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    })),
  });

  await new Promise<void>((resolve) => window.setTimeout(resolve, 900));

  return {
    mode: 'demo',
    message: 'Your report passed frontend validation and is ready for API integration.',
  };
}
