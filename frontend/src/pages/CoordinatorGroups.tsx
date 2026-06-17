export default function CoordinatorGroups() {
  return (
    <div className="flex-1 px-4 md:px-margin-desktop py-8 max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      {/* Groups Section */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Placement Groups</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage cohorts and track batch readiness.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-outline-variant/50 rounded-xl font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 backdrop-blur-sm transition-all placeholder:text-outline" 
                placeholder="Search groups..." 
                type="text" 
              />
            </div>
            <button className="flex-shrink-0 bg-secondary hover:bg-on-secondary-container text-white px-4 py-2.5 rounded-xl font-label-md text-label-md transition-colors shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              <span className="hidden sm:inline">Create Group</span>
            </button>
          </div>
        </div>

        {/* Groups Grid - Empty State */}
        <div className="glass-card rounded-2xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-outline-variant mb-3">groups</span>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">No groups created yet</h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
            Click "Create Group" to start organizing students into cohorts, assign mock interview tracks, and monitor batch-wise progress.
          </p>
        </div>
      </div>

      {/* Right Panel: Global Leaderboard - Empty State */}
      <div className="lg:col-span-4 mt-8 lg:mt-0">
        <div className="glass-card rounded-3xl p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-tertiary-container/20 text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
            </div>
            <h3 className="font-headline-md text-[20px] text-on-surface">Global Leaderboard</h3>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center py-8 text-center min-h-[300px]">
            <span className="material-symbols-outlined text-4xl text-outline-variant mb-3">leaderboard</span>
            <p className="font-body-md text-body-md text-on-surface-variant">No leaderboard data yet</p>
            <p className="font-label-sm text-label-sm text-outline mt-1">
              Once students complete mock interviews and join groups, rankings will appear here.
            </p>
          </div>
          <button className="mt-4 w-full py-2 text-center font-label-sm text-label-sm text-secondary hover:text-on-secondary-container transition-colors opacity-50 cursor-not-allowed" disabled>
            View Full Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
