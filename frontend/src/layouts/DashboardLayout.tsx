import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  AlertCircle, 
  Settings, 
  LogOut,
  Menu,
  Bell,
  MessageSquare,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingChatbot } from '../components/shared/FloatingChatbot';

export const DashboardLayout = ({ role = 'citizen' }: { role?: 'citizen' | 'authority' }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const links = role === 'citizen' ? [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Issues', path: '/my-issues', icon: AlertCircle },
    { name: 'Community', path: '/dashboard/community', icon: MessageSquare },
  ] : [
    { name: 'Dashboard', path: '/authority', icon: Activity },
    { name: 'Issues', path: '/authority/issues', icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden md:flex flex-col bg-white dark:bg-background-darkAlt border-r border-slate-200 dark:border-slate-800"
          >
            <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
              <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
                <MapPin size={24} className="text-primary" />
                Janasevak<span className="text-primary">AI</span>
              </Link>
            </div>
            
            <div className="p-6">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {role === 'authority' ? 'Authority Menu' : 'Citizen Menu'}
              </div>
              <nav className="space-y-1">
                {links.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                      }`}
                    >
                      <Icon size={20} className={isActive ? 'text-primary' : ''} />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800 space-y-1">
              <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                <Settings size={20} /> Settings
              </Link>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                <LogOut size={20} /> Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white/80 dark:bg-background-darkAlt/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors hidden md:block"
            >
              <Menu size={20} />
            </button>
            <span className="font-medium text-slate-800 dark:text-white capitalize">
              {location.pathname.split('/').pop() || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4">
             <Link to="/report" className="hidden sm:flex px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors shadow-sm shadow-primary/20">
               + New Report
             </Link>
             <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
               <Bell size={20} />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
             </button>
             <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${role}`} alt="Avatar" />
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      <FloatingChatbot />
    </div>
  );
};
