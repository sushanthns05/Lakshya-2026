import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, getDocs, orderBy, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Bell, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'General Update',
    priority: 'Normal',
    status: 'draft',
    featured: false
  });

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const fetched: any[] = [];
      snapshot.forEach(doc => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      setAnnouncements(fetched);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const data = {
        ...formData,
        slug,
        updatedAt: serverTimestamp()
      };

      if (editingId) {
        await updateDoc(doc(db, 'announcements', editingId), data);
        toast.success("Announcement updated successfully");
      } else {
        await addDoc(collection(db, 'announcements'), {
          ...data,
          createdAt: serverTimestamp(),
          publishedAt: formData.status === 'published' ? serverTimestamp() : null
        });
        toast.success("Announcement added successfully");
      }
      setIsAdding(false);
      setEditingId(null);
      resetForm();
      fetchAnnouncements();
    } catch (error) {
      console.error("Error saving announcement:", error);
      toast.error("Failed to save announcement");
    }
  };

  const handleEdit = (ann: any) => {
    setFormData({
      title: ann.title || '',
      summary: ann.summary || '',
      content: ann.content || '',
      category: ann.category || 'General Update',
      priority: ann.priority || 'Normal',
      status: ann.status || 'draft',
      featured: ann.featured || false
    });
    setEditingId(ann.id);
    setIsAdding(true);
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      await updateDoc(doc(db, 'announcements', id), { 
        status: newStatus,
        publishedAt: newStatus === 'published' ? serverTimestamp() : null
      });
      setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      toast.success(`Announcement marked as ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this announcement permanently?")) return;
    try {
      await deleteDoc(doc(db, 'announcements', id));
      setAnnouncements(prev => prev.filter(a => a.id !== id));
      toast.success("Announcement deleted");
    } catch (error) {
      toast.error("Failed to delete announcement");
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      summary: '',
      content: '',
      category: 'General Update',
      priority: 'Normal',
      status: 'draft',
      featured: false
    });
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'text-red-400 bg-red-400/10 border-red-400/20';
    if (priority === 'Medium') return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-navy-900 overflow-hidden">
      <header className="h-20 bg-navy-900 border-b border-white/10 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-gold-500" />
          <h1 className="text-2xl font-display font-bold text-white">Announcements</h1>
        </div>
        <button 
          onClick={() => { resetForm(); setIsAdding(true); }}
          className="btn-primary flex items-center gap-2 py-2 px-4 text-sm"
        >
          <Plus className="w-4 h-4" /> New Announcement
        </button>
      </header>

      <div className="flex-1 overflow-auto p-8 relative">
        {isAdding && (
          <div className="absolute inset-0 z-10 bg-navy-900/80 backdrop-blur-sm flex items-start justify-center p-8 overflow-y-auto">
            <div className="bg-navy-800 border border-white/10 p-8 rounded-2xl w-full max-w-3xl shadow-2xl my-auto">
              <h2 className="text-xl font-bold text-white mb-6">
                {editingId ? 'Edit Announcement' : 'Create Announcement'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-cloud/70 mb-1">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-gold-500 outline-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-cloud/70 mb-1">Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-gold-500 outline-none">
                      <option value="General Update">General Update</option>
                      <option value="Registration">Registration</option>
                      <option value="Schedule">Schedule</option>
                      <option value="Results">Results</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cloud/70 mb-1">Priority</label>
                    <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-gold-500 outline-none">
                      <option value="Normal">Normal</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High (Urgent)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cloud/70 mb-1">Short Summary (For cards/banners)</label>
                  <input required type="text" maxLength={120} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-gold-500 outline-none" placeholder="Brief summary..." />
                  <div className="text-right text-xs text-cloud/50 mt-1">{formData.summary.length}/120</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cloud/70 mb-1">Full Content (Markdown supported in future)</label>
                  <textarea required rows={5} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-gold-500 outline-none" placeholder="Write the full announcement details here..." />
                </div>

                <div className="flex items-center gap-6 pt-2 bg-navy-900/50 p-4 rounded-lg border border-white/5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.status === 'published'} onChange={e => setFormData({...formData, status: e.target.checked ? 'published' : 'draft'})} className="rounded border-white/20 text-gold-500 focus:ring-gold-500 bg-navy-900" />
                    <span className="text-sm font-medium text-white">Publish Immediately</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="rounded border-white/20 text-gold-500 focus:ring-gold-500 bg-navy-900" />
                    <span className="text-sm font-medium text-white">Feature on Home Page</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                  <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-4 py-2 text-sm text-cloud/80 hover:text-white transition-colors">Cancel</button>
                  <button type="submit" className="btn-primary py-2 px-6 text-sm">Save Announcement</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <p className="text-cloud/50 text-center py-12">Loading announcements...</p>
          ) : announcements.length === 0 ? (
            <div className="glass-card p-12 text-center rounded-2xl border-dashed border-white/20">
              <Bell className="w-12 h-12 text-cloud/30 mx-auto mb-4" />
              <p className="text-cloud/50 text-lg">No announcements created yet.</p>
            </div>
          ) : (
            announcements.map((ann) => (
              <div key={ann.id} className={`glass-card p-6 rounded-xl border flex flex-col md:flex-row gap-6 justify-between ${ann.status === 'published' ? 'border-white/10' : 'border-dashed border-white/20 opacity-80'}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityColor(ann.priority)}`}>
                      {ann.priority.toUpperCase()}
                    </span>
                    <span className="text-xs font-medium text-cloud/60 bg-white/5 px-2 py-0.5 rounded">
                      {ann.category}
                    </span>
                    {ann.featured && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gold-500/20 text-gold-500 border border-gold-500/30">
                        FEATURED
                      </span>
                    )}
                    {ann.status === 'draft' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cloud/10 text-cloud/70">
                        DRAFT
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{ann.title}</h3>
                  <p className="text-cloud/80 text-sm mb-3">{ann.summary}</p>
                  <p className="text-xs text-cloud/50">
                    Created: {ann.createdAt?.toDate().toLocaleDateString() || 'Just now'} 
                    {ann.publishedAt && ` • Published: ${ann.publishedAt.toDate().toLocaleDateString()}`}
                  </p>
                </div>
                
                <div className="flex md:flex-col justify-end md:justify-center items-end gap-3 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                  <button 
                    onClick={() => handleToggleStatus(ann.id, ann.status)}
                    className="btn-secondary w-full md:w-32 py-1.5 text-xs flex justify-center items-center gap-2"
                  >
                    {ann.status === 'published' ? <><EyeOff className="w-3 h-3" /> Unpublish</> : <><Eye className="w-3 h-3" /> Publish</>}
                  </button>
                  <button 
                    onClick={() => handleEdit(ann)}
                    className="w-full md:w-32 py-1.5 text-xs bg-navy-800 text-white hover:bg-navy-950 rounded-lg transition-colors border border-white/10 flex justify-center items-center gap-2"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(ann.id)}
                    className="w-full md:w-32 py-1.5 text-xs text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex justify-center items-center gap-2"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
