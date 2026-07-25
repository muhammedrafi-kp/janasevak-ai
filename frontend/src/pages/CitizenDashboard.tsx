import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { FileText, CheckCircle2, Clock, Users, ArrowRight, Zap, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Link } from 'react-router-dom';

const impactData = [
  { name: 'Jan', reports: 2, resolved: 1 },
  { name: 'Feb', reports: 3, resolved: 2 },
  { name: 'Mar', reports: 5, resolved: 4 },
  { name: 'Apr', reports: 4, resolved: 4 },
  { name: 'May', reports: 7, resolved: 5 },
  { name: 'Jun', reports: 8, resolved: 7 },
];

const recentComplaints = [
  { id: '1', title: 'Pothole on Main St', status: 'In Progress', date: '2 days ago', category: 'Roads', priority: 'High' },
  { id: '2', title: 'Streetlight completely broken', status: 'Resolved', date: '1 week ago', category: 'Electrical', priority: 'Medium' },
  { id: '3', title: 'Garbage not collected', status: 'Pending', date: 'Just now', category: 'Sanitation', priority: 'Low' },
];

export const CitizenDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, John!</h1>
          <p className="text-slate-500">Here's what's happening in your community today.</p>
        </div>
        <Link to="/report">
          <Button className="gap-2 rounded-full">
            <MapPin size={16} /> New Report
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Reports', value: '12', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
          { title: 'Resolved', value: '8', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
          { title: 'Pending', value: '4', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
          { title: 'Community Rank', value: 'Top 10%', icon: Users, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Your Impact Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={impactData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="reports" stroke="#1D4ED8" strokeWidth={2} fillOpacity={1} fill="url(#colorReports)" />
                    <Area type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Complaints */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Complaints</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentComplaints.map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <FileText size={18} className="text-slate-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{complaint.title}</h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <span>{complaint.category}</span>
                        <span>•</span>
                        <span>{complaint.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={
                      complaint.status === 'Resolved' ? 'success' : 
                      complaint.status === 'In Progress' ? 'warning' : 'secondary'
                    }>
                      {complaint.status}
                    </Badge>
                    <Link to={`/complaint/${complaint.id}`} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                      Details <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          
          {/* AI Insights Card */}
          <Card className="bg-gradient-to-br from-primary-50 to-white dark:from-slate-800 dark:to-background-darkAlt border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-primary font-semibold mb-4">
                <Zap size={20} className="fill-primary text-primary" />
                AI Assistant Insight
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                "Based on your recent reports, there is a high frequency of streetlight issues in your area. I have automatically alerted the Electrical Department to conduct a wider survey."
              </p>
              <Button variant="outline" className="w-full text-xs">
                View Similar Issues
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
                <MapPin size={18} /> View nearby issues
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
                <Users size={18} /> Join community forum
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
                <FileText size={18} /> Download my report history
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};
