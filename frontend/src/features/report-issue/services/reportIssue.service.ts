import type { ReportDraft } from '../types';

const API = 'http://localhost:3000/api';
type FollowUp = { id: string; question: string; answerType: 'TEXT' | 'YES_NO' | 'SINGLE_SELECT' | 'NUMBER'; options: string[]; required: boolean };
export type AiResult = { mode: 'submitted' | 'followup'; sessionId: string; analysis: { suggestedTitle: string; suggestedDescription: string; primaryCategory: string; followUpQuestions: FollowUp[]; userMessage: string }; complaintId?: string };

async function json(response: Response) { const body = await response.json(); if (!response.ok) throw new Error(body.error?.message || 'Request failed'); return body.data; }

async function submitSession(sessionId: string): Promise<AiResult> {
  const userId = localStorage.getItem('userId');
  if (!userId) throw new Error('Sign in before submitting a report.');
  const complaint = await json(await fetch(`${API}/complaints/${sessionId}/submit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId }) }));
  return { mode: 'submitted', sessionId, analysis: { suggestedTitle: complaint.title || '', suggestedDescription: complaint.description || '', primaryCategory: complaint.aiAnalysis.category, followUpQuestions: [], userMessage: 'Report submitted.' }, complaintId: complaint._id };
}

export async function submitReportDraft(draft: ReportDraft): Promise<AiResult> {
  const form = new FormData(); draft.attachments.forEach((attachment) => form.append('images', attachment.file)); form.append('latitude', String(draft.location.lat)); form.append('longitude', String(draft.location.lng)); form.append('address', draft.location.label); form.append('message', draft.description); form.append('selectedCategory', draft.category); form.append('preferredLanguage', 'auto');
  const data = await json(await fetch(`${API}/complaints/analyse`, { method: 'POST', body: form }));
  if (data.analysis.needsFollowUp || !data.analysis.imagesConsistent) return { mode: 'followup', sessionId: data.sessionId, analysis: data.analysis };
  return submitSession(data.sessionId);
}

export async function answerReportFollowUp(sessionId: string, answers: Array<{ questionId: string; answer: string }>): Promise<AiResult> {
  const data = await json(await fetch(`${API}/complaints/${sessionId}/answers`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answers }) }));
  if (data.analysis.needsFollowUp || !data.analysis.imagesConsistent) return { mode: 'followup', sessionId, analysis: data.analysis };
  return submitSession(sessionId);
}
