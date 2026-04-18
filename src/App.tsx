import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import QuestionBank from "./components/QuestionBank";
import PediatricOrthoRevision from "./components/PediatricOrthoRevision";
import ACLInfographic from "./components/ACLInfographic";
import PathologyViva from "./components/PathologyViva";
import Analytics from "./components/Analytics";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";
import { Loader2 } from "lucide-react";

export default function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const [page, setPage] = useState("dashboard");
  const [category, setCategory] = useState("trauma");
  const [isStudyMode, setIsStudyMode] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">Initializing Secure Environment</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-indigo-100 dark:selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-200 transition-colors duration-300">
      <Navbar setPage={setPage} />

      <main>
        {page === "dashboard" && (
          <Dashboard
            onSelect={(cat, mode) => {
              setCategory(cat);
              setIsStudyMode(mode === "study");
              setPage(mode === "revision" ? "revision" : "mcq");
            }}
          />
        )}

        {(page === "mcq" || page === "study") && (
          <QuestionBank category={category} studyMode={isStudyMode} />
        )}

        {page === "analytics" && (
          <Analytics />
        )}

        {page === "profile" && (
          <Profile />
        )}

        {page === "revision" && (
          <>
            {category === "pediatric" ? (
              <PediatricOrthoRevision 
                onBack={() => setPage("dashboard")} 
                onPractice={() => setPage("mcq")} 
              />
            ) : category === "pathology" ? (
              <PathologyViva 
                onBack={() => setPage("dashboard")} 
              />
            ) : category === "sports" ? (
              <ACLInfographic 
                onBack={() => setPage("dashboard")}
                onPractice={() => {
                  setIsStudyMode(true);
                  setPage("mcq");
                }}
              />
            ) : (
              <div className="max-w-4xl mx-auto py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Revision Guide Coming Soon</h2>
                <p className="text-gray-500 mb-8">We are currently drafting the high-yield summaries for {category}.</p>
                <button 
                  onClick={() => setPage("dashboard")}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold"
                >
                  Back to Dashboard
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
