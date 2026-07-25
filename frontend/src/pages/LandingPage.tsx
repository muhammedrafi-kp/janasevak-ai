import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, CheckCircle, AlertTriangle, Users, BarChart3, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export const LandingPage = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-[-1] bg-slate-50 dark:bg-background-dark overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
              <Sparkles size={16} />
              <span>AI-Powered Civic Issue Resolution</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
              Transform Civic Complaints <br className="hidden lg:block" />
              into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Community Action</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Empowering citizens to report public issues instantly. Our AI categorizes and prioritizes problems while authorities manage and resolve them transparently.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/report">
                <Button size="lg" className="w-full sm:w-auto gap-2 rounded-full shadow-xl shadow-primary/20">
                  Report an Issue <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/map">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 rounded-full bg-white/50 backdrop-blur-sm">
                  <MapPin size={18} /> View Public Map
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Floating UI Elements Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="aspect-[16/9] md:aspect-[21/9] rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-slate-800/60 shadow-2xl overflow-hidden relative flex items-center justify-center">
              
              {/* Map Placeholder Graphic */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-300 via-transparent to-transparent"></div>
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-10 md:top-20 md:left-20 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-start gap-4 max-w-[240px]"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Pothole Reported</h4>
                  <p className="text-xs text-slate-500 mt-1">MG Road • High Priority</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 right-10 md:bottom-20 md:right-32 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-start gap-4 max-w-[240px]"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Issue Resolved</h4>
                  <p className="text-xs text-slate-500 mt-1">Streetlight Fixed in 2hrs</p>
                </div>
              </motion.div>

              <div className="text-center z-10 p-8">
                 <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-4 shadow-inner">
                    <MapPin size={40} />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Interactive Civic Map</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-background-darkAlt/40 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Complaints Solved', value: '10,000+', icon: CheckCircle, color: 'text-secondary' },
              { label: 'Resolution Rate', value: '95%', icon: BarChart3, color: 'text-primary' },
              { label: 'Departments', value: '50+', icon: Users, color: 'text-accent' },
              { label: 'Citizens Connected', value: '100K+', icon: MapPin, color: 'text-blue-500' },
            ].map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="text-center"
              >
                <div className={`mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</h3>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How Janasevak Works</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">A seamless four-step process connecting citizens directly to the solution.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-slate-200 via-primary/50 to-slate-200 dark:from-slate-800 dark:via-primary/50 dark:to-slate-800 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Capture Photo', desc: 'Snap a picture of the civic issue' },
                { step: '2', title: 'AI Analysis', desc: 'Auto-categorization & priority detection' },
                { step: '3', title: 'Authority Review', desc: 'Assigned to correct department' },
                { step: '4', title: 'Issue Resolved', desc: 'Real-time updates to citizens' },
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  key={i} 
                  className="relative z-10 flex flex-col items-center text-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 group hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary to-primary-700 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to make a difference?</h2>
              <p className="text-primary-100 mb-10 text-lg">Join thousands of citizens actively improving their communities through Janasevak AI.</p>
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 rounded-full px-8 text-lg">
                  Start Reporting Today
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
