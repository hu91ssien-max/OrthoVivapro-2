import { useState, ChangeEvent } from "react";
import { Upload, ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function UploadImage() {
  const [image, setImage] = useState<string | null>(null);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400 Transition-colors">
          <Upload size={20} />
        </div>
        <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter transition-colors">Upload Clinical Image</h2>
      </div>

      <div className="relative group">
        {!image ? (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-[2rem] cursor-pointer bg-gray-50 dark:bg-slate-950 hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-8 h-8 text-gray-400 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" />
              </div>
              <p className="mb-2 text-sm text-gray-700 dark:text-slate-300 font-bold uppercase tracking-tight transition-colors">
                Click to upload <span className="text-indigo-600 dark:text-indigo-400">or drag and drop</span>
              </p>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 font-black uppercase tracking-widest transition-colors">PNG, JPG or WEBP (MAX. 800x400px)</p>
            </div>
            <input type="file" className="hidden" onChange={handleImage} accept="image/*" />
          </label>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl transition-colors"
          >
            <img 
              src={image} 
              alt="preview" 
              className="w-full h-64 object-cover"
              referrerPolicy="no-referrer"
            />
            <button 
              onClick={removeImage}
              className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-xl shadow-lg hover:bg-red-700 transition-colors active:scale-95"
            >
              <X size={16} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white text-[10px] font-black uppercase tracking-widest">Image Preview Ready</p>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {image && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6"
          >
            <button className="w-full py-4 bg-indigo-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-[0.98]">
              Analyze Image with AI ✨
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
