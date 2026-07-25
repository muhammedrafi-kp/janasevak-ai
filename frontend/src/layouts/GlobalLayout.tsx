import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Bell, CirclePlus, Home, ListTodo, LogOut, MapPin, Menu, UserRound, X, House, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';
import { FloatingChatbot } from '../components/shared/FloatingChatbot';
import { useUserStore } from '../store/useUserStore';

const citizenNavigation = [
  { label: 'Home', to: '/', icon: Home, end: true },
  { label: 'Report Issue', to: '/report', icon: CirclePlus },
  { label: 'My Issues', to: '/my-issues', icon: ListTodo },
  { label: 'Notifications', to: '/notifications', icon: Bell },
  { label: 'Profile', to: '/profile', icon: UserRound },
];

export const GlobalLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const navItems = [
    { label: 'Home', path: '/', icon: House },
    { label: 'Report Issue', path: '/report', icon: CirclePlus },
    { label: 'Public Map', path: '/map', icon: ClipboardList },
  ];
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 dark:text-slate-100 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#f8fafc]/90 px-4 pt-4 backdrop-blur-md sm:px-6 sm:pt-5">
        <div className="mx-auto flex h-[70px] max-w-none items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 shadow-sm sm:px-7">
          <Link to="/" className="flex items-center gap-2.5">
            <motion.div 
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-primary text-white shadow-sm shadow-blue-500/30"
            >
              <MapPin size={24} />
            </motion.div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Jana <span className="text-primary">Sevak</span></span>
          </Link>

          <nav className="hidden h-full items-center gap-2 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className={`relative flex h-full items-center gap-2 px-4 text-sm font-medium transition-colors ${active ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}>
                  <Icon size={19} /> {item.label}
                  {active && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button aria-label="Notifications" className="relative rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
              <Bell size={20} className="text-slate-600 dark:text-slate-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full border border-white dark:border-background-dark"></span>
            </button>
            {!isAuthenticated ? (
              <Link to="/login" className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm shadow-primary/20 transition-colors hover:bg-primary-600 sm:flex">
                Sign In
              </Link>
            ) : (
              <Link to="/dashboard" className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm shadow-primary/20 transition-colors hover:bg-primary-600 sm:flex">
                Dashboard
              </Link>
            )}
            <button aria-label="Open navigation menu" className="p-2 text-slate-600 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && <nav aria-label="Mobile citizen navigation" className="border-t border-slate-200 bg-white px-5 py-3 shadow-lg lg:hidden">{citizenNavigation.map(({ label, to, icon: Icon, end }) => <NavLink key={to} to={to} end={end} onClick={closeMobileMenu} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold ${isActive ? 'bg-primary-50 text-primary' : 'text-slate-700 hover:bg-slate-50'}`}><Icon size={19} />{label}</NavLink>)}<button type="button" onClick={() => { closeMobileMenu(); navigate('/login'); }} className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-primary"><LogOut size={19} />Sign Out</button></nav>}
      </header>

      <main className="flex-1 flex flex-col"><Outlet /></main>

      {/* Footer */}
      <footer className="mt-4 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-background-darkAlt">
        <div className="mx-auto flex max-w-none flex-col gap-5 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
              <MapPin size={19} className="text-primary" /> Jana Sevak
            </Link>
            <p className="mt-2">Empowering citizens. Enabling accountability.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/report" className="transition-colors hover:text-primary">Report an issue</Link>
            <Link to="/map" className="transition-colors hover:text-primary">Public map</Link>
            <Link to="/login" className="transition-colors hover:text-primary">Sign in</Link>
            <span className="text-slate-400">© 2026 Jana Sevak</span>
          </div>
        </div>
      </footer>
      
      <FloatingChatbot />
    </div>
  );
};
