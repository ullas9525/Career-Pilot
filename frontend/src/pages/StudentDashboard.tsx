export default function StudentDashboard() {
  return (
    <div className="p-margin-mobile md:p-gutter max-w-container-max mx-auto w-full">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-outline-variant/20 pt-4 md:pt-0">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Hello, Student.</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Your placement readiness dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk0k6WnKGQ85-pb5e9Te-kyUWA9HyaXu838biEsDH6XwTxtPmN0xADItHOq4JXAgDXcPY7Un1IcOvilW4d5-PzvwOFav8mdoOeh6FnJKtwf5P7oFfxXv4MuebeEunC_btkigDkSph3HfJtqRYbAXJndHYCS_Q8rdZ7sD1JeVuWquyCE_kRePqIkGYeu-Y_RsfSS2QCcI-4X5fwN1dSVFws4HQc4KgqsCrZogwMsNmHl1zAzOSojBgL59z9oF8jo0Vk6xqVHwqck2U" />
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="glass-panel rounded-xl p-6">
          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2">Readiness Score</h3>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-display-lg text-primary">0.0</span>
            <span className="font-body-md text-body-md text-outline">/ 10</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-tertiary">trending_flat</span>
            <span className="font-label-sm text-label-sm text-tertiary">No data yet</span>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6">
          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2">Next Interview</h3>
          <p className="font-headline-md text-headline-md text-on-surface truncate">None scheduled</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1 font-label-sm text-label-sm bg-surface-container py-1 px-2 rounded-md">
              <span className="material-symbols-outlined text-[14px]">event</span> —
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6 flex items-center justify-between">
          <div>
            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2">Practice Streak</h3>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-display-lg text-secondary">0</span>
              <span className="font-body-md text-body-md text-outline">days</span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-full bg-secondary-container/30 flex items-center justify-center border border-secondary-container">
            <span className="material-symbols-outlined text-[32px] text-secondary">local_fire_department</span>
          </div>
        </div>
      </section>

      {/* Score Breakdown | Skill Balance | Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="glass-panel rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-headline-md text-headline-md text-on-surface">📊 Score Breakdown</h3>
            <span className="text-xs text-outline">Weights based on your role</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm"><span>Technical Depth <span className="text-xs text-outline">(40%)</span></span><span className="font-semibold text-primary">0.0/10</span></div>
              <div className="w-full h-1.5 bg-surface-variant rounded-full mt-0.5">
                <div className="h-full bg-primary rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm"><span>Communication <span className="text-xs text-outline">(20%)</span></span><span className="font-semibold text-primary">0.0/10</span></div>
              <div className="w-full h-1.5 bg-surface-variant rounded-full mt-0.5">
                <div className="h-full bg-primary rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm"><span>Problem Solving <span className="text-xs text-outline">(30%)</span></span><span className="font-semibold text-primary">0.0/10</span></div>
              <div className="w-full h-1.5 bg-surface-variant rounded-full mt-0.5">
                <div className="h-full bg-primary rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm"><span>Culture Fit <span className="text-xs text-outline">(10%)</span></span><span className="font-semibold text-primary">0.0/10</span></div>
              <div className="w-full h-1.5 bg-surface-variant rounded-full mt-0.5">
                <div className="h-full bg-primary rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-outline-variant/20 text-center text-xs text-on-surface-variant">
            ⚡ Weighted total: <strong className="text-primary">0.0/10</strong>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6 flex flex-col h-[340px] items-center">
          <h3 className="font-headline-md text-headline-md text-on-surface self-start w-full mb-4">Skill Balance</h3>
          <div className="relative w-full flex-1 flex items-center justify-center max-w-[220px]">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 200 200">
              <polygon fill="none" points="100,10 185,70 155,170 45,170 15,70" stroke="var(--color-outline-variant)" strokeOpacity="0.3" strokeWidth="1"></polygon>
              <polygon fill="none" points="100,40 160,85 135,150 65,150 40,85" stroke="var(--color-outline-variant)" strokeOpacity="0.3" strokeWidth="1"></polygon>
              <polygon fill="none" points="100,70 135,100 115,130 85,130 65,100" stroke="var(--color-outline-variant)" strokeOpacity="0.3" strokeWidth="1"></polygon>
              <line stroke="var(--color-outline-variant)" strokeOpacity="0.3" x1="100" x2="100" y1="100" y2="10"></line>
              <line stroke="var(--color-outline-variant)" strokeOpacity="0.3" x1="100" x2="185" y1="100" y2="70"></line>
              <line stroke="var(--color-outline-variant)" strokeOpacity="0.3" x1="100" x2="155" y1="100" y2="170"></line>
              <line stroke="var(--color-outline-variant)" strokeOpacity="0.3" x1="100" x2="45" y1="100" y2="170"></line>
              <line stroke="var(--color-outline-variant)" strokeOpacity="0.3" x1="100" x2="15" y1="100" y2="70"></line>
              <polygon fill="#6ef3f3" fillOpacity="0.2" points="100,100 100,100 100,100 100,100 100,100" stroke="#006a6a" strokeWidth="1"></polygon>
              <text fill="var(--color-on-surface-variant)" fontFamily="Inter" fontSize="10" textAnchor="middle" x="100" y="0">Technical</text>
              <text fill="var(--color-on-surface-variant)" fontFamily="Inter" fontSize="10" textAnchor="start" x="190" y="75">Comm.</text>
              <text fill="var(--color-on-surface-variant)" fontFamily="Inter" fontSize="10" textAnchor="middle" x="160" y="185">Leadership</text>
              <text fill="var(--color-on-surface-variant)" fontFamily="Inter" fontSize="10" textAnchor="middle" x="40" y="185">Problem Solv.</text>
              <text fill="var(--color-on-surface-variant)" fontFamily="Inter" fontSize="10" textAnchor="end" x="10" y="75">Confidence</text>
            </svg>
          </div>
          <p className="text-on-surface-variant text-sm mt-2">Complete interviews to see your skill profile</p>
        </div>

        <div className="glass-panel rounded-xl p-6 flex flex-col">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Recent Activity</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant">hourglass_empty</span>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">No recent activity</p>
              <p className="font-label-sm text-label-sm text-outline mt-1">Start a mock interview to see your progress here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-6 flex flex-col h-[340px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-on-surface">Score Progression</h3>
            <select className="bg-surface-container border-none text-label-sm font-label-sm text-on-surface-variant rounded-md py-1 pl-2 pr-8 focus:ring-1 focus:ring-primary">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
            </select>
          </div>
          <div className="flex-1 relative w-full border-b border-l border-outline-variant/30 flex items-end pt-4 pr-2">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 100">
              <line stroke="var(--color-outline-variant)" strokeOpacity="0.2" strokeWidth="1" x1="0" x2="400" y1="25" y2="25"></line>
              <line stroke="var(--color-outline-variant)" strokeOpacity="0.2" strokeWidth="1" x1="0" x2="400" y1="50" y2="50"></line>
              <line stroke="var(--color-outline-variant)" strokeOpacity="0.2" strokeWidth="1" x1="0" x2="400" y1="75" y2="75"></line>
              <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#004ccd" stopOpacity="0.1"></stop>
                <stop offset="100%" stopColor="#004ccd" stopOpacity="0"></stop>
              </linearGradient>
              <path d="M0,100 L0,75 L400,75 L400,100 Z" fill="url(#lineGrad)"></path>
              <path d="M0,75 L400,75" fill="none" stroke="#004ccd" strokeLinecap="round" strokeWidth="2" strokeDasharray="4"></path>
              <circle cx="200" cy="75" r="3" fill="#004ccd" stroke="#fff" strokeWidth="1.5"></circle>
            </svg>
          </div>
          <div className="text-center text-on-surface-variant text-sm mt-4">No interview scores recorded yet</div>
        </div>

        <div className="glass-panel rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline-md text-headline-md text-on-surface">Practice Frequency</h3>
            <div className="flex items-center gap-1 font-label-sm text-label-sm text-outline">
              <span>Less</span>
              <div className="w-3 h-3 rounded-sm bg-surface-container"></div>
              <div className="w-3 h-3 rounded-sm bg-secondary-container/40"></div>
              <div className="w-3 h-3 rounded-sm bg-secondary-container/80"></div>
              <div className="w-3 h-3 rounded-sm bg-secondary"></div>
              <span>More</span>
            </div>
          </div>
          <div className="grid grid-rows-7 grid-flow-col gap-1 w-full overflow-x-auto pb-2">
            {/* Heatmap Empty State generation */}
            {Array.from({ length: 140 }).map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-sm bg-surface-container transition-transform hover:scale-110 cursor-pointer" title="No practice recorded"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="mt-6 mb-6">
        <div className="glass-panel rounded-xl p-5">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">🎯 Next Steps</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">Your personalised action plan will appear here after your first interview.</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <span className="material-symbols-outlined text-5xl text-outline-variant mb-3">route</span>
            <p className="font-label-md text-label-md text-on-surface-variant">No plan yet</p>
            <p className="font-label-sm text-label-sm text-outline mt-1 max-w-xs">Complete your first mock interview and we'll generate a personalised 14-day improvement plan for you.</p>
            <button className="mt-4 px-5 py-2.5 bg-gradient-to-r from-primary to-surface-tint text-white rounded-xl font-label-md text-label-md shadow-[0_4px_12px_rgba(0,76,205,0.2)] hover:shadow-[0_6px_16px_rgba(0,76,205,0.3)] transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">play_circle</span> Start Mock Interview
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
