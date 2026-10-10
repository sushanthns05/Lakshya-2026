import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { MessageSquare, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'sponsorshipEnquiries'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const enqs: any[] = [];
      querySnapshot.forEach((doc) => {
        enqs.push({ id: doc.id, ...doc.data() });
      });
      setEnquiries(enqs);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      toast.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'sponsorshipEnquiries', id), {
        status: newStatus,
        updatedAt: new Date()
      });
      
      setEnquiries(prev => prev.map(enq => 
        enq.id === id ? { ...enq, status: newStatus } : enq
      ));
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredEnquiries = enquiries.filter(enq => {
    const matchesSearch = 
      enq.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      enq.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Resolved': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'New': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'In Progress': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-cloud/70 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-navy-900 overflow-hidden">
      <header className="h-20 bg-navy-900 border-b border-white/10 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-gold-500" />
          <h1 className="text-2xl font-display font-bold text-white">Sponsorship Enquiries</h1>
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
                placeholder="Search names, organizations, emails..." 
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
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* List */}
          <div className="overflow-x-auto rounded-lg border border-white/10 flex-1">
            <table className="w-full text-left border-collapse min-w-200">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-4 text-sm font-medium text-cloud/70">Date</th>
                  <th className="p-4 text-sm font-medium text-cloud/70">Contact</th>
                  <th className="p-4 text-sm font-medium text-cloud/70">Message</th>
                  <th className="p-4 text-sm font-medium text-cloud/70">Status</th>
                  <th className="p-4 text-sm font-medium text-cloud/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-cloud/50">Loading enquiries...</td>
                  </tr>
                ) : filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-cloud/50">No enquiries found matching your criteria.</td>
                  </tr>
                ) : (
                  filteredEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 text-sm text-cloud/60 whitespace-nowrap">
                        {enq.createdAt?.toDate().toLocaleDateString() || 'Just now'}
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-white">{enq.name}</p>
                        <p className="text-sm text-gold-500">{enq.organization}</p>
                        <a href={`mailto:${enq.email}`} className="text-xs text-cloud/60 hover:text-white transition-colors">{enq.email}</a>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-cloud/80 line-clamp-3 max-w-md">{enq.message}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs border whitespace-nowrap ${getStatusColor(enq.status)}`}>
                          {enq.status || 'New'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <select 
                          value={enq.status || 'New'}
                          onChange={(e) => handleUpdateStatus(enq.id, e.target.value)}
                          className="bg-navy-900 border border-white/20 rounded px-2 py-1 text-xs text-white outline-none cursor-pointer hover:border-gold-500 transition-colors"
                        >
                          <option value="New">Mark New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
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
