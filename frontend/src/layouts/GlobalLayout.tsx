import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Bell, CirclePlus, Home, ListTodo, LogOut, MapPin, Menu, UserRound, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { FloatingChatbot } from '../components/shared/FloatingChatbot';

const citizenNavigation = [
  { label: 'Home', to: '/', icon: Home, end: true },
  { label: 'Report Issue', to: '/report', icon: CirclePlus },
  { label: 'My Issues', to: '/my-issues', icon: ListTodo },
  { label: 'Notifications', to: '/notifications', icon: Bell },
  { label: 'Profile', to: '/profile', icon: UserRound },
];

export const GlobalLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-background font-sans text-slate-800 dark:text-slate-100 flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/95">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-8">
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            <motion.div initial={{ rotate: -10, scale: 0.9 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white"><MapPin size={24} /></motion.div>
            <span>janasevak<span className="text-primary">.ai</span></span>
          </Link>

          <nav aria-label="Citizen navigation" className="hidden h-full items-center gap-2 lg:flex">
            {citizenNavigation.map(({ label, to, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `relative flex h-full items-center gap-2 px-4 text-sm font-semibold transition-colors ${isActive ? 'text-primary after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-primary' : 'text-slate-600 hover:text-primary dark:text-slate-300'}`}>{({ isActive }) => <><Icon size={19} strokeWidth={isActive ? 2.5 : 2} />{label}</>}</NavLink>)}
          </nav>

          <div className="flex items-center gap-2"><button type="button" aria-label="Open navigation menu" aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden">{isMobileMenuOpen ? <X size={23} /> : <Menu size={23} />}</button><button type="button" onClick={() => navigate('/login')} className="hidden items-center gap-2 rounded-xl border border-primary/30 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary-50 sm:flex"><LogOut size={18} />Sign Out</button></div>
        </div>

        {isMobileMenuOpen && <nav aria-label="Mobile citizen navigation" className="border-t border-slate-200 bg-white px-5 py-3 shadow-lg lg:hidden">{citizenNavigation.map(({ label, to, icon: Icon, end }) => <NavLink key={to} to={to} end={end} onClick={closeMobileMenu} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold ${isActive ? 'bg-primary-50 text-primary' : 'text-slate-700 hover:bg-slate-50'}`}><Icon size={19} />{label}</NavLink>)}<button type="button" onClick={() => { closeMobileMenu(); navigate('/login'); }} className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-primary"><LogOut size={19} />Sign Out</button></nav>}
      </header>

      <main className="flex-1 flex flex-col"><Outlet /></main>

      <footer className="border-t border-slate-200 bg-slate-50 py-10 dark:border-slate-800 dark:bg-background-darkAlt"><div className="mx-auto max-w-[1440px] px-5 text-center text-sm text-slate-500"><div className="mb-3 flex items-center justify-center gap-2"><MapPin size={19} className="text-primary" /><span className="font-semibold text-slate-700 dark:text-slate-300">janasevak.ai</span></div><p>Empowering Citizens. Enabling Accountability.</p></div></footer>
      <FloatingChatbot />
    </div>
  );
};
