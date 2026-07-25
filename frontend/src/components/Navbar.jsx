import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="w-full top-0 sticky z-50 bg-white/60 backdrop-blur-[20px] border-b border-white/40 shadow-sm transition-colors duration-300 reveal-on-scroll">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto" style={{ paddingLeft: '20px', paddingRight: '20px', maxWidth: '1280px' }}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
          <span className="text-(--font-headline-md) text-[24px] font-bold text-primary">Career Pilot</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a className="text-(--font-body-md) text-[16px] text-on-surface-variant hover:text-primary transition-colors duration-200" href="#features">Features</a>
          <a className="text-(--font-body-md) text-[16px] text-on-surface-variant hover:text-primary transition-colors duration-200" href="#coordinator-benefits">For Coordinators</a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block text-(--font-label-md) text-[14px] text-primary border border-primary px-4 py-2 rounded-full hover:bg-primary/5 transition-colors duration-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/login')}
            className="text-(--font-label-md) text-[14px] bg-primary text-on-primary px-6 py-2 rounded-full shadow-md hover:bg-primary/90 hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}
