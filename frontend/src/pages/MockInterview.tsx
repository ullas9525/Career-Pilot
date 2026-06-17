import { Link } from 'react-router-dom';

export default function MockInterview() {
  return (
    <div className="flex flex-col min-h-screen relative w-full">
      {/* TopNavBar */}
      <header className="w-full top-0 sticky bg-white/60 backdrop-blur-[20px] border-b border-white/40 shadow-sm z-40">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          <div className="md:hidden font-headline-md text-headline-md font-bold text-primary">Career Pilot</div>
          <nav className="hidden md:flex items-center gap-8 font-body-md text-body-md">
            <a className="text-primary font-semibold border-b-2 border-primary pb-1" href="#">Practice</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors pb-1" href="#">Feedback</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors pb-1" href="#">Mentorship</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined">dark_mode</span>
            </button>
            <img alt="User Avatar" className="w-8 h-8 rounded-full border border-outline-variant cursor-pointer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0r4G3JTxeyom1g5y2Q-KB3LzTYhZ6l5MX1zbn1GGolq9FBA7wVmqbeuQYreWBqQ2y5_42QR5yMWSACAasYQ_SzDE-gRYQnxDLgkneegtrQe0VA8KNCTOzYkbdy0b3mdxuZPS8GJ9RjVj9bHLShdOszNhJPUwg7PEhtQqW2Zx5YapNsi2daeQIuxaQ2H0qk6lsfn3EO-EWv1WZQrcTN3-9meGwWFNlvwkvhYI_jYXGzJwV2XhvRIGNdwBe68q_KOG0iu6FZLlAY9k" />
          </div>
        </div>
      </header>

      <main className="flex-1 px-margin-mobile md:px-margin-desktop py-8 max-w-container-max mx-auto w-full">
        <div className="mb-10">
          <h2 className="font-display-lg-mobile md:font-display-lg text-on-surface mb-2">Schedule Session</h2>
          <p className="font-body-lg text-on-surface-variant">Select an interview format to configure your next practice run.</p>
        </div>

        {/* Three Interview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Using Link to go to the Interview Session view. Note: backend routing will change this later. */}
          <Link to="/student/interview-session" className="glass-panel rounded-xl p-6 flex flex-col relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-secondary-container/30 rounded-full blur-2xl"></div>
            <div className="w-12 h-12 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">code</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Tech Interview</h3>
            <p className="font-body-md text-on-surface-variant mb-6 flex-1">Algorithms, system design, and role-specific coding challenges evaluated by our AI.</p>
            <div className="flex items-center text-primary font-label-md font-semibold group-hover:gap-2 transition-all">
              Configure <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
            </div>
          </Link>
          
          <Link to="/student/interview-session" className="glass-panel rounded-xl p-6 flex flex-col relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-container/20 rounded-full blur-2xl"></div>
            <div className="w-12 h-12 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">forum</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">HR Interview</h3>
            <p className="font-body-md text-on-surface-variant mb-6 flex-1">Behavioral questions, culture fit, and soft skills assessment using conversational AI.</p>
            <div className="flex items-center text-primary font-label-md font-semibold group-hover:gap-2 transition-all">
              Configure <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
            </div>
          </Link>

          <Link to="/student/mentorship" className="glass-panel-elevated rounded-xl p-6 flex flex-col relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform border-primary/20">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center mb-4 shadow-sm">
              <span className="material-symbols-outlined">person</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Human Mentor</h3>
            <p className="font-body-md text-on-surface-variant mb-6 flex-1">Schedule a 1:1 session with an industry expert for personalized feedback and live interaction.</p>
            <div className="flex items-center text-primary font-label-md font-semibold group-hover:gap-2 transition-all">
              Find Mentor <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
            </div>
          </Link>
        </div>

        {/* Upcoming Sessions - EMPTY STATE */}
        <div className="max-w-md">
          <div className="glass-panel rounded-xl p-6">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Upcoming Sessions</h3>
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">event_busy</span>
              <p className="font-body-md text-on-surface-variant">No scheduled sessions</p>
              <p className="font-label-sm text-outline mt-1">Choose an interview type above to schedule your first mock interview.</p>
            </div>
            <Link to="/student/history" className="inline-flex items-center gap-2 mt-4 text-on-surface-variant hover:text-primary transition-colors font-label-md">
              <span className="material-symbols-outlined">history</span> View Past Interviews
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 bg-surface-container-lowest border-t border-outline-variant/30 mt-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop max-w-container-max mx-auto gap-4">
          <div className="font-headline-md text-headline-md font-bold text-primary">Career Pilot</div>
          <div className="flex gap-6 font-label-sm text-label-sm">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Support</a>
          </div>
          <div className="font-label-sm text-label-sm text-on-surface-variant">© 2024 Career Pilot AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
