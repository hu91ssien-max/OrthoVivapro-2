import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  ClipboardList, 
  Trophy, 
  Activity,
  Zap,
  RotateCcw
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'examiner' | 'student';
  content: string;
}

interface PathologyVivaProps {
  onBack: () => void;
}

const PathologyViva = ({ onBack }: PathologyVivaProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const initiateViva = async () => {
    setSessionActive(true);
    setMessages([]);
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "You are a senior orthopedic pathology examiner. Start a viva session for a surgery resident. Select a high-yield topic (like Bone Tumors, Osteomyelitis, or Paget's disease) and ask the first opening question. Keep the question professional and focused. Mention that you are ready to begin.",
        config: {
          systemInstruction: "You are the Head of Orthopedic Pathology. You are conducting an oral viva for a surgical trainee. Be rigorous but fair. Your goal is to assess their knowledge of clinical pathology, radiological correlations, and histological features of orthopedic conditions. Always respond in markdown format."
        }
      });

      const examinerMsg = response.text || "I am ready to begin the Pathology Viva. What topic would you like to start with, or shall I select one for you?";
      setMessages([{ role: 'examiner', content: examinerMsg }]);
    } catch (error) {
      console.error(error);
      setMessages([{ role: 'examiner', content: "Error initiating session. Please check your connection." }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'student', content: userMsg }]);
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      // Create history for context
      const history = messages.map(m => ({
        role: m.role === 'examiner' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are a senior orthopedic pathology examiner. Critically evaluate the student's answer. If they are correct, provide a small technical follow-up or move to the next logical question in the clinical case. If they are incorrect or partially correct, guide them to the right answer or explain the pathology clearly. Maintain a professional, academic tone."
        },
        history: history
      });

      const result = await chat.sendMessage({
        message: userMsg
      });

      setMessages(prev => [...prev, { role: 'examiner', content: result.text || "Interesting point. Let's move deeper into this." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'examiner', content: "I'm sorry, I lost my train of thought. Could you repeat that or should we restart?" }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 h-16 flex items-center justify-between sticky top-0 z-30 transition-colors">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Exit Session</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 dark:shadow-none italic font-black">
            P
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter italic transition-colors">Pathology <span className="text-indigo-600">Viva Simulator</span></h1>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest transition-colors">Powered by OrthoViva AI</p>
          </div>
        </div>
        <button 
          onClick={initiateViva}
          className="p-2 text-slate-400 dark:text-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          title="Restart Session"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      {!sessionActive ? (
        <div className="flex-grow flex items-center justify-center p-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 transition-colors"
          >
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-3xl flex items-center justify-center mx-auto mb-8 transition-colors">
              <Sparkles size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-4 transition-colors">Start Your <span className="text-indigo-600">Viva Voce</span></h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-10 leading-relaxed transition-colors">
              Experience a realistic orthopedic pathology board exam. Our AI examiner will challenge your knowledge on tumors, infections, and metabolic disorders.
            </p>
            <div className="space-y-4">
              <button 
                onClick={initiateViva}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-3 active:scale-95"
              >
                Enter Examination Hall
                <Zap size={18} />
              </button>
              <div className="flex items-center justify-center gap-6 pt-4 text-slate-400 dark:text-slate-500 uppercase text-[10px] font-black tracking-widest transition-colors">
                <span className="flex items-center gap-1.5"><Activity size={12} /> Real-time Feedback</span>
                <span className="flex items-center gap-1.5"><Trophy size={12} /> Board Standard</span>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col max-w-4xl w-full mx-auto px-4 py-6 overflow-hidden">
          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto space-y-6 pb-20 scrollbar-hide"
          >
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'student' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-4 max-w-[85%] ${msg.role === 'student' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'student' ? 'bg-slate-900 dark:bg-white text-slate-200 dark:text-slate-900' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none'} transition-colors`}>
                    {msg.role === 'student' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-5 rounded-2xl text-sm leading-relaxed shadow-sm border transition-colors ${
                    msg.role === 'student' 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-800 dark:border-slate-100 rounded-tr-none' 
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 rounded-tl-none prose prose-indigo prose-sm max-w-none'
                  }`}>
                    {msg.content.split('\n').map((line, idx) => (
                      <p key={idx} className={idx > 0 ? "mt-2" : ""}>{line}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            {isThinking && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex gap-4 items-center pl-12">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-0"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-300"></span>
                  </div>
                  <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest italic animate-pulse">Examiner is thinking...</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="fixed bottom-0 left-0 right-0 bg-slate-50 dark:bg-slate-950 p-4 border-t border-slate-200 dark:border-slate-800 transition-colors">
            <div className="max-w-4xl mx-auto flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your response here..."
                className="flex-grow bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
              <button 
                onClick={handleSend}
                disabled={isThinking || !input.trim()}
                className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 transition-all shadow-xl shadow-indigo-100 dark:shadow-none"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PathologyViva;
