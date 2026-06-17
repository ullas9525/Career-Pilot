import React from 'react';

export default function CoordinatorDashboard() {
  return (
    <div className="p-6 md:p-8 w-full max-w-[1600px] mx-auto">
      {/* Header */}
      <header className="flex flex-wrap justify-between items-start md:items-center gap-4 mb-8 pt-4 md:pt-0">
        <div>
          <h2 className="text-headline-lg font-display font-bold text-on-background">Placement Coordinator Dashboard</h2>
          <p className="text-body-md text-on-surface-variant">Monitor student readiness, track outcomes, and act on at‑risk individuals</p>
        </div>
        <div className="flex gap-3">
          <div className="glass-card rounded-lg px-3 py-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            <select className="bg-transparent border-none text-label-md focus:ring-0">
              <option>Fall 2024</option>
              <option>Spring 2024</option>
            </select>
          </div>
          <button className="glass-card px-4 py-2 rounded-lg text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">download</span> Export
          </button>
        </div>
      </header>

      {/* Metric Cards - Static for visual fidelity, to be connected to backend later */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6"><p className="text-label-md text-on-surface-variant">Total Students</p><p className="text-display-lg font-display text-primary">0</p></div>
        <div className="glass-card rounded-2xl p-6"><p className="text-label-md text-on-surface-variant">Avg Readiness Score</p><p className="text-display-lg font-display text-secondary">0.0<span className="text-headline-md text-outline">/10</span></p></div>
        <div className="glass-card rounded-2xl p-6"><p className="text-label-md text-on-surface-variant">Placement Rate (estimated)</p><p className="text-display-lg font-display text-tertiary">0%</p><p className="text-label-sm text-tertiary">+0% vs non‑users</p></div>
        <div className="glass-card rounded-2xl p-6"><p className="text-label-md text-on-surface-variant">Inactive &gt;3 days</p><p className="text-display-lg font-display text-error">0</p><p className="text-label-sm text-error">Requires attention</p></div>
      </div>

      {/* Batch Reporting Summary */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <h3 className="text-headline-md font-display mb-4">📊 Batch Performance Snapshot</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/50 rounded-xl p-4"><p className="text-label-md text-on-surface-variant">Students in active prep</p><p className="text-headline-md font-bold text-primary">0</p></div>
          <div className="bg-white/50 rounded-xl p-4"><p className="text-label-md text-on-surface-variant">Completed 3+ mock interviews</p><p className="text-headline-md font-bold text-secondary">0</p><p className="text-label-sm text-tertiary">0% engagement</p></div>
          <div className="bg-white/50 rounded-xl p-4"><p className="text-label-md text-on-surface-variant">Confirmed offers (this cohort)</p><p className="text-headline-md font-bold text-tertiary">0</p><p className="text-label-sm text-tertiary">0% offer rate among active</p></div>
        </div>
      </div>

      {/* Student Progress Table (Empty State) */}
      <div className="glass-card rounded-2xl p-6 mb-8 overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-headline-md font-display">Student Progress & Risk Monitoring</h3>
          <button className="text-primary text-label-md flex items-center gap-1"><span className="material-symbols-outlined text-sm">filter_alt</span> Filter</button>
        </div>
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="border-b border-outline-variant/30">
            <tr>
              <th className="py-3 px-2 text-label-sm text-on-surface-variant">Student</th>
              <th className="py-3 px-2 text-label-sm text-on-surface-variant">Batch</th>
              <th className="py-3 px-2 text-label-sm text-on-surface-variant">Practice Freq (sessions/week)</th>
              <th className="py-3 px-2 text-label-sm text-on-surface-variant">Score Progression</th>
              <th className="py-3 px-2 text-label-sm text-on-surface-variant">Anxiety Trend</th>
              <th className="py-3 px-2 text-label-sm text-on-surface-variant">Last Active</th>
              <th className="py-3 px-2 text-label-sm text-on-surface-variant">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {/* No Data - Awaiting Backend */}
            <tr>
              <td colSpan={7} className="py-8 text-center text-on-surface-variant font-body-md">
                No students enrolled yet. Once students begin practicing, their data will appear here.
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4 text-right text-label-sm text-on-surface-variant">Showing 0 of 0 students</div>
      </div>

      {/* Alert Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-headline-md font-display mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-error">notifications_active</span> Intervention Alerts</h3>
          <div className="flex flex-col items-center justify-center py-8 text-center h-full">
            <span className="material-symbols-outlined text-4xl text-outline-variant">task_alt</span>
            <p className="font-body-md text-on-surface-variant mt-2">All caught up!</p>
            <p className="font-label-sm text-outline mt-1">No students currently require intervention.</p>
          </div>
        </div>

        {/* Outcome Tracking Snapshot */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-headline-md font-display mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-secondary">checklist</span> Recent Placement Outcomes</h3>
          <div className="flex flex-col items-center justify-center py-8 text-center h-full">
            <span className="material-symbols-outlined text-4xl text-outline-variant">inbox</span>
            <p className="font-body-md text-on-surface-variant mt-2">No outcomes reported yet</p>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/30 text-center"><a href="#" className="text-primary text-label-sm pointer-events-none opacity-50">View full outcomes report →</a></div>
        </div>
      </div>

      {/* ENHANCED CORRELATION SECTION: Empty states for charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Graph 1: Offer rate by score bracket */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-headline-md font-display mb-1">Offer Rate vs. Mock Score</h3>
          <p className="text-label-sm text-on-surface-variant mb-6">Awaiting student data</p>
          <div className="relative h-64 w-full flex items-center justify-center border border-dashed border-outline-variant/30 rounded-xl">
             <p className="text-on-surface-variant font-label-md">Chart will generate once sufficient data is collected.</p>
          </div>
        </div>

        {/* Graph 2: Score distribution histogram */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-headline-md font-display mb-1">Mock Score Distribution</h3>
          <p className="text-label-sm text-on-surface-variant mb-6">Awaiting student data</p>
          <div className="relative h-64 w-full flex items-center justify-center border border-dashed border-outline-variant/30 rounded-xl">
            <p className="text-on-surface-variant font-label-md">Chart will generate once sufficient data is collected.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
