import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getMe, updateProfile, uploadResume } from '../api/endpoints'

const roles = [
  { value: 'backend-engineer', label: 'Backend Engineer' },
  { value: 'frontend-engineer', label: 'Frontend Engineer' },
  { value: 'fullstack-engineer', label: 'Full-Stack Engineer' },
  { value: 'product-manager', label: 'Product Manager' },
  { value: 'data-scientist', label: 'Data Scientist' },
  { value: 'data-engineer', label: 'Data Engineer' },
  { value: 'devops-engineer', label: 'DevOps / SRE' },
  { value: 'mobile-developer', label: 'Mobile Developer' },
  { value: 'qa-engineer', label: 'QA / SDET' },
]

export default function ProfileCompletionPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  const [form, setForm] = useState({
    full_name: '', email: location.state?.email || '', phone: '', college: '',
    graduation_year: '', target_role: '', linkedin_url: '', github_url: '',
  })

  useEffect(() => {
    if (!form.email) {
      getMe().then(({ data }) => {
        setForm(prev => ({ ...prev, email: data.email }))
      }).catch(() => {})
    }
  }, [])
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeResult, setResumeResult] = useState(null)

  function update(field) {
    return (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  async function handleNext() {
    setError('')
    if (step === 1) {
      if (!form.full_name || !form.college || !form.target_role) {
        setError('Please fill in all required fields')
        return
      }
      setLoading(true)
      try {
        await updateProfile({
          full_name: form.full_name,
          phone: form.phone,
          college: form.college,
          graduation_year: form.graduation_year ? parseInt(form.graduation_year) : null,
          target_role: form.target_role,
          linkedin_url: form.linkedin_url,
          github_url: form.github_url,
        })
        setStep(2)
      } catch (err) {
        const detail = err.response?.data?.detail
        if (Array.isArray(detail)) {
          setError(detail.map(d => d.msg).join(', '))
        } else {
          setError(detail || 'Failed to save profile')
        }
      } finally {
        setLoading(false)
      }
    } else if (step === 2 && resumeResult) {
      setStep(3)
    } else {
      setStep(step + 1)
    }
  }

  async function uploadAndAnalyze(file) {
    setError('')
    setLoading(true)
    try {
      const { data } = await uploadResume(file)
      setResumeResult(data)
    } catch (err) {
      const detail = err.response?.data?.detail
      if (Array.isArray(detail)) {
        setError(detail.map(d => d.msg).join(', '))
      } else {
        setError(detail || 'Resume analysis failed')
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleFinish() {
    navigate('/dashboard')
  }

  function handleBack() {
    if (step > 1) setStep(step - 1)
  }

  const progress = ((step - 1) / 2) * 100

  return (
    <div className="min-h-screen relative overflow-x-hidden font-body-md antialiased"
      style={{
        background: '#faf9fb',
        backgroundImage: `
          radial-gradient(at 0% 0%, hsla(220,100%,94%,1) 0, transparent 50%),
          radial-gradient(at 100% 100%, hsla(180,100%,92%,1) 0, transparent 50%)
        `,
      }}
    >
      <main className="relative z-10 container mx-auto px-5 md:px-[64px] py-12 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl rounded-2xl p-6 md:p-10 flex flex-col gap-10"
          style={{
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 10px 40px -10px rgba(0,76,205,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          <header className="flex flex-col items-center gap-6 text-center">
            <div>
              <h1 className="text-[32px] leading-[40px] font-semibold text-on-surface mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Build Your Profile
              </h1>
              <p className="text-[18px] leading-[28px] text-on-surface-variant">Let&apos;s set up your Career Pilot engine to personalize your journey.</p>
            </div>

            <div className="w-full max-w-2xl flex items-center justify-between relative mt-4">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-outline-variant/30 -z-10 -translate-y-1/2 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              {[
                { num: 1, label: 'Personal Info', icon: 'person' },
                { num: 2, label: 'Resume Analysis', icon: 'document_scanner' },
                { num: 3, label: 'Connections', icon: 'link' },
              ].map((s) => (
                <div key={s.num} className="flex flex-col items-center gap-2 p-2 rounded-xl cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.8)' }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 text-[24px] font-semibold transition-all ${
                    s.num === step
                      ? 'bg-primary text-white border-primary shadow-[0_0_0_4px_rgba(0,76,205,0.2)]'
                      : s.num < step
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-white text-on-surface-variant border-outline-variant'
                  }`} style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    {s.num < step ? (
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    ) : (
                      <span className="material-symbols-outlined">{s.icon}</span>
                    )}
                  </div>
                  <span className="text-[14px] font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </header>

          <div className="w-full h-px" style={{
            background: 'linear-gradient(to right, transparent, rgba(195,198,216,0.3), transparent)',
          }} />

          {error && (
            <div className="p-3 rounded-lg text-[14px]" style={{ background: 'rgba(255,218,214,0.5)', color: '#93000a' }}>
              {error}
            </div>
          )}

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-[24px] leading-[32px] font-semibold text-on-surface flex items-center gap-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                <span className="material-symbols-outlined text-secondary">person</span>
                Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">Full Name *</label>
                  <input type="text" placeholder="e.g., Alex Mercer" value={form.full_name} onChange={update('full_name')}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">Email Address</label>
                  <input type="email" value={form.email} readOnly placeholder="Fetching email..."
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant text-on-surface outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">Phone Number</label>
                  <input type="tel" placeholder="+1 234 567 8900" value={form.phone} onChange={update('phone')}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">College / University *</label>
                  <input type="text" placeholder="e.g., Stanford University" value={form.college} onChange={update('college')}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">Year of Graduation</label>
                  <select value={form.graduation_year} onChange={update('graduation_year')}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none">
                    <option value="">Select year</option>
                    {[2024,2025,2026,2027,2028].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">Target Role *</label>
                  <select value={form.target_role} onChange={update('target_role')}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none">
                    <option value="">Select your target role...</option>
                    {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                  <div className="mt-3 p-4 rounded-xl space-y-2" style={{ background: 'rgba(0,76,205,0.05)', border: '1px solid rgba(0,76,205,0.15)' }}>
                    <p className="text-xs font-bold text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">info</span>
                      What your role selection changes
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-on-surface-variant">
                      <span><strong>Interview questions</strong> drawn from role-specific bank</span>
                      <span><strong>Rubric & weights</strong> change per role</span>
                      <span><strong>Feedback focus</strong> highlights role-relevant skills</span>
                      <span><strong>Leaderboard</strong> ranks you against same-role peers</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">LinkedIn Profile (optional)</label>
                  <input type="url" placeholder="https://linkedin.com/in/yourname" value={form.linkedin_url} onChange={update('linkedin_url')}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">GitHub Profile (optional)</label>
                  <input type="url" placeholder="https://github.com/yourusername" value={form.github_url} onChange={update('github_url')}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Resume Analysis */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-[24px] leading-[32px] font-semibold text-on-surface flex items-center gap-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    <span className="material-symbols-outlined text-secondary">document_scanner</span>
                    AI Resume Analysis
                  </h2>
                  <p className="text-on-surface-variant mt-1">Upload your resume and let AI analyze it against your target role.</p>
                </div>
              </div>
                  {!resumeResult ? (
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-outline-variant rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
                  style={{ background: 'rgba(255,255,255,0.4)' }}
                >
                  <span className="material-symbols-outlined text-5xl text-outline-variant mb-3">upload_file</span>
                  <p className="font-semibold text-on-surface">Click to upload your resume</p>
                  <p className="text-sm text-on-surface-variant mt-1">PDF, DOCX, or TXT supported</p>
                  <input ref={fileRef} type="file" accept=".pdf,.docx,.txt" className="hidden"
                    onChange={(e) => {
                      const f = e.target.files[0]
                      if (f) {
                        setResumeFile(f)
                        uploadAndAnalyze(f)
                      }
                    }}
                  />
                  {resumeFile && (
                    <p className="mt-3 text-sm text-primary font-medium">{resumeFile.name}</p>
                  )}
                  {loading && <p className="mt-3 text-sm text-primary">Analyzing resume...</p>}
                </div>
              ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(245,243,245,0.5))', border: '1px solid rgba(195,198,216,0.5)' }}>
                      <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#e3e2e4" strokeWidth="8" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke={resumeResult.total_score >= 80 ? "#34d399" : resumeResult.total_score >= 60 ? "#fbbf24" : "#f87171"} strokeWidth="8"
                            strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * resumeResult.total_score / 100)}
                            style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.1))' }} />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-[40px] font-bold text-on-surface leading-none">{resumeResult.total_score}</span>
                          <span className="text-[12px] font-semibold text-on-surface-variant">/100</span>
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <p className="text-xl font-bold text-on-surface">ATS Score</p>
                        <p className="text-sm text-on-surface-variant mt-1">Scored against: <strong>{resumeResult.target_role}</strong></p>
                        <div className="mt-4 inline-block bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-medium">
                          {resumeResult.experience_context}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/60 rounded-xl border border-outline-variant/50 overflow-hidden">
                      <div className="p-5 border-b border-outline-variant/30 bg-surface-container-low/50">
                        <h3 className="text-lg font-bold text-on-surface">Why you scored {resumeResult.total_score}</h3>
                        <p className="text-sm text-on-surface-variant">Detailed breakdown across the 5 core dimensions.</p>
                      </div>
                      <div className="divide-y divide-outline-variant/30">
                        {[
                          { key: 'quantified_impact', label: 'Quantified Impact', icon: 'bar_chart', data: resumeResult.quantified_impact },
                          { key: 'keyword_coverage', label: 'Keyword Coverage', icon: 'vpn_key', data: resumeResult.keyword_coverage },
                          { key: 'project_quality', label: 'Project Quality', icon: 'architecture', data: resumeResult.project_quality },
                          { key: 'formatting', label: 'Formatting & Structure', icon: 'format_align_left', data: resumeResult.formatting },
                          { key: 'summary_positioning', label: 'Summary / Positioning', icon: 'person_search', data: resumeResult.summary_positioning }
                        ].map((dim, idx) => (
                          <details key={idx} className="group">
                            <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-container-low/30 transition-colors list-none">
                              <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-secondary">{dim.icon}</span>
                                <span className="font-semibold text-on-surface">{dim.label}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-on-surface-variant">{dim.data?.score || 0} / {dim.data?.max_score || 0}</span>
                                <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">expand_more</span>
                              </div>
                            </summary>
                            <div className="p-4 pt-0 text-sm text-on-surface-variant bg-surface-container-low/10">
                              <div className="mb-3 p-3 rounded bg-error-container/20 border border-error-container/30">
                                <span className="font-semibold text-error">Points lost: {dim.data?.points_lost || 0}</span>
                                <p className="mt-1">{dim.data?.explanation}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-on-surface">Evidence found:</span>
                                <p className="italic mt-1 border-l-2 border-outline-variant pl-3">{dim.data?.evidence}</p>
                              </div>
                            </div>
                          </details>
                        ))}
                      </div>
                      <div className="p-4 bg-surface-container-low/50 border-t border-outline-variant/30 flex justify-between items-center font-bold text-on-surface">
                        <span>Total Score</span>
                        <span>{resumeResult.total_score} / 100</span>
                      </div>
                    </div>

                    {resumeResult.keyword_coverage && (
                      <div className="bg-white/60 rounded-xl border border-outline-variant/50 p-5">
                        <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary">radar</span>
                          Full-Stack Skill Match
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-bold text-on-surface mb-2">Core Signals ({resumeResult.keyword_coverage.core_requirements_satisfied || 0}/{resumeResult.keyword_coverage.core_requirements_total || 0})</h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {resumeResult.keyword_coverage.matched_core?.map(k => (
                                <span key={k} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded border border-green-200 flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px]">check</span> {k}
                                </span>
                              ))}
                              {resumeResult.keyword_coverage.missing_core?.map(k => (
                                <span key={k} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded border border-red-200 flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px]">close</span> {k}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-on-surface mb-2">Secondary Signals</h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {resumeResult.keyword_coverage.matched_secondary?.map(k => (
                                <span key={k} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded border border-blue-200 flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px]">check</span> {k}
                                </span>
                              ))}
                              {resumeResult.keyword_coverage.missing_secondary?.map(k => (
                                <span key={k} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200 flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px]">close</span> {k}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {resumeResult.top_actions && resumeResult.top_actions.length > 0 && (
                      <div className="bg-primary/5 rounded-xl border border-primary/20 p-5">
                        <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                          <span className="material-symbols-outlined">trending_up</span>
                          Highest Impact Improvements
                        </h3>
                        <div className="space-y-3">
                          {resumeResult.top_actions.map((action, idx) => (
                            <div key={idx} className="flex gap-3 items-start bg-white/70 p-3 rounded-lg border border-primary/10">
                              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                {idx + 1}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-on-surface">{action.improvement}</p>
                                <p className="text-xs text-primary/80 mt-1">Potentially improves: <strong>{action.improves_dimension}</strong></p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
              )}
            </div>
          )}

          {/* Step 3: Connections */}
          {step === 3 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-[24px] leading-[32px] font-semibold text-on-surface flex items-center gap-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                <span className="material-symbols-outlined text-secondary">link</span>
                Connect External Profiles
              </h2>
              <p className="text-on-surface-variant">Link your professional networks to automatically sync experience and projects.</p>
              <div className="flex flex-col md:flex-row gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant bg-white hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-primary">link</span> Connect LinkedIn
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant bg-white hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined">code</span> Connect GitHub
                </button>
              </div>
            </div>
          )}

          <footer className="mt-8 pt-6 border-t border-outline-variant/30 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
            <button onClick={handleBack}
              className={`text-on-surface-variant font-medium text-[14px] hover:text-on-surface flex items-center gap-1 ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={step === 1}
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back
            </button>
            {step < 3 ? (
              <button onClick={step === 2 && !resumeResult ? () => fileRef.current?.click() : handleNext} disabled={loading}
                className="w-full md:w-auto text-white font-medium text-[14px] px-8 py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60"
                style={{
                  background: 'linear-gradient(to right, #004ccd, #0052dd)',
                  boxShadow: '0 4px 14px rgba(0,76,205,0.3)',
                }}
              >
                {loading ? 'Analyzing...' : step === 2 && !resumeResult ? 'Upload & Analyze' : 'Next'}
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
              </button>
            ) : (
              <button onClick={handleFinish}
                className="w-full md:w-auto text-white font-medium text-[14px] px-8 py-3 rounded-xl flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(to right, #004ccd, #0052dd)',
                  boxShadow: '0 4px 14px rgba(0,76,205,0.3)',
                }}
              >
                Go to Dashboard
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
              </button>
            )}
          </footer>
        </div>
      </main>
    </div>
  )
}
