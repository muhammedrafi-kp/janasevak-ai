import { ChevronRight, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { STATUS_LABELS, STATUS_STYLES } from '../constants';
import type { MyIssue } from '../types';
import { IssueTimeline } from './IssueTimeline';

const dateFormatter = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

export function IssueCard({ issue }: { issue: MyIssue }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md lg:p-5">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
        <img src={issue.imageUrl} alt="" className="h-28 w-full rounded-xl object-cover sm:w-40 xl:w-36" />
        <div className="min-w-0 xl:w-72"><h2 className="text-lg font-bold text-slate-900">{issue.title}</h2><p className="mt-2 flex items-start gap-2 text-sm text-slate-500"><MapPin className="mt-0.5 shrink-0" size={16} />{issue.locationLabel}</p><p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><CalendarDays size={16} />Reported {dateFormatter.format(new Date(issue.createdAt))}</p></div>
        <div className="overflow-x-auto py-1 xl:flex-1"><IssueTimeline status={issue.status} /></div>
        <div className="flex shrink-0 items-center justify-between gap-4 xl:block xl:text-right"><div><span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${STATUS_STYLES[issue.status]}`}>{STATUS_LABELS[issue.status]}</span><p className="mt-3 text-sm text-slate-500">Issue ID: #{issue.issueId}</p></div><Link to={`/complaint/${issue.id}`} aria-label={`View ${issue.title}`} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-primary"><ChevronRight size={23} /></Link></div>
      </div>
    </article>
  );
}
