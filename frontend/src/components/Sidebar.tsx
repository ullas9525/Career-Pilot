import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route: string) => path === route;

  return (
    <nav className="bg-surface-container-low/80 backdrop-blur-[30px] h-screen w-64 fixed left-0 top-0 border-r border-white/40 shadow-md flex flex-col p-4 gap-2 z-50 hidden md:flex">
      <div className="flex items-center gap-3 mb-8 px-2 mt-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary-container flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
        </div>
        <div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">Career Pilot</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant">AI Interview Engine</p>
        </div>
      </div>
      
      <button className="w-full py-3 mb-6 bg-gradient-to-r from-primary to-surface-tint text-white rounded-xl shadow-[0_4px_12px_rgba(0,76,205,0.2)] hover:shadow-[0_6px_16px_rgba(0,76,205,0.3)] transition-all font-label-md text-label-md flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-[18px]">play_circle</span> Start Mock Session
      </button>

      <div className="flex-1 flex flex-col gap-1">
        {path.startsWith('/coordinator') ? (
          <>
            <Link to="/coordinator/dashboard" className={`font-label-md text-label-md rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden transition-colors ${isActive('/coordinator/dashboard') ? 'bg-primary-container/20 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/40'}`}>
              {isActive('/coordinator/dashboard') && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
              <span className="material-symbols-outlined" style={isActive('/coordinator/dashboard') ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span> College Analytics
            </Link>
            <Link to="/coordinator/groups" className={`font-label-md text-label-md rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden transition-colors ${isActive('/coordinator/groups') ? 'bg-primary-container/20 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/40'}`}>
              {isActive('/coordinator/groups') && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
              <span className="material-symbols-outlined" style={isActive('/coordinator/groups') ? { fontVariationSettings: "'FILL' 1" } : {}}>groups</span> Placement Groups
            </Link>
            <Link to="/coordinator/leaderboard" className={`font-label-md text-label-md rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden transition-colors ${isActive('/coordinator/leaderboard') ? 'bg-primary-container/20 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/40'}`}>
              {isActive('/coordinator/leaderboard') && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
              <span className="material-symbols-outlined" style={isActive('/coordinator/leaderboard') ? { fontVariationSettings: "'FILL' 1" } : {}}>leaderboard</span> Global Leaderboard
            </Link>
            <Link to="/coordinator/outcomes" className={`font-label-md text-label-md rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden transition-colors ${isActive('/coordinator/outcomes') ? 'bg-primary-container/20 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/40'}`}>
              {isActive('/coordinator/outcomes') && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
              <span className="material-symbols-outlined" style={isActive('/coordinator/outcomes') ? { fontVariationSettings: "'FILL' 1" } : {}}>checklist</span> Placement Outcomes
            </Link>
            <Link to="/coordinator/progress" className={`font-label-md text-label-md rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden transition-colors ${isActive('/coordinator/progress') ? 'bg-primary-container/20 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/40'}`}>
              {isActive('/coordinator/progress') && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
              <span className="material-symbols-outlined" style={isActive('/coordinator/progress') ? { fontVariationSettings: "'FILL' 1" } : {}}>assessment</span> Student Progress
            </Link>
          </>
        ) : (
          <>
            <Link to="/student/dashboard" className={`font-label-md text-label-md rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden transition-colors ${isActive('/student/dashboard') ? 'bg-primary-container/20 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/40'}`}>
              {isActive('/student/dashboard') && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
              <span className="material-symbols-outlined" style={isActive('/student/dashboard') ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span> Overview
            </Link>
            <Link to="/student/history" className={`font-label-md text-label-md rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden transition-colors ${isActive('/student/history') ? 'bg-primary-container/20 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/40'}`}>
              {isActive('/student/history') && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
              <span className="material-symbols-outlined" style={isActive('/student/history') ? { fontVariationSettings: "'FILL' 1" } : {}}>history</span> History
            </Link>
            <Link to="/student/interview-process" className={`font-label-md text-label-md rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden transition-colors ${isActive('/student/interview-process') ? 'bg-primary-container/20 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/40'}`}>
              {isActive('/student/interview-process') && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
              <span className="material-symbols-outlined" style={isActive('/student/interview-process') ? { fontVariationSettings: "'FILL' 1" } : {}}>ads_click</span> Interview Process
            </Link>
            <Link to="/student/mock-interview" className={`font-label-md text-label-md rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden transition-colors ${isActive('/student/mock-interview') ? 'bg-primary-container/20 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/40'}`}>
              {isActive('/student/mock-interview') && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
              <span className="material-symbols-outlined" style={isActive('/student/mock-interview') ? { fontVariationSettings: "'FILL' 1" } : {}}>psychology</span> Mock Interview
            </Link>
            <Link to="/student/cohort" className={`font-label-md text-label-md rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden transition-colors ${isActive('/student/cohort') ? 'bg-primary-container/20 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/40'}`}>
              {isActive('/student/cohort') && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
              <span className="material-symbols-outlined" style={isActive('/student/cohort') ? { fontVariationSettings: "'FILL' 1" } : {}}>groups</span> My Cohort
            </Link>
            <Link to="/student/leaderboard" className={`font-label-md text-label-md rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden transition-colors ${isActive('/student/leaderboard') ? 'bg-primary-container/20 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/40'}`}>
              {isActive('/student/leaderboard') && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
              <span className="material-symbols-outlined" style={isActive('/student/leaderboard') ? { fontVariationSettings: "'FILL' 1" } : {}}>leaderboard</span> Leaderboard
            </Link>
            <Link to="/student/post-interview" className={`font-label-md text-label-md rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden transition-colors ${isActive('/student/post-interview') ? 'bg-primary-container/20 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/40'}`}>
              {isActive('/student/post-interview') && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
              <span className="material-symbols-outlined" style={isActive('/student/post-interview') ? { fontVariationSettings: "'FILL' 1" } : {}}>check_circle</span> Post Interview
            </Link>
            <Link to="/student/profile" className={`font-label-md text-label-md rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden transition-colors ${isActive('/student/profile') ? 'bg-primary-container/20 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/40'}`}>
              {isActive('/student/profile') && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
              <span className="material-symbols-outlined" style={isActive('/student/profile') ? { fontVariationSettings: "'FILL' 1" } : {}}>person</span> Profile
            </Link>
          </>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-outline-variant/30">
        <Link to={path.startsWith('/coordinator') ? "/coordinator/settings" : "/student/settings"} className={`font-label-md text-label-md rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden transition-colors ${isActive('/coordinator/settings') || isActive('/student/settings') ? 'bg-primary-container/20 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/40'}`}>
          <span className="material-symbols-outlined">settings</span> Settings
        </Link>
        <a href="#" className="font-label-md text-label-md text-on-surface-variant hover:bg-white/40 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="material-symbols-outlined">help</span> Support
        </a>
      </div>
    </nav>
  );
}
