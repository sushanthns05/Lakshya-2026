import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { Users, CheckCircle, Clock, MessageSquare, LayoutDashboard } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    newEnquiries: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        let total = 0;
        let approved = 0;
        let pending = 0;

        querySnapshot.forEach((doc) => {
          total++;
          const data = doc.data();
          if (data.status === 'Approved') approved++;
          if (data.status === 'Submitted' || data.status === 'Under Review') pending++;
        });
        
        // Fetch Enquiries
        const eq = query(collection(db, 'sponsorshipEnquiries'));
        const eqSnapshot = await getDocs(eq);
        let newEnquiries = 0;
        eqSnapshot.forEach((doc) => {
           if (doc.data().status === 'New') newEnquiries++;
        });

        setStats({ total, approved, pending, newEnquiries });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-navy-900">
      {/* Header */}
      <header className="h-20 bg-navy-900 border-b border-white/10 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-6 h-6 text-gold-500" />
          <h1 className="text-2xl font-display font-bold text-white">Overview</h1>
        </div>
          <div className="flex items-center gap-4 text-cloud/80 text-sm">
            <span>Admin User</span>
            <div className="w-8 h-8 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6 rounded-xl border-t-4 border-t-gold-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-cloud/60 text-sm font-medium uppercase tracking-wider mb-1">Total Teams</p>
                  <h3 className="text-3xl font-bold text-white">{stats.total}</h3>
                </div>
                <div className="p-3 bg-gold-500/10 rounded-lg">
                  <Users className="w-6 h-6 text-gold-500" />
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl border-t-4 border-t-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-cloud/60 text-sm font-medium uppercase tracking-wider mb-1">Approved</p>
                  <h3 className="text-3xl font-bold text-white">{stats.approved}</h3>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl border-t-4 border-t-yellow-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-cloud/60 text-sm font-medium uppercase tracking-wider mb-1">Pending Review</p>
                  <h3 className="text-3xl font-bold text-white">{stats.pending}</h3>
                </div>
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl border-t-4 border-t-blue-500 md:col-span-3 lg:col-span-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-cloud/60 text-sm font-medium uppercase tracking-wider mb-1">New Enquiries</p>
                  <h3 className="text-3xl font-bold text-white">{stats.newEnquiries}</h3>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
}
