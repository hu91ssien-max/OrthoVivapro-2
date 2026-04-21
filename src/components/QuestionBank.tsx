import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QUESTION_BANK, Question } from "../data/questions";
import { 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Info, 
  RefreshCcw, 
  Clock, 
  Trophy, 
  BookOpen, 
  ArrowLeft,
  Activity,
  Award,
  CircleDashed,
  LayoutGrid,
  Maximize2,
  X
} from "lucide-react";

interface QuestionBankProps {
  category: string;
  studyMode?: boolean;
  onBack?: () => void;
}

interface UserAnswer {
  questionId: string | number;
  questionText: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
  explanation?: string;
  images?: string[];
}

const TIMER_DURATION = 30;

export default function QuestionBank({ category, studyMode = false, onBack }: QuestionBankProps) {
  const questions = QUESTION_BANK[category.toLowerCase()] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showReview, setShowReview] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setTimeLeft(TIMER_DURATION);
    } else {
      setIsFinished(true);
    }
  }, [currentIndex, questions.length]);

  useEffect(() => {
    if (!isFinished && selectedOption === null && timeLeft > 0 && !studyMode) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && selectedOption === null && !studyMode) {
      // Auto-submit as wrong if time runs out
      handleOptionSelect(-1); 
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, isFinished, selectedOption, studyMode]);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null || isFinished || !currentQuestion) return;
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    const isCorrect = index !== -1 && currentQuestion.options[index] === currentQuestion.answer;
    setSelectedOption(index);
    
    if (isCorrect) {
      setScore(s => s + 1);
    }

    // Auto show explanation in study mode
    if (studyMode) {
      setShowExplanation(true);
    }

    const answerRecord: UserAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      selectedOption: index === -1 ? "Timeout" : currentQuestion.options[index],
      correctOption: currentQuestion.answer,
      isCorrect,
      explanation: currentQuestion.explanation,
      images: currentQuestion.images
    };

    setUserAnswers(prev => [...prev, answerRecord]);
  };

  const reset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
    setTimeLeft(TIMER_DURATION);
    setUserAnswers([]);
    setShowReview(false);
  };

  const jumpToQuestion = (index: number) => {
    if (index === currentIndex) return;
    
    const targetQuestion = questions[index];
    const completedAnswer = userAnswers.find(ans => ans.questionId === targetQuestion.id);
    
    setCurrentIndex(index);
    
    if (completedAnswer) {
      const optIndex = targetQuestion.options.indexOf(completedAnswer.selectedOption);
      setSelectedOption(optIndex === -1 ? -1 : optIndex);
      setShowExplanation(true);
    } else {
      setSelectedOption(null);
      setShowExplanation(false);
      setTimeLeft(TIMER_DURATION);
    }
  };

  if (!currentQuestion && !isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="w-20 h-20 bg-white border border-gray-100 rounded-3xl flex items-center justify-center mb-6 shadow-xl transition-colors">
          <CircleDashed className="w-10 h-10 text-indigo-500 animate-spin-slow" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 italic uppercase tracking-tighter mb-2 transition-colors">Clinical Content Unavailable</h2>
        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest max-w-xs transition-colors">
          The research team is currently drafting peer-reviewed content for {category}.
        </p>
      </div>
    );
  }

  // Result Screen
  if (isFinished && !showReview) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-100/50 text-center relative overflow-hidden transition-colors"
        >
          {/* Background Aura */}
          <div className="absolute top-0 left-0 w-full h-full bg-indigo-50 blur-[100px] pointer-events-none opacity-50" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-6 border border-indigo-100 shadow-inner transition-colors">
              <Trophy className="w-10 h-10" />
            </div>
            
            <h2 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter mb-2 transition-colors">Clinical Validation Complete</h2>
            <p className="text-gray-400 font-black text-xs uppercase tracking-[0.3em] mb-12 transition-colors">Performance Summary</p>
            
            <div className="grid grid-cols-3 gap-6 w-full mb-12">
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-3xl transition-colors">
                <span className="block text-4xl font-black text-gray-900 mb-1 transition-colors">{score}</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest transition-colors">Correct</span>
              </div>
              <div className="bg-indigo-600 p-6 rounded-3xl scale-110 shadow-xl shadow-indigo-600/30">
                <span className="block text-4xl font-black text-white mb-1">{percentage}%</span>
                <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest">Efficiency</span>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-3xl transition-colors">
                <span className="block text-4xl font-black text-gray-900 mb-1 transition-colors">{questions.length}</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest transition-colors">Total</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button 
                onClick={() => setShowReview(true)}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-black uppercase tracking-widest transition-all text-[11px]"
              >
                <BookOpen size={20} />
                Detailed Review
              </button>
              <button 
                onClick={reset}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 text-[11px]"
              >
                <RefreshCcw size={20} />
                Restart Quiz
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Review Mode Screen
  if (showReview) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setShowReview(false)}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Results
          </button>
          <h2 className="text-xl font-black text-gray-900 italic uppercase tracking-tight transition-colors">Clinical Review Mode</h2>
        </div>

        <div className="space-y-6">
          {userAnswers.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm overflow-hidden relative transition-colors"
            >
              <div className={`absolute left-0 top-0 w-2 h-full ${item.isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <div className="flex gap-6">
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black ${item.isCorrect ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'} transition-colors`}>
                  {idx + 1}
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight transition-colors">{item.questionText}</h3>
                  {item.images && item.images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {item.images.map((img, i) => (
                        <div 
                          key={i} 
                          onClick={() => setZoomedImage(img)}
                          className="group relative rounded-2xl overflow-hidden border border-gray-100 transition-colors cursor-zoom-in"
                        >
                          <img 
                            src={img} 
                            alt={`Review image ${i + 1}`} 
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                             <div className="bg-white/90 p-2 rounded-full shadow-lg">
                               <Maximize2 size={16} className="text-indigo-600" />
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-colors">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1 transition-colors">Your Identification</span>
                      <p className={`text-sm font-bold ${item.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {item.selectedOption}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-colors">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1 transition-colors">Peer consensus</span>
                      <p className="text-sm font-bold text-emerald-600">
                        {item.correctOption}
                      </p>
                    </div>
                  </div>
                  {item.explanation && (
                    <div className="p-6 bg-indigo-50/50 border border-indigo-100 rounded-2xl transition-colors">
                      <h4 className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3 transition-colors">
                        <Info size={14} /> Clinical Rationale
                      </h4>
                      <p className="text-sm text-indigo-900/70 leading-relaxed font-medium transition-colors">{item.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Active Quiz UI
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Quiz Header & Progress */}
      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 mb-8 shadow-xl shadow-gray-200/50 relative overflow-hidden backdrop-blur-xl transition-colors">
        {onBack && (
          <button 
            onClick={onBack}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-indigo-600 transition-colors z-20"
            title="Return to Dashboard"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <div className="flex items-start justify-between relative z-10 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-black text-white bg-indigo-600 px-3 py-1 rounded-full uppercase tracking-widest">
                {category}
              </span>
              <div className="h-4 w-px bg-gray-200" />
              <div className="flex items-center gap-1.5 text-gray-400 transition-colors">
                <Activity size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Live Clinical Rotation</span>
              </div>
            </div>
            <h2 className="text-2xl font-black text-gray-900 italic uppercase tracking-tighter mb-2 transition-colors">
              {studyMode ? "Learning Path Active" : "Candidate Evaluation"}
            </h2>
          </div>
          
          <div className="flex flex-col items-end gap-2">
             {!studyMode ? (
               <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-100 rounded-2xl shadow-inner transition-colors">
                  <Clock size={16} className={`${timeLeft <= 5 ? 'text-rose-500 animate-pulse' : 'text-indigo-600'}`} />
                  <span className={`text-xl font-black font-mono tracking-tighter ${timeLeft <= 5 ? 'text-rose-500' : 'text-gray-900'} transition-colors`}>
                    {timeLeft.toString().padStart(2, '0')}<span className="text-xs text-gray-400 ml-1 transition-colors">SEC</span>
                  </span>
               </div>
             ) : (
               <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-2xl transition-colors">
                  <BookOpen size={16} className="text-amber-600" />
                  <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Study Mode</span>
               </div>
             )}
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-2 transition-colors">Case {currentIndex + 1} of {questions.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-2 transition-colors">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex) / questions.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          {/* Question Text */}
          <div className="space-y-6">
            <div className="relative p-8 px-0">
              <div className="absolute top-0 left-0 text-7xl font-black text-gray-100 select-none -translate-x-10 -translate-y-6 transition-colors">Q</div>
              <p className="text-3xl leading-tight text-gray-900 font-bold tracking-tight relative z-10 italic transition-colors">
                {currentQuestion.question}
              </p>
            </div>

            {currentQuestion.images && currentQuestion.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 transition-colors">
                {currentQuestion.images.map((img, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.2 }}
                    onClick={() => setZoomedImage(img)}
                    className="group relative rounded-2xl overflow-hidden border border-gray-100 transition-colors cursor-zoom-in"
                  >
                    <img 
                      src={img} 
                      alt={`Clinical figure ${idx + 1}`} 
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/90 p-3 rounded-2xl shadow-xl flex items-center gap-2">
                        <Maximize2 size={18} className="text-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Expand Figure</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        Figure {idx + 1}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = option === currentQuestion.answer;
              const isWrong = isSelected && !isCorrect;
              const anySelected = selectedOption !== null;

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={anySelected}
                  className={`
                    relative group flex items-center justify-between p-6 rounded-[2rem] border-2 text-left transition-all duration-300
                    ${!anySelected ? 'bg-white border-gray-100 hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-100/50 active:scale-[0.98]' : ''}
                    ${isSelected ? (isCorrect ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-500/10' : 'bg-rose-50 border-rose-500 ring-4 ring-rose-500/10') : ''}
                    ${anySelected && isCorrect && !isSelected ? 'bg-emerald-50/50 border-emerald-500/20' : ''}
                    ${anySelected && !isSelected && !isCorrect ? 'bg-white border-gray-50 opacity-40 scale-95' : ''}
                  `}
                >
                  <div className="flex items-center gap-6">
                    <div className={`
                      w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-colors border-2
                      ${!anySelected ? 'bg-gray-50 border-gray-100 text-gray-400 group-hover:border-indigo-600 group-hover:bg-indigo-600 group-hover:text-white' : ''}
                      ${isCorrect && anySelected ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' : ''}
                      ${isWrong ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/20' : ''}
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className={`text-xl font-bold ${anySelected ? (isCorrect ? 'text-emerald-700' : isWrong ? 'text-rose-700' : 'text-gray-400') : 'text-gray-700'} transition-colors`}>
                      {option}
                    </span>
                  </div>
                  
                  {anySelected && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="shrink-0">
                      {isCorrect && <CheckCircle2 className="w-8 h-8 text-emerald-500" />}
                      {isWrong && <XCircle className="w-8 h-8 text-rose-500" />}
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action Bar */}
      <div className="mt-12 flex items-center justify-between pt-10 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {selectedOption !== null && (
              <motion.button 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setShowExplanation(!showExplanation)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border
                  ${showExplanation ? 'bg-slate-100 border-indigo-200 text-indigo-700' : 'bg-white border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-900'} transition-colors`}
              >
                <Award size={14} />
                {showExplanation ? 'Hide Rationale' : 'Clinical Rationale'}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className={`
            flex items-center gap-3 px-12 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group
            ${selectedOption !== null 
              ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'}
          `}
        >
          <span className="relative z-10 text-[11px]">
            {currentIndex < questions.length - 1 ? 'Next Case' : 'Submit Exam'}
          </span>
          <ChevronRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Question Navigator */}
      <div className="mt-16 pt-10 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <LayoutGrid size={16} className="text-gray-400" />
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest transition-colors">Case Navigator</h4>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const userAnswer = userAnswers.find(ans => ans.questionId === q.id);
            const isAnswered = !!userAnswer;
            const isCorrect = userAnswer?.isCorrect;

            return (
              <button
                key={idx}
                onClick={() => jumpToQuestion(idx)}
                className={`
                  aspect-square rounded-xl flex items-center justify-center font-black text-xs transition-all border-2
                  ${isCurrent ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg scale-110 z-10' : 
                    isAnswered ? (isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-rose-50 border-rose-500 text-rose-600') :
                    'bg-white border-gray-100 text-gray-400 hover:border-indigo-600 hover:text-indigo-600'}
                `}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation Box */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-8 p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden transition-colors"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <BookOpen size={80} className="text-indigo-600" />
            </div>
            <h4 className="flex items-center gap-3 text-xs font-black text-indigo-600 mb-6 uppercase tracking-[0.3em] relative z-10 transition-colors">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              Surgical Evidence
            </h4>
            <p className="text-gray-700 text-lg leading-relaxed font-medium relative z-10 transition-colors">
              {currentQuestion.explanation || "Scientific rationale for this case is currently being updated in the OrthoViva library."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Zoom Modal Overlay */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 sm:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-full flex items-center justify-center p-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <img
                src={zoomedImage}
                alt="Zoomed figure"
                className="w-full h-full object-contain rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-2xl flex items-center justify-center transition-all shadow-xl"
              >
                <X size={24} />
              </button>
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/5 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10">
                Clinical Diagnostic View
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
