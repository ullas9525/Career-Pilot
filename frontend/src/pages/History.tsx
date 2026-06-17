import { Link } from 'react-router-dom';

export default function History() {
  return (
    <div className="flex-1 px-4 md:px-margin-desktop py-8 w-full flex gap-10 max-w-[1600px] mx-auto min-h-[calc(100vh-72px)]">
      {/* Left Column */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-2">History</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">Review past performances, analyze AI feedback, and track your interview readiness over time.</p>
          </div>
          <div className="relative w-full md:w-80 group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">search</span>
            <input className="w-full glass-base pl-12 pr-4 py-3 rounded-xl font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent" placeholder="Search transcripts or roles..." type="text" />
          </div>
        </header>

        {/* Empty State */}
        <div className="glass-elevated rounded-2xl p-12 text-center mt-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-surface-variant/50 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl text-outline">history</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">No past interviews yet</h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-6">Start a mock interview to see your history, track progress, and receive detailed AI feedback.</p>
          <Link to="/student/mock-interview" className="bg-gradient-to-r from-primary to-surface-tint text-on-primary font-label-md text-label-md px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">play_circle</span>
            Start your first mock interview
          </Link>
        </div>
      </div>

      {/* Right Sidebar (empty) */}
      <aside className="hidden lg:flex w-[440px] shrink-0 sticky top-[80px] h-[calc(100vh-160px)] flex-col glass-elevated rounded-2xl overflow-hidden z-10">
        <div className="px-8 py-6 border-b border-outline-variant/30 bg-white/40 backdrop-blur-md flex justify-between items-start">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight mb-1">Session Report</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Select an interview to view details</p>
          </div>
          <button className="w-8 h-8 rounded-full bg-surface hover:bg-surface-variant flex items-center justify-center text-outline-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">info</span>
          <p className="font-body-md text-body-md text-on-surface-variant">No interview selected</p>
          <p className="font-label-sm text-label-sm text-outline mt-1">Click on any interview from the list to view its detailed feedback and transcript</p>
        </div>
      </aside>
    </div>
  );
}
