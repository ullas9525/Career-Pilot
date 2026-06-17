import { useState } from 'react';

export default function Settings() {
  const [duration, setDuration] = useState('45');
  const [difficulty, setDifficulty] = useState('Medium');
  const [role, setRole] = useState('Product Manager');
  const [isEditingRole, setIsEditingRole] = useState(false);

  const difficultyDescriptions: Record<string, string> = {
    'Easy': 'Beginner-friendly sessions with guided hints and supportive AI behavior.',
    'Medium': 'Standard interview questions with focused feedback and professional pacing.',
    'Hard': 'High-pressure scenarios, complex behavioral probes, and critical feedback.'
  };

  return (
    <div className="flex-1 px-margin-desktop py-12 pb-24 max-w-4xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Settings</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Customize your interview experience</p>
      </div>

      <div className="space-y-8">
        {/* Interview Settings Section */}
        <section className="glass-card rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">psychology</span>
            <h2 className="font-headline-md text-headline-md">Interview Settings</h2>
          </div>
          <div className="space-y-6">
            {/* Duration */}
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant mb-3">Interview Duration</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['30', '45', '60'].map((d) => (
                  <label key={d} className={`relative flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all ${duration === d ? 'border border-primary bg-primary-container/10' : 'border border-outline-variant hover:bg-white/40'}`}>
                    <input 
                      checked={duration === d} 
                      onChange={() => setDuration(d)}
                      className="w-4 h-4 text-primary focus:ring-primary border-outline-variant" 
                      name="duration" 
                      type="radio" 
                      value={d} 
                    />
                    <span className={`material-symbols-outlined ${duration === d ? 'text-primary' : 'text-outline'}`}>timer</span>
                    <span className={`font-label-md text-label-md ${duration === d ? 'font-bold text-primary' : ''}`}>{d} min</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant mb-3">AI Difficulty Level</p>
              <div className="bg-surface-container rounded-2xl p-1 flex">
                {['Easy', 'Medium', 'Hard'].map((l) => (
                  <button 
                    key={l}
                    onClick={() => setDifficulty(l)}
                    className={`flex-1 py-2 text-label-md font-label-md rounded-xl transition-all ${difficulty === l ? 'bg-white shadow-sm text-primary font-bold' : ''}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-label-sm text-on-surface-variant px-1">{difficultyDescriptions[difficulty]}</p>
            </div>

            {/* Role */}
            <div className="flex justify-between items-center p-4 bg-white/40 rounded-2xl border border-white/20">
              <div>
                <p className="text-label-sm text-outline">Target Role</p>
                <p className="font-label-md text-label-md text-on-surface">{role}</p>
              </div>
              <button onClick={() => setIsEditingRole(true)} className="text-primary font-label-md text-label-md hover:underline">Change</button>
            </div>

            {isEditingRole && (
              <div className="mt-4 p-4 bg-white/80 rounded-2xl border border-primary/30 animate-toast-in">
                <label className="font-label-md text-label-md mb-2 block">Select your target role:</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 rounded-xl border border-outline-variant bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Backend Engineer">Backend Engineer</option>
                  <option value="Frontend Engineer">Frontend Engineer</option>
                  <option value="Full-Stack Engineer">Full-Stack Engineer</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Data Engineer">Data Engineer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="Mobile Developer">Mobile Developer</option>
                  <option value="QA Engineer">QA Engineer</option>
                </select>
                <div className="flex justify-end gap-3 mt-4">
                  <button onClick={() => setIsEditingRole(false)} className="px-4 py-2 bg-primary text-white rounded-lg text-label-sm">Save</button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Notification Preferences Section */}
        <section className="glass-card rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">notifications_active</span>
            <h2 className="font-headline-md text-headline-md">Notification Preferences</h2>
          </div>
          <div className="space-y-6">
            {[
              { id: 'email', title: 'Email reminders', desc: 'Get alerts for upcoming scheduled mock sessions.', defaultChecked: true },
              { id: 'weekly', title: 'Weekly progress report', desc: 'A summary of your skill growth and area of improvement.', defaultChecked: true },
              { id: 'ai', title: 'AI coaching tips', desc: 'Personalized advice based on your recent performance.', defaultChecked: true },
              { id: 'marketing', title: 'Marketing updates', desc: 'Stay updated with new features and career news.', defaultChecked: false }
            ].map((pref) => (
              <div key={pref.id} className="flex items-center justify-between">
                <div>
                  <p className="font-label-md text-label-md">{pref.title}</p>
                  <p className="text-label-sm text-outline">{pref.desc}</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input defaultChecked={pref.defaultChecked} className="toggle-checkbox absolute w-0 h-0 opacity-0" id={pref.id} type="checkbox" />
                  <label className="toggle-label block h-6 overflow-hidden bg-outline-variant rounded-full cursor-pointer" htmlFor={pref.id}>
                    <span className="toggle-dot absolute left-1 top-1 block w-4 h-4 bg-white rounded-full transition-transform shadow-sm"></span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Account & Role Section */}
        <section className="glass-card rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">account_circle</span>
            <h2 className="font-headline-md text-headline-md">Account &amp; Data</h2>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-label-sm text-outline mb-1">Email Address</p>
              <input className="w-full bg-surface-container/50 border border-outline-variant rounded-xl px-4 py-3 text-on-surface-variant font-label-md cursor-not-allowed" disabled type="text" value="alex.careerpilot@example.com" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="flex-1 primary-gradient text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-primary/20 hover:scale-[1.01] transition-all">Change Password</button>
              <button className="flex-1 bg-secondary/20 text-secondary border border-secondary/30 font-bold py-3 px-6 rounded-xl hover:bg-secondary/30 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">download</span> Download my data
              </button>
              <button className="flex-1 border-2 border-error text-error font-bold py-3 px-6 rounded-xl hover:bg-error/5 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">delete_forever</span> Delete my account
              </button>
            </div>
            <div className="mt-4 p-3 bg-primary/5 rounded-xl text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px] text-primary align-middle mr-1">gavel</span>
              <strong>GDPR compliance:</strong> You have the right to access, rectify, and erase your personal data. Use the buttons above to export or delete your information. Data deletion is permanent and irreversible.
            </div>
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 p-6 glass-card border-t border-white/40 flex justify-end gap-4 z-40">
        <button className="px-8 py-3 rounded-xl font-bold border border-outline text-on-surface-variant hover:bg-surface-container-low transition-all">Cancel</button>
        <button className="px-10 py-3 rounded-xl font-bold primary-gradient text-white shadow-lg hover:shadow-primary/40 active:scale-95 transition-all">Save Changes</button>
      </div>
    </div>
  );
}
