export default function InterviewProcess() {
  return (
    <div className="flex-1 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 flex flex-col gap-10">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Interview Preparation Roadmap</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">Track your progression through the automated screening and aptitude stages before engaging in specialized AI mock interviews.</p>
      </header>

      {/* Process Roadmap */}
      <section aria-labelledby="roadmap-heading">
        <h2 className="sr-only" id="roadmap-heading">Process Roadmap</h2>
        <div className="bg-white/70 backdrop-blur-[24px] border border-white/60 rounded-[24px] p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>
          <div className="relative z-10 w-full overflow-x-auto pb-4 md:pb-0">
            {/* Grid for perfect alignment */}
            <div className="grid grid-cols-5 gap-2 md:gap-4 text-center relative py-2 min-w-[600px]">
              {/* Background line */}
              <div className="absolute top-[1.5rem] left-0 w-full h-1 bg-surface-variant rounded-full -z-20"></div>
              <div className="absolute top-[1.5rem] left-0 w-[20%] h-1 bg-primary rounded-full -z-10 transition-all"></div>

              {/* Step 1: Resume Check (Passed) */}
              <div className="flex flex-col items-center gap-3 relative z-10 group">
                <div className="w-12 h-12 rounded-full bg-tertiary text-white flex items-center justify-center shadow-md border-2 border-white">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <div className="text-center">
                  <span className="block font-label-md text-label-md text-on-surface">Resume Check</span>
                  <span className="block font-label-sm text-label-sm text-tertiary">Passed</span>
                  <span className="block font-label-sm text-label-sm text-on-surface-variant/70 mt-1">ATS Score: --/100</span>
                </div>
              </div>

              {/* Step 2: Aptitude (In Progress) */}
              <div className="flex flex-col items-center gap-3 relative z-10">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary-container/20 animate-ping opacity-75"></div>
                  <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center shadow-md border-2 border-white">
                    <span className="material-symbols-outlined">edit_document</span>
                  </div>
                </div>
                <div className="text-center">
                  <span className="block font-label-md text-label-md text-primary font-bold">Aptitude</span>
                  <span className="block font-label-sm text-label-sm text-primary">In Progress</span>
                </div>
              </div>

              {/* Step 3: Tech Mock (Locked) */}
              <div className="flex flex-col items-center gap-3 relative z-10 opacity-60">
                <div className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center border-2 border-surface-variant">
                  <span className="material-symbols-outlined">code</span>
                </div>
                <div className="text-center">
                  <span className="block font-label-md text-label-md text-on-surface-variant">Tech Mock</span>
                  <span className="block font-label-sm text-label-sm text-outline">Locked</span>
                </div>
              </div>

              {/* Step 4: HR Mock (Locked) */}
              <div className="flex flex-col items-center gap-3 relative z-10 opacity-60">
                <div className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center border-2 border-surface-variant">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <div className="text-center">
                  <span className="block font-label-md text-label-md text-on-surface-variant">HR Mock</span>
                  <span className="block font-label-sm text-label-sm text-outline">Locked</span>
                </div>
              </div>

              {/* Step 5: Human Eval (Locked) */}
              <div className="flex flex-col items-center gap-3 relative z-10 opacity-60">
                <div className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center border-2 border-surface-variant">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div className="text-center">
                  <span className="block font-label-md text-label-md text-on-surface-variant">Human Eval</span>
                  <span className="block font-label-sm text-label-sm text-outline">Locked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Assessments Section */}
      <section aria-labelledby="aptitude-heading" className="flex flex-col gap-6 mt-4">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-on-surface" id="aptitude-heading">Required Assessments</h2>
        </div>
        <div className="glass-card rounded-2xl p-8 text-center border border-white/40 shadow-sm">
          <span className="material-symbols-outlined text-5xl text-primary/60 mb-3">schedule</span>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Placement Tests Coming Soon</h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Our team is preparing comprehensive assessments tailored to your target roles. Quantitative, Logical, and Verbal tests will be available shortly. Stay tuned!</p>
        </div>
      </section>
    </div>
  );
}
