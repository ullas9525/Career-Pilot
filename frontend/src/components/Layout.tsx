import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="min-h-screen flex" style={{
      backgroundColor: '#faf9fb',
      backgroundImage: `
        radial-gradient(circle at top right, rgba(110, 243, 243, 0.1), transparent 40%),
        radial-gradient(circle at bottom left, rgba(0, 76, 205, 0.05), transparent 40%)
      `
    }}>
      <Sidebar />
      <div className="flex-1 md:ml-64 w-full">
        <Outlet />
      </div>
    </div>
  );
}
