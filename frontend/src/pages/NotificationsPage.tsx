import { Bell } from 'lucide-react';

export const NotificationsPage = () => (
  <div className="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col items-center justify-center px-6 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary"><Bell size={28} /></div>
    <h1 className="mt-5 text-2xl font-bold text-slate-900">Notifications</h1>
    <p className="mt-2 max-w-md text-slate-500">You have no notifications yet. Updates from your reported issues will appear here once the notification service is connected.</p>
  </div>
);
