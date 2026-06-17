export default function CoordinatorProgress() {
  return (
    <div className="flex-1 overflow-hidden flex flex-col h-full bg-gradient-to-br from-surface-bright to-surface-container-low">
      {/* Header / Filter Bar */}
      <header className="w-full px-margin-mobile md:px-gutter py-6 z-10 glass-card border-b-0 border-r-0 border-l-0 shadow-sm relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="font-headline-lg text-headline-lg md:font-headline-lg md:text-headline-lg text-on-surface">Student Progress Monitoring</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Track cohort performance and identify intervention needs.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-primary hover:border-primary transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px]">download</span> Export List
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-surface-tint transition-colors shadow-md">
              <span className="material-symbols-outlined text-[18px]">add_alert</span> Flag for Follow-up
            </button>
          </div>
        </div>
        
        {/* Advanced Filters */}
        <div className="flex flex-wrap gap-4 items-center bg-white/50 p-4 rounded-xl border border-white/60">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-outline-variant/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-fixed transition-all flex-1 min-w-[200px]">
            <span className="material-symbols-outlined text-outline">search</span>
            <input className="bg-transparent border-none outline-none font-body-md text-body-md w-full placeholder:text-outline" placeholder="Search student name..." type="text" />
          </div>
          <select className="bg-white px-3 py-2 rounded-lg border border-outline-variant/50 font-label-md text-label-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed outline-none appearance-none pr-8">
            <option value="">All Batches</option>
            <option value="fall24">Fall 2024</option>
            <option value="spring25">Spring 2025</option>
          </select>
          <select className="bg-white px-3 py-2 rounded-lg border border-outline-variant/50 font-label-md text-label-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed outline-none appearance-none pr-8">
            <option value="">Role Target</option>
            <option value="swe">Software Engineer</option>
            <option value="pm">Product Manager</option>
            <option value="data">Data Scientist</option>
          </select>
          <select className="bg-white px-3 py-2 rounded-lg border border-outline-variant/50 font-label-md text-label-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed outline-none appearance-none pr-8">
            <option value="">Status</option>
            <option value="on_track">On Track</option>
            <option value="at_risk">At Risk</option>
            <option value="excel">Excelling</option>
          </select>
          <button className="flex items-center gap-1 text-primary font-label-md text-label-md px-2 py-2 hover:bg-primary-container/10 rounded-md transition-colors">
            <span className="material-symbols-outlined text-[18px]">tune</span> More Filters
          </button>
        </div>
      </header>

      {/* Main Workspace (Table + Side Panel) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Data Table Section - Empty State */}
        <div className="flex-1 overflow-auto p-margin-mobile md:p-gutter">
          <div className="glass-card rounded-xl overflow-hidden flex flex-col h-full shadow-sm border border-outline-variant/30 min-h-[400px]">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low/80 sticky top-0 z-10 border-b border-outline-variant/30 backdrop-blur-md">
                  <tr>
                    <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-semibold w-12">
                      <input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                    </th>
                    <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-semibold">Student Name</th>
                    <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-semibold">Batch</th>
                    <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-semibold">Target Role</th>
                    <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-semibold">Last Mock Date</th>
                    <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-semibold">Overall Score</th>
                    <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Empty state row */}
                  <tr>
                    <td colSpan={7} className="py-12 text-center h-[300px]">
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="material-symbols-outlined text-5xl text-outline-variant mb-3">person_search</span>
                        <p className="font-body-md text-body-md text-on-surface-variant">No students found</p>
                        <p className="font-label-sm text-label-sm text-outline mt-1">Adjust your filters or add students to get started</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="p-4 border-t border-outline-variant/30 bg-white/50 flex justify-between items-center">
              <span className="font-body-md text-body-md text-on-surface-variant text-sm">Showing 0 of 0 students</span>
              <div className="flex gap-1">
                <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button className="p-1 px-3 rounded hover:bg-surface-container text-on-surface-variant font-label-sm">1</button>
                <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Student Detail Side Panel - Empty State */}
        <aside className="hidden md:flex w-full md:w-[400px] flex-shrink-0 border-l border-outline-variant/30 bg-surface/90 backdrop-blur-[30px] h-full flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.05)] z-20">
          <div className="p-6 border-b border-outline-variant/30 flex justify-between items-start bg-white/40">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Student Details</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">Select a student to view progress</p>
            </div>
            <button className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center flex-col p-8 text-center min-h-[400px]">
            <span className="material-symbols-outlined text-5xl text-outline-variant mb-3">info</span>
            <p className="font-body-md text-body-md text-on-surface-variant">No student selected</p>
            <p className="font-label-sm text-label-sm text-outline mt-1">Click on any student row to see their detailed progress and feedback.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
