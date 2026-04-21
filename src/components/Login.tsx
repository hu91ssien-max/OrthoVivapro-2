import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { 
  Lock, 
  User, 
  ShieldCheck, 
  Activity, 
  AlertCircle,
  Loader2,
  Stethoscope
} from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const success = await login(username, password, rememberMe);
      if (!success) {
        setError("Invalid username or password. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-6 selection:bg-indigo-500/30 transition-colors duration-300">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl shadow-2xl shadow-indigo-600/20 mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic flex flex-col leading-[0.8]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-800 transition-colors">OrthoViva</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 self-center">Pro</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-2 transition-colors">
            Professional Surgical Education
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white border border-gray-200 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-xl transition-colors">
          <div className="mb-8">
            <h2 className="text-xl font-black text-gray-900 italic uppercase tracking-tight transition-colors">Security Portal</h2>
            <p className="text-gray-600 text-sm font-medium transition-colors">Verify credentials to access clinical resources.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 transition-colors">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-gray-900 font-bold placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 transition-colors">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-gray-900 font-bold placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all"></div>
                  <ShieldCheck className="absolute w-5 h-5 text-white scale-0 peer-checked:scale-75 transition-transform" />
                </div>
                <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 transition-colors uppercase tracking-wider">Remember me</span>
              </label>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-center gap-3"
                >
                  <AlertCircle className="text-rose-500 shrink-0" size={18} />
                  <p className="text-xs font-bold text-rose-500">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/10 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <Activity size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center transition-colors">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] transition-colors">Authorized Access Only</p>
          </div>
        </div>

        {/* Demo Credentials Hint */}
        <div className="mt-6 p-4 bg-white border border-gray-200 rounded-2xl text-[10px] text-center transition-colors">
          <span className="font-black text-gray-400 uppercase tracking-widest block mb-1">Demo Access</span>
          <code className="text-indigo-600">admin / admin123</code> <span className="text-gray-300">•</span> <code className="text-indigo-600">user / user123</code>
        </div>
      </motion.div>
    </div>
  );
}
