import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  ThumbsUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

type Issue = {
  id: string;
  title: string;
  priority: string;
  priorityClass: string;
  status: string;
  statusClass: string;
  location: string;
  time: string;
  votes: number;
  comments: number;
  imageUrl?: string;
  placeholderImage: string;
};

const recentIssues: Issue[] = [
  {
    id: '1', title: 'Road Damage', priority: 'Critical', priorityClass: 'bg-red-50 text-red-600',
    status: 'Verified', statusClass: 'bg-amber-50 text-amber-700', location: 'MG Road, 120m away',
    time: '2 hours ago', votes: 65, comments: 12,
    placeholderImage: 'https://placehold.co/320x220/e5e7eb/475569?text=Road+damage',
  },
  {
    id: '2', title: 'Water Leakage', priority: 'High', priorityClass: 'bg-orange-50 text-orange-700',
    status: 'In Progress', statusClass: 'bg-blue-50 text-blue-700', location: 'Park Street, 350m away',
    time: '5 hours ago', votes: 42, comments: 8,
    placeholderImage: 'https://placehold.co/320x220/dbeafe/475569?text=Water+leakage',
  },
  {
    id: '3', title: 'Fallen Tree', priority: 'Medium', priorityClass: 'bg-yellow-50 text-yellow-700',
    status: 'Reported', statusClass: 'bg-violet-50 text-violet-700', location: 'Green Avenue, 450m away',
    time: '1 day ago', votes: 30, comments: 5,
    placeholderImage: 'https://placehold.co/320x220/dcfce7/475569?text=Fallen+tree',
  },
  {
    id: '4', title: 'Garbage Overflow', priority: 'Low', priorityClass: 'bg-emerald-50 text-emerald-700',
    status: 'Completed', statusClass: 'bg-green-50 text-green-700', location: 'Lake View, 600m away',
    time: '1 day ago', votes: 28, comments: 3,
    placeholderImage: 'https://placehold.co/320x220/f1f5f9/475569?text=Garbage+overflow',
  },
];

const issueImage = (issue: Issue) => issue.imageUrl || issue.placeholderImage;

export const LandingPage = () => {
  return (
    <div className="min-h-full bg-[#f8fafc] px-4 py-5 sm:px-6 sm:py-7">
      <div className="mx-auto max-w-none overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-white via-[#f9fbff] to-blue-50/50 px-6 py-12 sm:px-10 lg:min-h-[326px] lg:px-14 lg:py-16">
          <div className="relative z-10 max-w-[460px]">
            <motion.h1
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
              className="text-[34px] font-bold leading-[1.24] tracking-tight text-slate-900 sm:text-[42px]"
            >
              See a problem?<br />Let&apos;s fix it together.
            </motion.h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-slate-500 sm:text-lg">
              Report issues in your area and help make our community better.
            </p>
            <Link to="/report" className="mt-7 inline-flex">
              <Button size="lg" className="gap-2 rounded-lg px-6 shadow-lg shadow-blue-500/20">
                <MapPin size={19} /> Report New Issue
              </Button>
            </Link>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] overflow-hidden lg:block" aria-hidden="true">
            <div className="absolute bottom-7 left-8 right-4 h-28 rounded-t-[48%] bg-gradient-to-t from-blue-100/80 to-transparent" />
            <div className="absolute bottom-12 left-[7%] h-36 w-16 rounded-t-lg bg-blue-100/75 shadow-[34px_20px_0_8px_rgba(219,234,254,.8),78px_0_0_13px_rgba(219,234,254,.65),140px_24px_0_15px_rgba(219,234,254,.7),220px_-12px_0_7px_rgba(219,234,254,.75)]" />
            <div className="absolute bottom-7 left-[41%] h-[238px] w-[162px] rounded-[23px] border-[6px] border-slate-700 bg-white shadow-xl">
              <div className="mx-auto mt-3 h-2 w-11 rounded-full bg-slate-100" />
              <MapPin className="mx-auto mt-12 fill-blue-500 text-blue-500" size={64} strokeWidth={1.6} />
              <div className="mx-auto mt-7 h-2 w-24 rounded-full bg-slate-200" />
              <div className="ml-7 mt-3 h-2 w-16 rounded-full bg-slate-200" />
            </div>
            <div className="absolute bottom-8 right-[7%] h-20 w-24 rounded-t-full bg-emerald-300/80 shadow-[-42px_27px_0_-5px_rgba(134,239,172,.75)]" />
            <div className="absolute bottom-8 right-[22%] h-9 w-24 -skew-x-12 border-b-[10px] border-amber-400 bg-amber-300" />
          </div>
        </section>

        <div className="grid gap-9 p-6 sm:p-9 lg:grid-cols-[1.42fr_.94fr] lg:p-10">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Recent Issues</h2>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              {recentIssues.map((issue, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}
                  key={issue.id} className="border-b border-slate-100 last:border-b-0"
                >
                  <Link to={`/complaint/${issue.id}`} className="flex gap-3 p-3.5 transition-colors hover:bg-slate-50 sm:gap-5 sm:p-4">
                    <img src={issueImage(issue)} alt="" className="h-20 w-20 shrink-0 rounded-lg object-cover sm:h-[82px] sm:w-[132px]" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{issue.title}</h3>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${issue.priorityClass}`}>{issue.priority}</span>
                      </div>
                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin size={14} /> {issue.location}</p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><Clock3 size={14} /> {issue.time}</p>
                    </div>
                    <div className="hidden min-w-[112px] flex-col items-end justify-between sm:flex">
                      <span className={`rounded-lg px-3 py-1.5 text-sm font-medium ${issue.statusClass}`}>{issue.status}</span>
                      <div className="flex items-center gap-5 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><ThumbsUp size={18} /> {issue.votes}</span>
                        <span className="flex items-center gap-1"><MessageCircle size={18} /> {issue.comments}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
              <Link to="/map" className="flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-blue-50">
                View All Issues <ChevronRight size={18} />
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-slate-900">Issues Near You</h2>
              <Link to="/map" className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium text-primary hover:underline">
                View on Map <ArrowRight size={15} />
              </Link>
            </div>
            <Link to="/map" aria-label="Open public issues map" className="relative block min-h-[360px] overflow-hidden rounded-xl bg-[#eef1f3] sm:min-h-[430px]">
              <div className="absolute inset-0 opacity-75 [background-image:linear-gradient(30deg,transparent_46%,#fff_47%,#fff_49%,transparent_50%),linear-gradient(120deg,transparent_46%,#fff_47%,#fff_49%,transparent_50%),linear-gradient(#e1e7ea_1px,transparent_1px),linear-gradient(90deg,#e1e7ea_1px,transparent_1px)] [background-size:105px_82px,125px_94px,22px_22px,22px_22px]" />
              <div className="absolute -bottom-10 -left-10 h-36 w-56 rotate-12 rounded-full bg-blue-200/80" />
              <div className="absolute right-4 top-4 h-28 w-32 rounded-3xl bg-emerald-100/80" />
              <div className="absolute left-[29%] top-[20%] h-7 w-7 rounded-full border-[7px] border-white bg-red-500 shadow" />
              <div className="absolute right-[30%] top-[22%] h-7 w-7 rounded-full border-[7px] border-white bg-red-500 shadow" />
              <div className="absolute left-[14%] top-[46%] h-7 w-7 rounded-full border-[7px] border-white bg-amber-400 shadow" />
              <div className="absolute right-[19%] bottom-[40%] h-7 w-7 rounded-full border-[7px] border-white bg-emerald-500 shadow" />
              <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 ring-1 ring-blue-400/20" />
              <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-white bg-primary shadow-lg" />
            </Link>
          </section>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5"><Check size={16} className="text-emerald-500" /> Community-powered reporting</span>
          <span className="flex items-center gap-1.5"><Check size={16} className="text-emerald-500" /> Transparent issue tracking</span>
        </div>
      </div>
    </div>
  );
};
