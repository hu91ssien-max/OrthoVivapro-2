import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import QuestionBank from "./components/QuestionBank";
import PediatricOrthoRevision from "./components/PediatricOrthoRevision";
import SportsMedicineRevision from "./components/SportsMedicineRevision";
import PathologyViva from "./components/PathologyViva";
import THAFixationInfographic from "./components/THAFixationInfographic";
import Analytics from "./components/Analytics";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";
import { Loader2 } from "lucide-react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

export default function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const [page, setPage] = useState("dashboard");
  const [category, setCategory] = useState("trauma");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [recentItem, setRecentItem] = useState<{ id: string, name: string, mode: string } | null>(null);

  useEffect(() => {
    const savedRecent = localStorage.getItem("orthoviva_recent");
    if (savedRecent) {
      try {
        setRecentItem(JSON.parse(savedRecent));
      } catch (e) {
        console.error("Failed to parse recent item");
      }
    }
  }, []);

  const handleSelect = (catId: string, mode: "revision" | "mcq" | "study") => {
    const catNameMap: Record<string, string> = {
      oite2025: "AAOS OiTE 2025",
      trauma: "Trauma & Fractures",
      pediatric: "Pediatric Ortho",
      sports: "Sports Medicine",
      shoulder: "Shoulder & Elbow",
      hand: "Hand & Wrist",
      foot: "Foot & Ankle",
      pathology: "Bone Pathology",
      recon: "Adult Reconstruction",
      anatomy: "Surgical Anatomy",
      basic: "Basic Science"
    };

    const newItem = { id: catId, name: catNameMap[catId] || catId, mode };
    setRecentItem(newItem);
    localStorage.setItem("orthoviva_recent", JSON.stringify(newItem));

    setCategory(catId);
    setIsStudyMode(mode === "study");
    setPage(mode === "revision" ? "revision" : "mcq");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-xs">Initializing Secure Environment</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">
      <Navbar setPage={setPage} />

      <main>
        {page === "dashboard" && (
          <Dashboard
            onSelect={handleSelect}
            recentItem={recentItem}
          />
        )}

        {(page === "mcq" || page === "study") && (
          <QuestionBank 
            category={category} 
            studyMode={isStudyMode} 
            onBack={() => setPage("dashboard")}
          />
        )}

        {page === "analytics" && (
          <Analytics onBack={() => setPage("dashboard")} />
        )}

        {page === "profile" && (
          <Profile onBack={() => setPage("dashboard")} />
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
              <SportsMedicineRevision 
                onBack={() => setPage("dashboard")}
                onPractice={() => {
                  setIsStudyMode(true);
                  setPage("mcq");
                }}
              />
            ) : category === "recon" ? (
              <THAFixationInfographic 
                onBack={() => setPage("dashboard")}
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
      <VercelAnalytics />
    </div>
  );
}
