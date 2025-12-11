import { useState } from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

import { useTheme } from "./contexts/ThemeContext";

import VoiceAssistant from "./components/VoiceAssistant";
import LearningRoadmap from "./components/LearningRoadmap";
import JobScraper from "./components/JobScraper";
import AIInterview from "./components/AIInterview";

import {
  Home,
  MessageCircle,
  User,
  Sun,
  Moon,
  Sparkles,
  Mic,
  Map,
  Search,
} from "lucide-react";

type View = "home" | "voice" | "roadmap" | "jobs" | "interview";

function AppContent() {
  const [currentView, setCurrentView] = useState<View>("home");

  const { theme, toggleTheme } = useTheme();
  const { user, isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 shadow-lg transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setCurrentView("home")}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform">
                <Sparkles size={22} />
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  EvolvPath
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Evolve Your Career
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <SignedIn>
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
              </SignedIn>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Auth Buttons */}
              <SignedOut>
                <div className="flex items-center gap-3">
                  <SignInButton mode="modal">
                    <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
                      Sign In
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <button className="px-5 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>

              <SignedIn>
                <UserButton
                  appearance={{
                    elements: { userButtonAvatarBox: "w-10 h-10" },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-8">
        <SignedOut>
          {currentView !== "home" && (
            <div className="max-w-2xl mx-auto text-center py-20 px-8">
              <div className="text-6xl mb-6 text-gray-400 dark:text-gray-600 flex justify-center">
                <User size={60} />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Sign in Required
              </h2>
              <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
                Please sign in to access all features
              </p>

              <SignInButton mode="modal">
                <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Sign In / Sign Up
                </button>
              </SignInButton>
            </div>
          )}
        </SignedOut>

        <SignedIn>
          <>
            {currentView === "home" && (
              <HomePage setView={setCurrentView} />
            )}
            {currentView === "voice" && <VoiceAssistant />}
            {currentView === "roadmap" && <LearningRoadmap />}
            {currentView === "jobs" && <JobScraper />}
            {currentView === "interview" && <AIInterview />}
          </>
        </SignedIn>

        <SignedOut>
          {currentView === "home" && (
            <HomePage setView={setCurrentView} />
          )}
        </SignedOut>
      </div>
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
          : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
      }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

/* ------------------ Home Page ------------------ */

function HomePage({ setView }: any) {
  const { isSignedIn } = useUser();

  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="text-center mb-16">
        <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg">
          <span className="text-white text-sm font-semibold flex items-center gap-2">
            <Sparkles size={16} /> AI-Powered Career Evolution
          </span>
        </div>

        <h1 className="text-7xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
          Your Career,
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Evolved
          </span>
        </h1>

        <p className="text-2xl mb-12 font-light max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          AI interviews • Voice coaching • Live job data • Personalized roadmaps
        </p>

        <div className="flex gap-4 justify-center">
          {isSignedIn ? (
            <>
              <button
                onClick={() => setView("interview")}
                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:scale-105 transition-all flex items-center gap-2">
                <MessageCircle size={20} /> Start Interview →
              </button>

              <button
                onClick={() => setView("jobs")}
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white bg-white dark:bg-slate-800 rounded-xl font-semibold text-lg hover:scale-105 transition-all flex items-center gap-2">
                <Search size={20} /> Find Jobs
              </button>
            </>
          ) : (
            <SignUpButton mode="modal">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:scale-105 transition-all flex items-center gap-2">
                Get Started Free →
              </button>
            </SignUpButton>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------ Wrap with Clerk Provider ------------------ */

export default function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <AppContent />
    </ClerkProvider>
  );
}
