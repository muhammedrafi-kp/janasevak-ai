import { useEffect, useState } from 'react';
import { AlertCircle, Filter, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ISSUE_CATEGORIES, STATUS_FILTERS } from '../features/my-issues/constants';
import { IssueCard } from '../features/my-issues/components/IssueCard';
import { getMyIssues } from '../features/my-issues/services/myIssues.service';
import type { IssueStatus, MyIssuesPage as MyIssuesResponse } from '../features/my-issues/types';

const PAGE_SIZE = 5;

export const MyIssuesPage = () => {
  const [activeStatus, setActiveStatus] = useState<IssueStatus | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState<MyIssuesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadVersion, setReloadVersion] = useState(0);

  useEffect(() => {
    let isActive = true;
    const timeout = window.setTimeout(() => {
      setIsLoading(true);
      setError(null);

      getMyIssues({ status: activeStatus, category, search, page, limit: PAGE_SIZE })
        .then((result) => {
          if (isActive) setData(result);
        })
        .catch(() => {
          if (isActive) setError('We could not load your issues. Please try again.');
        })
        .finally(() => {
          if (isActive) setIsLoading(false);
        });

    }, 250);

    return () => {
      isActive = false;
      window.clearTimeout(timeout);
    };
  }, [activeStatus, category, search, page, reloadVersion]);

  const updateStatus = (status?: IssueStatus) => {
    setActiveStatus(status);
    setPage(1);
  };

  const updateCategory = (value: string) => {
    setCategory(value || undefined);
    setPage(1);
  };

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const clearFilters = () => {
    setActiveStatus(undefined);
    setCategory(undefined);
    setSearch('');
    setPage(1);
  };

  const hasActiveFilters = Boolean(activeStatus || category || search);

  return (
    <div className="mx-auto max-w-[1400px] space-y-7">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div><h1 className="text-3xl font-bold text-slate-900">My Issues</h1><p className="mt-2 text-slate-500">Track and manage all the issues you&apos;ve reported.</p></div>
        <div className="flex flex-col gap-3 sm:flex-row"><label className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input value={search} onChange={(event) => updateSearch(event.target.value)} placeholder="Search issues..." className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-80" /></label><Button type="button" variant="outline" onClick={() => setIsFilterOpen((open) => !open)} className="gap-2"><Filter size={17} />Filter</Button></div>
      </div>

      {isFilterOpen && <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-end"><label className="flex-1 text-sm font-medium text-slate-700">Category<select value={category ?? ''} onChange={(event) => updateCategory(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary"><option value="">All categories</option>{ISSUE_CATEGORIES.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>{hasActiveFilters && <Button type="button" variant="ghost" onClick={clearFilters}>Clear all</Button>}</div>}

      <div className="border-b border-slate-200"><div className="flex gap-5 overflow-x-auto"><div className="flex min-w-max gap-5">{STATUS_FILTERS.map((filter) => <button type="button" key={filter.label} onClick={() => updateStatus(filter.value)} className={`border-b-2 px-1 pb-4 text-sm font-semibold transition ${activeStatus === filter.value ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>{filter.label}</button>)}</div><span className="ml-auto hidden min-w-max pb-4 text-sm text-slate-500 sm:block">Total Issues: {data?.total ?? '—'}</span></div></div>

      {isLoading && <div className="space-y-4">{Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-36 animate-pulse rounded-2xl bg-slate-200" />)}</div>}

      {!isLoading && error && <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center"><AlertCircle className="mx-auto text-red-600" /><p className="mt-2 text-sm text-red-700">{error}</p><Button type="button" variant="outline" className="mt-4" onClick={() => setReloadVersion((version) => version + 1)}>Try again</Button></div>}

      {!isLoading && !error && data?.issues.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><SlidersHorizontal className="mx-auto text-slate-400" size={32} /><h2 className="mt-4 text-lg font-bold text-slate-800">No issues found</h2><p className="mt-2 text-sm text-slate-500">Try changing your search or filters.</p>{hasActiveFilters && <Button type="button" variant="outline" className="mt-5" onClick={clearFilters}>Clear filters</Button>}</div>}

      {!isLoading && !error && data && data.issues.length > 0 && <><div className="space-y-4">{data.issues.map((issue) => <IssueCard key={issue.id} issue={issue} />)}</div><div className="flex flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row"><span>Showing {(data.page - 1) * data.limit + 1}–{Math.min(data.page * data.limit, data.total)} of {data.total} issues</span><div className="flex gap-2"><Button type="button" variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>Previous</Button><Button type="button" variant="outline" size="sm" disabled={!data.hasNextPage} onClick={() => setPage((current) => current + 1)}>Next</Button></div></div></>}
    </div>
  );
};
