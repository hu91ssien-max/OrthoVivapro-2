import { motion } from "motion/react";
import { Layout } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <span className="font-sans font-bold text-xl tracking-tight text-gray-900">
            OrthoViva<span className="text-indigo-600">pro</span>
          </span>
        </motion.div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="font-sans text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Dashboard</a>
          <a href="#" className="font-sans text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Resources</a>
          <a href="#" className="font-sans text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Settings</a>
        </nav>
      </div>
    </header>
  );
};
