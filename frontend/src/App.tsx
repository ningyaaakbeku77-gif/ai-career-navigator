import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useTheme } from "./contexts/ThemeContext";

import VoiceAssistant from "./components/VoiceAssistant";
import LearningRoadmap from "./components/LearningRoadmap";
import JobScraper from "./components/JobScraper";
import AIInterview from "./components/AIInterview";
import AuthModal from "./components/AuthModal";

import {
  Home,
  MessageCircle,
  Brain,
  Briefcase,
  User,
  LogOut,
  Sun,
  Moon,
  Sparkles,
  Mic,
  Map,
  Search
} from "lucide-react";

type View = "home" | "voice" | "roadmap" | "jobs" | "interview";

function AppContent() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Navigation */}
      <nav className="backdrop-blur-xl border-b sticky top-0 z-50 shadow-lg transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setCurrentView("home")}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                <Sparkles size={22} />
              </div>

              <div>
                <h1 className="text-xl font-bold">EvolvPath</h1>
                <p className="text-xs opacity-70">Evolve Your Career</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <>
                  <NavButton
                    active={currentView === "interview"}
                    onClick={() => setCurrentView("interview")}
                    icon={<MessageCircle size={18} />}
                    label="Interview"
                  />

                  <NavButton
                    active={currentView === "voice"}
                    onClick={() => setCurrentView("voice")}
                    icon={<Mic size={18} />}
                    label="Coach"
                  />

                  <NavButton
                    active={currentView === "roadmap"}
                    onClick={() => setCurrentView("roadmap")}
                    icon={<Map size={18} />}
                    label="Roadmap"
                  />

                  <NavButton
                    active={currentView === "jobs"}
                    onClick={() => setCurrentView("jobs")}
                    icon={<Search size={18} />}
                    label="Jobs"
                  />
                </>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                title="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Auth */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <User size={16} /> {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-8">
        {!isAuthenticated && currentView !== "home" ? (
          <div className="max-w-2xl mx-auto text-center py-20 px-8">
            <div className="text-6xl mb-6">
              <User size={60} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Sign in Required</h2>
            <p className="text-lg mb-8">Please sign in to access all features</p>

            <button
              onClick={() => setShowAuthModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Sign In / Sign Up
            </button>
          </div>
        ) : (
          <>
            {currentView === "home" && (
              <HomePage
                setView={setCurrentView}
                onAuthClick={() => setShowAuthModal(true)}
              />
            )}
            {currentView === "voice" && <VoiceAssistant />}
            {currentView === "roadmap" && <LearningRoadmap />}
            {currentView === "jobs" && <JobScraper />}
            {currentView === "interview" && <AIInterview />}
          </>
        )}
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}

/* ------------------ Nav Button ------------------ */

function NavButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
        active
          ? "bg-purple-600 text-white"
          : "hover:bg-gray-200 dark:hover:bg-gray-800"
      }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

/* ------------------ Home Page ------------------ */

function HomePage({ setView, onAuthClick }: any) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="text-center mb-16">
        <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg">
          <span className="text-white text-sm font-semibold flex items-center gap-2">
            <Sparkles size={16} /> AI-Powered Career Evolution
          </span>
        </div>

        <h1 className="text-7xl font-bold mb-6 leading-tight">
          Your Career,
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Evolved
          </span>
        </h1>

        <p className="text-2xl mb-12 font-light max-w-3xl mx-auto">
          AI interviews • Voice coaching • Live job data • Personalized roadmaps
        </p>

        <div className="flex gap-4 justify-center">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => setView("interview")}
                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                <MessageCircle size={20} /> Start Interview →
              </button>

              <button
                onClick={() => setView("jobs")}
                className="px-8 py-4 border-2 rounded-xl font-semibold text-lg hover:scale-105 transition-all"
              >
                <Search size={20} /> Find Jobs
              </button>
            </>
          ) : (
            <button
              onClick={onAuthClick}
              className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              Get Started Free →
            </button>
          )}
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          onClick={() => (isAuthenticated ? setView("interview") : onAuthClick())}
          gradient="from-indigo-600 to-purple-600"
          icon={<MessageCircle size={26} />}
          title="AI Interview"
          description="Real-time feedback"
          stats="15+ Questions"
        />

        <FeatureCard
          onClick={() => (isAuthenticated ? setView("voice") : onAuthClick())}
          gradient="from-cyan-600 to-blue-600"
          icon={<Mic size={26} />}
          title="Voice Coach"
          description="Speech-to-text AI"
          stats="Live coaching"
        />

        <FeatureCard
          onClick={() => (isAuthenticated ? setView("jobs") : onAuthClick())}
          gradient="from-purple-600 to-pink-600"
          icon={<Search size={26} />}
          title="Job Intel"
          description="Live postings"
          stats="API-powered"
        />

        <FeatureCard
          onClick={() => (isAuthenticated ? setView("roadmap") : onAuthClick())}
          gradient="from-pink-600 to-rose-600"
          icon={<Map size={26} />}
          title="Roadmap"
          description="Track progress"
          stats="Personalized"
        />
      </div>
    </div>
  );
}

/* ------------------ Feature Card ------------------ */

function FeatureCard({ onClick, gradient, icon, title, description, stats }: any) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer rounded-3xl p-6 border hover:scale-105 transition-all duration-300 hover:shadow-2xl"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity rounded-3xl`} />

      <div className="relative z-10">
        <div
          className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>

        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm mb-4">{description}</p>

        <div
          className={`inline-block px-3 py-1 bg-gradient-to-r ${gradient} bg-opacity-20 rounded-lg text-xs font-semibold`}
        >
          {stats}
        </div>
      </div>
    </div>
  );
}

/* ------------------ Wrap with Auth Provider ------------------ */

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
