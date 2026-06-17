import { Link, useNavigate } from 'react-router-dom';

export default function CoordinatorLogin() {
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Setup flow: map to coordinator dashboard for now
    navigate('/coordinator/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center m-0 p-0 antialiased font-body-md text-on-surface" style={{
      backgroundColor: '#faf9fb',
      backgroundImage: `
        radial-gradient(at 10% 20%, hsla(224,100%,94%,1) 0px, transparent 50%),
        radial-gradient(at 80% 90%, hsla(224,100%,90%,1) 0px, transparent 50%),
        radial-gradient(at 90% 10%, hsla(180,100%,94%,1) 0px, transparent 50%)
      `
    }}>
      {/* Top Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white/60 dark:bg-black/60 backdrop-blur-[20px] border-b border-white/40 dark:border-white/10 shadow-sm transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          <Link to="/" className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed tracking-tight">Career Pilot</span>
          </Link>
        </div>
      </nav>

      <main className="w-full max-w-[480px] px-4 pt-20">
        <div className="glass-panel rounded-xl shadow-[0_8px_32px_rgba(0,76,205,0.08)] p-8 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none rounded-xl border border-white/80" style={{ mixBlendMode: 'overlay' }}></div>

          {/* Brand Header */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4 shadow-sm border border-white">
              <span className="material-symbols-outlined text-primary text-[32px]">admin_panel_settings</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-primary-fixed mb-2">Coordinator Access</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Manage your placement groups and track student readiness.</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLoginSubmit}>
            {/* Work Email */}
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="email">Work Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">mail</span>
                <input required className="w-full bg-white/50 border border-outline-variant/30 rounded-lg py-3 pl-10 pr-4 font-body-md text-body-md text-on-surface focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary-fixed transition-all outline-none hover:bg-white/70" id="email" placeholder="name@college.edu" type="email" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
                <a className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors" href="#">Forgot password?</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">lock</span>
                <input required className="w-full bg-white/50 border border-outline-variant/30 rounded-lg py-3 pl-10 pr-4 font-body-md text-body-md text-on-surface focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary-fixed transition-all outline-none hover:bg-white/70" id="password" placeholder="••••••••" type="password" />
              </div>
            </div>

            {/* College Code */}
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="college_code">College Code</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">domain</span>
                <input required className="w-full bg-white/50 border border-outline-variant/30 rounded-lg py-3 pl-10 pr-4 font-body-md text-body-md text-on-surface focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary-fixed transition-all outline-none hover:bg-white/70 uppercase placeholder:lowercase" id="college_code" placeholder="e.g. ENG2024" type="text" />
              </div>
            </div>

            {/* Primary Action */}
            <button className="w-full mt-8 bg-gradient-to-r from-primary to-surface-tint text-on-primary font-label-md text-label-md py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-2 group" type="submit">
              Sign In as Coordinator
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6 gap-4">
            <div className="flex-1 h-px bg-outline-variant/40"></div>
            <div className="flex-1 h-px bg-outline-variant/40"></div>
          </div>

          <div className="text-center">
            <a className="font-label-sm text-label-sm text-primary hover:underline" href="#">Request demo access</a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6 flex justify-center gap-6">
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Support</a>
        </div>
        <p className="text-center font-label-sm text-label-sm text-outline mt-2">© 2024 Career Pilot AI. All rights reserved.</p>
      </main>
    </div>
  );
}
