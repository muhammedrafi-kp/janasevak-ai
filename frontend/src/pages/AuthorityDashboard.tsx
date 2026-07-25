import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { AlertCircle, CheckCircle2, Clock, MapPin, TrendingUp, AlertTriangle, Filter, Map } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';

const categoryData = [
  { name: 'Roads', value: 45 },
  { name: 'Sanitation', value: 30 },
  { name: 'Water', value: 20 },
  { name: 'Electrical', value: 15 },
  { name: 'Other', value: 10 },
];
const COLORS = ['#1D4ED8', '#10B981', '#F97316', '#8B5CF6', '#64748B'];

const activityData = [
  { name: 'Mon', new: 12, resolved: 8 },
  { name: 'Tue', new: 19, resolved: 15 },
  { name: 'Wed', new: 15, resolved: 20 },
  { name: 'Thu', new: 22, resolved: 18 },
  { name: 'Fri', new: 28, resolved: 25 },
  { name: 'Sat', new: 15, resolved: 10 },
  { name: 'Sun', new: 10, resolved: 5 },
];

const criticalIssues = [
  { id: '101', title: 'Main Water Pipe Burst', location: 'Downtown Hub', time: '1 hour ago', priority: 'Critical' },
  { id: '102', title: 'Fallen Tree Blocking Road', location: 'Highway 42', time: '3 hours ago', priority: 'High' },
  { id: '103', title: 'Open Manhole', location: 'School District', time: '4 hours ago', priority: 'Critical' },
];

export const AuthorityDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Command Center</h1>
          <p className="text-slate-500">City operations overview for the past 7 days.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter size={16} /> Filter
          </Button>
          <Button className="gap-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
            Generate Report
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Pending Issues', value: '142', change: '+12%', icon: Clock, color: 'text-orange-500', trend: 'up' },
          { title: 'In Progress', value: '56', change: '-5%', icon: TrendingUp, color: 'text-blue-500', trend: 'down' },
          { title: 'Resolved (7d)', value: '328', change: '+24%', icon: CheckCircle2, color: 'text-green-500', trend: 'up' },
          { title: 'Critical Alerts', value: '12', change: '+2', icon: AlertTriangle, color: 'text-red-500', trend: 'up' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800 ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.trend === 'up' && stat.title !== 'Pending Issues' && stat.title !== 'Critical Alerts' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                    stat.trend === 'down' && stat.title === 'In Progress' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Activity Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="new" fill="#F97316" radius={[4, 4, 0, 0]} name="New Reports" />
                    <Bar dataKey="resolved" fill="#10B981" radius={[4, 4, 0, 0]} name="Resolved" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertCircle size={20} /> Critical Attention Required
              </CardTitle>
              <Badge variant="destructive">{criticalIssues.length} Active</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {criticalIssues.map((issue) => (
                <div key={issue.id} className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-100 dark:border-red-900/50">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{issue.title}</h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <MapPin size={12} /> {issue.location} • <Clock size={12} /> {issue.time}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-100">
                    Dispatch Team
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* AI Summary Panel */}
          <Card className="border-primary/20 bg-primary-50/50 dark:bg-primary-900/10">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                ✨ AI Daily Briefing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                "There is a <strong>40% surge</strong> in water leakage complaints in the Northern District over the past 48 hours. Suggesting preventive maintenance dispatch to sectors 4 and 5."
              </p>
              <Button size="sm" className="w-full">
                Review Suggestions
              </Button>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Issues by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {categoryData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                      <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Map Preview Mock */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                Live Heatmap
                <Link to="/map" className="text-xs text-primary font-medium hover:underline">Full Map</Link>
              </CardTitle>
            </CardHeader>
            <div className="h-48 bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center m-4 rounded-xl border border-slate-200 dark:border-slate-700">
               <Map size={32} className="text-slate-400" />
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               {/* Mock Hotspots */}
               <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-red-500/40 rounded-full blur-md"></div>
               <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-orange-500/40 rounded-full blur-md"></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
