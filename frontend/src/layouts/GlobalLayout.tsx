import { Outlet, Link } from 'react-router-dom';
import { Menu, Bell, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { FloatingChatbot } from '../components/shared/FloatingChatbot';

export const GlobalLayout = () => {
  return (
    <div className="min-h-screen bg-background font-sans text-slate-800 dark:text-slate-100 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:bg-background-dark/80 dark:border-slate-800/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div 
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white"
            >
              <MapPin size={24} />
            </motion.div>
            <Link to="/" className="text-xl font-bold tracking-tight">
              Janasevak<span className="text-primary">AI</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/map" className="hover:text-primary transition-colors">Public Map</Link>
            <Link to="/report" className="hover:text-primary transition-colors">Report Issue</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
              <Bell size={20} className="text-slate-600 dark:text-slate-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full border border-white dark:border-background-dark"></span>
            </button>
            <Link to="/login" className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-600 transition-colors shadow-sm shadow-primary/20">
              Sign In
            </Link>
            <button className="md:hidden p-2 text-slate-600">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-slate-50 dark:bg-background-darkAlt">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <div className="flex justify-center items-center gap-2 mb-4">
            <MapPin size={20} className="text-primary" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">Janasevak AI</span>
          </div>
          <p>Empowering Citizens. Enabling Accountability.</p>
          <p className="mt-8 opacity-60">© 2026 Janasevak AI Hackathon Project</p>
        </div>
      </footer>
      
      <FloatingChatbot />
    </div>
  );
};
