import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function LandingPage() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .stagger-children');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    
    revealElements.forEach(el => observer.observe(el));
    
    // Initial check for elements in viewport
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('revealed');
            observer.unobserve(el);
        }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="w-full top-0 sticky z-50 bg-white/60 dark:bg-black/60 backdrop-blur-[20px] border-b border-white/40 dark:border-white/10 shadow-sm transition-colors duration-300 reveal-on-scroll">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">Career Pilot</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#features">Features</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#coordinator-benefits">For Coordinators</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login/student" className="hidden md:block font-label-md text-label-md text-primary border border-primary px-4 py-2 rounded-full hover:bg-primary/5 transition-colors duration-200">
              Login
            </Link>
            <Link to="/student/dashboard" className="font-label-md text-label-md bg-primary text-on-primary px-6 py-2 rounded-full shadow-md hover:bg-primary/90 hover:shadow-lg transition-all duration-200 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden px-margin-mobile md:px-margin-desktop">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10 animate-soft-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[80px] -z-10 animate-soft-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="max-w-container-max mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8 z-10 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel w-fit border border-primary/20 animate-fade-up">
                <span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Next-Gen Interview Prep</span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background animate-fade-left" style={{ animationDelay: '0.1s' }}>
                Ace Your Interviews with <span className="text-gradient">AI Mentorship</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg animate-fade-left" style={{ animationDelay: '0.2s' }}>
                Simulate high-stakes interviews, receive instant, rubric-aligned feedback, and build the calm confidence you need to land your dream role.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <Link to="/login/student" className="font-label-md text-label-md bg-gradient-to-r from-primary to-surface-tint text-on-primary px-8 py-4 rounded-xl shadow-[0_8px_16px_rgba(0,76,205,0.2)] hover:shadow-[0_12px_24px_rgba(0,76,205,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                  Get Started Free
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <Link to="/login/coordinator" className="font-label-md text-label-md glass-panel text-primary px-8 py-4 rounded-xl hover:bg-white/80 transition-all duration-300 flex items-center justify-center gap-2">
                  I'm a Placement Coordinator
                </Link>
              </div>
              <div className="flex items-center gap-4 mt-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white overflow-hidden"><img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3tNzheNhvkqZ1fpOW1atj0RK9wz5X9kc1Crdw-5fVCd3OlWykoT82dfnteUhmzgZL0dWNi5249v4oJoS70VxYmvdp9aQSE6ioJFXV_LoOJECNXLU1rCbihFi_ssY_Y8jgChBGlTph2Uo_sOJSt3b-XTwoKQywFVE_WJ6Hp8CHm8rKItdfnd-K7hPM_w_oig9UN0GxxPQ94CHa1QqNVKyMtNxafkUqNEO1Ffk5ZFMuvcf6UzWNtPFbyc3-EL0QagKKKEc3aBHLoYU" /></div>
                  <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white overflow-hidden"><img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRJfDCehMnkkm-JK2-nLON92-bALGPIdryKHqGeU2sTE2dvUWFsm9JKeuM5vF4Ap41IYxdI10j8tfFH_6-laJkggJSm5aLUyzn5EU5TJOgtRD_8m8j7E2VAEUJ6Sz98EJC6T2nh1l_LRjIZQ8h6kuuhr3loR9ZD1xxhd4tB4gsBjr2d1uyHIponf8GBqRk7B8CLAY_ki_yGf9T_r86i2RDg0NSLMwW4qMsCvqreVklIcpZY3hoZwhJ05ezVx8WtCj1BtEptEUUgfA" /></div>
                  <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white overflow-hidden flex items-center justify-center"><span className="font-label-sm text-[10px] text-on-surface-variant">Join</span></div>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Be among the first to try Career Pilot</p>
              </div>
            </div>
            <div className="relative z-10 w-full aspect-square md:aspect-auto md:h-[600px] rounded-3xl glass-panel p-2 flex items-center justify-center overflow-hidden reveal-on-scroll" style={{ animationDelay: '0.2s' }}>
              <img alt="Dashboard Preview" className="rounded-2xl w-full h-full object-cover shadow-inner opacity-90 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvhTY6iwfXTCpjJXxkcPnCNSs6egZqZwSe1XjDMwSuIAjs8Ia7FnKcNF4nxTmW8RytU73zM_FSwVJRrHAhzSqNASUiz87xCNLD0uiQIEB07KiZ0op7KH2zPMhulJB_t7qaAHg1tOJ1_0bN4HVIPswmV6Y0l3fyLRNmsAkpwhmv3J5yBFD0b7GZ28UMqlGCn91geeLq2q5bvnSsSeDsGzjCvaCQ7ee3oZ4yNoTq2sWBL6HD7ige53tIP2o8BS93qju9jTT0WB5-m60" />
              <div className="absolute top-10 right-[-20px] glass-card p-4 rounded-xl flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary"><span className="material-symbols-outlined">check_circle</span></div>
                <div><p className="font-label-sm text-label-sm text-on-surface">AI Score Preview</p><p className="font-headline-md text-headline-md text-tertiary font-bold">92/100</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop relative" id="features">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto reveal-on-scroll">
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">Precision Tools for Peak Performance</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Our AI doesn't just grade you; it mentors you. Experience a simulation environment designed to surface your strengths and iron out your weaknesses.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
              {/* Feature 1: AI Scoring (Large Card) */}
              <div className="glass-card rounded-3xl p-8 md:col-span-2 flex flex-col justify-between group overflow-hidden relative reveal-on-scroll">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] group-hover:bg-primary/20 transition-colors duration-500"></div>
                <div className="relative z-10"><div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center mb-6 border border-primary/10"><span className="material-symbols-outlined text-primary text-[24px]">psychology</span></div><h3 className="font-headline-md text-headline-md text-on-surface mb-2">Real-time AI Scoring</h3><p className="font-body-md text-body-md text-on-surface-variant max-w-md">Receive granular feedback on articulation, technical accuracy, and pacing instantly after every mock session.</p></div>
                <div className="mt-8 bg-surface-container-lowest/80 rounded-2xl p-4 border border-outline-variant/20 flex items-end gap-4 h-32 relative z-10"><div className="w-8 bg-primary/20 rounded-t-md h-1/3 group-hover:h-1/2 transition-all duration-500"></div><div className="w-8 bg-primary/40 rounded-t-md h-1/2 group-hover:h-2/3 transition-all duration-500 delay-75"></div><div className="w-8 bg-primary/60 rounded-t-md h-2/3 group-hover:h-4/5 transition-all duration-500 delay-150"></div><div className="w-8 bg-primary rounded-t-md h-full relative group-hover:shadow-[0_0_15px_rgba(0,76,205,0.4)] transition-all duration-500 delay-200"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">98%</div></div></div>
              </div>
              {/* Feature 2: Rubrics */}
              <div className="glass-card rounded-3xl p-8 flex flex-col justify-between group reveal-on-scroll"><div className="w-12 h-12 rounded-2xl bg-secondary-container/20 flex items-center justify-center mb-6 border border-secondary/10"><span className="material-symbols-outlined text-secondary text-[24px]">fact_check</span></div><div><h3 className="font-headline-md text-[20px] font-semibold text-on-surface mb-2">Company-Specific Rubrics</h3><p className="font-body-md text-body-md text-on-surface-variant text-sm">Practice against the exact evaluation criteria used by top-tier tech and finance firms.</p></div><div className="mt-6 flex flex-wrap gap-2"><span className="font-label-sm text-[10px] px-2 py-1 rounded-full bg-secondary-container/30 text-secondary border border-secondary/20">STAR Method</span><span className="font-label-sm text-[10px] px-2 py-1 rounded-full bg-surface-variant text-on-surface-variant border border-outline-variant/30">System Design</span></div></div>
              {/* Feature 3: Anxiety Management */}
              <div className="glass-card rounded-3xl p-8 flex flex-col justify-between group reveal-on-scroll"><div className="w-12 h-12 rounded-2xl bg-tertiary-container/20 flex items-center justify-center mb-6 border border-tertiary/10"><span className="material-symbols-outlined text-tertiary text-[24px]">self_improvement</span></div><div><h3 className="font-headline-md text-[20px] font-semibold text-on-surface mb-2">Calm Confidence</h3><p className="font-body-md text-body-md text-on-surface-variant text-sm">Biometric pacing analysis and guided breathing exercises to manage interview anxiety before you start.</p></div></div>
              {/* Feature 4: Dashboard */}
              <div className="glass-card rounded-3xl p-8 md:col-span-2 flex flex-col md:flex-row items-center gap-8 group reveal-on-scroll"><div className="flex-1"><div className="w-12 h-12 rounded-2xl bg-surface-tint/10 flex items-center justify-center mb-6 border border-primary/10"><span className="material-symbols-outlined text-surface-tint text-[24px]">dashboard</span></div><h3 className="font-headline-md text-headline-md text-on-surface mb-2">Placement Dashboard</h3><p className="font-body-md text-body-md text-on-surface-variant">Track your readiness trajectory over time. Share your verified AI-scored profile directly with university coordinators.</p></div><div className="flex-1 w-full bg-surface-container/50 rounded-2xl p-4 border border-outline-variant/30 aspect-video flex items-center justify-center relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5"></div><span className="material-symbols-outlined text-[64px] text-outline-variant/40">monitoring</span></div></div>
            </div>
          </div>
        </section>

        {/* For Coordinators Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop bg-white/30 backdrop-blur-sm" id="coordinator-benefits">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-12 reveal-on-scroll">
              <span className="material-symbols-outlined text-5xl text-primary mb-3">groups</span>
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">Built for Placement Coordinators</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Track student progress, identify at‑risk students, and prove the value of your placement efforts – all from one dashboard.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 stagger-children">
              <div className="glass-card rounded-2xl p-6 text-center"><span className="material-symbols-outlined text-4xl text-tertiary">visibility</span><p className="font-label-md text-label-md font-semibold mt-2">Real‑time progress tracking</p><p className="text-sm text-on-surface-variant mt-2">See which students are practicing, their scores, and improvement trends.</p></div>
              <div className="glass-card rounded-2xl p-6 text-center"><span className="material-symbols-outlined text-4xl text-secondary">notifications_active</span><p className="font-label-md text-label-md font-semibold mt-2">At‑risk alerts</p><p className="text-sm text-on-surface-variant mt-2">Get notified when students fall behind or show increased anxiety.</p></div>
              <div className="glass-card rounded-2xl p-6 text-center"><span className="material-symbols-outlined text-4xl text-primary">insights</span><p className="font-label-md text-label-md font-semibold mt-2">Outcome correlation</p><p className="text-sm text-on-surface-variant mt-2">Connect mock scores to real placement results and prove ROI.</p></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-8 bg-surface-container-lowest dark:bg-surface-dim border-t border-outline-variant/30 shadow-sm mt-8 z-10 relative reveal-on-scroll">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-4">
          <div className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2"><span className="material-symbols-outlined">rocket_launch</span> Career Pilot</div>
          <div className="flex gap-6 font-label-sm text-label-sm text-on-surface-variant"><a className="hover:text-primary opacity-80 hover:opacity-100 transition-opacity" href="#">Privacy Policy</a><a className="hover:text-primary opacity-80 hover:opacity-100 transition-opacity" href="#">Terms of Service</a><a className="hover:text-primary opacity-80 hover:opacity-100 transition-opacity" href="#">Contact Support</a></div>
          <div className="font-label-sm text-label-sm text-on-surface-variant opacity-80">© 2024 Career Pilot AI. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
