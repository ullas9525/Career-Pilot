import { Link } from 'react-router-dom';

export default function ResultPage() {
  return (
    <div className="flex-1 px-4 md:px-margin-desktop py-8 w-full">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">Technical Mock: Frontend Engineering</h1>
          <p className="font-body-lg text-on-surface-variant mt-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            Completed Just Now • Pending Assessment
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/student/leaderboard" className="px-6 py-2.5 rounded-full border border-primary text-primary font-semibold hover:bg-primary/5 transition-all active:scale-95">View Leaderboard</Link>
          <Link to="/student/mock-interview" className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold shadow-md active:scale-95 transition-all">Practice Again</Link>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Overall Performance Card (Empty State) */}
        <div className="md:col-span-4 glass-card p-8 rounded-[32px] flex flex-col items-center justify-center text-center">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Overall Performance</h3>
          <div className="relative w-48 h-48 mb-6">
            <svg className="w-full h-full radial-progress" viewBox="0 0 100 100">
              <circle className="text-surface-variant" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
              {/* No progress shown in empty state */}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display-lg text-outline-variant">--</span>
              <span className="font-label-md text-outline">OUT OF 100</span>
            </div>
          </div>
          <p className="font-body-md text-outline font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">hourglass_empty</span>
            Awaiting AI analysis
          </p>
        </div>

        {/* Progress Over Last 4 Mocks */}
        <div className="md:col-span-8 glass-card p-6 rounded-[32px] flex flex-col justify-center items-center text-center">
          <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">monitoring</span>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Progress History</h3>
          <p className="text-sm text-on-surface-variant max-w-md">Once your interview is processed, your progress trend over the last 4 mocks will be displayed here.</p>
        </div>

        {/* Score Breakdown Card */}
        <div className="md:col-span-12 glass-card p-6 rounded-[32px]">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4">🔢 Score Breakdown</h3>
          <div className="flex items-center justify-center h-32 border border-dashed border-outline-variant/30 rounded-xl">
             <p className="text-on-surface-variant font-label-md">Detailed dimensional breakdown will appear here.</p>
          </div>
        </div>

        {/* Role-Specific Rubric Breakdown */}
        <div className="md:col-span-12 glass-card p-8 rounded-[32px] flex justify-center items-center py-12">
           <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
           <span className="ml-2 text-on-surface font-body-md">Analyzing interview transcript...</span>
        </div>

        {/* Spider Chart & AI Insights */}
        <div className="md:col-span-6 glass-card p-8 rounded-[32px] flex flex-col items-center justify-center text-center min-h-[300px]">
          <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">radar</span>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Competency Balance</h3>
          <p className="text-sm text-on-surface-variant">Your competency radar chart is being generated.</p>
        </div>

        <div className="md:col-span-6 glass-card p-8 rounded-[32px] border-outline-variant/30 border-2 flex flex-col justify-center items-center text-center">
          <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-outline">auto_awesome</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">AI Coach Insights</h3>
          <p className="text-sm text-on-surface-variant">Our AI is drafting personalized feedback and an improvement plan based on your responses.</p>
        </div>

      </div>
    </div>
  );
}
