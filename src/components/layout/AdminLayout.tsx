import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, LogOut, Bell, FileText } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import toast from 'react-hot-toast';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive 
        ? 'bg-white/10 text-white border-l-2 border-gold-500' 
        : 'text-cloud/70 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-navy-900 flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-navy-800 border-r border-white/10 hidden md:flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-display font-bold text-white">LAKSHYA Admin</h2>
          <p className="text-xs text-gold-500 mt-1">Management Portal</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-6">
          <NavLink to="/admin/dashboard" className={navClass}>
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </NavLink>
          
          <NavLink to="/admin/registrations" className={navClass}>
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Registrations</span>
          </NavLink>
          
          <NavLink to="/admin/enquiries" className={navClass}>
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium text-sm">Enquiries</span>
          </NavLink>
          
          <NavLink to="/admin/announcements" className={navClass}>
            <Bell className="w-5 h-5" />
            <span className="font-medium text-sm">Announcements</span>
          </NavLink>
          
          <NavLink to="/admin/pages" className={navClass}>
            <FileText className="w-5 h-5" />
            <span className="font-medium text-sm">Legal Pages</span>
          </NavLink>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
}
