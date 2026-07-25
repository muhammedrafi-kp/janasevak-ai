import type { MyIssue, MyIssuesFilters, MyIssuesPage } from '../types';

const DEMO_ISSUES: MyIssue[] = [
  { id: '1', issueId: 'ISS-0001', title: 'Road Damage', category: 'Road Damage', imageUrl: 'https://images.unsplash.com/photo-1589994160839-163cd867cfe8?auto=format&fit=crop&w=400&q=80', locationLabel: 'MG Road, Ernakulam, Kerala', createdAt: '2025-05-12T10:30:00+05:30', status: 'in_progress', statusUpdatedAt: '2025-05-14T09:00:00+05:30' },
  { id: '2', issueId: 'ISS-0002', title: 'Water Leakage', category: 'Water Leakage', imageUrl: 'https://images.unsplash.com/photo-1531611141191-8f5f53d0d2a3?auto=format&fit=crop&w=400&q=80', locationLabel: 'Park Street, Kochi, Kerala', createdAt: '2025-05-10T16:15:00+05:30', status: 'completed', statusUpdatedAt: '2025-05-12T12:00:00+05:30' },
  { id: '3', issueId: 'ISS-0003', title: 'Fallen Tree', category: 'Fallen Tree', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80', locationLabel: 'Green Avenue, Kochi, Kerala', createdAt: '2025-05-08T09:20:00+05:30', status: 'under_review', statusUpdatedAt: '2025-05-09T10:00:00+05:30' },
  { id: '4', issueId: 'ISS-0004', title: 'Garbage Overflow', category: 'Garbage', imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=400&q=80', locationLabel: 'Lake View, Kochi, Kerala', createdAt: '2025-05-06T19:45:00+05:30', status: 'verified', statusUpdatedAt: '2025-05-07T10:30:00+05:30' },
  { id: '5', issueId: 'ISS-0005', title: 'Street Light Not Working', category: 'Street Light', imageUrl: 'https://images.unsplash.com/photo-1508423134147-addf71308178?auto=format&fit=crop&w=400&q=80', locationLabel: 'Pallimukku Nagar, Kochi, Kerala', createdAt: '2025-05-05T20:30:00+05:30', status: 'rejected', statusUpdatedAt: '2025-05-06T08:15:00+05:30' },
  { id: '6', issueId: 'ISS-0006', title: 'Uncollected Waste', category: 'Garbage', imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=400&q=80', locationLabel: 'Marine Drive, Kochi, Kerala', createdAt: '2025-05-03T08:10:00+05:30', status: 'submitted', statusUpdatedAt: '2025-05-03T08:10:00+05:30' },
];

/**
 * Frontend demo adapter. Replace this implementation with apiClient.get(...) once
 * the backend provides the authenticated My Issues endpoint and response contract.
 */
export async function getMyIssues(filters: MyIssuesFilters): Promise<MyIssuesPage> {
  await new Promise<void>((resolve) => window.setTimeout(resolve, 350));

  const search = filters.search?.trim().toLowerCase() ?? '';
  const filtered = DEMO_ISSUES.filter((issue) => {
    const matchesStatus = !filters.status || issue.status === filters.status;
    const matchesCategory = !filters.category || issue.category === filters.category;
    const matchesSearch = !search || [issue.title, issue.category, issue.locationLabel, issue.issueId].some((value) => value.toLowerCase().includes(search));
    return matchesStatus && matchesCategory && matchesSearch;
  });
  const start = (filters.page - 1) * filters.limit;
  const issues = filtered.slice(start, start + filters.limit);

  return { issues, total: filtered.length, page: filters.page, limit: filters.limit, hasNextPage: start + filters.limit < filtered.length };
}
