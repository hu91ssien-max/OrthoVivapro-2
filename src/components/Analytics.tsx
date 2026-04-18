import React from 'react';
import { motion } from "motion/react";
import { 
  TrendingUp, 
  Target, 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle,
  BarChart3,
  Calendar,
  Zap,
  Activity
} from 'lucide-react';

export default function Analytics() {
  const stats = [
    { label: "Questions Completed", value: "842", icon: CheckCircle2, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Overall Accuracy", value: "78%", icon: Target, iconColor: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Study Streak", value: "12 Days", icon: Zap, iconColor: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Avg. Time/Question", value: "22s", icon: Clock, iconColor: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const categoryPerformance = [
    { name: "Trauma", progress: 85, color: "bg-red-500" },
    { name: "Pediatric", progress: 62, color: "bg-rose-500" },
    { name: "Sports", progress: 91, color: "bg-emerald-500" },
    { name: "Shoulder", progress: 74, color: "bg-blue-500" },
    { name: "Anatomy", progress: 88, color: "bg-amber-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 italic uppercase tracking-tighter">
          Performance <span className="text-indigo-600">Analytics</span>
        </h1>
        <p className="text-gray-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">Advanced metrics for clinical mastery</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm transition-colors"
          >
            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor || 'text-indigo-600'}`} />
            </div>
            <span className="block text-3xl font-black text-gray-900 dark:text-white mb-1 transition-colors">{stat.value}</span>
            <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Progress Chart Placeholder */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-10 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase italic tracking-tight">Knowledge Growth</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last 30 Days Activity</p>
            </div>
            <div className="flex gap-2">
               <div className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Exam Mode</div>
               <div className="px-3 py-1.5 bg-amber-50 dark:bg-amber-500/10 rounded-xl text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">Study Mode</div>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-4">
             {[45, 60, 55, 75, 80, 70, 95, 85, 90, 100].map((h, i) => (
               <motion.div 
                 key={i}
                 initial={{ height: 0 }}
                 animate={{ height: `${h}%` }}
                 transition={{ delay: i * 0.05, duration: 1 }}
                 className="flex-1 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-t-lg relative group transition-all hover:bg-indigo-600 dark:hover:bg-indigo-500"
               >
                  <div className="absolute inset-x-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-900 text-white text-[10px] font-black py-1 px-2 rounded-lg text-center left-1/2 -translate-x-1/2">
                    {h}% Success
                  </div>
               </motion.div>
             ))}
          </div>
          <div className="flex justify-between mt-6 px-4">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">March 18</span>
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">April 18</span>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-8 shadow-sm transition-colors">
             <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase italic tracking-widest mb-8 flex items-center gap-2 transition-colors">
               <Activity className="text-indigo-600" size={18} /> Specialty Breakdown
             </h3>
             <div className="space-y-6">
               {categoryPerformance.map((cat, i) => (
                 <div key={i} className="space-y-2">
                   <div className="flex justify-between items-end">
                     <span className="text-xs font-black text-gray-700 dark:text-slate-300 uppercase tracking-tight">{cat.name}</span>
                     <span className="text-[10px] font-black text-indigo-600">{cat.progress}%</span>
                   </div>
                   <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.progress}%` }}
                        className={`h-full ${cat.color} transition-all`}
                     />
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[3rem] text-white relative overflow-hidden shadow-xl">
            <Award className="absolute top-0 right-0 p-8 opacity-10" size={120} />
            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Milestone Progress</h3>
            <p className="text-2xl font-black italic uppercase tracking-tighter mb-1">Junior Fellow</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">4,250 XP until Senior Surgical Registrar</p>
            
            <div className="flex -space-x-3">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-10 h-10 border-4 border-slate-900 bg-slate-800 rounded-full flex items-center justify-center">
                   <TrendingUp size={16} className="text-indigo-400" />
                 </div>
               ))}
               <div className="w-10 h-10 border-4 border-slate-900 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] font-bold">
                 +12
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
