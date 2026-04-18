import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain, 
  Heart, 
  Activity, 
  Thermometer, 
  ShieldAlert, 
  Crosshair, 
  BookOpen, 
  Presentation, 
  Search, 
  Zap, 
  Scissors 
} from "lucide-react";

interface DashboardProps {
  onSelect: (category: string, mode: "revision" | "mcq" | "study") => void;
}

const CATEGORIES = [
  { id: "trauma", name: "Trauma & Fractures", icon: Crosshair, count: 120, color: "bg-red-500/10 text-red-500 border-red-500/20" },
  { id: "pediatric", name: "Pediatric Ortho", icon: Activity, count: 85, color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
  { id: "sports", name: "Sports Medicine", icon: Heart, count: 94, color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  { id: "shoulder", name: "Shoulder & Elbow", icon: Brain, count: 110, color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  { id: "hand", name: "Hand & Wrist", icon: Scissors, count: 68, color: "bg-teal-500/10 text-teal-500 border-teal-500/20" },
  { id: "foot", name: "Foot & Ankle", icon: Activity, count: 72, color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  { id: "pathology", name: "Bone Pathology", icon: ShieldAlert, count: 45, color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
  { id: "recon", name: "Adult Reconstruction", icon: Activity, count: 65, color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  { id: "anatomy", name: "Surgical Anatomy", icon: BookOpen, count: 130, color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  { id: "basic", name: "Basic Science", icon: Presentation, count: 115, color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20" },
];

export default function Dashboard({ onSelect }: DashboardProps) {
  const [greeting, setGreeting] = useState("Hello");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const updateGreeting = () => {
      const baghdadHour = parseInt(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Baghdad',
          hour: 'numeric',
          hour12: false
        }).format(new Date())
      );

      if (baghdadHour < 12) setGreeting("Good Morning");
      else if (baghdadHour < 17) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };

    updateGreeting();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 italic uppercase tracking-tighter transition-colors">
              {greeting}, <span className="text-indigo-600">Dr. Hussein</span>
            </h1>
            <p className="text-gray-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest transition-colors">Select clinical specialty to begin evaluation</p>
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
             <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl transition-colors">
                <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">Accuracy</span>
                <span className="text-xl font-black text-gray-900 dark:text-white transition-colors">84%</span>
             </div>
             <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl transition-colors">
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Credits</span>
                <span className="text-xl font-black text-gray-900 dark:text-white transition-colors">1,240</span>
             </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto md:mx-0">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-slate-500">
            <Search size={20} />
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search specialties or topics (e.g. Femur, Hand, Anatomy)..."
            className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold placeholder:text-gray-400 dark:placeholder:text-slate-600 focus:border-indigo-600 focus:outline-none transition-all shadow-sm"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`p-8 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group relative flex flex-col h-full overflow-hidden`}
            >
              <div className={`p-4 rounded-2xl mb-6 w-fit ${cat.color} border dark:border-slate-700 shadow-inner transition-transform group-hover:scale-110`}>
                <cat.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight italic uppercase transition-colors">{cat.name}</h3>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {cat.count} Validated Questions
              </p>

              <div className="space-y-4 mt-auto">
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => onSelect(cat.id, "revision")}
                    className="flex items-center justify-center gap-3 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Presentation size={16} />
                    Guides
                  </button>
                  <button 
                    onClick={() => onSelect(cat.id, "mcq")}
                    className="flex items-center justify-center gap-3 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
                  >
                    <BookOpen size={16} />
                    Exam
                  </button>
                </div>
                
                <button 
                  onClick={() => onSelect(cat.id, "study")}
                  className="w-full flex items-center justify-center gap-3 py-3 bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all group/study"
                >
                  <Zap size={16} className="transition-transform group-hover/study:scale-125" />
                  Study Mode
                </button>
              </div>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full pointer-events-none group-hover:scale-150 transition-transform duration-500" />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredCategories.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-gray-400 dark:text-slate-600 font-bold uppercase tracking-widest italic text-xl">No specialties found for "{searchQuery}"</p>
          </div>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-8 bg-indigo-900 rounded-3xl text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Practice Mode: Active</h2>
          <p className="text-indigo-200 mb-6 max-w-lg">Track your progress and identify knowledge gaps with our AI-powered analytics engine.</p>
          <button className="px-6 py-2.5 bg-white text-indigo-900 rounded-full font-bold text-sm hover:bg-indigo-50 transition-colors">
            View Analytics
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500 rounded-full -ml-10 -mb-10 blur-2xl opacity-20" />
      </motion.div>
    </div>
  );
}
