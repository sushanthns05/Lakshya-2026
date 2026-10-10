import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { Users, Search, Filter, CheckCircle, Clock, XCircle, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const regs: any[] = [];
      querySnapshot.forEach((doc) => {
        regs.push({ id: doc.id, ...doc.data() });
      });
      setRegistrations(regs);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast.error("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'registrations', id), {
        status: newStatus,
        updatedAt: new Date()
      });
      
      setRegistrations(prev => prev.map(reg => 
        reg.id === id ? { ...reg, status: newStatus } : reg
      ));
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      reg.leaderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.leaderEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || reg.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Qualified': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Disqualified': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-navy-900 overflow-hidden">
      <header className="h-20 bg-navy-900 border-b border-white/10 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-gold-500" />
          <h1 className="text-2xl font-display font-bold text-white">Registrations</h1>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="glass-card rounded-xl p-6 border-white/10 flex flex-col h-full">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cloud/50" />
              <input 
                type="text" 
                placeholder="Search teams, emails, IDs..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-navy-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-cloud/70" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-gold-500 outline-none appearance-none"
              >
                <option value="All">All Statuses</option>
                <option value="Qualified">Qualified</option>
                <option value="Disqualified">Disqualified</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-white/10 flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-4 text-sm font-medium text-cloud/70">Registration ID</th>
                  <th className="p-4 text-sm font-medium text-cloud/70">Team Name</th>
                  <th className="p-4 text-sm font-medium text-cloud/70">Leader</th>
                  <th className="p-4 text-sm font-medium text-cloud/70">College</th>
                  <th className="p-4 text-sm font-medium text-cloud/70">Members</th>
                  <th className="p-4 text-sm font-medium text-cloud/70">Status</th>
                  <th className="p-4 text-sm font-medium text-cloud/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-cloud/50">Loading registrations...</td>
                  </tr>
                ) : filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-cloud/50">No registrations found matching your criteria.</td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono text-xs text-cloud/50">{reg.id}</td>
                      <td className="p-4">
                        <p className="font-bold text-white">{reg.teamName}</p>
                        <p className="text-xs text-cloud/60">{reg.city}, {reg.state}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-white">{reg.leaderName}</p>
                        <p className="text-xs text-cloud/60">{reg.leaderEmail}</p>
                        <p className="text-xs text-cloud/60">{reg.leaderPhone}</p>
                      </td>
                      <td className="p-4 text-sm text-cloud/80">{reg.college}</td>
                      <td className="p-4 text-sm text-cloud/80">
                        {reg.members ? reg.members.length + 1 : 1} / 4
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(reg.status)}`}>
                          {reg.status || 'Qualified'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <select 
                          value={reg.status || 'Qualified'}
                          onChange={(e) => handleUpdateStatus(reg.id, e.target.value)}
                          className="bg-navy-900 border border-white/20 rounded px-2 py-1 text-xs text-white outline-none cursor-pointer hover:border-gold-500 transition-colors"
                        >
                          <option value="Qualified">Qualify</option>
                          <option value="Disqualified">Disqualify</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
