import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function StudentProfile() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    role: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.sub) {
          setFormData(prev => ({ ...prev, email: payload.sub }));
        }
      } catch (e) {
        console.error('Failed to parse token for email', e);
      }
    }
  }, []);

  const [isUploading, setIsUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('role', formData.role || 'Software Engineer');
      
      const response = await axios.post('http://localhost:8000/api/profile/resume-upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAnalysisResult(response.data);
    } catch (error: any) {
      console.error('Error uploading resume:', error);
      alert('Failed to analyze resume: ' + (error.response?.data?.detail || error.message));
    } finally {
      setIsUploading(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.college || !formData.role) {
        alert('Please fill in all required fields before proceeding.');
        return;
      }
      if (!formData.email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Profile completed! Redirecting to dashboard...');
      navigate('/student/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="bg-surface text-on-surface min-h-screen relative overflow-x-hidden font-body-md antialiased">
      {/* Ambient blobs */}
      <div className="fixed top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-primary-fixed/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-secondary-fixed/30 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 z-0"></div>

      <main className="relative z-10 container mx-auto px-margin-mobile md:px-margin-desktop py-12 min-h-screen flex flex-col items-center justify-center">
        <div className="glass-panel w-full max-w-4xl rounded-2xl p-6 md:p-10 flex flex-col gap-10 bg-white/75 backdrop-blur-[24px] border border-white/60 shadow-[0_10px_40px_-10px_rgba(0,76,205,0.08)]">
          
          {/* Header & Stepper */}
          <header className="flex flex-col items-center gap-6 text-center">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Build Your Profile</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Let's set up your Career Pilot engine to personalize your journey.</p>
            </div>
            
            {/* Clickable Stepper */}
            <div className="w-full max-w-2xl flex items-center justify-between relative mt-4">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-outline-variant/30 -z-10 transform -translate-y-1/2 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
              </div>
              
              {[1, 2, 3].map((step) => {
                const isActive = step === currentStep;
                const isCompleted = step < currentStep;
                
                return (
                  <div 
                    key={step} 
                    className="step-indicator flex flex-col items-center gap-2 bg-surface-container-lowest/80 backdrop-blur-md p-2 rounded-xl cursor-pointer transition-all duration-300"
                    onClick={() => {
                      if (step < currentStep) setCurrentStep(step);
                    }}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 font-headline-md text-headline-md
                      ${isActive ? 'bg-primary text-white border-primary shadow-[0_0_0_4px_rgba(0,76,205,0.2)]' : 
                        isCompleted ? 'bg-secondary text-white border-secondary' : 'border-outline-variant bg-white text-on-surface-variant'}`}
                    >
                      {isCompleted ? <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span> : step}
                    </div>
                    <span className="font-label-md text-label-md">
                      {step === 1 ? 'Personal Info' : step === 2 ? 'Resume Analysis' : 'Connections'}
                    </span>
                  </div>
                );
              })}
            </div>
          </header>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent"></div>

          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="animate-toast-in">
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">person</span>
                    Personal Details
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Tell us about yourself so we can tailor the interview experience.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Alex Mercer" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      placeholder="alex@university.edu" 
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant text-on-surface-variant cursor-not-allowed transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Phone Number</label>
                    <input type="tel" placeholder="+1 234 567 8900" className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                  <div>
                    <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">College / University *</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Stanford University" 
                      value={formData.college}
                      onChange={(e) => setFormData({...formData, college: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Year of Graduation *</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all">
                      <option>2024</option><option>2025</option><option>2026</option><option>2027</option><option>2028</option>
                    </select>
                  </div>
                  
                  {/* ENHANCED ROLE SELECTION UI */}
                  <div className="md:col-span-2">
                    <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Target Role *</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="">Select your target role...</option>
                      <option value="backend-engineer">Backend Engineer</option>
                      <option value="frontend-engineer">Frontend Engineer</option>
                      <option value="fullstack-engineer">Full-Stack Engineer</option>
                      <option value="product-manager">Product Manager</option>
                      <option value="data-scientist">Data Scientist</option>
                      <option value="data-engineer">Data Engineer</option>
                      <option value="devops-engineer">DevOps / SRE</option>
                      <option value="mobile-developer">Mobile Developer</option>
                      <option value="qa-engineer">QA / SDET</option>
                    </select>
                    {/* Role Scope Explanation */}
                    <div className="mt-3 bg-primary/5 border border-primary/15 rounded-xl p-4 space-y-2">
                      <p className="text-xs font-bold text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">info</span> What your role selection changes
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-start gap-2 text-xs text-on-surface-variant">
                          <span className="material-symbols-outlined text-[14px] text-primary shrink-0 mt-0.5">quiz</span>
                          <span><strong className="text-on-surface">Interview questions</strong> — questions are drawn from a role-specific bank.</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-on-surface-variant">
                          <span className="material-symbols-outlined text-[14px] text-secondary shrink-0 mt-0.5">analytics</span>
                          <span><strong className="text-on-surface">Rubric & weights</strong> — tailored specifically for your target role.</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-on-surface-variant">
                          <span className="material-symbols-outlined text-[14px] text-tertiary shrink-0 mt-0.5">tips_and_updates</span>
                          <span><strong className="text-on-surface">Feedback focus</strong> — AI feedback highlights the most relevant skills.</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-on-surface-variant">
                          <span className="material-symbols-outlined text-[14px] text-outline shrink-0 mt-0.5">leaderboard</span>
                          <span><strong className="text-on-surface">Leaderboard</strong> — you are only ranked against students with the same role.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Step 2: Resume Analysis */}
          {currentStep === 2 && (
            <div className="animate-toast-in">
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">document_scanner</span>
                    Resume Upload
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Upload your resume to tailor your interview questions and feedback.</p>
                </div>
                
                {analysisResult ? (
                  <div className="flex flex-col gap-6 animate-fade-in">
                    {/* Header: Score & Target Role Alignment */}
                    <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant/30 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tertiary via-primary to-secondary"></div>
                      
                      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        
                        {/* Score Ring */}
                        <div className="flex-shrink-0 flex flex-col items-center">
                          <div className="relative w-40 h-40 flex items-center justify-center mb-2">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                              <circle className="text-surface-variant" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                              <circle 
                                className={`${analysisResult.score >= 80 ? 'text-tertiary' : analysisResult.score >= 60 ? 'text-secondary' : 'text-error'} drop-shadow-md transition-all duration-1000`} 
                                cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" 
                                strokeDasharray="251.2" strokeDashoffset={`${251.2 - (251.2 * analysisResult.score / 100)}`} strokeWidth="8"
                                strokeLinecap="round"
                              ></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="font-display-lg text-5xl text-on-surface leading-none font-bold">{analysisResult.score}</span>
                              <span className="font-label-sm text-on-surface-variant mt-1">/ 100</span>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-xs font-medium">
                            <span className="material-symbols-outlined text-[14px]">auto_awesome</span> ATS Score
                          </span>
                        </div>

                        {/* Alignment Banner */}
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="font-headline-md text-2xl text-on-surface font-bold mb-3 flex items-center justify-center md:justify-start gap-2">
                            <span className="material-symbols-outlined text-secondary">radar</span>
                            Role Alignment
                          </h3>
                          <p className="font-body-lg text-on-surface-variant leading-relaxed whitespace-pre-wrap">
                            {analysisResult.target_role_match}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Breakdown Section */}
                    <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant/30 shadow-md">
                      <h3 className="font-headline-md text-xl text-on-surface font-bold mb-6 flex items-center gap-2 border-b border-outline-variant/30 pb-4">
                        <span className="material-symbols-outlined text-tertiary">analytics</span>
                        Score Breakdown & Rubrics
                      </h3>
                      
                      {/* Sub Scores Grid */}
                      {analysisResult.sub_scores && analysisResult.sub_scores.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          {analysisResult.sub_scores.map((sub: any, idx: number) => (
                            <div key={idx} className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 flex flex-col gap-2">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-label-md font-semibold text-on-surface">{sub.category}</span>
                                <span className="font-mono font-bold text-primary">{sub.score} / {sub.max}</span>
                              </div>
                              <div className="w-full bg-outline-variant/30 rounded-full h-1.5 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${sub.score / sub.max >= 0.8 ? 'bg-tertiary' : sub.score / sub.max >= 0.5 ? 'bg-secondary' : 'bg-error'}`} 
                                  style={{ width: `${(sub.score / sub.max) * 100}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-on-surface-variant leading-relaxed mt-1">{sub.reason}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="bg-error/5 border border-error/20 rounded-xl p-4">
                        <h4 className="font-label-md text-label-md text-error font-bold flex items-center gap-2 mb-3">
                          <span className="material-symbols-outlined text-[18px]">info</span>
                          Why Score Isn't Higher
                        </h4>
                        <div className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap">
                          {analysisResult.why_score_is_low}
                        </div>
                      </div>
                    </div>

                    {/* Action Plan Section */}
                    <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-primary/20 shadow-md relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
                      <h3 className="font-headline-md text-xl text-primary font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined">trending_up</span>
                        Fixes & Improvements
                      </h3>
                      <div className="flex flex-col gap-4">
                        {analysisResult.fixes?.map((fix: any, idx: number) => (
                          <div key={idx} className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-colors">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="w-7 h-7 rounded-full bg-error/10 text-error flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-[16px]">close</span>
                              </div>
                              <div className="flex-1">
                                <p className="font-label-md font-semibold text-on-surface mb-1 text-sm">Issue</p>
                                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">{fix.issue}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 mb-3 ml-10">
                              <div className="w-7 h-7 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-[16px]">check</span>
                              </div>
                              <div className="flex-1">
                                <p className="font-label-md font-semibold text-on-surface mb-1 text-sm">Fix</p>
                                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">{fix.fix}</p>
                              </div>
                            </div>
                            <div className="ml-10 bg-primary/5 rounded-lg p-3 border border-primary/10">
                              <p className="text-xs text-on-surface-variant flex items-start gap-1">
                                <span className="material-symbols-outlined text-[14px] text-primary mt-0.5">lightbulb</span>
                                <span>{fix.why}</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-outline-variant/60 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-surface-container-lowest hover:bg-surface-container-low/50 transition-colors cursor-pointer group"
                    >
                      <div className="w-16 h-16 rounded-full bg-secondary-container/30 text-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        {isUploading ? (
                          <span className="material-symbols-outlined text-[32px] animate-spin">refresh</span>
                        ) : (
                          <span className="material-symbols-outlined text-[32px]">upload_file</span>
                        )}
                      </div>
                      <h3 className="font-label-lg text-label-lg text-on-surface mb-2">
                        {isUploading ? 'Analyzing Resume...' : 'Click to upload or drag and drop'}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">PDF, DOCX, or TXT (Max 5MB)</p>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.doc,.docx,.txt" 
                        onChange={handleFileUpload}
                      />
                    </div>
                    
                    <div className="bg-primary/5 rounded-xl p-4 flex items-start gap-3 border border-primary/10">
                      <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Our AI will analyze your resume in the background once you complete your profile, ensuring your mock interviews accurately reflect your past experience.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Connections */}
          {currentStep === 3 && (
            <div className="animate-toast-in">
              <div className="mb-4 text-center md:text-left">
                <h3 className="font-label-md text-label-md text-on-surface font-semibold">Connect External Profiles</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Link your professional networks to automatically sync experience and projects.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <button className="w-full md:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-outline-variant shadow-sm hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-primary">link</span> Connect LinkedIn
                </button>
                <button className="w-full md:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-outline-variant shadow-sm hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined">code</span> Connect GitHub
                </button>
                <button 
                  onClick={handleNext}
                  className="w-full md:w-auto mt-2 md:mt-0 text-on-surface-variant hover:text-on-surface px-4 py-2"
                >
                  Skip for now
                </button>
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <footer className="mt-8 pt-6 border-t border-outline-variant/30 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
            <button 
              onClick={handleBack} 
              disabled={currentStep === 1}
              className={`font-label-md text-label-md flex items-center gap-1 transition-opacity ${currentStep === 1 ? 'text-on-surface-variant opacity-50 cursor-not-allowed' : 'text-on-surface-variant hover:text-on-surface opacity-100'}`}
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back
            </button>
            <button 
              onClick={handleNext}
              className="w-full md:w-auto bg-gradient-to-r from-primary to-surface-tint text-on-primary font-label-md text-label-md px-8 py-3 rounded-xl shadow-[0_4px_14px_rgba(0,76,205,0.3)] hover:shadow-[0_6px_20px_rgba(0,76,205,0.4)] transition-all flex items-center justify-center gap-2"
            >
              {currentStep === totalSteps ? 'Go to Dashboard' : 'Next'} 
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
            </button>
          </footer>

        </div>
      </main>
    </div>
  );
}
