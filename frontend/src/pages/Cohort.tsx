import { Link } from 'react-router-dom';

export default function Cohort() {
  return (
    <div className="flex-1 px-4 md:px-margin-desktop py-8">
      <div className="mb-8">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">My Cohort</h1>
        <p className="font-body-lg text-on-surface-variant mt-2">Track your progress compared to peers in your batch</p>
      </div>

      {/* Cohort Header Card */}
      <div className="glass-card rounded-2xl p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-primary">groups</span>
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">No Active Cohort</h2>
            <p className="text-sm text-on-surface-variant">Cohort code: <span className="font-mono bg-surface-variant px-2 py-0.5 rounded">--</span> • 0 members</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-full border border-primary text-primary text-sm font-semibold hover:bg-primary/5">Share Cohort</button>
          <Link to="/student/leaderboard" className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow-md">View Full Leaderboard</Link>
        </div>
      </div>

      {/* Personal Stats vs Cohort Average */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6 text-center">
          <span className="material-symbols-outlined text-3xl text-primary mb-2">score</span>
          <p className="text-label-sm text-outline">Your Score</p>
          <p className="font-display-lg text-display-lg text-primary">--<span className="text-headline-md">/100</span></p>
          <p className="text-xs text-outline mt-1">Take a mock interview to get scored</p>
        </div>
        <div className="glass-card rounded-2xl p-6 text-center">
          <span className="material-symbols-outlined text-3xl text-secondary mb-2">group</span>
          <p className="text-label-sm text-outline">Cohort Average</p>
          <p className="font-display-lg text-display-lg text-secondary">--<span className="text-headline-md">/100</span></p>
          <p className="text-xs text-outline mt-1">Awaiting cohort data</p>
        </div>
        <div className="glass-card rounded-2xl p-6 text-center">
          <span className="material-symbols-outlined text-3xl text-tertiary mb-2">trending_up</span>
          <p className="text-label-sm text-outline">Your Rank</p>
          <p className="font-display-lg text-display-lg text-tertiary">--</p>
          <p className="text-xs text-outline mt-1">Awaiting cohort data</p>
        </div>
      </div>

      {/* Cohort Leaderboard (Empty) */}
      <div className="glass-card rounded-2xl p-6 mb-8 min-h-[300px] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-headline-md text-headline-md text-on-surface">🏆 Cohort Leaderboard</h3>
          <Link to="/student/leaderboard" className="text-primary text-sm font-semibold hover:underline">View leaderboard →</Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
           <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">group_off</span>
           <p className="text-on-surface-variant text-sm">No members in this cohort yet.</p>
           <p className="text-outline text-xs mt-1">Share the cohort code to invite others.</p>
        </div>
      </div>

      {/* Practice Consistency & Peer Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly practice heatmap */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4">📅 Practice Consistency</h3>
          <div className="flex justify-between items-end gap-1 h-32">
            <div className="flex flex-col items-center flex-1"><div className="w-full bg-surface-variant rounded-t-lg" style={{ height: '4px' }}></div><span className="text-xs mt-1 text-outline">Week 1</span></div>
            <div className="flex flex-col items-center flex-1"><div className="w-full bg-surface-variant rounded-t-lg" style={{ height: '4px' }}></div><span className="text-xs mt-1 text-outline">Week 2</span></div>
            <div className="flex flex-col items-center flex-1"><div className="w-full bg-surface-variant rounded-t-lg" style={{ height: '4px' }}></div><span className="text-xs mt-1 text-outline">Week 3</span></div>
            <div className="flex flex-col items-center flex-1"><div className="w-full bg-surface-variant rounded-t-lg" style={{ height: '4px' }}></div><span className="text-xs mt-1 text-outline">Week 4</span></div>
            <div className="flex flex-col items-center flex-1"><div className="w-full bg-surface-variant rounded-t-lg" style={{ height: '4px' }}></div><span className="text-xs mt-1 font-semibold text-outline">This week</span></div>
          </div>
          <p className="text-center text-sm text-on-surface-variant mt-4">You've practiced <strong className="text-primary">0 times</strong> in the last 30 days.</p>
        </div>

        {/* Peer comparison details */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4">📊 You vs Cohort</h3>
          <div className="flex-1 flex flex-col items-center justify-center text-center h-full min-h-[160px]">
             <span className="material-symbols-outlined text-3xl text-outline-variant mb-2">bar_chart</span>
             <p className="text-on-surface-variant text-sm">Not enough data.</p>
             <p className="text-outline text-xs mt-1">Complete mock interviews to see how you compare to your peers.</p>
          </div>
        </div>
      </div>

      {/* Join another cohort */}
      <div className="glass-card rounded-2xl p-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl text-secondary">group_add</span>
          <div>
            <p className="font-semibold">Join another cohort</p>
            <p className="text-sm text-on-surface-variant">Enter a cohort code to join a different batch (e.g., for a different company prep)</p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <input type="text" placeholder="Cohort code" className="px-4 py-2 rounded-xl bg-white/50 border border-outline-variant focus:border-primary" />
          <button className="bg-primary text-white px-5 py-2 rounded-xl font-semibold">Join</button>
        </div>
      </div>
    </div>
  );
}
