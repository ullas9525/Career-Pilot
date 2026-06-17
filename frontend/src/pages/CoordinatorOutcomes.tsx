import { useState, FormEvent } from 'react';

export default function CoordinatorOutcomes() {
  const [activeTab, setActiveTab] = useState<'report' | 'insights'>('report');
  const [status, setStatus] = useState<string>('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleStatusChange = (val: string) => {
    setStatus(val);
    if (val === 'offer') {
      setShowCelebration(true);
    } else {
      setShowCelebration(false);
    }
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        setStatus('');
        setShowCelebration(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex-1 px-4 md:px-margin-desktop py-8">
      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Placement Outcome Tracking</h1>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/30 border border-secondary/20">
              <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <span className="font-label-sm text-label-sm text-on-secondary-container">100% voluntary · No personal data shared</span>
            </div>
          </div>
          <p className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl">
            Optional reporting – helps us improve interview prep for future students through real-world insights.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-8 border-b border-white/20">
            <button 
              onClick={() => setActiveTab('report')}
              className={`px-4 py-3 font-label-md text-label-md transition-all flex items-center gap-2 ${activeTab === 'report' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-primary'}`}
            >
              <span className="material-symbols-outlined text-xl">edit_document</span> Report Outcome
            </button>
            <button 
              onClick={() => setActiveTab('insights')}
              className={`px-4 py-3 font-label-md text-label-md transition-all flex items-center gap-2 ${activeTab === 'insights' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-primary'}`}
            >
              <span className="material-symbols-outlined text-xl">bar_chart_4_bars</span> Aggregated Insights
            </button>
          </div>
        </div>

        {/* Tab: Report Outcome */}
        {activeTab === 'report' && (
          <div className="animate-toast-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <div className="glass-card rounded-2xl p-8">
                  <form className="space-y-6" onSubmit={handleSave}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant">Student Identifier</label>
                        <div className="relative">
                          <select className="w-full bg-white/40 border border-white/40 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none">
                            <option>Select student...</option>
                            <option>Alex Rivera</option>
                            <option>Jamie Chen</option>
                            <option>Sarah Johnson</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none z-10" style={{ fontSize: '20px' }}>arrow_drop_down</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant">Outcome Status</label>
                        <div className="flex flex-wrap gap-3">
                          {[
                            { val: 'offer', label: 'Got an offer' },
                            { val: 'process', label: 'Still in process' },
                            { val: 'rejected', label: 'Rejected' },
                            { val: 'waiting', label: 'Waiting' }
                          ].map(opt => (
                            <label key={opt.val} className="cursor-pointer group">
                              <input 
                                className="hidden peer" 
                                name="status" 
                                type="radio" 
                                value={opt.val}
                                checked={status === opt.val}
                                onChange={() => handleStatusChange(opt.val)}
                              />
                              <div className="px-4 py-2 rounded-full border border-white/40 bg-white/20 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all font-label-sm text-label-sm">
                                {opt.label}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant">Company Name</label>
                        <input className="w-full bg-white/40 border border-white/40 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="e.g. Google, Stripe" type="text" />
                      </div>
                      <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant">Job Role</label>
                        <input className="w-full bg-white/40 border border-white/40 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="e.g. Senior Product Designer" type="text" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant">Date of Outcome</label>
                        <input className="w-full bg-white/40 border border-white/40 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="date" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-label-md text-label-md text-on-surface-variant">Additional Notes (Optional)</label>
                      <textarea className="w-full bg-white/40 border border-white/40 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Any specific feedback or learnings from the process?" rows={3}></textarea>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button 
                        type="submit"
                        disabled={isSaving}
                        className={`px-8 py-3 rounded-xl border-2 font-headline-md text-headline-md transition-all flex items-center gap-2 ${
                          isSaved 
                            ? 'bg-tertiary/10 text-tertiary border-tertiary/20' 
                            : 'border-primary text-primary hover:bg-primary/5 active:scale-95'
                        }`}
                      >
                        {isSaving ? (
                          <><span className="material-symbols-outlined animate-spin">progress_activity</span> Processing...</>
                        ) : isSaved ? (
                          <><span className="material-symbols-outlined">check_circle</span> Saved Successfully</>
                        ) : (
                          'Save Outcome (Optional)'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                {/* Celebration Card */}
                {showCelebration && (
                  <div className="transform transition-all duration-500 animate-toast-in">
                    <div className="glass-card rounded-2xl p-8 border-tertiary-container/30 bg-tertiary-container/5 relative overflow-hidden">
                      <div className="relative z-10 text-center">
                        <div className="w-16 h-16 bg-tertiary-container rounded-full flex items-center justify-center mx-auto mb-4 text-white animate-bounce">
                          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
                        </div>
                        <h3 className="font-headline-md text-headline-md text-tertiary mb-2">Huge Congratulations!</h3>
                        <p className="text-on-surface-variant font-body-md">Your hard work has officially paid off. Reporting this helps the entire community learn from your success.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Side Tip */}
                <div className="glass-card rounded-2xl p-6 border-primary/20 bg-primary/5">
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                    <div>
                      <h4 className="font-label-md text-label-md text-primary mb-1">Why report?</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        By sharing your outcome, you help us map which companies are currently hiring and what the typical interview pipeline looks like for your cohort.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coordinator Section: Track outcomes for your cohort */}
            <section className="mt-12 glass-card rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between">
                <h2 className="font-headline-md text-headline-md text-on-surface">Track outcomes for your cohort</h2>
                <button className="flex items-center gap-2 text-primary font-label-md hover:underline opacity-50 cursor-not-allowed" disabled>
                  <span className="material-symbols-outlined text-lg">download</span> Export CSV
                </button>
              </div>
              <div className="p-12 text-center flex flex-col items-center min-h-[300px] justify-center">
                <span className="material-symbols-outlined text-5xl text-outline-variant mb-3">person_search</span>
                <p className="font-body-md text-body-md text-on-surface-variant">No outcomes recorded yet</p>
                <p className="font-label-sm text-label-sm text-outline mt-1">Add outcomes using the form above – they will appear here.</p>
              </div>
            </section>
          </div>
        )}

        {/* Tab: Aggregated Insights */}
        {activeTab === 'insights' && (
          <div className="animate-toast-in">
            <div className="glass-card rounded-2xl p-12 text-center min-h-[400px] flex flex-col justify-center items-center">
              <span className="material-symbols-outlined text-5xl text-outline-variant mb-3">bar_chart</span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">No insights yet</h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
                Once outcomes are reported, you'll see aggregated, anonymised patterns about mock score vs. offer rate.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
