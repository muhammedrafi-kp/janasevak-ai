import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard'); // Mock login
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl mix-blend-screen -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 text-white p-12 max-w-lg text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md mb-8 border border-white/20">
              <MapPin size={40} className="text-primary-100" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Welcome back to Janasevak</h2>
            <p className="text-slate-300 text-lg">Continue building a better community, one resolved issue at a time.</p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 dark:bg-background-dark">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md bg-white dark:bg-background-darkAlt p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sign In</h2>
            <p className="text-slate-500 mt-2">Enter your details to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input type="email" placeholder="citizen@example.com" className="pl-10" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>

            <Button type="submit" className="w-full mt-6 gap-2">
              Sign In <ArrowRight size={18} />
            </Button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
            <span className="text-xs text-slate-500 uppercase font-medium tracking-wider">Or continue with</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
            {/* <Button variant="outline" className="w-full">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button> */}
          </div>

          <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
