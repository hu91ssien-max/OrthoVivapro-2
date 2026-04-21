import React from 'react';
import { motion } from "motion/react";
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Bell, 
  Settings, 
  LogOut, 
  Award,
  Stethoscope,
  ChevronRight,
  Database,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProfileProps {
  onBack?: () => void;
}

export default function Profile({ onBack }: ProfileProps) {
  const { user, logout } = useAuth();

  const achievements = [
    { title: "First Incision", date: "April 02, 2026", icon: Award, color: "text-amber-500" },
    { title: "Trauma Specialist", date: "April 10, 2026", icon: Award, color: "text-red-500" },
    { title: "Pathology Expert", date: "April 15, 2026", icon: Award, color: "text-indigo-500" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {onBack && (
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="font-bold text-xs uppercase tracking-widest">Back to Dashboard</span>
        </button>
      )}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-black text-gray-900 mb-2 italic uppercase tracking-tighter">
          User <span className="text-indigo-600">Profile</span>
        </h1>
        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest transition-colors">Medical certification roadmap</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Info */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm transition-colors">
            <div className="flex items-center gap-8 mb-10">
              <div className="w-24 h-24 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center italic font-black text-5xl shadow-2xl shadow-indigo-600/30">
                {user?.username?.[0].toUpperCase() || "H"}
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900 italic uppercase tracking-tight transition-colors">
                  Dr. {user?.username || "Hussein"}
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full transition-colors">Senior Resident</span>
                  <span className="flex items-center gap-1.5 text-gray-400 text-[10px] font-black uppercase tracking-widest transition-colors"><ShieldCheck size={14} className="text-emerald-500" /> Verified Surgeon</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-slate-50 transition-colors">
               <div className="space-y-1">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Email Address</span>
                 <p className="font-bold text-gray-900 flex items-center gap-2 transition-colors">
                   <Mail size={16} className="text-indigo-600" /> {user?.username || "hussein"}@orthoviva.pro
                 </p>
               </div>
               <div className="space-y-1">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Role Assignment</span>
                 <p className="font-bold text-gray-900 flex items-center gap-2 transition-colors">
                   <Lock size={16} className="text-indigo-600" /> {user?.role === 'admin' ? 'System Administrator' : 'Clinical Scholar'}
                 </p>
               </div>
            </div>
          </section>

          <section className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm transition-colors">
             <h3 className="text-xl font-black text-gray-900 uppercase italic tracking-tight mb-8 transition-colors">Security & System</h3>
             <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-600 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transition-colors">
                       <Bell size={20} className="text-gray-400" />
                    </div>
                    <span className="font-bold text-gray-700 transition-colors">Notifications & Alerts</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
                </button>

                <button className="w-full flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-600 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transition-colors">
                       <Database size={20} className="text-gray-400" />
                    </div>
                    <span className="font-bold text-gray-700 transition-colors">Data Management & Privacy</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
                </button>

                <button className="w-full flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-600 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transition-colors">
                       <Settings size={20} className="text-gray-400" />
                    </div>
                    <span className="font-bold text-gray-700 transition-colors">Interface Preferences</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
                </button>
             </div>
          </section>
        </div>

        {/* Right Col: Badges */}
        <div className="lg:col-span-4 space-y-8">
           <section className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <Award size={100} />
             </div>
             <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">Credential Portfolio</h3>
             <div className="space-y-6">
                {achievements.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-black italic text-sm tracking-tight">{item.title}</h4>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.date}</p>
                    </div>
                  </div>
                ))}
             </div>
             
             <div className="mt-10 pt-8 border-t border-white/10 text-center">
                <button 
                  onClick={logout}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  <LogOut size={16} /> Logout System
                </button>
             </div>
           </section>

           <section className="bg-white border border-slate-100 rounded-[3rem] p-8 shadow-sm transition-colors text-center">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                <Stethoscope size={32} />
              </div>
              <h4 className="text-sm font-black text-gray-900 uppercase italic tracking-tight transition-colors">Certifications</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest transition-colors">0 Pending Verification</p>
           </section>
        </div>
      </div>
    </div>
  );
}
