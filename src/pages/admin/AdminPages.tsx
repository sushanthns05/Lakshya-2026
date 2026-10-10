import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import toast from 'react-hot-toast';
import { FileText, Save } from 'lucide-react';

export default function AdminPages() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent(activeTab);
  }, [activeTab]);

  const fetchContent = async (type: 'privacy' | 'terms') => {
    setLoading(true);
    try {
      const docRef = doc(db, 'settings', type);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().content) {
        setContent(docSnap.data().content);
      } else {
        setContent('');
      }
    } catch (error) {
      console.error('Error fetching page content:', error);
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', activeTab), { content });
      toast.success('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Legal Pages</h1>
          <p className="text-cloud/70 text-sm mt-1">Edit Privacy Policy and Terms & Conditions</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'privacy' ? 'bg-gold-500 text-navy-900' : 'bg-white/5 text-cloud/70 hover:bg-white/10'}`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'terms' ? 'bg-gold-500 text-navy-900' : 'bg-white/5 text-cloud/70 hover:bg-white/10'}`}
        >
          Terms & Conditions
        </button>
      </div>

      <div className="flex-1 bg-navy-800/50 border border-white/10 rounded-xl p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-gold-500">
            <FileText className="w-5 h-5" />
            <span className="font-medium">Editing {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}</span>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-2 bg-gold-500 text-navy-900 px-4 py-2 rounded-lg font-medium hover:bg-gold-400 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-500"></div>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Enter HTML or text for the ${activeTab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'} here...`}
            className="flex-1 w-full bg-navy-900/50 border border-white/10 rounded-lg p-4 text-white font-mono text-sm focus:outline-none focus:border-gold-500/50 resize-none"
          />
        )}
      </div>
    </div>
  );
}
