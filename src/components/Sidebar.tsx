import React from 'react';
import { 
  Crosshair, 
  Activity, 
  Brain, 
  Heart, 
  Scissors, 
  ShieldAlert, 
  Zap, 
  BookOpen, 
  Settings,
  Menu,
  X,
  Layers,
  Bone,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CATEGORIES = [
  { id: "trauma", name: "Trauma", icon: Crosshair, color: "bg-red-500", textColor: "text-red-500" },
  { id: "spine", name: "Spine", icon: Bone, color: "bg-purple-600", textColor: "text-purple-600" },
  { id: "shoulder", name: "Shoulder & Elbow", icon: Brain, color: "bg-blue-500", textColor: "text-blue-500" },
  { id: "sports", name: "Knee & Sports", icon: Heart, color: "bg-emerald-500", textColor: "text-emerald-500" },
  { id: "pediatric", name: "Pediatrics", icon: Activity, color: "bg-rose-500", textColor: "text-rose-500" },
  { id: "recon", name: "Adult Recon", icon: Layers, color: "bg-indigo-600", textColor: "text-indigo-600" },
  { id: "hand", name: "Hand", icon: Scissors, color: "bg-teal-500", textColor: "text-teal-500" },
  { id: "foot", name: "Foot & Ankle", icon: Activity, color: "bg-orange-500", textColor: "text-orange-500" },
  { id: "pathology", name: "Pathology", icon: ShieldAlert, color: "bg-indigo-500", textColor: "text-indigo-500" },
  { id: "basic", name: "Basic Science", icon: Zap, color: "bg-amber-500", textColor: "text-amber-500" },
  { id: "anatomy", name: "Anatomy", icon: BookOpen, color: "bg-cyan-500", textColor: "text-cyan-500" },
  { id: "oite2025", name: "OITE 2025", icon: Trophy, color: "bg-amber-600", textColor: "text-amber-600" },
];

export default function Sidebar({ activeCategory, onSelectCategory, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-slate-600"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[50]"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed inset-y-0 left-0 z-[55] w-72 bg-white border-r border-slate-100 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
               <Bone size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-800 uppercase italic tracking-tighter">
                Ortho<span className="text-indigo-600">Viva</span>
              </h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Surgical Academy</p>
            </div>
          </div>
        </div>

        {/* Navigation Area */}
        <div className="flex-grow overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          <div className="px-4 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Medical Specialties</div>
          
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`w-full group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                  isActive 
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${isActive ? 'bg-white shadow-sm' : 'bg-slate-50'}`}>
                  <cat.icon size={18} className={isActive ? cat.textColor : 'text-slate-400'} />
                </div>
                <span className={`text-sm font-bold tracking-tight italic ${isActive ? 'not-italic font-black uppercase tracking-tighter' : ''}`}>
                  {cat.name}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="ml-auto w-1.5 h-1.5 bg-indigo-600 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-slate-50">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-2xl transition-colors">
            <Settings size={18} />
            <span className="text-sm font-bold">Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}
