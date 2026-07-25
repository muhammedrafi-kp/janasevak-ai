import type { AuthorityIssue, AuthorityIssueStatus } from '../types';

let demoIssues: AuthorityIssue[] = [
  { id: 'a-1', issueId: 'ISS-0001', title: 'Road Damage', category: 'Road Damage', imageUrl: 'https://images.unsplash.com/photo-1589994160839-163cd867cfe8?auto=format&fit=crop&w=400&q=80', locationLabel: 'MG Road, Ernakulam, Kerala', description: 'Large pothole causing vehicle damage near the metro station.', reportedAt: '2025-05-12T10:30:00+05:30', status: 'submitted', priority: 'high' },
  { id: 'a-2', issueId: 'ISS-0002', title: 'Water Leakage', category: 'Water Leakage', imageUrl: 'https://images.unsplash.com/photo-1531611141191-8f5f53d0d2a3?auto=format&fit=crop&w=400&q=80', locationLabel: 'Park Street, Kochi, Kerala', description: 'Continuous water leakage from the main public pipeline.', reportedAt: '2025-05-10T16:15:00+05:30', status: 'viewed', priority: 'critical' },
  { id: 'a-3', issueId: 'ISS-0003', title: 'Fallen Tree', category: 'Fallen Tree', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80', locationLabel: 'Green Avenue, Kochi, Kerala', description: 'A fallen tree is partially blocking the road and pedestrian path.', reportedAt: '2025-05-08T09:20:00+05:30', status: 'in_progress', priority: 'high' },
  { id: 'a-4', issueId: 'ISS-0004', title: 'Garbage Overflow', category: 'Garbage', imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=400&q=80', locationLabel: 'Lake View, Kochi, Kerala', description: 'Garbage collection point is overflowing and needs urgent collection.', reportedAt: '2025-05-06T19:45:00+05:30', status: 'completed', priority: 'medium' },
];

const delay = () => new Promise<void>((resolve) => window.setTimeout(resolve, 300));

/** Frontend demo adapter; replace with Axios calls once authority endpoints exist. */
export async function getAuthorityIssues(): Promise<AuthorityIssue[]> { await delay(); return demoIssues; }
export async function updateAuthorityIssueStatus(id: string, status: AuthorityIssueStatus): Promise<AuthorityIssue> { await delay(); const issue = demoIssues.find((item) => item.id === id); if (!issue) throw new Error('Issue not found'); const updated = { ...issue, status }; demoIssues = demoIssues.map((item) => item.id === id ? updated : item); return updated; }
