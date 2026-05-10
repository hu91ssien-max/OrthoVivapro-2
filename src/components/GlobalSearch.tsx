import React, { useState, useEffect, useRef } from 'react';
import { 
  Search as SearchIcon, 
  X, 
  Command, 
  ArrowRight, 
  Activity, 
  Bone, 
  Crosshair, 
  Brain, 
  Heart, 
  Layers, 
  Scissors, 
  ShieldAlert, 
  Zap, 
  BookOpen, 
  Trophy,
  FileText,
  MousePointer2,
  BarChart3,
  Footprints
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'category' | 'topic' | 'action';
  icon: React.ReactNode;
  action: () => void;
}

interface GlobalSearchProps {
  onNavigate: (page: string, category?: string, extra?: any) => void;
}

const SEARCH_DATA = [
  // Categories (Specialties)
  { id: 'trauma', title: 'Trauma', description: 'Fractures, dislocations, and emergency orthopedics (الكسور والاصابات)', category: 'Specialty', type: 'category', icon: <Crosshair className="text-red-500" /> },
  { id: 'spine', title: 'Spine', description: 'Deformity, degenerative, and spinal trauma (العمود الفقري)', category: 'Specialty', type: 'category', icon: <Bone className="text-purple-600" /> },
  { id: 'shoulder', title: 'Shoulder & Elbow', description: 'Upper extremity reconstruction (الكتف والمرفق)', category: 'Specialty', type: 'category', icon: <Brain className="text-blue-500" /> },
  { id: 'sports', title: 'Knee & Sports', description: 'ACL, Meniscus, and sports medicine (الطب الرياضي)', category: 'Specialty', type: 'category', icon: <Heart className="text-emerald-500" /> },
  { id: 'pediatric', title: 'Pediatrics', description: 'Congenital and developmental orthopedics (الاطفال)', category: 'Specialty', type: 'category', icon: <Activity className="text-rose-500" /> },
  { id: 'recon', title: 'Adult Recon', description: 'Hip and Knee Arthroplasty (تبديل المفاصل)', category: 'Specialty', type: 'category', icon: <Layers className="text-indigo-600" /> },
  { id: 'hand', title: 'Hand', description: 'Hand surgery and microsurgery (جراحة اليد)', category: 'Specialty', type: 'category', icon: <Scissors className="text-teal-500" /> },
  { id: 'foot', title: 'Foot & Ankle', description: 'Foot reconstruction and trauma (القدم والكاحل)', category: 'Specialty', type: 'category', icon: <Activity className="text-orange-500" /> },
  { id: 'pathology', title: 'Pathology', description: 'Bone tumors and lesions (الاورام)', category: 'Specialty', type: 'category', icon: <ShieldAlert className="text-indigo-500" /> },
  { id: 'basic', title: 'Basic Science', description: 'Biomechanics and biology (العلوم الاساسية)', category: 'Specialty', type: 'category', icon: <Zap className="text-amber-500" /> },
  
  // Specific Topics - Spine
  { id: 'tlics', title: 'TLICS Score / Spine Stability', description: 'Thoracolumbar Injury Classification and Severity (تصنيف الإصابة)', category: 'Spine', type: 'topic', icon: <FileText className="text-purple-400" /> },
  { id: 'discectomy', title: 'Lumbar Discectomy', description: 'Microdiscectomy technique and indications (استئصال الانزلاق الغضروفي)', category: 'Spine', type: 'topic', icon: <Scissors className="text-blue-400" /> },

  // Specific Topics - Pediatrics
  { id: 'ddh', title: 'DDH Revision', description: 'Developmental Dysplasia of the Hip (خلع الورك الولادي)', category: 'Pediatrics', type: 'topic', icon: <FileText className="text-rose-400" /> },
  { id: 'ctev', title: 'Clubfoot Hub', description: 'CTEV Pathoanatomy & Ponseti Protocol (القدم المخلبية)', category: 'Pediatrics', type: 'topic', icon: <Footprints className="text-rose-400" /> },
  { id: 'verticalTalus', title: 'Vertical Talus Hub', description: 'The Rigid Flatfoot & Dobbs Technique (الخلع الولادي لعظمة الكاحل)', category: 'Pediatrics', type: 'topic', icon: <SearchIcon className="text-indigo-400" /> },
  { id: 'radialNeck', title: 'Radial Neck Hub', description: 'O\'Brien classification and reduction (كسر عنق الكعبرة)', category: 'Pediatrics', type: 'topic', icon: <FileText className="text-rose-400" /> },
  { id: 'coxaVara', title: 'Coxa Vara', description: 'Pediatric coxa vara revision (فخذ أفحج)', category: 'Pediatrics', type: 'topic', icon: <FileText className="text-rose-400" /> },
  { id: 'oi', title: 'Osteogenesis Imperfecta', description: 'OI classification and management (العظم الزجاجي)', category: 'Pediatrics', type: 'topic', icon: <FileText className="text-rose-400" /> },
  { id: 'osteochondroma', title: 'Osteochondroma', description: 'Cartilage-capped exostosis (ورم عظمي غضروفي)', category: 'Pediatrics', type: 'topic', icon: <FileText className="text-teal-400" /> },
  
  // Specific Topics - Trauma
  { id: 'femoral_shaft', title: 'Femoral Shaft Fractures', description: 'Nailing and plating (كسور عظم الفخذ)', category: 'Trauma', type: 'topic', icon: <FileText className="text-red-400" /> },
  { id: 'intertrochanteric', title: 'Intertrochanteric Fractures', description: 'DHS vs IM Nail (كسور المدورين)', category: 'Trauma', type: 'topic', icon: <FileText className="text-red-400" /> },
  { id: 'subtrochanteric', title: 'Subtrochanteric Fractures', description: 'Difficult reductions (كسور تحت المدورين)', category: 'Trauma', type: 'topic', icon: <FileText className="text-red-400" /> },
  { id: 'femoral_neck', title: 'Femoral Neck Fractures', description: 'Garden and Pauwels classification', category: 'Trauma', type: 'topic', icon: <FileText className="text-red-400" /> },
  { id: 'distal_femur', title: 'Distal Femur', description: 'AO/OTA classification and management', category: 'Trauma', type: 'topic', icon: <FileText className="text-red-400" /> },
  { id: 'pelvic_ring', title: 'Pelvic Ring', description: 'Young-Burgess and hemorrhage control', category: 'Trauma', type: 'topic', icon: <FileText className="text-red-400" /> },

  // Adult Recon
  { id: 'tha', title: 'THA Fixation', description: 'Total Hip Arthroplasty (تبديل مفصل الورك)', category: 'Adult Recon', type: 'topic', icon: <FileText className="text-indigo-400" /> },

  // Pathology
  { id: 'oncology', title: 'Oncology Master', description: 'Tumor classification and triage (الاورام العظمية)', category: 'Pathology', type: 'topic', icon: <ShieldAlert className="text-indigo-500" /> },
  { id: 'synoneuro', title: 'SynoNeuro Lab', description: 'Synovial and nerve tumors', category: 'Pathology', type: 'topic', icon: <ShieldAlert className="text-indigo-500" /> },
  { id: 'metalab', title: 'Meta Lab', description: 'Metastatic bone disease (النقائل العظمية)', category: 'Pathology', type: 'topic', icon: <ShieldAlert className="text-indigo-500" /> },

  // Actions
  { id: 'mcq', title: 'Practice Questions', description: 'Open the question bank (أسئلة واختبارات)', category: 'Actions', type: 'action', icon: <Trophy className="text-amber-600" /> },
  { id: 'analytics', title: 'Performance Analytics', description: 'View your progress (التحليلات)', category: 'Actions', type: 'action', icon: <BarChart3 className="text-emerald-500" /> },
  { id: 'profile', title: 'Clinical Profile', description: 'User settings and profile (الحساب الشخصي)', category: 'Actions', type: 'action', icon: <MousePointer2 className="text-indigo-400" /> },
];

export default function GlobalSearch({ onNavigate }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof SEARCH_DATA>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const filtered = SEARCH_DATA.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: typeof SEARCH_DATA[0]) => {
    setIsOpen(false);
    setQuery('');
    
    if (item.type === 'category') {
      onNavigate('dashboard', item.id);
    } else if (item.type === 'topic') {
      // Logic to handle specific topics
      // For now, let's assume we navigate to the specialty and then we might need to trigger a sub-view
      // But we can simplify by just going to the revision page of that specialty
      const categoryMapping: Record<string, string> = {
        'Pediatrics': 'pediatric',
        'Trauma': 'trauma',
        'Adult Recon': 'recon',
        'Pathology': 'pathology',
        'Spine': 'spine'
      };
      onNavigate('revision', categoryMapping[item.category] || 'trauma', { topicId: item.id });
    } else if (item.type === 'action') {
      onNavigate(item.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && results.length > 0) {
      handleSelect(results[selectedIndex]);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg transition-all group border border-slate-200/50"
      >
        <SearchIcon size={14} className="group-hover:text-indigo-600 transition-colors" />
        <span className="text-[10px] font-black uppercase tracking-wider hidden md:block">Search Topics</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 bg-white border border-slate-300 rounded-md text-[8px] font-black text-slate-400 capitalize">
          <Command size={8} /> K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <SearchIcon size={20} className="text-indigo-600" />
                <input 
                  ref={inputRef}
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search categories, revision topics, or actions..."
                  className="flex-1 bg-transparent border-none outline-none text-slate-800 font-bold placeholder:text-slate-400 placeholder:font-black placeholder:uppercase placeholder:tracking-widest placeholder:text-[10px]"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-50 rounded-xl text-slate-400"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2 no-scrollbar">
                {results.length > 0 ? (
                  <div className="space-y-1">
                    {results.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                          selectedIndex === index ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-4 text-left">
                          <div className={`p-2.5 rounded-xl ${selectedIndex === index ? 'bg-white/20' : 'bg-slate-100'}`}>
                            {item.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className={`text-sm font-black italic uppercase tracking-tighter ${selectedIndex === index ? 'text-white' : 'text-slate-800'}`}>
                                {item.title}
                              </h4>
                              <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${
                                selectedIndex === index ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {item.category}
                              </span>
                            </div>
                            <p className={`text-[10px] font-medium leading-tight ${selectedIndex === index ? 'text-white/70 italic text-white' : 'text-slate-400'}`}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                        {selectedIndex === index && (
                          <motion.div layoutId="arrow">
                            <ArrowRight size={18} className="text-white" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </div>
                ) : query.trim() ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <SearchIcon className="text-slate-200" size={32} />
                    </div>
                    <p className="text-sm font-bold text-slate-500">No results found for "{query}"</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Try searching for specialties like 'Trauma' or 'Pediatrics'</p>
                  </div>
                ) : (
                  <div className="p-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Shortcuts</p>
                    <div className="grid grid-cols-2 gap-2">
                      {SEARCH_DATA.filter(item => item.type === 'category').slice(0, 4).map(item => (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item)}
                          className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 text-left transition-all"
                        >
                          <div className="p-2 bg-slate-50 rounded-lg">{item.icon}</div>
                          <span className="text-xs font-black uppercase tracking-tighter italic">{item.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded shadow-sm">Enter</kbd> to select</span>
                  <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded shadow-sm">↑↓</kbd> to navigate</span>
                </div>
                <div className="flex items-center gap-1 italic">
                  Powered by OrthoViva Index
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// Internal icon for Hammer if not available
const Hammer = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15 12-8.5 8.5" /><path d="m9 18-4-4" /><path d="m21 7-4.5 4.5" /><path d="m3 21 2.2-2.2" /><path d="m9 15 2.2-2.2" /><path d="m15 9 2.2-2.2" /><path d="m17.8 4.7 3.5 3.5" />
  </svg>
);
