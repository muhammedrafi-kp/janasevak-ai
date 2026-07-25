import { Check, Clock3, X } from 'lucide-react';
import { STATUS_LABELS } from '../constants';
import type { IssueStatus } from '../types';

const STANDARD_STAGES: IssueStatus[] = ['submitted', 'under_review', 'verified', 'in_progress', 'completed'];

function statusIndex(status: IssueStatus) {
  return STANDARD_STAGES.indexOf(status);
}

export function IssueTimeline({ status }: { status: IssueStatus }) {
  const stages = status === 'rejected' ? (['submitted', 'rejected'] as IssueStatus[]) : STANDARD_STAGES;
  const activeIndex = status === 'rejected' ? 1 : statusIndex(status);

  return (
    <div className="flex min-w-[330px] items-start justify-between gap-0">
      {stages.map((stage, index) => {
        const isDone = index < activeIndex;
        const isCurrent = index === activeIndex;
        const isRejected = stage === 'rejected' && isCurrent;
        return (
          <div className="flex flex-1 items-start" key={stage}>
            <div className="flex min-w-0 flex-col items-center text-center"><div className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${isRejected ? 'bg-red-500' : isDone ? 'bg-emerald-500' : isCurrent ? 'bg-primary' : 'bg-slate-200 text-slate-500'}`}>{isRejected ? <X size={14} /> : isDone ? <Check size={14} /> : isCurrent ? <Clock3 size={14} /> : <Check size={13} />}</div><span className={`mt-2 whitespace-nowrap text-[11px] font-medium ${isCurrent ? 'text-slate-800' : 'text-slate-500'}`}>{STATUS_LABELS[stage]}</span></div>
            {index < stages.length - 1 && <div className={`mt-3 h-px flex-1 ${index < activeIndex ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
          </div>
        );
      })}
    </div>
  );
}
