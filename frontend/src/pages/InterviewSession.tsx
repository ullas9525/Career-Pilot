import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function InterviewSession() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [micPermission, setMicPermission] = useState(false);
  const [camPermission, setCamPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingText, setRecordingText] = useState('Idle');
  
  // Chat state
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [inputText, setInputText] = useState('');
  const [interviewId, setInterviewId] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Timer state
  const [remainingSeconds, setRemainingSeconds] = useState(180);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Live session timer
  const [liveSeconds, setLiveSeconds] = useState(0);

  useEffect(() => {
    const liveInterval = setInterval(() => {
      setLiveSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(liveInterval);
  }, []);

  // Initialize interview
  useEffect(() => {
    if (!showModal) {
      startInterview();
    }
  }, [showModal]);

  const startInterview = async () => {
    const apiKey = localStorage.getItem('nvidiaApiKey');
    if (!apiKey) {
      alert('Please add your NVIDIA API Key in Settings first!');
      navigate('/student/settings');
      return;
    }
    try {
      setIsTyping(true);
      const res = await axios.post('http://localhost:8000/api/interviews/start', { role: 'Software Engineer' }, {
        headers: { 'X-API-Key': apiKey }
      });
      setInterviewId(res.data.interview_id);
      setMessages([{ role: 'assistant', content: res.data.message }]);
    } catch (error) {
      console.error(error);
      alert('Failed to start interview.');
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !interviewId) return;
    const apiKey = localStorage.getItem('nvidiaApiKey');
    
    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:8000/api/interviews/chat', { 
        interview_id: interviewId, 
        message: userMsg 
      }, {
        headers: { 'X-API-Key': apiKey }
      });

      setMessages(prev => [...prev, { role: 'assistant', content: res.data.message }]);

      if (res.data.status === 'completed') {
        alert('Interview completed! Score: ' + res.data.score);
        localStorage.setItem('lastInterviewScore', JSON.stringify(res.data));
        navigate('/student/result');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to send message.');
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (isTimerRunning && remainingSeconds > 0) {
      timerInterval = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isTimerRunning, remainingSeconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRequestPermissions = () => {
    setMicPermission(true);
    setCamPermission(true);
    // Real implementation would use navigator.mediaDevices.getUserMedia
  };

  const toggleRecording = () => {
    if (!micPermission || !camPermission) {
      alert("Microphone/camera permissions not granted. Click 'Request Permissions' first.");
      return;
    }
    if (isRecording) {
      setIsRecording(false);
      setRecordingText('Processing...');
      setTimeout(() => setRecordingText('Idle'), 6000); // Simulate processing delay
    } else {
      setIsRecording(true);
      setRecordingText('Recording...');
    }
  };

  const endSession = () => {
    navigate('/student/result');
  };

  return (
    <div className="flex h-screen w-full flex-col p-4 gap-4 bg-surface text-on-surface font-body-md overflow-hidden relative" style={{
      backgroundColor: '#faf9fb',
      backgroundImage: `
        radial-gradient(at 0% 0%, hsla(220,100%,94%,1) 0, transparent 50%), 
        radial-gradient(at 100% 100%, hsla(180,100%,92%,1) 0, transparent 50%)
      `
    }}>
      {/* Checklist Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] modal-overlay transition-all">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-outline-variant/30">
            <h2 className="font-headline-md text-2xl font-bold text-on-background mb-2">🎤 Before you start</h2>
            <p className="text-sm text-on-surface-variant mb-4">Quick check – takes 30 seconds</p>
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary" />
                <span className="text-sm text-on-surface">Microphone working</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary" />
                <span className="text-sm text-on-surface">Camera preview visible</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary" />
                <span className="text-sm text-on-surface">Quiet environment</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary" />
                <span className="text-sm text-on-surface">Good lighting</span>
              </label>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 border border-primary text-primary py-2 rounded-xl font-semibold hover:bg-primary/10">Test equipment</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary/90">I'm ready – start</button>
            </div>
            <p className="text-xs text-on-surface-variant mt-4 text-center">You can skip this later from settings</p>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-2 glass-panel rounded-xl relative z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
          </button>
          <div>
            <h1 className="text-on-surface font-bold text-lg leading-tight">Mock Interview Session</h1>
            <p className="text-on-surface-variant text-xs flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-error recording-pulse"></span> Live Session • <span>{formatTime(liveSeconds)}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm">Invite Team</button>
        </div>
      </header>

      <main className="flex flex-1 gap-4 overflow-hidden">
        {/* Left Sidebar: Chat Transcript */}
        <aside className="w-80 flex flex-col gap-4 hidden lg:flex">
          <div className="flex-1 glass-panel rounded-2xl p-5 flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-on-surface font-semibold text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">forum</span> Live Transcript
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto text-sm text-on-surface-variant flex flex-col gap-3 pr-2">
              {messages.map((msg, idx) => (
                <div key={idx} className={`p-3 rounded-lg border ${msg.role === 'assistant' ? 'bg-surface-container-low border-outline-variant/30 text-left' : 'bg-primary/10 border-primary/20 text-right self-end ml-4'}`}>
                  <p className={`font-bold mb-1 text-[11px] uppercase ${msg.role === 'assistant' ? 'text-primary' : 'text-tertiary'}`}>
                    {msg.role === 'assistant' ? 'AI Interviewer' : 'You'}
                  </p>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              ))}
              {isTyping && (
                <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 text-left mr-8">
                  <p className="font-bold text-primary mb-1 text-[11px] uppercase">AI Interviewer</p>
                  <p className="italic flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                  </p>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="mt-auto relative">
              <input 
                type="text" 
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type your answer..." 
                className="w-full bg-surface-container rounded-xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-primary/20 border border-outline-variant/30 transition-all outline-none"
              />
              <button onClick={sendMessage} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded-lg hover:bg-primary/90">
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Center: Video Area */}
        <section className="flex-1 relative flex flex-col gap-4 h-full">
          <div className="flex-1 overflow-hidden relative group video-container shadow-2xl h-full rounded-2xl">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAuOUIJR2EetV6bUhSE_CpWf0YBOLhNmf-MfHcECr7TNloIDUeW9aEpmfmp6yr1LNDDJFmsWQ8GMjjKzk76AQxqS9sYp73WfN1My9Raj5zYUa4udMqBbYvno-Qm6WYeppIrm3M3NXFG9eKPk_oLj7L7js8xHLG2-O_QxOum9UTs2Uxmz4Kum90eCfi9kV5g6LK4FvU_H4Q3rnDwp_3HtENKBct_3CwCkRqDOXMEz0qSU5v1EKFR6ar6rnIcaBQTMAau4BasC8wmhnk')" }}></div>
            <div className="absolute top-6 left-6 glass-control px-4 py-2 rounded-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(0,106,106,0.5)]"></div>
              <span className="text-sm font-bold text-on-surface">AI Interviewer</span>
            </div>
            <div className="absolute top-6 right-6 w-48 aspect-video rounded-2xl overflow-hidden border-2 border-white/50 shadow-xl glass-panel sim-video flex items-center justify-center">
              <div className="text-center text-outline/80 text-xs flex flex-col items-center">
                <span className="material-symbols-outlined text-2xl">videocam_off</span>
                <span>Camera preview</span>
              </div>
              <div className="absolute bottom-2 right-2 glass-control px-2 py-0.5 rounded text-[10px] font-bold">You</div>
            </div>
          </div>

          {/* Device Setup Panel */}
          <div className="glass-control rounded-xl p-4 flex flex-wrap gap-4 items-center justify-between shadow-md mt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-primary">mic</span>
                <span className={`font-medium ${micPermission ? 'text-tertiary' : 'text-error'}`}>{micPermission ? 'Granted' : 'Not requested'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-primary">videocam</span>
                <span className={`font-medium ${camPermission ? 'text-tertiary' : 'text-error'}`}>{camPermission ? 'Granted' : 'Not requested'}</span>
              </div>
              {!micPermission && (
                <button onClick={handleRequestPermissions} className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-primary/90">Request Permissions</button>
              )}
            </div>
          </div>

          {/* Control Bar */}
          <div className="relative flex items-center justify-center">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-4 glass-control px-6 py-3 rounded-2xl shadow-2xl z-20">
              <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-all text-on-surface-variant"><span className="material-symbols-outlined">mic</span></button>
              <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-all text-on-surface-variant"><span class="material-symbols-outlined">videocam</span></button>
              
              {/* Timer */}
              <div className="flex items-center gap-2 bg-white/40 px-3 py-2 rounded-xl">
                <span className="material-symbols-outlined text-outline text-[18px]">timer</span>
                <span className="font-mono text-lg font-bold text-on-surface timer-digit">{formatTime(remainingSeconds)}</span>
                <div className="flex gap-1">
                  <button onClick={() => setIsTimerRunning(true)} className="text-xs bg-primary/20 hover:bg-primary/40 px-2 py-1 rounded">Start</button>
                  <button onClick={() => setIsTimerRunning(false)} className="text-xs bg-error/20 hover:bg-error/40 px-2 py-1 rounded">Pause</button>
                  <button onClick={() => { setIsTimerRunning(false); setRemainingSeconds(180); }} className="text-xs bg-outline/20 hover:bg-outline/40 px-2 py-1 rounded">Reset</button>
                </div>
              </div>
              
              {/* Recording Status */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs font-semibold">
                  <span className={`inline-block w-2 h-2 rounded-full ${isRecording ? 'bg-error recording-pulse' : 'bg-outline'}`}></span>
                  <span>{recordingText}</span>
                </div>
                <button onClick={toggleRecording} className="w-12 h-12 flex items-center justify-center rounded-xl bg-secondary-container/30 text-secondary hover:bg-secondary-container/50 transition-all">
                  <span className="material-symbols-outlined" style={isRecording ? { fontVariationSettings: "'FILL' 1" } : {}}>fiber_manual_record</span>
                </button>
              </div>
              
              <div className="w-px h-8 bg-outline-variant mx-2"></div>
              
              <button onClick={endSession} className="px-6 h-12 flex items-center justify-center rounded-xl bg-error text-white font-bold text-sm hover:opacity-90 transition-all shadow-md shadow-error/20">
                End Session
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
