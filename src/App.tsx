import { useState, useEffect } from "react";
import Sidebar, { CATEGORIES } from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import QuestionBank from "./components/QuestionBank";
import PediatricOrthoRevision from "./components/PediatricOrthoRevision";
import PediatricExaminationMode from "./components/PediatricExaminationMode";
import SportsMedicineRevision from "./components/SportsMedicineRevision";
import SportsExaminationMode from "./components/SportsExaminationMode";
import THAFixationInfographic from "./components/THAFixationInfographic";
import BasicScienceRevision from "./components/BasicScienceRevision";
import TraumaRevision from "./components/TraumaRevision";
import TraumaStudyHub from "./components/TraumaStudyHub";
import SpineRevision from "./components/SpineRevision";
import OncologyMaster from "./components/OncologyMaster";
import SynoNeuroLab from "./components/SynoNeuroLab";
import OncologyLab from "./components/OncologyLab";
import MetaLab from "./components/MetaLab";
import ScleroticLab from "./components/ScleroticLab";
import OncologyOSCE from "./components/OncologyOSCE";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pathologyStudyView, setPathologyStudyView] = useState<"standard" | "synoneuro" | "metalab" | "sclerotic">("standard");
  const [initialTopic, setInitialTopic] = useState<string | null>(null);

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
    const cat = CATEGORIES.find(c => c.id === catId);
    const catName = cat ? cat.name : catId;

    const newItem = { id: catId, name: catName, mode };
    setRecentItem(newItem);
    localStorage.setItem("orthoviva_recent", JSON.stringify(newItem));

    setCategory(catId);
    setIsStudyMode(mode === "study");
    setPage(mode === "revision" ? "revision" : "mcq");
  };

  const handleSidebarSelect = (catId: string) => {
    setCategory(catId);
    setPage("dashboard"); // Go back to specialty home when selecting from sidebar
  };

  const handleNavigate = (pageId: string, catId?: string, extra?: any) => {
    if (catId) setCategory(catId);
    if (extra?.topicId) setInitialTopic(extra.topicId);
    else setInitialTopic(null);
    
    setPage(pageId);
    setIsSidebarOpen(false);
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

  // Define full-screen pages
  const isFullScreenPage = page === "mcq" || page === "study" || page === "revision";

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">
      {!isFullScreenPage && (
        <Sidebar 
          activeCategory={category} 
          onSelectCategory={handleSidebarSelect}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
      )}

      <div className={`${isFullScreenPage ? "" : "lg:ml-72"} transition-all duration-300`}>
        {!isFullScreenPage && (
          <Navbar 
            setPage={setPage} 
            onMenuClick={() => setIsSidebarOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        <main className={`${isFullScreenPage ? "" : "min-h-[calc(100vh-4rem)]"}`}>
          {page === "dashboard" && (
            <Dashboard
              onSelect={handleSelect}
              recentItem={recentItem}
              activeCategory={category}
            />
          )}

          {(page === "mcq" || page === "study") && (
            category === "pediatric" ? (
              <PediatricExaminationMode 
                onBack={() => setPage("dashboard")}
              />
            ) : category === "sports" ? (
              <SportsExaminationMode 
                onBack={() => setPage("dashboard")}
              />
            ) : category === "basic" ? (
              <BasicScienceRevision 
                onBack={() => setPage("dashboard")}
                view={isStudyMode ? "study" : "mcq"}
              />
            ) : category === "pathology" ? (
              isStudyMode ? (
                pathologyStudyView === "standard" ? (
                  <OncologyMaster 
                    onBack={() => setPage("dashboard")}
                    onSwitchToSynoNeuro={() => setPathologyStudyView("synoneuro")}
                    onSwitchToMetaLab={() => setPathologyStudyView("metalab")}
                    onSwitchToSclerotic={() => setPathologyStudyView("sclerotic")}
                    onSwitchToOSCE={() => setPage("mcq")}
                  />
                ) : pathologyStudyView === "synoneuro" ? (
                  <SynoNeuroLab 
                    onBack={() => setPathologyStudyView("standard")}
                  />
                ) : pathologyStudyView === "metalab" ? (
                  <MetaLab 
                    onBack={() => setPathologyStudyView("standard")}
                  />
                ) : (
                  <ScleroticLab 
                    onBack={() => setPathologyStudyView("standard")}
                  />
                )
              ) : (
                <OncologyOSCE 
                  onBack={() => setPage("dashboard")}
                />
              )
            ) : category === "trauma" && isStudyMode ? (
              <TraumaStudyHub 
                onBack={() => setPage("dashboard")}
              />
            ) : (
              <QuestionBank 
                category={category} 
                studyMode={isStudyMode} 
                onBack={() => setPage("dashboard")}
              />
            )
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
                  initialTopic={initialTopic}
                />
              ) : category === "pathology" ? (
                <OncologyLab 
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
              ) : category === "basic" ? (
                <BasicScienceRevision 
                  onBack={() => setPage("dashboard")}
                  view="revision"
                />
              ) : category === "trauma" ? (
                <TraumaRevision 
                  onBack={() => setPage("dashboard")}
                  onPractice={() => {
                    setIsStudyMode(true);
                    setPage("mcq");
                  }}
                  initialTopic={initialTopic}
                />
              ) : category === "spine" ? (
                <SpineRevision 
                  onBack={() => setPage("dashboard")}
                  onPractice={() => {
                    setIsStudyMode(true);
                    setPage("mcq");
                  }}
                  initialTopic={initialTopic}
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
      <VercelAnalytics />
    </div>
  );
}
