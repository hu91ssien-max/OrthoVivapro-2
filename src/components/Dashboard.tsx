import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain, 
  Heart, 
  Activity, 
  ShieldAlert, 
  Crosshair, 
  BookOpen, 
  Presentation, 
  Zap, 
  History,
  ChevronRight,
  TrendingUp,
  Target,
  Clock,
  Sparkles,
  Search,
  Command,
  ArrowRight,
  Trophy
} from "lucide-react";
import { CATEGORIES } from "./Sidebar";

interface DashboardProps {
  onSelect: (category: string, mode: "revision" | "mcq" | "study") => void;
  recentItem?: { id: string, name: string, mode: string } | null;
  activeCategory: string;
}

const SEARCHABLE_TOPICS = [
  ...CATEGORIES.map(c => ({ id: c.id, name: c.name, type: 'Specialty', icon: c.icon, textColor: c.textColor })),
  { id: 'trauma', name: 'Femur Fractures', type: 'Topic', icon: Crosshair, textColor: 'text-red-500' },
  { id: 'trauma', name: 'AO Classification', type: 'Topic', icon: Crosshair, textColor: 'text-red-500' },
  { id: 'pediatric', name: 'DDH', type: 'Topic', icon: Activity, textColor: 'text-rose-500' },
  { id: 'pediatric', name: 'Coxa Vara', type: 'Topic', icon: Activity, textColor: 'text-rose-500' },
  { id: 'pediatric', name: 'Osteogenesis Imperfecta', type: 'Topic', icon: Activity, textColor: 'text-rose-500' },
  { id: 'pediatric', name: 'SUFE', type: 'Topic', icon: Activity, textColor: 'text-rose-500' },
  { id: 'sports', name: 'ACL Reconstruction', type: 'Topic', icon: Heart, textColor: 'text-emerald-500' },
  { id: 'basic', name: 'Osteoarthritis Atlas', type: 'Clinical Tool', icon: Activity, textColor: 'text-blue-600' },
  { id: 'recon', name: 'THA Fixation', type: 'Topic', icon: Zap, textColor: 'text-indigo-600' },
  { id: 'oite2025', name: 'AAOS OITE 2025', type: 'Exam', icon: Trophy, textColor: 'text-amber-600' }
];

export default function Dashboard({ onSelect, recentItem, activeCategory }: DashboardProps) {
  const [greeting, setGreeting] = useState("Hello");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const currentCategory = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = searchRef.current?.querySelector('input');
        if (input) input.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredResults = searchQuery.length > 1 
    ? SEARCHABLE_TOPICS.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

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
    <div className="w-full px-4 md:px-8 py-12 pb-20 mt-4">
      <motion.div 
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        {/* Search Bar Block */}
        <div className="relative z-50 max-w-2xl" ref={searchRef}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search specialties, high-yield topics, or guidelines (e.g. DDH, ACL)..."
              className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold placeholder:text-slate-400 text-slate-900 focus:border-indigo-600 focus:outline-none transition-all shadow-sm"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <Command size={10} /> K
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showSearchResults && filteredResults.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute mt-2 w-full bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden z-[60]"
              >
                <div className="p-2">
                  {filteredResults.map((result, idx) => (
                    <button
                      key={`${result.id}-${idx}`}
                      onClick={() => {
                        onSelect(result.id, result.type === 'Exam' ? 'mcq' : 'revision');
                        setSearchQuery("");
                        setShowSearchResults(false);
                      }}
                      className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-[1.5rem] transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl bg-slate-50 group-hover:bg-white transition-colors`}>
                          <result.icon size={18} className={result.textColor} />
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-black text-slate-800 uppercase tracking-tight">{result.name}</div>
                          <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{result.type}</div>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-slate-200 group-hover:text-indigo-600 transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="mb-8">
              <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-slate-400 italic mb-1">Apley and Solomon’s</div>
              <div className="text-[12px] sm:text-sm font-black uppercase tracking-[0.2em] text-indigo-600 italic">System of Orthopaedics and Trauma</div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl bg-white shadow-sm border border-slate-100`}>
                <currentCategory.icon className={currentCategory.textColor} size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Specialty Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 italic uppercase tracking-tighter leading-none">
              {currentCategory.name} <br />
              <span className="text-indigo-600">Learning Center</span>
            </h1>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest leading-relaxed max-w-xl">
              Access high-yield revision guides, validated examination modules, and clinical case simulations.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 min-w-[200px]">
              <div className="flex items-center gap-2 mb-3">
                <Target size={14} className="text-indigo-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Specialty Mastery</span>
              </div>
              <div className="text-3xl font-black text-slate-900">74%</div>
              <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[74%]" />
              </div>
            </div>
            <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 min-w-[200px]">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Questions Solved</span>
              </div>
              <div className="text-3xl font-black text-slate-900">1,240</div>
              <div className="text-[10px] font-bold text-emerald-600 mt-2 uppercase tracking-widest">+12 Today</div>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.button
            whileHover={{ y: -5 }}
            onClick={() => onSelect(activeCategory, "revision")}
            className="p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all text-left flex flex-col group"
          >
            <div className="p-4 bg-indigo-50 rounded-2xl w-fit mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
              <Presentation size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-2">Revision Guides</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose mb-8">Comprehensive high-yield notes and clinical pearls.</p>
            <div className="mt-auto flex items-center gap-2 text-indigo-600 font-black uppercase text-[10px] tracking-[0.2em]">
              Start Reviewing <ChevronRight size={14} />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ y: -5 }}
            onClick={() => onSelect(activeCategory, "mcq")}
            className="p-8 bg-slate-900 rounded-[2.5rem] shadow-xl hover:shadow-indigo-200/50 transition-all text-left flex flex-col group"
          >
            <div className="p-4 bg-indigo-600 rounded-2xl w-fit mb-6 text-white group-hover:scale-110 transition-transform shadow-lg shadow-indigo-600/20">
              <BookOpen size={32} />
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Examination Mode</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose mb-8">Simulate real board exams with timed feedback.</p>
            <div className="mt-auto flex items-center gap-2 text-indigo-400 font-black uppercase text-[10px] tracking-[0.2em]">
              Launch Exam <ChevronRight size={14} />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ y: -5 }}
            onClick={() => onSelect(activeCategory, "study")}
            className="p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-amber-100 transition-all text-left flex flex-col group"
          >
            <div className="p-4 bg-amber-50 rounded-2xl w-fit mb-6 text-amber-600 group-hover:scale-110 transition-transform">
              <Zap size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-2">Study Mode</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose mb-8">Un-timed practice with immediate detailed explanations.</p>
            <div className="mt-auto flex items-center gap-2 text-amber-600 font-black uppercase text-[10px] tracking-[0.2em]">
              Enter Study Hub <ChevronRight size={14} />
            </div>
          </motion.button>
        </div>

        {/* Feature Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <History className="text-indigo-600" size={18} />
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Interactive History</h2>
            </div>
            <AnimatePresence>
              {recentItem ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center gap-6 group hover:border-indigo-100 transition-colors"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Sparkles className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pick up where you left off</div>
                    <h4 className="text-lg font-black text-slate-800 uppercase italic tracking-tight">{recentItem.name}</h4>
                    <button 
                      onClick={() => onSelect(recentItem.id, recentItem.mode as any)}
                      className="mt-2 text-indigo-600 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Resume {recentItem.mode.toUpperCase()} <ChevronRight size={12} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="p-12 text-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-300 font-bold uppercase tracking-widest text-xs italic">
                  No recent clinical activity detected
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Stats / AI Insight */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Clock className="text-amber-500" size={18} />
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Learning Pace</h2>
            </div>
            <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">AI Analysis Active</span>
                </div>
                <h4 className="text-xl font-black uppercase italic tracking-tighter mb-4">"You are excelling in {currentCategory.name} Trauma cases."</h4>
                <p className="text-sm text-indigo-100 font-medium opacity-70 leading-relaxed mb-6">Your performance data suggests high retention in surgical exposures but reveals a gap in metabolic bone pathology related to this specialty.</p>
                <button className="px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest transition-all">
                  Deep Dive Analysis
                </button>
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
