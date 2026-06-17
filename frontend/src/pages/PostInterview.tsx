import { useState, FormEvent } from 'react';

export default function PostInterview() {
  const [status, setStatus] = useState<string>('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [date, setDate] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [savedOutcome, setSavedOutcome] = useState<any>(null);

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
    if (!status) {
      alert('Please select an outcome status (or choose "Waiting / Unknown").');
      return;
    }

    setSavedOutcome({
      status,
      company,
      role,
      date
    });
  };

  const renderStatusDetails = () => {
    if (!savedOutcome) return null;

    let statusText = '';
    let statusColor = '';
    let icon = '';
    
    if (savedOutcome.status === 'offer') {
      statusText = '✅ Got an offer';
      statusColor = 'text-tertiary';
      icon = 'check_circle';
    } else if (savedOutcome.status === 'process') {
      statusText = '⏳ Still in process';
      statusColor = 'text-secondary';
      icon = 'schedule';
    } else if (savedOutcome.status === 'rejected') {
      statusText = '❌ Rejected';
      statusColor = 'text-error';
      icon = 'cancel';
    } else {
      statusText = '🕒 Waiting / Unknown';
      statusColor = 'text-outline';
      icon = 'help';
    }

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-4 bg-white/40 rounded-xl">
          <span className={`material-symbols-outlined ${statusColor}`}>{icon}</span>
          <div>
            <p className="font-label-md font-semibold">{statusText}</p>
            {savedOutcome.company && <p className="text-sm text-on-surface-variant">Company: {savedOutcome.company}</p>}
            {savedOutcome.role && <p className="text-sm text-on-surface-variant">Role: {savedOutcome.role}</p>}
            {savedOutcome.date && <p className="text-sm text-on-surface-variant">Date: {savedOutcome.date}</p>}
          </div>
        </div>
        <div className="mt-4 p-4 bg-primary/5 rounded-xl">
          <p className="text-sm"><strong className="text-primary">Your mock score: 7.2/10</strong> — students with this score reported an <strong className="font-bold">offer rate of 56%</strong> in our community.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 px-4 md:px-margin-desktop py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with clarifying text */}
        <div className="mb-8">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Post-Interview Outcome</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Optional reporting – helps us improve the platform for future students.</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-primary/30 text-primary text-sm font-semibold">
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              <span>This helps us improve our AI</span>
            </div>
            <div className="inline-flex items-center gap-1 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">hourglass_empty</span>
              <span>Optional – takes 30 seconds</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-secondary text-sm">verified_user</span>
            <span>100% voluntary · No personal data shared</span>
          </div>
        </div>

        {/* Personal Mock Score Display */}
        <div className="glass-card rounded-2xl p-6 mb-8 flex flex-wrap justify-between items-center gap-4">
          <div>
            <p className="text-on-surface-variant text-label-sm uppercase tracking-wider">Your last mock interview</p>
            <p className="font-headline-md text-headline-md text-on-surface mt-1">Technical Mock: Frontend Engineering</p>
            <p className="text-sm text-on-surface-variant">Completed on May 24, 2024 · Score: <span className="font-bold text-primary">7.2/10</span></p>
          </div>
          <div className="bg-primary/10 rounded-xl px-4 py-2 text-primary text-sm font-semibold">Mock score → predicted 56% offer rate</div>
        </div>

        {/* Report Outcome Card */}
        <div className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">📝 Report your real interview outcome</h2>
          <form className="space-y-6" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant">Outcome Status</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { val: 'offer', label: 'Got an offer' },
                    { val: 'process', label: 'Still in process' },
                    { val: 'rejected', label: 'Rejected' },
                    { val: 'waiting', label: 'Waiting / Unknown' }
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
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant">Company Name (optional)</label>
                <input 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-white/40 border border-white/40 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                  placeholder="e.g. Google, Amazon, Stripe" 
                  type="text" 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant">Role (optional)</label>
                <input 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white/40 border border-white/40 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                  placeholder="e.g. Frontend Engineer" 
                  type="text" 
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant">Date (approx.)</label>
                <input 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/40 border border-white/40 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                  type="date" 
                />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button 
                type="submit"
                className="px-8 py-3 rounded-xl border-2 border-primary text-primary font-headline-md text-[18px] hover:bg-primary/5 active:scale-95 transition-all"
              >
                Save Outcome (Optional)
              </button>
            </div>
          </form>
        </div>

        {/* Celebration Card */}
        {showCelebration && (
          <div className="mb-8 transform transition-all duration-500 scale-100 opacity-100 animate-toast-in">
            <div className="glass-card rounded-2xl p-8 border-tertiary-container/30 bg-tertiary-container/5 relative overflow-hidden">
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-tertiary-container rounded-full flex items-center justify-center mx-auto mb-4 text-white animate-bounce">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-tertiary mb-2">🎉 Congratulations on your offer!</h3>
                <p className="text-on-surface-variant font-body-md">Your hard work paid off. Thank you for sharing – you're helping future students succeed.</p>
              </div>
            </div>
          </div>
        )}

        {/* Saved Outcome Display & Comparison */}
        {savedOutcome && (
          <div className="glass-card rounded-2xl p-8 mb-8 animate-toast-in">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">📊 Your reported outcome</h2>
            {renderStatusDetails()}
            <div className="mt-6 pt-4 border-t border-outline-variant/20">
              <p className="text-sm text-on-surface-variant italic">Your report helps us refine our scoring models. All data is anonymised.</p>
            </div>
          </div>
        )}

        {/* Community Insights */}
        <div className="glass-card rounded-2xl p-8 mt-8">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-2">📈 Community insights</h2>
          <p className="text-on-surface-variant mb-4">Anonymised data from students like you</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/40 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-primary">+12%</p>
              <p className="text-xs text-on-surface-variant">higher offer rate when mock score &gt;7</p>
            </div>
            <div className="bg-white/40 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-secondary">3.2x</p>
              <p className="text-xs text-on-surface-variant">more likely to get offer after 3+ practice sessions</p>
            </div>
            <div className="bg-white/40 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-tertiary">92%</p>
              <p className="text-xs text-on-surface-variant">of students who reported offers practiced &gt;4 times</p>
            </div>
          </div>
          <p className="text-xs text-outline mt-4 text-center">* Based on voluntary reports from our community. Data updates as more students share.</p>
        </div>
      </div>
    </div>
  );
}
