import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="w-full py-8 bg-surface-container-lowest border-t border-outline-variant/30 shadow-sm mt-8 z-10 relative reveal-on-scroll">
      <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-[64px] max-w-[1280px] mx-auto gap-4">
        <div
          className="font-headline-md text-[24px] font-bold text-primary flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="material-symbols-outlined">rocket_launch</span>
          Career Pilot
        </div>
        <div className="flex gap-6 text-label-sm text-[12px] text-on-surface-variant">
          <a className="hover:text-primary opacity-80 hover:opacity-100 transition-opacity" href="#">Privacy Policy</a>
          <a className="hover:text-primary opacity-80 hover:opacity-100 transition-opacity" href="#">Terms of Service</a>
          <a className="hover:text-primary opacity-80 hover:opacity-100 transition-opacity" href="#">Contact Support</a>
        </div>
        <div className="text-label-sm text-[12px] text-on-surface-variant opacity-80">
          &copy; 2024 Career Pilot AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
