import { useState } from 'react';

export default function Leaderboard() {
  const [currentTab, setCurrentTab] = useState<'group' | 'global'>('group');

  // Empty state data - awaiting backend
  const students: any[] = [];

  return (
    <div className="flex-1 px-margin-desktop py-8 max-w-container-max mx-auto w-full flex flex-col gap-6 pb-20">
      
      {/* Your Position Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/5 border border-primary/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Your Position (Anonymous)</p>
            <p className="font-headline-md text-headline-md text-on-surface mt-0.5">Start practicing to get ranked</p>
            <p className="text-sm text-on-surface-variant mt-0.5">Readiness Score: <strong>-- / 10</strong> &nbsp;·&nbsp; Engagement Score: <strong className="text-secondary">-- / 100</strong></p>
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <div className="text-center px-5 py-3 bg-white/60 rounded-xl border border-white/60">
            <p className="text-2xl font-bold text-primary">--</p>
            <p className="text-xs text-outline mt-0.5">Cohort Percentile</p>
          </div>
          <div className="text-center px-5 py-3 bg-white/60 rounded-xl border border-white/60">
            <p className="text-2xl font-bold text-secondary">--</p>
            <p className="text-xs text-outline mt-0.5">Engagement</p>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="flex items-start gap-2 text-xs text-on-surface-variant bg-surface-container/60 rounded-xl px-4 py-3 border border-outline-variant/20">
        <span className="material-symbols-outlined text-[16px] text-outline mt-0.5">shield</span>
        <span><strong className="text-on-surface">Privacy-first leaderboard:</strong> Full names are never shown. All rankings use anonymous IDs <strong className="text-primary">within your college only</strong>. <strong>No cross‑college comparison</strong> – you are only compared to students in your own cohort.</span>
      </div>

      {/* Leaderboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Main leaderboard */}
        <section className="lg:col-span-8 flex flex-col">
          <div className="bg-white/60 backdrop-blur-[20px] border border-white/60 shadow-sm rounded-2xl p-6 flex flex-col min-h-[400px]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">emoji_events</span>
                <h3 className="font-headline-md text-[24px] font-semibold text-on-surface">Rankings</h3>
              </div>
              <span className="px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-on-surface-variant border border-outline-variant/20">Updated just now</span>
            </div>
            
            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-outline-variant/30 pb-2">
              <button 
                onClick={() => setCurrentTab('group')} 
                className={currentTab === 'group' ? 'px-4 py-2 font-label-md text-primary border-b-2 border-primary -mb-[10px]' : 'px-4 py-2 font-label-md text-on-surface-variant hover:text-on-surface transition-colors'}
              >
                Your Cohort
              </button>
              <button 
                onClick={() => setCurrentTab('global')} 
                className={currentTab === 'global' ? 'px-4 py-2 font-label-md text-primary border-b-2 border-primary -mb-[10px]' : 'px-4 py-2 font-label-md text-on-surface-variant hover:text-on-surface transition-colors'}
              >
                By Role
              </button>
            </div>
            
            {/* Column headers */}
            <div className="grid grid-cols-12 text-xs font-semibold text-outline uppercase tracking-wider px-3 pb-2 border-b border-outline-variant/20 mb-2">
              <span className="col-span-1">Rank</span>
              <span className="col-span-3">Student</span>
              <span className="col-span-2 text-center">Percentile</span>
              <span className="col-span-2 text-center">Score</span>
              <span className="col-span-2 text-center">Engagement</span>
              <span className="col-span-2 text-center">Sessions</span>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center text-center">
               <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">sentiment_dissatisfied</span>
               <p className="text-on-surface-variant text-sm">No rankings available yet.</p>
               <p className="text-outline text-xs mt-1">Once students in your cohort complete mock interviews, the leaderboard will update.</p>
            </div>
          </div>
        </section>

        {/* Right column */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          {/* Cohort Stats */}
          <section className="bg-white/60 backdrop-blur-[20px] border border-white/60 shadow-sm rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              <h3 className="font-headline-md text-[18px] font-semibold text-on-surface">Cohort Overview</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Total students</span><strong>0</strong></div>
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Avg. Readiness Score</span><strong className="text-primary">-- / 10</strong></div>
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Avg. Engagement Score</span><strong className="text-secondary">-- / 100</strong></div>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant/20">
              <p className="text-xs font-semibold text-on-surface mb-2">Score Distribution</p>
              <p className="text-xs text-outline text-center py-4">Awaiting cohort data</p>
            </div>
          </section>

          {/* Engagement Score Legend */}
          <section className="bg-white/60 backdrop-blur-[20px] border border-white/60 shadow-sm rounded-2xl p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-[20px]">info</span>
              <h3 className="font-label-md font-semibold text-on-surface">Engagement Score</h3>
            </div>
            <p className="text-xs text-on-surface-variant mb-3">Calculated from practice frequency + consistency, independent of interview scores.</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-tertiary shrink-0"></div><span><strong>Practice Frequency (50%)</strong> — sessions per week</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary shrink-0"></div><span><strong>Consistency (30%)</strong> — streak days / 30</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-secondary shrink-0"></div><span><strong>Improvement Rate (20%)</strong> — score trend over last 4 sessions</span></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
