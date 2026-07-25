import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Mail, Lock, ArrowRight, User, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export const SignupPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'citizen' | 'authority'>('citizen');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard'); // Mock login
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl mix-blend-screen -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 text-white p-12 max-w-lg text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md mb-8 border border-white/20">
              <MapPin size={40} className="text-secondary-100" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Join Janasevak</h2>
            <p className="text-slate-300 text-lg">Become part of a platform that bridges the gap between citizens and authorities.</p>
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
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create Account</h2>
            <p className="text-slate-500 mt-2">Sign up to start reporting issues</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setRole('citizen')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${role === 'citizen' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                Citizen
              </button>
              <button
                type="button"
                onClick={() => setRole('authority')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${role === 'authority' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                Authority
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input type="text" placeholder="John Doe" className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input type="email" placeholder="citizen@example.com" className="pl-10" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input type="tel" placeholder="+91 98765 43210" className="pl-10" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>

            {role === 'authority' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Department ID</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input type="text" placeholder="DEP-1234" className="pl-10" required />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full mt-6 gap-2 bg-secondary hover:bg-secondary-600 text-white">
              Create Account <ArrowRight size={18} />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
