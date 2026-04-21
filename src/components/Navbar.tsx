import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Bone, User, BarChart3, Settings, Clock as ClockIcon, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  setPage: (page: string) => void;
}

export default function Navbar({ setPage }: NavbarProps) {
  const { user, logout } = useAuth();
  const [baghdadTime, setBaghdadTime] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Baghdad',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      setBaghdadTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div 
          onClick={() => setPage("dashboard")}
          className="flex items-center gap-2 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="p-2 bg-indigo-600 rounded-lg group-hover:bg-indigo-700 transition-colors">
            <Bone className="w-5 h-5 text-white" />
          </div>
          <span className="font-sans font-black text-xl tracking-tighter uppercase italic transition-all">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-950 via-indigo-800 to-indigo-700">OrthoViva</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 ml-1">Pro</span>
          </span>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 transition-colors">
            <ClockIcon className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs font-mono font-medium text-gray-600">Baghdad: {baghdadTime}</span>
          </div>

          <button 
            onClick={() => setPage("analytics")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
          
          <div className="h-6 w-px bg-gray-200 mx-2" />
          
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
            >
              <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-[10px] font-black italic">
                {user?.username.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-sm font-black italic uppercase tracking-tighter">
                {user?.username === 'admin' ? 'Dr. Hussein' : user?.username}
              </span>
            </button>

            {showUserMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl p-3 z-50 transition-colors"
              >
                <div className="px-5 py-4 border-b border-gray-50 flex flex-col gap-1 mb-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Security Access</p>
                  <div className="flex items-center gap-1.5 text-indigo-600">
                    <ShieldCheck size={14} />
                    <span className="text-sm font-black italic uppercase tracking-tighter">{user?.role} Portal</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <button 
                    onClick={() => { setPage("profile"); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-slate-50 rounded-2xl transition-colors"
                  >
                    <User size={18} className="text-indigo-600" />
                    Clinical Profile
                  </button>
                  <button 
                    onClick={() => { setPage("analytics"); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-slate-50 rounded-2xl transition-colors"
                  >
                    <BarChart3 size={18} className="text-emerald-500" />
                    Performance Data
                  </button>
                  <button 
                    onClick={() => { setPage("dashboard"); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-slate-50 rounded-2xl transition-colors"
                  >
                    <Settings size={18} className="text-slate-400" />
                    System Settings
                  </button>
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-50">
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-5 py-4 text-sm font-black uppercase text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
