// ==================== ANDROID-FRIENDLY FULL-FEATURED App.jsx 1-R10====================
// Intercept all relative fetch calls to point to the backend at 127.0.0.1:8000
const originalFetch = window.fetch;
window.fetch = async (input, init) => {
  if (typeof input === 'string' && input.startsWith('/api/')) {
    input = 'http://127.0.0.1:8000' + input;
  }
  return originalFetch(input, init);
};

import React, { useState, useEffect, useRef, useMemo } from 'react';

// ---------- Icon Set ----------
const Ico = {
  folder: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>,
  cube: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polyline points="16.5 9.4 7.5 4.21 7.5 14.79 16.5 19.99 16.5 9.4" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12.01" /></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  trash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>,
  settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
  download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
  chevronRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="9 18 15 12 9 6" /></svg>,
  chevronLeft: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polyline points="15 18 9 12 15 6" /></svg>,
  close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  version: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  share: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  move: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="5 9 2 12 5 15" /><polyline points="9 5 12 2 15 5" /><polyline points="15 19 12 22 9 19" /><polyline points="19 9 22 12 19 15" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" /></svg>,
  rename: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>,
  folderOpen: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /><path d="M11 11h6" /><path d="M14 8v6" /></svg>,
  import: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 3v12" /><polyline points="8 11 12 15 16 11" /><path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" /></svg>,
  externalLink: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" /></svg>,
};

// ---------- Helper Components ----------
const Sheet = ({ open, onClose, title, children }) => (
  <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
    <div className={`absolute bottom-0 left-0 right-0 bg-[#0a1628] border-t border-[#1a3a5c] rounded-t-[32px] p-6 transition-transform duration-300 ease-out shadow-2xl safe-bottom ${open ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="w-12 h-1.5 bg-[#1a3a5c] rounded-full mx-auto mb-6" />
      {title && <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight">{title}</h2>}
      {children}
    </div>
  </div>
);

const Modal = ({ open, onClose, title, children, wide }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#060d1a]/80 backdrop-blur-md" onClick={onClose} />
      <div className={`relative bg-[#0a1628] border border-[#1a3a5c] rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 w-full ${wide ? 'max-w-xl' : 'max-w-sm'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-white uppercase tracking-tight">{title}</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors">{Ico.close}</button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto custom-scrollbar pr-1">{children}</div>
      </div>
    </div>
  );
};

const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const colors = type === 'error' ? 'bg-red-500 border-red-400' : type === 'success' ? 'bg-green-500 border-green-400' : 'bg-[#3bb5ff] border-[#66c6ff]';
  return (
    <div className={`fixed top-12 left-4 right-4 z-[200] ${colors} text-white px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 animate-in slide-in-from-top-full duration-300`}>
      <span className="flex-1 font-bold text-sm">{message}</span>
      <button onClick={onClose}>{Ico.close}</button>
    </div>
  );
};

// ---------- Remote Folder Picker ----------
const RemoteFolderPicker = ({ onSelect, onCancel, showFiles = false, multiSelect = false }) => {
  const [path, setPath] = useState('');
  const [items, setItems] = useState([]);
  const [selectedPaths, setSelectedPaths] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async (p) => {
    setLoading(true);
    try {
      const r = await fetch(`/api/fs/browse?path=${encodeURIComponent(p)}`);
      const data = await r.json();
      setPath(data.current_path);
      setItems(data.items);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchItems(''); }, []);

  const handleItemTap = (item) => {
    if (item.is_dir) {
      if (multiSelect) {
        // In multiSelect: tap navigates into folder
        fetchItems(item.path);
      } else {
        // In single-select folder mode: tap navigates, selection handled by "Select Folder" button
        fetchItems(item.path);
      }
    } else if (showFiles) {
      // File: tap toggles selection
      if (multiSelect) {
        setSelectedPaths(prev => prev.includes(item.path) ? prev.filter(p => p !== item.path) : [...prev, item.path]);
      } else {
        onSelect(item.path);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2 px-1">
        <button onClick={() => fetchItems('')} className="p-2 btn-touch text-[#3bb5ff]">{Ico.home}</button>
        <div className="text-[10px] font-mono text-gray-500 truncate flex-1 uppercase tracking-widest bg-[#060d1a] py-2 px-3 rounded-lg border border-[#1a3a5c]">{path || '/'}</div>
      </div>
      <div className="space-y-2 max-h-[40vh] overflow-y-auto custom-scrollbar">
        {loading ? <div className="text-center py-8 text-gray-500 text-xs animate-pulse uppercase font-bold tracking-widest">Loading...</div> : items.map(item => (
          <div key={item.path}
            onClick={() => handleItemTap(item)}
            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all btn-touch ${selectedPaths.includes(item.path) ? 'bg-[#3bb5ff]/10 border-[#3bb5ff]' : 'bg-[#0f1f3a]/50 border-[#1a3a5c] hover:border-[#3bb5ff]/30'}`}
          >
            <span className="text-[#3bb5ff]">{item.is_dir ? Ico.folder : Ico.file}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate uppercase tracking-tight">{item.name}</div>
              <div className="text-[9px] text-gray-500 uppercase font-black tracking-widest">{item.is_dir ? 'Folder' : 'File'}</div>
            </div>
            {multiSelect && (showFiles || item.is_dir) && (
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPaths.includes(item.path) ? 'bg-[#3bb5ff] border-[#3bb5ff]' : 'border-gray-600'}`}>
                {selectedPaths.includes(item.path) && <div className="w-2.5 h-2.5 bg-[#0a1628] rounded-full" />}
              </div>
            )}
            {item.is_dir && !multiSelect && <span className="text-gray-600">{Ico.chevronRight}</span>}
          </div>
        ))}
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={onCancel} className="flex-1 py-4 bg-[#0f1f3a] text-gray-300 rounded-2xl border border-[#1a3a5c] btn-touch font-bold uppercase tracking-widest text-[10px]">Cancel</button>
        {multiSelect ? (
          <button onClick={() => onSelect(selectedPaths)} disabled={selectedPaths.length === 0} className="flex-1 py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] btn-touch disabled:opacity-30">Select ({selectedPaths.length})</button>
        ) : (
          !showFiles && <button onClick={() => onSelect(path)} className="flex-1 py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] btn-touch">Select Folder</button>
        )}
      </div>
    </div>
  );
};

// ---------- Archive Folder Picker ----------
const ArchiveFolderPicker = ({ db, onSelect, onCancel }) => {
  const [currentPath, setCurrentPath] = useState('.');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async (p) => {
    setLoading(true);
    try {
      const r = await fetch(`/api/listfiles?db=${db}&path=${encodeURIComponent(p)}`);
      const data = await r.json();
      const folders = Object.values(data.results || {}).filter(i => i.type === 'folder');
      setItems(folders);
      setCurrentPath(p);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { load('.'); }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => load('.')} className="p-2 btn-touch text-[#3bb5ff]">{Ico.home}</button>
        <div className="text-xs text-gray-400 font-mono truncate bg-[#060d1a] py-2 px-3 rounded-lg border border-[#1a3a5c] flex-1">{currentPath}</div>
      </div>
      <div className="space-y-2 max-h-[40vh] overflow-y-auto custom-scrollbar">
        {loading ? <div className="text-center py-8 text-gray-500 uppercase font-bold tracking-widest text-[10px]">Browsing...</div> : items.map(item => (
          <div key={item.itemid} onClick={() => load(currentPath === '.' ? item.displayName : `${currentPath}/${item.displayName}`)} className="flex items-center gap-3 p-4 bg-[#0f1f3a]/50 border border-[#1a3a5c] rounded-2xl btn-touch">
            <span className="text-[#3bb5ff]">{Ico.folder}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate uppercase tracking-tight">{item.displayName}</div>
            </div>
            <span className="text-gray-600">{Ico.chevronRight}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={onCancel} className="flex-1 py-4 bg-[#0f1f3a] text-gray-300 rounded-2xl font-bold uppercase tracking-widest text-[10px]">Cancel</button>
        <button onClick={() => onSelect(currentPath)} className="flex-1 py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">Select "{currentPath === '.' ? 'Root' : currentPath.split('/').pop()}"</button>
      </div>
    </div>
  );
};

// ---------- Type Casting Helper ----------
const castValue = (value, targetType) => {
  if (targetType === 'boolean') return value === true || value === 'true';
  if (targetType === 'number') return parseFloat(value) || 0;
  return value;
};

// ---------- Main App Component ----------
export default function App() {
  const [tab, setTab] = useState('explorer');
  const [dbs, setDbs] = useState([]);
  const [selectedDb, setSelectedDb] = useState('');
  const [files, setFiles] = useState({});
  const [currentPath, setCurrentPath] = useState('.');
  const [history, setHistory] = useState(['.']);
  const [loadingFiles, setLoadingLoadingFiles] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [localConfig, setLocalConfig] = useState(null);
  const [toast, setToast] = useState(null);
  const [bottomSheet, setBottomSheet] = useState(null);
  const [modal, setModal] = useState(null);
  const [queue, setQueue] = useState([]);
  const [ws, setWs] = useState(null);
  const [promptQueue, setPromptQueue] = useState([]);
  const [externalVolumes, setExternalVolumes] = useState(JSON.parse(localStorage.getItem('mob_externalVolumes') || '[]'));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [downloadFolder, setDownloadFolder] = useState(localStorage.getItem('VAULT_OPUS_download_folder') || '/storage/emulated/0/Download');
  const [showCreateVolume, setShowCreateVolume] = useState(false);
  const [showSharePasswordModal, setShowSharePasswordModal] = useState(false);
  const [dbToShare, setDbToShare] = useState('');
  const [sharePassword, setSharePassword] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [setupStatus, setSetupStatus] = useState({ setup_complete: 1, has_valid_token: true, has_valid_channel: true, has_valid_volume: true });
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [setupData, setSetupData] = useState({ token: '', channel_id: '', db_name: '' });

  const retryCountRef = useRef(0);
  const maxRetries = 10;

  const showToast = (message, type = 'info') => setToast({ message, type });

  const fetchDbs = async () => {
    try {
      const r = await fetch('/api/dbs');
      const data = await r.json();
      setDbs(data.dbs || []);
    } catch (e) { showToast('Backend unreachable', 'error'); }
  };

  const fetchConfig = async () => {
    try {
      const r = await fetch('/api/config');
      if (!r.ok) throw new Error('Config failed');
      const data = await r.json();
      setLocalConfig(data.config);
    } catch (e) {
      console.error(e);
      // Wait a bit and retry config fetch if it failed on startup
      setTimeout(fetchConfig, 3000);
    }
  };

  const checkTermsAndSetup = async () => {
    try {
      const ts = await fetch('/api/terms_status');
      const td = await ts.json();
      if (td.terms_accepted === 0) {
        setShowTerms(true);
        return;
      }
      const ss = await fetch('/api/setup_status');
      const sd = await ss.json();
      setSetupStatus(sd);
      if (sd.setup_complete === 0 || !sd.has_valid_token || !sd.has_valid_channel || !sd.has_valid_volume) {
        setShowSetupModal(true);
      }
    } catch (e) { console.error("Onboarding check failed:", e); }
  };

  useEffect(() => {
    fetchDbs();
    fetchConfig();
    checkTermsAndSetup();
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/cli`);
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'stdout' || msg.type === 'stderr') {
        setQueue(prev => prev.map(item => item.id === msg.task_id ? { ...item, log: [...(item.log || []), msg.data], status: 'running' } : item));
      } else if (msg.type === 'exit') {
        setQueue(prev => prev.map(item => item.id === msg.task_id ? { ...item, status: msg.code === 0 ? 'completed' : 'failed' } : item));
        if (msg.code === 0) { fetchDbs(); fetchFiles(currentPath); }
      } else if (msg.type === 'prompt') {
        setPromptQueue(prev => [...prev, { taskId: msg.task_id, text: msg.prompt, isPassword: msg.is_password }]);
      }
    };
    setWs(socket);
    return () => socket.close();
  }, []);

  const fetchFiles = async (path = '.') => {
    if (!selectedDb) return;
    setLoadingLoadingFiles(true);
    try {
      const r = await fetch(`/api/listfiles?db=${selectedDb}&path=${encodeURIComponent(path)}`);
      const data = await r.json();
      if (data.error) {
        if (retryCountRef.current < maxRetries) {
          retryCountRef.current++;
          setIsRetrying(true);
          setTimeout(() => fetchFiles(path), 2000);
        } else {
          showToast(data.error, 'error');
          setLoadingLoadingFiles(false);
          setIsRetrying(false);
        }
      } else {
        setFiles(data.results || {});
        setCurrentPath(path);
        setLoadingLoadingFiles(false);
        setIsRetrying(false);
        retryCountRef.current = 0;
      }
    } catch (e) {
      setLoadingLoadingFiles(false);
      setIsRetrying(false);
    }
  };

  useEffect(() => { if (selectedDb) fetchFiles('.'); }, [selectedDb]);

  const runCmd = (args, label, type) => {
    const task_id = Math.random().toString(36).substring(7);
    setQueue(prev => [{ id: task_id, label, type, status: 'queued', log: [] }, ...prev]);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ action: 'run', task_id, args }));
    }
  };

  const handleAcceptTerms = async () => {
    try {
      await fetch('/api/accept_terms', { method: 'POST' });
      setShowTerms(false);
      setShowWelcomeVideo(true);
    } catch (e) { showToast("Failed to accept terms", "error"); }
  };

  const toggleSelection = (item) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => (i.itemid && i.itemid === item.itemid) || (i.displayName === item.displayName));
      if (exists) return prev.filter(i => (i.itemid ? i.itemid !== item.itemid : i.displayName !== item.displayName));
      return [...prev, item];
    });
  };

  const clearSelection = () => setSelectedItems([]);

  const navigateTo = (folderName) => {
    const newPath = currentPath === '.' ? folderName : `${currentPath}/${folderName}`;
    setHistory([...history, newPath]);
    fetchFiles(newPath);
    clearSelection();
  };

  const goBack = () => {
    if (history.length <= 1) return;
    const newHistory = history.slice(0, -1);
    const prevPath = newHistory[newHistory.length - 1];
    setHistory(newHistory);
    fetchFiles(prevPath);
    clearSelection();
  };

  const allVolumes = useMemo(() => [...new Set([...dbs, ...externalVolumes])], [dbs, externalVolumes]);

  const filteredFiles = useMemo(() => {
    const items = Object.values(files);
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(f => f.displayName.toLowerCase().includes(q));
  }, [files, searchQuery]);

  const handleFieldChange = async (path, val) => {
    const updated = { ...localConfig };
    let curr = updated;
    for (let i = 0; i < path.length - 1; i++) curr = curr[path[i]];
    const key = path[path.length - 1];
    const targetType = typeof curr[key];
    curr[key] = castValue(val, targetType);
    setLocalConfig(updated);
    try {
      await fetch('/api/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
    } catch (e) { showToast('Save failed', 'error'); }
  };

  const renderField = (key, value, fieldPath) => {
    if (typeof value === 'boolean') {
      const isChecked = localConfig[fieldPath[0]][key];
      return (
        <div key={key} className="flex items-center justify-between p-4 bg-[#0f1f3a]/30 rounded-2xl border border-[#1a3a5c]/50">
          <span className="text-sm text-gray-300 font-bold uppercase tracking-wider">{key.replace(/_/g, ' ')}</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={isChecked} onChange={e => handleFieldChange(fieldPath, e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-[#060d1a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-500 peer-checked:after:bg-[#3bb5ff] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3bb5ff]/20"></div>
          </label>
        </div>
      );
    }
    return (
      <div key={key} className="space-y-1.5 px-1">
        <label className="text-[10px] font-black text-[#3bb5ff] uppercase tracking-[0.2em] opacity-70 ml-1">{key.replace(/_/g, ' ')}</label>
        <input type="text" value={value ?? ''} onChange={e => handleFieldChange(fieldPath, e.target.value)} className="w-full bg-[#060d1a] border border-[#1a3a5c] focus:border-[#3bb5ff] rounded-xl px-3 py-3 text-sm text-gray-200 outline-none transition-colors" placeholder={`Enter ${key.replace(/_/g, ' ')}...`} />
      </div>
    );
  };

  const renderSection = (title, data, path) => (
    <div key={title} className="space-y-4 mb-8">
      <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] border-l-4 border-[#3bb5ff] pl-3 mb-6">{title}</h3>
      <div className="space-y-4">{Object.entries(data).map(([k, v]) => (typeof v === 'object' && v !== null && !Array.isArray(v)) ? renderSection(k, v, [...path, k]) : renderField(k, v, [...path, k]))}</div>
    </div>
  );

const TERMS_AND_CONDITIONS_MARKDOWN = `# VAULT OPUS — TERMS OF SERVICE & PRIVACY POLICY

**Version 1-R10 | Effective Date: 2026**

Welcome to VAULT OPUS, an open-source, self-hosted cloud storage system created by WeDu. By using this software, you agree to the following terms. If you do not agree, do not use the application.

## 1. Acceptance of Terms
By downloading, installing, accessing, or using VAULT OPUS in any form (Desktop Client, Mobile Web Interface, CLI, or Android Application), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and Privacy Policy in their entirety.

## 2. Nature of the Software
- **Open Source**: VAULT OPUS is released under the **MIT License**. You are free to use, modify, merge, publish, distribute, sublicense, and/or sell copies of this software, provided the original copyright notice and permission notice are included.
- **Self-Hosted**: VAULT OPUS runs entirely on your own infrastructure. There are no centralized servers operated by WeDu. All data processing, storage orchestration, and encryption happen locally on your machine.
- **No Accounts or Registration**: VAULT OPUS does not require you to create an account, provide personal information, or register with any service operated by WeDu.

## 3. Discord Integration & Third-Party Compliance
- **Discord as Storage Backend**: VAULT OPUS uses Discord's platform as a file storage backend by uploading encrypted file chunks to Discord channels via your personal Discord Bot Token. This is a core architectural choice of the software.
- **Your Responsibility**: You are solely and entirely responsible for ensuring that your use of VAULT OPUS complies with **Discord's Terms of Service** ([https://discord.com/terms](https://discord.com/terms)) and **Discord's Community Guidelines**. WeDu has no control over Discord's policies and is not responsible for any actions Discord may take against your account.
- **Risk of Account Action**: Discord may, at its sole discretion, suspend, terminate, or restrict your Discord account or bot if your usage violates their terms. This includes but is not limited to excessive API usage, storage abuse, or uploading prohibited content. WeDu bears no liability for any such actions taken by Discord.
- **Bot Token Security**: Your Discord Bot Token is stored locally in your \`config.json\` file. Never share this token with anyone. If compromised, regenerate it immediately via the Discord Developer Portal.

## 4. Data Privacy & No Data Collection
- **Zero Telemetry**: VAULT OPUS collects absolutely no usage data, analytics, telemetry, crash reports, or personal information. Nothing is transmitted to WeDu or any third party.
- **Local-Only Operation**: All configuration files (\`config.json\`), databases (\`.db\` volumes), encryption keys, and volume configs are stored exclusively on your local filesystem. WeDu never has access to any of your data.
- **No Network Calls to WeDu**: The software makes zero network requests to WeDu's servers. The only external network communication is between your machine and the Discord API, initiated entirely by your own Bot Token.

## 5. Encryption & Security
- **Encryption Architecture**: VAULT OPUS employs a two-layer encryption system: **Argon2id** (memory-hard key derivation) for seed normalization followed by **HKDF-SHA256** for final key derivation, producing **Fernet (AES-128-CBC + HMAC-SHA256)** encrypted data.
- **Per-Volume Encryption**: Each volume has its own unique cryptographic salt stored in a separate config file. Encryption keys are derived from your chosen seed combined with this volume-specific salt, ensuring complete isolation between volumes.
- **Your Keys, Your Responsibility**: WeDu does not store, manage, or have access to any of your encryption seeds, keys, or passwords. If you lose your encryption seed or volume configuration file, your data is irrecoverable. There is no recovery mechanism, no master key, and no backdoor.
- **No Warranty on Security**: While VAULT OPUS uses industry-standard cryptographic libraries (\`cryptography\`, \`argon2-cffi\`), the software is provided without warranty regarding the absolute security of your data. You use the encryption features at your own risk.

## 6. Volume Sharing & Packages
- **Volume Packages (.vov)**: VAULT OPUS allows you to export volumes as \`.vov\` package files for sharing with others. These packages contain your database and encryption configuration.
- **Password-Protected Packages (.e.vov)**: You may optionally protect shared packages with AES-256 encryption via password. Unprotected packages (.vov) expose your volume database and encryption config to anyone who receives the file.
- **Sharing Risks**: When you share a volume package, the recipient gains full access to the data within that volume, including the encryption keys needed to decrypt files. Only share volumes with trusted parties. WeDu is not responsible for any unauthorized access resulting from shared packages.

## 7. Data Loss & Liability
- **No Guarantee of Data Integrity**: VAULT OPUS is provided "AS IS" without warranty of any kind. WeDu makes no guarantees that your data will remain intact, accessible, or uncorrupted.
- **Causes of Data Loss May Include**:
- Discord API changes, outages, or account suspensions
- Corruption of local SQLite databases or volume config files
- Loss or misconfiguration of encryption seeds/keys
- Software bugs, hardware failures, or power loss during uploads
- Accidental deletion of volumes, chunks, or configuration files
- **No Recovery Service**: WeDu does not offer any data recovery service. You are solely responsible for maintaining backups of your databases, volume configs, and encryption seeds.
- **Limitation of Liability**: To the maximum extent permitted by law, WeDu and its contributors shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, loss of profits, or business interruption arising from the use of this software.

## 8. Prohibited Uses
You agree NOT to use VAULT OPUS to:
- Store, upload, distribute, or facilitate access to illegal content, including but not limited to child exploitation material, malware, ransomware, or stolen data
- Store or distribute copyrighted material without proper authorization from the rights holder
- Abuse Discord's infrastructure through excessive automated requests, rate limit circumvention, or storage exploitation beyond reasonable personal use
- Harass, threaten, or harm any individual or group
- Circumvent or attempt to circumvent any security measures of Discord or any third-party service
- Use the software for any purpose that violates applicable local, national, or international law

## 9. Software Updates & Changes
- **No Automatic Updates**: VAULT OPUS does not automatically update itself. You choose when and whether to update to newer versions.
- **Breaking Changes**: Future versions may introduce changes to database schemas, encryption methods, or file formats. While we strive for backward compatibility, it is not guaranteed. Always backup your data before updating.
- **Terms Updates**: We reserve the right to modify these Terms at any time. Updated terms will be included in new releases. Your continued use of the software after updating constitutes acceptance of revised terms.

## 10. Open Source License
This software is licensed under the **MIT License**:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## 11. Contact
- **GitHub**: [https://github.com/WeDu-official](https://github.com/WeDu-official)
- **Project**: VAULT OPUS (WeDu)

By clicking "I Accept the Terms and Conditions" you confirm that you have read, understood, and agree to all of the above.`;

const WELCOME_YOUTUBE_VIDEO_URL = "https://www.youtube.com/embed/i9rnTi9l2ww";

function parseInlineMarkdown(text) {
  const parts = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\)|https?:\/\/[^\s)]+)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const index = match.index;
    const matchedText = match[0];

    if (index > lastIndex) {
      parts.push(text.substring(lastIndex, index));
    }

    if (matchedText.startsWith('**') && matchedText.endsWith('**')) {
      parts.push(<strong key={index} className="font-extrabold text-white">{matchedText.slice(2, -2)}</strong>);
    } else if (matchedText.startsWith('`') && matchedText.endsWith('`')) {
      parts.push(<code key={index} className="bg-[#060d1a] border border-[#1a3a5c] rounded px-1.5 py-0.5 font-mono text-xs text-amber-400">{matchedText.slice(1, -1)}</code>);
    } else if (matchedText.startsWith('[') && matchedText.includes('](')) {
      const closingBracket = matchedText.indexOf(']');
      const label = matchedText.slice(1, closingBracket);
      const url = matchedText.slice(closingBracket + 2, -1);
      parts.push(<a key={index} href={url} target="_blank" rel="noopener noreferrer" className="text-[#3bb5ff] hover:underline font-bold">{label}</a>);
    } else if (matchedText.startsWith('http')) {
      // Handle bare URL, removing trailing punctuation like periods or commas
      const url = matchedText.replace(/[.,;]$/, '');
      parts.push(<a key={index} href={url} target="_blank" rel="noopener noreferrer" className="text-[#3bb5ff] hover:underline font-bold">{url}</a>);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function MiniMarkdown({ content }) {
  const lines = content.split('\n');
  return (
    <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-sans text-left">
      {lines.map((line, idx) => {
        if (line.startsWith('# ')) {
          return <h1 key={idx} className="text-xl font-black text-white mt-6 mb-3 border-b border-[#1a3a5c] pb-2 uppercase tracking-wide">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={idx} className="text-base font-bold text-[#3bb5ff] mt-5 mb-2 uppercase tracking-wider">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={idx} className="text-sm font-bold text-white mt-4 mb-2">{line.slice(4)}</h3>;
        }
        if (line.trim().startsWith('- ')) {
          const text = line.trim().slice(2);
          return (
            <div key={idx} className="flex items-start gap-2.5 my-1.5 pl-1">
              <span className="text-[#3bb5ff] mt-1.5 text-[8px]">•</span>
              <span className="text-gray-300 text-xs flex-1">{parseInlineMarkdown(text)}</span>
            </div>
          );
        }
        if (line.trim() === '') {
          return <div key={idx} className="h-1" />;
        }
        return <p key={idx} className="text-xs text-gray-400 font-medium">{parseInlineMarkdown(line)}</p>;
      })}
    </div>
  );
}

// ---------- Main App Component ----------
export default function App() {
  // State
  const [tab, setTab] = useState('explorer');
  const [dbs, setDbs] = useState([]);
  const [selectedDb, setSelectedDb] = useState(localStorage.getItem('mob_selectedDb') || '');
  const [tree, setTree] = useState(null);
  const [currentPath, setCurrentPath] = useState('.');
  const [currentVersion, setCurrentVersion] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [ws, setWs] = useState(null);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [queue, setQueue] = useState([]);
  const [config, setConfig] = useState(null);
  const [promptQueue, setPromptQueue] = useState([]);
  const [bottomSheet, setBottomSheet] = useState(null);
  const [modal, setModal] = useState(null);
  const [showCreateVolume, setShowCreateVolume] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [setupData, setSetupData] = useState({ token: '', channel_id: '', db_name: '' });
  const [setupStatus, setSetupStatus] = useState({ has_valid_token: false, has_valid_channel: false, has_valid_volume: false });
  const [newDbName, setNewDbName] = useState('');
  const [externalVolumes, setExternalVolumes] = useState(() => { const saved = localStorage.getItem('mob_externalVolumes'); return saved ? JSON.parse(saved) : []; });
  const [recentVolumes, setRecentVolumes] = useState(() => { const saved = localStorage.getItem('mob_recentVolumes'); return saved ? JSON.parse(saved) : []; });
  const [toast, setToast] = useState(null);
  const [passwordModal, setPasswordModal] = useState({ open: false, path: '', password: '', error: '' });
  const [showSharePasswordModal, setShowSharePasswordModal] = useState(false);
  const [dbToShare, setDbToShare] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [volumeError, setVolumeError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const retryCountRef = useRef(0);
  const maxRetries = 10;
  const retryInterval = 2000;

  const showToast = (msg, type = 'info') => setToast({ message: msg, type, key: Date.now() });

  // Android‑friendly WebSocket with fallback to 127.0.0.1:8000

  const doImport = async (path, password) => {
    if (passwordModal.error) {
      setPasswordModal(prev => ({ ...prev, error: '' }));
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    try {
      const body = { vov_path: path };
      if (password) body.password = password;
      const res = await fetch('/api/dbs/import', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Import failed');
      }
      showToast('Imported successfully', 'success');
      setPasswordModal({ open: false, path: '', password: '', error: '' });
      setModal(null);
      fetchDbs();
    } catch (error) {
      if (password !== null && error.message && (error.message.toLowerCase().includes('password') || error.message.toLowerCase().includes('incorrect') || error.message.toLowerCase().includes('mac'))) {
        setPasswordModal(prev => ({ ...prev, error: 'Incorrect password. Try again.', password: '' }));
      } else {
        setPasswordModal({ open: false, path: '', password: '', error: '' });
        showToast('Import failed: ' + error.message, 'error');
      }
    }
  };


  const executeShare = async (password = null) => {
    setShowSharePasswordModal(false);
    try {
      const body = { db_name: dbToShare };
      if (password) body.password = password;
      const res = await fetch('/api/dbs/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Failed to package volume');
      }
      const data = await res.json();
      const lockIcon = password ? '🔒 ' : '';
      setModal({
        title: password ? '🔒 Volume Packaged' : 'Volume Packaged',
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-xl">
              <p className="text-sm text-green-400 font-bold">{lockIcon}📦 Packaged Successfully!</p>
              <p className="text-xs text-gray-300 mt-2">
                Volume <span className="text-white font-mono">{dbToShare}</span> packaged successfully!<br />
                Package: <span className="text-white font-mono">{data.filename}</span><br />
                Stored in <span className="text-white font-mono">src/SHARABLES</span> folder.
                {password && <span className="block mt-1 text-amber-300">This package is password-protected.</span>}
              </p>
            </div>
            <button onClick={() => { fetch('/api/dbs/open_sharables', { method: 'POST' }); setModal(null); }} className="w-full py-3 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-xl font-bold flex items-center justify-center gap-2 btn-touch">{Ico.share} Open src/SHARABLES Folder</button>
            <button onClick={() => setModal(null)} className="w-full py-3 bg-[#0f1f3a] text-gray-300 rounded-xl text-sm btn-touch">Close</button>
          </div>
        ))}
        <button onClick={() => onConfirm(passwords)} className="w-full py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-2xl font-black uppercase tracking-widest text-xs mt-4 btn-touch">Confirm Passwords</button>
      </div>
    );
  };

  const connectWS = () => {
    if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    let host = window.location.host;
    // Android‑friendly fallback: if we're on dev server (port 5173) or no port (file:/// or localhost), use the backend directly
    if (window.location.port === '5173' || !host.includes(':')) host = '127.0.0.1:8000';
    setConnectionStatus('connecting');
    const socket = new WebSocket(`${proto}//${host}/ws/cli`);

    socket.onopen = () => {
      setWs(socket);
      setConnectionStatus('connected');
      reconnectAttemptsRef.current = 0;
      setTerminalOutput(p => p + '\n[Connected to VAULT OPUS CLI]\n');
      // Fetch initial data once connected
      fetchDbs(); fetchConfig(); fetchRecentVolumes(); fetchSetupStatus(); fetchTermsStatus();

      // Fix: If a volume is pre-selected, try to load its files once connected
      if (localStorage.getItem('mob_selectedDb')) {
        setTimeout(() => fetchFiles('.', null), 500);
      }
    };

    socket.onmessage = e => {
      const msg = JSON.parse(e.data);
      const tid = msg.task_id;
      const line = msg.data || '';
      if (msg.type === 'stdout' || msg.type === 'stderr') {
        setTerminalOutput(p => p + line);

        // Detect type-mismatch fallback sentinel and show a modal dialog
        const dialogMatch = line.match(/\[DIALOG:TYPE_MISMATCH\]([^|]+)\|([^|]+)\|(.+)/);
        if (dialogMatch) {
          const [, localName, targetName, fallbackNickname] = dialogMatch;
          setModal({
            title: '⚠️ Type Mismatch — Converted to New Upload',
            content: (
              <div className="space-y-4">
                <p className="text-sm text-amber-300 leading-relaxed">
                  The upload for <span className="font-bold text-white">"{localName}"</span> could not be saved as a new version of <span className="font-bold text-white">"{targetName}"</span> because one is a file and the other is a folder.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  It has been automatically re-submitted as a <span className="font-bold text-white">NEW UPLOAD</span> with the auto-generated name:
                </p>
                <div className="p-3 bg-[#060d1a] border border-amber-500/30 rounded-xl font-mono text-xs text-amber-300 break-all">
                  {fallbackNickname}
                </div>
              </div>
            ),
            onClose: () => setModal(null)
          });
        }

        const progressMatch = line.match(/Overall.*Progress.*\((\d+)%\)/i) || line.match(/Overall:.*\((\d+)%\)/i);
        setQueue(q => q.map(i => {
          if (i.id !== tid) return i;
          if (i.status === 'completed' || i.status === 'failed') return i;
          if (line.includes('[OP_SUCCESS]')) return { ...i, status: 'completed', progress: 100 };
          if (line.includes('[OP_FAILURE]')) return { ...i, status: 'failed' };
          if (progressMatch) return { ...i, status: 'running', progress: parseInt(progressMatch[1], 10) };
          return i;
        }));
      } else if (msg.type === 'status') {
        setQueue(q => q.map(i => i.id === tid ? { ...i, status: line.includes('Queued') ? 'queued' : 'running' } : i));
      } else if (msg.type === 'prompt') {
        setPromptQueue(prev => [...prev, { text: msg.prompt, isPassword: msg.is_password, taskId: tid }]);
      } else if (msg.type === 'exit') {
        setTerminalOutput(p => p + `\n[Process ${tid} exited with code: ${msg.code}]\n`);
        setQueue(q => q.map(i => i.id === tid ? { ...i, status: msg.code === 0 ? 'completed' : 'failed', progress: msg.code === 0 ? 100 : i.progress } : i));
        if (msg.code === 0) { showToast('Operation completed', 'success'); setTimeout(() => { fetchFiles(currentPath); }, 300); }
        else showToast('Operation failed', 'error');
      }
    };

    socket.onclose = () => {
      setWs(null);
      setConnectionStatus('disconnected');
      setTerminalOutput(p => p + '\n[Disconnected from VAULT OPUS CLI]\n');
      if (reconnectAttemptsRef.current < 10) {
        reconnectAttemptsRef.current++;
        reconnectTimeoutRef.current = setTimeout(connectWS, 2000);
      }
    };

    socket.onerror = () => socket.close();
  };

  useEffect(() => {
    connectWS();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (ws) ws.close();
    };
  }, []);

  const sendWS = (action, args, task_id) => { if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ action, args, task_id })); };
  const addQueue = (name, type) => { const id = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`; setQueue(q => [...q, { id, name, status: 'queued', progress: 0 }]); return id; };
  const runCmd = (args, name, type) => { const id = addQueue(name, type); sendWS('run', args, id); };

  // Data fetching
  const fetchDbs = async () => {
    try {
      const r = await fetch('/api/dbs');
      const data = await r.json();
      const availableDbs = data.dbs || [];
      const all = [...availableDbs];
      externalVolumes.forEach(ext => { if (!all.includes(ext)) all.push(ext); });
      setDbs(all);
    } catch (e) { showToast('Failed to fetch volumes', 'error'); }
  };
  const fetchConfig = async () => {
    try {
      const r = await fetch('/api/config');
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      setConfig(data);
    } catch (e) {
      console.error('Failed to fetch config:', e);
    }
  };
  const fetchRecentVolumes = async () => {
    try {
      const r = await fetch('/api/recent_volumes');
      const data = await r.json();
      const recent = data.recent || [];
      setRecentVolumes(recent);
      localStorage.setItem('mob_recentVolumes', JSON.stringify(recent));
    } catch (e) { console.error('Failed to fetch recent volumes:', e); }
  };
  const updateRecentVolumes = (updater) => {
    setRecentVolumes(prev => {
      const nextRecent = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem('mob_recentVolumes', JSON.stringify(nextRecent));
      fetch('/api/recent_volumes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ recent: nextRecent }) }).catch(err => console.error('Failed to save recent volumes:', err));
      return nextRecent;
    });
  };
  const fetchFiles = async (path, version = currentVersion) => {
    if (!selectedDb) return;
    setVolumeError(null);
    try {
      // Normalize db name: preserve path if absolute, ensure .db extension
      const isAbsolute = selectedDb.startsWith('/') || selectedDb.includes(':\\');
      const dbParam = isAbsolute
        ? (selectedDb.endsWith('.db') ? selectedDb : `${selectedDb}.db`)
        : selectedDb.split(/[\/\\]/).pop().endsWith('.db') ? selectedDb.split(/[\/\\]/).pop() : `${selectedDb.split(/[\/\\]/).pop()}.db`;

      let url = `/api/listfiles?db=${encodeURIComponent(dbParam)}&path=${encodeURIComponent(path)}`;
      if (version) url += `&version=${encodeURIComponent(version)}`;
      const r = await fetch(url);
      const data = await r.json();

      if (!r.ok || data.error) {
        // If it's a "not found" error, it's likely a real issue, not a race condition
        if (path !== '.' && (data.error?.toLowerCase().includes('not found') || !r.ok)) {
          setCurrentPath('.');
          fetchFiles('.');
          return;
        }

        // Handle possible race condition on root path
        if (path === '.') {
          try {
            const checkR = await fetch(`/api/dbs`);
            const checkData = await checkR.json();
            const availableDbs = checkData.dbs || [];

            const normalizedSelected = dbParam.split(/[\/\\]/).pop();
            const normalizedAvailable = availableDbs.map(db => db.split(/[\/\\]/).pop());
            const isExternal = externalVolumes.some(ext => {
              const extBase = ext.split(/[\/\\]/).pop();
              return ext === dbParam || extBase === normalizedSelected;
            });

            if (!normalizedAvailable.includes(normalizedSelected) && !isExternal) {
              setVolumeError("This volume doesn't exist");
              setTree(null);
              retryCountRef.current = 0; // Don't retry if it definitely doesn't exist
              return;
            }
          } catch (_) { }

          // If we reach here, it might just be the server starting up
          if (retryCountRef.current < maxRetries) {
            retryCountRef.current++;
            setIsRetrying(true);
            setTimeout(() => fetchFiles(path, version), retryInterval);
            return;
          }
        }

        setVolumeError(data.error || "Error accessing volume");
        setTree(null);
        setIsRetrying(false);
        retryCountRef.current = 0;
        return;
      }
      setTree(data);
      setIsRetrying(false);
      retryCountRef.current = 0;
    } catch (e) {
      if (retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        setIsRetrying(true);
        setTimeout(() => fetchFiles(path, version), retryInterval);
      } else {
        setVolumeError("Could not connect to volume");
        setTree(null);
        setIsRetrying(false);
        retryCountRef.current = 0;
      }
    }
  };
  const fetchSetupStatus = async () => {
    try {
      const r = await fetch('/api/setup_status');
      const data = await r.json();
      setSetupStatus({ has_valid_token: data.has_valid_token, has_valid_channel: data.has_valid_channel, has_valid_volume: data.has_valid_volume });
      if (data.setup_complete === 0) setShowSetupModal(true);
    } catch (e) { }
  };


  const fetchTermsStatus = async () => {
    try {
      const r = await fetch('/api/terms_status');
      const data = await r.json();
      if (data.accepted === false) {
        setShowTerms(true);
      }
    } catch (e) {
      console.error('Failed to fetch terms status', e);
    }
  };

  const handleAcceptTerms = async () => {
    try {
      const res = await fetch('/api/accept_terms', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to update terms acceptance');
      setShowTerms(false);
      setShowWelcomeVideo(true);
    } catch (e) {
      showToast('Error saving terms acceptance. Please try again.', 'error');
    }
  };

  useEffect(() => { fetchDbs(); fetchConfig(); fetchRecentVolumes(); fetchSetupStatus(); fetchTermsStatus(); }, []);
  useEffect(() => {
    if (selectedDb) {
      // Normalize: preserve path if absolute, ensure .db extension
      const isAbsolute = selectedDb.startsWith('/') || selectedDb.includes(':\\');
      const dbWithExt = isAbsolute
        ? (selectedDb.endsWith('.db') ? selectedDb : `${selectedDb}.db`)
        : (selectedDb.split(/[\/\\]/).pop().endsWith('.db') ? selectedDb.split(/[\/\\]/).pop() : `${selectedDb.split(/[\/\\]/).pop()}.db`);

      if (dbWithExt !== selectedDb) {
        setSelectedDb(dbWithExt);
        return;
      }

      localStorage.setItem('mob_selectedDb', dbWithExt);
      updateRecentVolumes(prev => [dbWithExt, ...prev.filter(db => db !== dbWithExt)].slice(0, 10));
      setCurrentVersion(null);
      setCurrentPath('.');
      const load = async () => {
        if (!singleItem) return;
        const itid = singleItem.itemid;
        if (!itid) return;
        try {
          const r = await fetch(`/api/listfiles?db=${selectedDb}&itemid=${itid}`);
          const vd = await r.json();
          const vers = [];
          if (vd.results) Object.values(vd.results).forEach(item => { if (item.version && !vers.includes(item.version)) vers.push(item.version); });
          setVersions(vers);
        } catch (e) { }
      };
      load();
    }, [singleItem]);
    return (
      <div className="space-y-6">
        <div className="flex p-1 bg-[#060d1a] rounded-xl border border-[#1a3a5c]">
          {['soft', 'hard'].map(t => (
            <button key={t} onClick={() => setOpts({ ...opts, type: t })} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${opts.type === t ? 'bg-red-500 text-white' : 'text-gray-500'}`}>{t} Delete</button>
          ))}
        </div>
        {singleItem && versions.length > 1 && (
          <div className="space-y-4">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Deletion Scope:</p>
            {['latest', 'all', 'specific', 'range'].map(s => (
              <label key={s} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${opts.scope === s ? 'bg-[#3bb5ff]/10 border-[#3bb5ff]' : 'bg-[#0f1f3a]/30 border-[#1a3a5c]'}`}>
                <input type="radio" checked={opts.scope === s} onChange={() => setOpts({ ...opts, scope: s })} className="hidden" />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${opts.scope === s ? 'border-[#3bb5ff]' : 'border-gray-600'}`}>{opts.scope === s && <div className="w-2 h-2 bg-[#3bb5ff] rounded-full" />}</div>
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{s}</span>
              </label>
            ))}
          </div>
        )}
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 bg-[#0f1f3a] text-gray-400 rounded-xl font-bold uppercase tracking-widest text-[10px]">Cancel</button>
          <button onClick={() => onConfirm(opts)} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px]">Delete</button>
        </div>
      </div>
    );
  };

  const DownloadVersionModalContent = ({ itemPath, item, onDownload }) => {
    const [scope, setScope] = useState('latest');
    const [version, setVersion] = useState('');
    const [startVersion, setStartVersion] = useState('');
    const [endVersion, setEndVersion] = useState('');
    const [versions, setVersions] = useState([]);
    useEffect(() => {
      const load = async () => {
        try {
          const r = await fetch(`/api/listfiles?db=${selectedDb}&path=${encodeURIComponent(itemPath)}`);
          const pathData = await r.json();
          let itemid = null;
          if (pathData.results) { const keys = Object.keys(pathData.results); if (keys.length) itemid = keys[0]; }
          if (!itemid) return;
          const vr = await fetch(`/api/listfiles?db=${selectedDb}&itemid=${itemid}`);
          const vd = await vr.json();
          const vers = [];
          if (vd.results) { Object.values(vd.results).forEach(i => { if (i.version) vers.push(i.version); }); }
          setVersions(vers);
        } catch (e) { }
      };
      load();
    }, [itemPath]);

    const handleConfirm = () => {
      const args = ['download', itemPath, '-db', selectedDb, '--download_folder', localStorage.getItem('VAULT_OPUS_download_folder') || '/storage/emulated/0/Download'];
      if (scope === 'specific' && version) args.push('--version', version);
      else if (scope === 'range' && startVersion && endVersion) args.push('--st_version', startVersion, '--en_version', endVersion);
      else if (scope === 'all') args.push('--all_versions', 'yes');
      onDownload(args);
    };

    return (
      <div className="space-y-4">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Select versions to download:</p>
        <div className="space-y-2">
          {['latest', 'all', 'specific', 'range'].map(s => (
            <label key={s} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${scope === s ? 'bg-[#3bb5ff]/10 border-[#3bb5ff]' : 'bg-[#0f1f3a]/30 border-[#1a3a5c]'}`}>
              <input type="radio" checked={scope === s} onChange={() => setScope(s)} className="hidden" />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${scope === s ? 'border-[#3bb5ff]' : 'border-gray-600'}`}>{scope === s && <div className="w-2 h-2 bg-[#3bb5ff] rounded-full" />}</div>
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{s}</span>
            </label>
          ))}
        </div>
        {scope === 'specific' && (
          <select value={version} onChange={e => setVersion(e.target.value)} className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm text-white">
            <option value="">Select Version</option>
            {versions.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        )}
        {scope === 'range' && (
          <div className="flex gap-2">
            <select value={startVersion} onChange={e => setStartVersion(e.target.value)} className="flex-1 bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm text-white">
              <option value="">Start</option>
              {versions.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
            <select value={endVersion} onChange={e => setEndVersion(e.target.value)} className="flex-1 bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm text-white">
              <option value="">End</option>
              {versions.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        )}
        <button onClick={handleConfirm} className="w-full py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] btn-touch">Start Download</button>
      </div>
    );
  };

  const SeeVersionsModalContent = ({ itemPath, onClose }) => {
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const load = async () => {
        try {
          const r = await fetch(`/api/listfiles?db=${selectedDb}&path=${encodeURIComponent(itemPath)}`);
          const d = await r.json();
          let itemid = null;
          if (d.results) { const keys = Object.keys(d.results); if (keys.length) itemid = keys[0]; }
          if (!itemid) return;
          const vr = await fetch(`/api/listfiles?db=${selectedDb}&itemid=${itemid}`);
          const vd = await vr.json();
          const vers = [];
          if (vd.results) { Object.values(vd.results).forEach(i => { if (i.version) vers.push(i.version); }); }
          setVersions(Object.values(vd.results || {}));
        } catch (e) { }
        setLoading(false);
      };
      load();
    }, [itemPath]);
    return (
      <div className="space-y-3">
        {loading ? <div className="text-center py-8 text-gray-500 text-xs animate-pulse font-bold tracking-widest uppercase">Fetching...</div> : versions.map((v, i) => (
          <div key={i} className="p-4 bg-[#0f1f3a]/50 border border-[#1a3a5c] rounded-2xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-[#3bb5ff] uppercase tracking-widest">Version {v.version}</span>
              <span className="text-[9px] text-gray-500 font-bold">{new Date(v.upload_timestamp).toLocaleString()}</span>
            </div>
            <div className="text-[10px] text-gray-400 font-mono break-all opacity-60">ID: {v.itemid}</div>
          </div>
        ))}
      </div>
    );
  };

  const NewVersionUploadModalContent = ({ targetItemPath, onUpload }) => {
    const [localPath, setLocalPath] = useState('');
    const [loading, setLoading] = useState(false);
    const [versions, setVersions] = useState([]);

    useEffect(() => {
      const load = async () => {
        try {
          const r = await fetch(`/api/listfiles?db=${selectedDb}&path=${encodeURIComponent(targetItemPath)}`);
          const d = await r.json();
          let itemid = null;
          if (d.results) { const keys = Object.keys(d.results); if (keys.length) itemid = keys[0]; }
          if (!itemid) return;
          const vr = await fetch(`/api/listfiles?db=${selectedDb}&itemid=${itemid}`);
          const vd = await vr.json();
          const vers = [];
          if (vd.results) { Object.values(vd.results).forEach(i => { if (i.version) vers.push(i.version); }); }
          setVersions(vers);
        } catch (e) { }
      };
      load();
    }, [targetItemPath]);

    const handleStartUpload = () => {
      if (!uploadPath) { showToast('Select a path to upload', 'error'); return; }
      if (encryption === 'not_automatic' && !minimize) {
        if (!password && !randomSeed) { showToast('Provide password or select Random', 'error'); return; }
        if (randomSeed) {
          const pass = generateRandomPassword();
          setGeneratedPassword(pass);
          setShowPasswordModal(true);
          return;
        }
      }
      proceedWithUpload(password);
    };
    const proceedWithUpload = (finalPassword) => {
      const enc = minimize && encryption === 'not_automatic' ? 'automatic' : encryption;
      const args = [
        'upload', uploadPath, '-db', selectedDb,
        '--encryption_mode', enc,
        '--target_item_path', targetItemPath, '--upload_mode', 'new_version'
      ];
      if (config?.discord?.channel_id) args.push('-c', String(config.discord.channel_id));
      if (enc === 'not_automatic' && finalPassword) args.push('--password_seed', finalPassword);
      if (uploadName) args.push('--upload_name', uploadName);
      if (newVersionString) args.push('--new_version_string', newVersionString);
      if (strictnessMode !== 'NA') args.push('--strictness_mode', strictnessMode);
      if (chunkSizeMb) args.push('--chunk_size_mb', chunkSizeMb);
      if (minimize) args.push('--minimize', 'yes');
      if (!nameCheck) args.push('--no_name_check');
      if (additionMode) { args.push('--addition'); if (sourceVersion) args.push('--source_version', sourceVersion); }
      args.push('--save_hash', encryption === 'not_automatic' && zeroKnowledge ? 'False' : 'True');
      runCmd(args, uploadPath.split(/[/\\]/).pop(), 'upload');
      setModal(null);
    };

    return (
      <div className="space-y-4">
        <div className="p-4 bg-[#3bb5ff]/5 border border-[#3bb5ff]/20 rounded-2xl">
          <p className="text-[10px] text-[#3bb5ff] font-black uppercase tracking-widest mb-1">Target Item</p>
          <p className="text-sm font-bold text-white truncate">{targetItemPath.split('/').pop()}</p>
          <p className="text-[9px] text-gray-500 mt-1 uppercase font-bold">Currently has {versions.length} version(s)</p>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">New File/Folder Source:</label>
          <div className="flex gap-2">
            <input type="text" value={localPath} onChange={e => setLocalPath(e.target.value)} placeholder="Path on device..." className="flex-1 bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-4 py-3 text-sm text-white focus:border-[#3bb5ff] outline-none" />
            <button onClick={() => setModal({ title: 'Pick Source', content: <RemoteFolderPicker showFiles onSelect={p => { setLocalPath(p); setModal({ title: 'New Version', content: <NewVersionUploadModalContent targetItemPath={targetItemPath} onUpload={onUpload} /> }); }} onCancel={() => setModal({ title: 'New Version', content: <NewVersionUploadModalContent targetItemPath={targetItemPath} onUpload={onUpload} /> })} /> })} className="p-3 bg-[#0f1f3a] text-[#3bb5ff] rounded-xl border border-[#1a3a5c] btn-touch">{Ico.folderOpen}</button>
          </div>
        </div>
        <button onClick={handleUpload} disabled={!localPath} className="w-full py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] btn-touch disabled:opacity-30">Upload New Version</button>
      </div>
    );
  };

  const ModifyModalContent = ({ type, items, item, onConfirm }) => {
    const currentItems = items || (item ? [item] : []);
    const [destination, setDestination] = useState('.');
    const [newName, setNewName] = useState(currentItems.length === 1 ? currentItems[0].displayName : '');
    const [copyMode, setCopyMode] = useState(false);
    const [nameMode, setNameMode] = useState('D');

    const handleConfirm = () => {
      if (type === 'move') {
        onConfirm({
          type: 'move',
          items: currentItems,
          dst: destination,
          copyMode,
          nameCheck,
          dstIdBased: false
        });
      } else {
        onConfirm({
          type: 'rename',
          item: currentItems[0],
          newName,
          nameMode,
          nameCheck,
          idBased: !!currentItems[0].itemid
        });
      }
    };

    return (
      <div className="space-y-4">
        <div className="bg-[#060d1a] p-3 rounded-lg border border-[#1a3a5c]">
          <p className="text-xs text-gray-500">{currentItems.length > 1 ? `Source Items (${currentItems.length})` : 'Source:'}</p>
          <p className="text-sm text-white truncate">
            {currentItems.length > 1 ? `${currentItems.length} items selected` : currentItems[0].displayName}
          </p>
        </div>

        {type === 'rename' ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">New Name:</label>
              <input autoFocus type="text" value={newName} onChange={e => setNewName(e.target.value)} className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-4 py-3 text-sm text-white focus:border-[#3bb5ff] outline-none" />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Rename Mode:</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'D', label: 'Display Only' },
                  { id: 'N', label: 'Internal Only' },
                  { id: 'B', label: 'Both' },
                  { id: 'A', label: 'Smart Auto' }
                ].map(m => (
                  <button key={m.id} onClick={() => setNameMode(m.id)} className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${nameMode === m.id ? 'bg-[#3bb5ff]/20 border-[#3bb5ff] text-[#3bb5ff]' : 'bg-[#0f1f3a]/50 border-[#1a3a5c] text-gray-500'}`}>{m.label}</button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2"><input type="checkbox" checked={nameCheck} onChange={e => setNameCheck(e.target.checked)} className="accent-[#3bb5ff]" /><span className="text-sm">Name Check</span></label>
          </>
        )}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#1a3a5c]">
          <button onClick={() => onConfirm(null)} className="px-4 py-2 text-sm text-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="px-6 py-2 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-lg font-bold">Confirm {type}</button>
        </div>
      </div>
    );
  };

  const MakeFolderModalContent = () => {
    const [folderName, setFolderName] = useState('');
    const [parent, setParent] = useState(currentPath);
    const [showPicker, setShowPicker] = useState(false);
    if (showPicker) return <ArchiveFolderPicker selectedDb={selectedDb} onSelect={p => { setParent(p); setShowPicker(false); }} onCancel={() => setShowPicker(false)} initialPath={parent} />;
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <input type="text" value={parent} onChange={e => setParent(e.target.value)} className="flex-1 bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm" />
          <button onClick={() => setShowPicker(true)} className="px-4 py-3 bg-[#0f1f3a] border border-[#1a3a5c] rounded-xl text-[#3bb5ff]">Browse</button>
        </div>
        <input type="text" value={folderName} onChange={e => setFolderName(e.target.value)} placeholder="Folder name" maxLength={60} className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm" />
        <button onClick={async () => {
          if (!folderName.trim()) return;
          try {
            await fetch('/api/folders/make', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ db_name: selectedDb, folder_name: folderName.trim(), parent_path: parent || '.', id_based: false }) });
            showToast('Folder created', 'success');
            setModal(null);
            fetchFiles(currentPath);
          } catch (e) { showToast(e.message, 'error'); }
        }} className="w-full py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-2xl font-bold">Create</button>
      </div>
    );
  };

  const UploadForm = () => {
    const [localPaths, setLocalPaths] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [encryption, setEncryption] = useState('automatic');
    const [password, setPassword] = useState('');
    const [randomSeed, setRandomSeed] = useState(false);
    const [zeroKnowledge, setZeroKnowledge] = useState(false);
    const [uploadName, setUploadName] = useState('');
    const [newVersionString, setNewVersionString] = useState('');
    const [strictness, setStrictness] = useState('NA');
    const [chunkSize, setChunkSize] = useState('');
    const [minimize, setMinimize] = useState(false);
    const [nameCheck, setNameCheck] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const genPass = () => {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
      return Array.from(crypto.getRandomValues(new Uint32Array(24))).map(x => chars[x % chars.length]).join('');
    };

    const startUpload = () => {
      if (localPaths.length === 0) { showToast('Select at least one file/folder', 'error'); return; }
      let finalPassword = password;
      if (encryption === 'not_automatic' && !minimize) {
        if (!password && !randomSeed) { showToast('Provide password or select Random', 'error'); return; }
      }
      if (encryption === 'not_automatic' && randomSeed && !showPassword) {
        const p = genPass();
        setPassword(p);
        setShowPassword(true);
        return;
      }
      localPaths.forEach(path => {
        const enc = minimize && encryption === 'not_automatic' ? 'automatic' : encryption;
        const args = ['upload', path, '-db', selectedDb, '--encryption_mode', enc];
        if (config?.discord?.channel_id) args.push('-c', String(config.discord.channel_id));
        if (enc === 'not_automatic' && finalPassword) args.push('--password_seed', finalPassword);
        if (uploadName) args.push('--upload_name', uploadName);
        if (newVersionString) args.push('--new_version_string', newVersionString);
        if (strictness !== 'NA') args.push('--strictness_mode', strictness);
        if (chunkSize) args.push('--chunk_size_mb', chunkSize);
        if (minimize) args.push('--minimize', 'yes');
        if (!nameCheck) args.push('--no_name_check');
        args.push('--save_hash', encryption === 'not_automatic' && zeroKnowledge ? 'False' : 'True');
        runCmd(args, path.split(/[/\\]/).pop(), 'upload');
      });
      setBottomSheet(null);
      showToast(`${localPaths.length} upload(s) queued`, 'success');
    };

    if (showPicker) return <RemoteFolderPicker initialPath="" showFiles multiSelect onSelect={p => { setLocalPaths(p); if (p.length > 1) setUploadName(''); setShowPicker(false); }} onCancel={() => setShowPicker(false)} />;
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm text-gray-400 truncate">{localPaths.length ? localPaths.map(p => p.split(/[/\\]/).pop()).join(', ') : 'No files selected'}</div>
          <button onClick={() => setShowPicker(true)} className="px-4 py-3 bg-[#0f1f3a] border border-[#1a3a5c] rounded-xl text-[#3bb5ff] btn-touch">Browse</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-gray-500 uppercase">Encryption</label>
            <select value={encryption} onChange={e => setEncryption(e.target.value)} disabled={minimize} className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm">
              <option value="automatic">Automatic</option>
              <option value="off">Off</option>
              <option value="not_automatic">Password</option>
            </select>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Destination:</label>
              <div className="flex gap-2">
                <div className="flex-1 bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-4 py-3 text-sm text-white truncate opacity-80">{destination === '.' ? 'Root' : destination}</div>
                <button onClick={() => setModal({ title: 'Pick Destination', content: <ArchiveFolderPicker db={selectedDb} onSelect={p => { setDestination(p); setModal({ title: 'Move / Copy', content: <ModifyModalContent type={type} item={item} onConfirm={onConfirm} /> }); }} onCancel={() => setModal({ title: 'Move / Copy', content: <ModifyModalContent type={type} item={item} onConfirm={onConfirm} /> })} /> })} className="p-3 bg-[#0f1f3a] text-[#3bb5ff] rounded-xl border border-[#1a3a5c] btn-touch">{Ico.folderOpen}</button>
              </div>
            </div>
            <label className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${copyMode ? 'bg-[#3bb5ff]/10 border-[#3bb5ff]' : 'bg-[#0f1f3a]/30 border-[#1a3a5c]'}`}>
              <input type="checkbox" checked={copyMode} onChange={e => setCopyMode(e.target.checked)} className="hidden" />
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${copyMode ? 'bg-[#3bb5ff] border-[#3bb5ff]' : 'border-gray-600'}`}>{copyMode && <div className="w-2 h-2 bg-[#0a1628] rounded-full" />}</div>
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Copy instead of Move</span>
            </label>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={() => onConfirm(null)} className="flex-1 py-4 bg-[#0f1f3a] text-gray-400 rounded-2xl font-bold uppercase tracking-widest text-[10px]">Cancel</button>
          <button onClick={handleConfirm} className="flex-1 py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">Confirm</button>
        </div>
        <input type="number" step="0.1" value={chunkSize} onChange={e => setChunkSize(e.target.value)} placeholder="Chunk size MB (auto)" className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm" />
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" checked={nameCheck} onChange={e => setNameCheck(e.target.checked)} className="accent-[#3bb5ff]" /><span className="text-xs">Name Check</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={minimize} onChange={e => setMinimize(e.target.checked)} className="accent-[#3bb5ff]" /><span className="text-xs">Minimize</span></label>
          {encryption === 'not_automatic' && <label className="flex items-center gap-2"><input type="checkbox" checked={zeroKnowledge} onChange={e => setZeroKnowledge(e.target.checked)} disabled={minimize} className="accent-[#3bb5ff]" /><span className="text-xs">Zero‑Knowledge</span></label>}
        </div>

        {!selectedDb && (
          <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-xl flex items-center gap-2">
            <span className="text-red-400">{Ico.alert}</span>
            <p className="text-[10px] text-red-300 font-bold uppercase">No Volume Selected! Go to "Volumes" tab and open one first.</p>
          </div>
        )}

        <button onClick={startUpload} disabled={localPaths.length === 0 || !selectedDb} className="w-full py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-2xl font-bold btn-touch disabled:opacity-40">Queue Upload</button>
      </div>
    );
  };

  const PasswordPromptModalContent = ({ items: pwdItems, onConfirm }) => {
    const [passwords, setPasswords] = useState({});

    const groupedItems = pwdItems.reduce((acc, item) => {
      const key = item.hash || item.id;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    const handleChange = (groupId, val) => {
      setPasswords(prev => {
        const next = { ...prev };
        groupedItems[groupId].forEach(item => {
          next[item.id] = val;
        });
        return next;
      });
    };

    return (
      <div className="space-y-4">
        {Object.entries(groupedItems).map(([groupId, itemsInGroup]) => (
          <div key={groupId} className="bg-[#0a1628] rounded-xl p-3 border border-[#1a3a5c]">
            <div className="max-h-24 overflow-y-auto mb-2 space-y-1">
              {itemsInGroup.map(item => (
                <div key={item.id} className="text-xs text-gray-400 truncate">{item.name}</div>
              ))}
            </div>
            <input type="password" placeholder="Enter password..." onChange={e => handleChange(groupId, e.target.value)} className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#3bb5ff]" />
          </div>
        ))}
        <button onClick={() => onConfirm(passwords)} className="w-full py-3 bg-[#3bb5ff] text-[#060d1a] rounded-xl font-bold">Download</button>
      </div>
    );
  };

  const OpenVolumeModalContent = () => {
    const [viewMode, setViewMode] = useState('browse');
    const [currentPath, setCurrentPath] = useState('');
    const [items, setItems] = useState([]);
    const [selectedPaths, setSelectedPaths] = useState([]);
    const [loading, setLoading] = useState(false);

    const load = async () => {
      setLoading(true);
      try {
        if (viewMode === 'databases') {
          const r = await fetch('/api/dbs');
          const data = await r.json();
          setItems((data.dbs || []).map(db => ({ name: db, path: db, is_dir: false, is_db: true })));
          setCurrentPath('DATABASES folder');
        } else {
          const r = await fetch(`/api/fs/browse?path=${encodeURIComponent(currentPath)}`);
          const data = await r.json();
          setCurrentPath(data.current_path);
          setItems(data.items.map(i => ({ ...i, is_db: i.name.toLowerCase().endsWith('.db'), is_vov: i.name.toLowerCase().endsWith('.vov') })));
        }
      } catch (e) { showToast('Failed to load', 'error'); }
      setLoading(false);
    };
    useEffect(() => { load(); }, [viewMode, currentPath]);

    const handleImport = async (path) => {
      try {
        await fetch('/api/dbs/import', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ vov_path: path }) });
        showToast('Imported successfully', 'success');
        setModal(null);
        fetchDbs();
      } catch (e) { showToast(e.message, 'error'); }
    };

    const toggleSelect = (path) => setSelectedPaths(prev => prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]);

    return (
      <div className="space-y-4">
        <div className="flex gap-2 p-1 bg-[#060d1a] rounded-xl border border-[#1a3a5c]">
          {['browse', 'databases'].map(m => (
            <button key={m} onClick={() => setViewMode(m)} className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase ${viewMode === m ? 'bg-[#3bb5ff] text-[#0a1628]' : 'text-gray-400'}`}>{m}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentPath('')} className="p-2 btn-touch text-[#3bb5ff]">{Ico.home}</button>
          <div className="text-xs text-gray-400 truncate flex-1">{currentPath || '/'}</div>
        </div>
        {loading ? <div className="text-center py-8 text-gray-500">Loading...</div> : items.map(item => (
          <div key={item.path} onClick={() => item.is_dir ? setCurrentPath(item.path) : (item.is_db ? toggleSelect(item.path) : (item.is_vov ? handleImport(item.path) : null))} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${selectedPaths.includes(item.path) ? 'bg-[#3bb5ff]/10 border-[#3bb5ff]' : 'hover:bg-[#0f1f3a] border-[#1a3a5c]'}`}>
            <span className="text-[#3bb5ff]">{item.is_dir ? Ico.folder : item.is_db ? Ico.cube : Ico.file}</span>
            <div className="flex-1 truncate">
              <div className="text-sm text-white truncate">{item.name}</div>
              <div className="text-[10px] text-gray-500 truncate">{item.is_dir ? 'Folder' : (item.is_db ? 'Volume' : (item.is_vov ? 'Package' : 'File'))}</div>
            </div>
            {item.is_db && <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPaths.includes(item.path) ? 'bg-[#3bb5ff] border-[#3bb5ff]' : 'border-gray-600'}`}>{selectedPaths.includes(item.path) && <div className="w-2 h-2 bg-white rounded-full" />}</div>}
          </div>
        ))}
        <button onClick={() => setModal(null)} className="w-full py-3 bg-[#0f1f3a] text-white rounded-xl">Cancel</button>
        <button onClick={() => { selectedPaths.forEach(p => { setExternalVolumes(prev => { const u = [...new Set([...prev, p])]; localStorage.setItem('mob_externalVolumes', JSON.stringify(u)); return u; }); }); fetchDbs(); setModal(null); }} className="w-full py-3 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-xl font-bold">Open {selectedPaths.length} Volume(s)</button>
      </div>
    );
  };

  const SharablesModalContent = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    const [viewMode, setViewMode] = useState('sharables');

    const fetchSharables = async () => {
      setLoading(true);
      try {
        const r = await fetch('/api/dbs/list_sharables');
        const data = await r.json();
        setItems(data.items || []);
        setCurrentPath(data.path || 'src/SHARABLES');
      } catch (e) { showToast('Failed to load sharables', 'error'); }
      setLoading(false);
    };

    const fetchDirectory = async (path = '') => {
      setLoading(true);
      try {
        const r = await fetch(`/api/fs/browse?path=${encodeURIComponent(path)}`);
        const data = await r.json();
        setCurrentPath(data.current_path);
        setItems(data.items.map(item => ({ ...item, is_vov: item.name.toLowerCase().endsWith('.vov') })));
      } catch (e) { showToast('Failed to browse directory', 'error'); }
      setLoading(false);
    };

    const goHome = async () => {
      try { const r = await fetch('/api/fs/home'); const d = await r.json(); fetchDirectory(d.path); } catch (e) { fetchDirectory(''); }
    };

    useEffect(() => {
      if (viewMode === 'sharables') fetchSharables();
      else fetchDirectory('');
    }, [viewMode]);

    const handleImport = (path, isEncrypted) => {
      if (isEncrypted) {
        setPasswordModal({ open: true, path, password: '', error: '' });
      } else {
        doImport(path, null);
      }
    };

    const handleItemClick = (item) => {
      if (item.is_dir) fetchDirectory(item.path);
      else if (item.is_vov) handleImport(item.path, item.is_encrypted);
    };

    const tabs = [
      { id: 'browse', label: 'System Browser', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg> },
      { id: 'sharables', label: 'src/SHARABLES', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg> },
    ];

    return (
      <div className="-mx-4 -mt-4">
        <div className="flex gap-1 p-2 bg-[#060d1a] border-b border-[#1a3a5c]">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setViewMode(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-[9px] font-bold uppercase tracking-wide transition-all btn-touch ${viewMode === t.id ? 'bg-[#3bb5ff] text-[#0a1628]' : 'text-gray-400 hover:text-white hover:bg-[#0f1f3a]'}`}
            >
              {t.icon}
              <span className="truncate">{t.label}</span>
            </button>
          ))}
        </div>
        {viewMode !== 'sharables' && (
          <div className="flex items-center gap-2 px-3 py-2 bg-[#060d1a]/60 border-b border-[#1a3a5c]">
            <button onClick={goHome} className="p-1 btn-touch text-[#3bb5ff] hover:bg-[#1a3a5c] rounded-lg flex-shrink-0">{Ico.home}</button>
            <span className="text-[10px] text-gray-500 font-mono truncate flex-1 opacity-70">{currentPath || '/'}</span>
          </div>
        )}
        <div className="overflow-y-auto px-3 pt-2 pb-1 space-y-1" style={{ maxHeight: '50vh' }}>
          {loading ? (
            <div className="text-center py-12 text-gray-500 text-sm">Loading...</div>
          ) : items.filter(item => item.is_dir || item.is_vov).length === 0 ? (
            <div className="text-center py-12 text-gray-500 italic text-sm">No suitable files found.</div>
          ) : (
            items.filter(item => item.is_dir || item.is_vov).map(item => (
              <div
                key={item.path}
                onClick={() => handleItemClick(item)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer btn-touch ${item.is_vov ? 'hover:bg-[#3bb5ff]/10 border-transparent hover:border-[#3bb5ff]/20' : 'hover:bg-[#0f1f3a] border-transparent'}`}
              >
                <span className="flex-shrink-0">
                  {item.is_dir ? <span className="text-[#3bb5ff]/60">{Ico.folder}</span> : (
                    <div className="relative">
                      <span className="text-[#3bb5ff]">{Ico.cube}</span>
                      {item.is_encrypted && (
                        <span className="absolute -top-1 -right-1 text-[10px]">🔒</span>
                      )}
                    </div>
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm truncate ${item.is_vov ? 'text-gray-200' : 'text-gray-400'}`}>{item.name}</div>
                  <div className="text-[10px] text-gray-500 font-mono opacity-50">
                    {item.is_dir ? 'Directory' : item.is_vov ? 'Vault Opus Volume' : 'File'}
                  </div>
                </div>
                {item.is_vov && (
                  <span className="text-[9px] font-bold text-[#3bb5ff]/60 uppercase tracking-widest px-2 py-1 rounded bg-[#3bb5ff]/5 border border-[#3bb5ff]/10 flex-shrink-0">
                    {item.is_encrypted ? '🔒 Import' : 'Import'}
                  </span>
                )}
                {item.is_dir && <span className="text-gray-600 flex-shrink-0">{Ico.back}</span>}
              </div>
            ))
          )}
        </div>
        <div className="px-3 py-2 border-t border-[#1a3a5c]">
          <p className="text-[10px] text-gray-600 italic text-center">Tap a .vov package to import it into your workspace.</p>
        </div>
      </div>
    );
  };

  const RenameVolumeModalContent = ({ db }) => {
    const [newName, setNewName] = useState(db.replace(/\.db$/i, ''));
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const handleRename = async () => {
      const trimmed = newName.trim();
      if (!trimmed) { setError('Name cannot be empty'); return; }
      const finalName = trimmed.endsWith('.db') ? trimmed : `${trimmed}.db`;
      if (finalName === db) { setModal(null); return; }
      setSaving(true); setError('');
      try {
        const res = await fetch('/api/dbs/rename', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ old_name: db, new_name: finalName }) });
        if (!res.ok) { const e = await res.json(); throw new Error(e.detail || 'Rename failed'); }
        setDbs(prev => prev.map(d => d === db ? finalName : d));
        if (selectedDb === db) setSelectedDb(finalName);
        updateRecentVolumes(prev => prev.map(d => d === db ? finalName : d));
        setExternalVolumes(prev => { const u = prev.map(d => d === db ? finalName : d); localStorage.setItem('mob_externalVolumes', JSON.stringify(u)); return u; });
        showToast('Volume renamed', 'success');
        setModal(null);
      } catch (e) { setError(e.message); }
      finally { setSaving(false); }
    };
    return (
      <div className="space-y-4">
        <div>
          <label className="text-[10px] text-gray-500 uppercase mb-1 block">New Volume Name</label>
          <input type="text" value={newName} onChange={e => { setNewName(e.target.value); setError(''); }}
            className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm text-gray-200 focus:border-[#3bb5ff] outline-none" autoFocus />
          {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          <p className="text-[10px] text-gray-600 mt-1">.db extension added automatically if omitted</p>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={() => setModal(null)} className="flex-1 py-3 bg-[#0f1f3a] text-gray-300 rounded-xl border border-[#1a3a5c] btn-touch text-sm">Cancel</button>
          <button onClick={handleRename} disabled={saving} className="flex-1 py-3 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-xl font-bold btn-touch text-sm disabled:opacity-50">
            {saving ? 'Renaming…' : 'Save Name'}
          </button>
        </div>
      </div>
    );
  };

  const NukeModalContent = ({ db }) => {
    const [confirm, setConfirm] = useState('');
    const execute = async () => {
      try {
        await fetch('/api/dbs/nuke', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ db_name: db }) });
        showToast(`Volume ${db} has been wiped`, 'success');
        setModal(null);
        if (selectedDb === db) fetchFiles('.');
      } catch (e) { showToast(e.message, 'error'); }
    };
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
          <p className="text-sm text-red-400 font-bold">☢️ NUKE VOLUME ☢️</p>
          <p className="text-xs text-gray-300 mt-1">All data in <span className="text-white">{db}</span> will be permanently deleted. The file remains but empty.</p>
        </div>
        <input type="text" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder='Type "NUKE" to confirm' className="w-full bg-[#060d1a] border border-red-900/50 rounded-xl px-4 py-3 text-sm" />
        <button onClick={execute} disabled={confirm !== 'NUKE'} className="w-full py-4 bg-red-600 disabled:opacity-30 text-white rounded-xl font-bold">EXECUTE NUKE</button>
      </div>
    );
  };

  const ItemOptionsMenu = ({ items }) => {
    const isSingle = items.length === 1;
    const item = isSingle ? items[0] : null;
    return (
      <div className="space-y-2">
        {isSingle && (
          <>
            <button onClick={() => { setBottomSheet(null); setModal({ title: 'New Version', content: <NewVersionUploadModalContent targetItemPath={currentPath === '.' ? item.displayName : `${currentPath}/${item.displayName}`} onUpload={() => { }} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.plus} Upload New Version</button>
            <button onClick={() => { setBottomSheet(null); setModal({ title: 'Versions', content: <SeeVersionsModalContent itemPath={currentPath === '.' ? item.displayName : `${currentPath}/${item.displayName}`} onClose={() => setModal(null)} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.clock} See Versions</button>
            <button onClick={() => { setBottomSheet(null); setModal({ title: 'Download Version', content: <DownloadVersionModalContent itemPath={currentPath === '.' ? item.displayName : `${currentPath}/${item.displayName}`} item={item} onDownload={(args) => { if (args) { const isEncrypted = item && (item.encryption === 'not_automatic' || item.encryption_mode === 'not_automatic'); if (isEncrypted) { setModal({ title: 'Passwords Required', content: <PasswordPromptModalContent items={[{ id: item.itemid, name: item.displayName, hash: item.password_seed_hash || '' }]} onConfirm={(passwords) => { setModal(null); const finalArgs = [...args]; if (Object.keys(passwords).length) { finalArgs.push('--passwords', JSON.stringify(passwords)); } runCmd(finalArgs, item.displayName, 'download'); showToast('Download queued', 'success'); }} /> }); } else { runCmd(args, item.displayName, 'download'); setModal(null); showToast('Download queued', 'success'); } } else setModal(null); }} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.download} Download Version</button>
          </>
        )}
        <button onClick={() => { setBottomSheet(null); setModal({ title: 'Move / Copy', content: <ModifyModalContent type="move" items={items} onConfirm={(data) => { if (data) { const argsBase = ['modify', data.type]; const itemsToProcess = data.items || []; itemsToProcess.forEach(it => { const args = [...argsBase]; const itId = it.itemid || (currentPath === '.' ? it.displayName : `${currentPath}/${it.displayName}`); args.push(itId, data.dst); if (data.copyMode) args.push('--copy'); if (it.itemid) args.push('--src_id_based'); if (data.dstIdBased) args.push('--dst_id_based'); args.push('-db', selectedDb); if (!data.nameCheck) args.push('--no_name_check'); runCmd(args, it.displayName, data.type); }); setModal(null); showToast(`${data.type} queued`, 'success'); } else setModal(null); }} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.move} Move / Copy</button>
        {isSingle && (
          <>
            <button onClick={() => { setBottomSheet(null); setModal({ title: 'Rename', content: <ModifyModalContent type="rename" items={items} onConfirm={(data) => { if (data) { const args = ['modify', data.type]; args.push(data.item.itemid || (currentPath === '.' ? data.item.displayName : `${currentPath}/${data.item.displayName}`), data.newName); if (data.nameMode !== 'D') args.push('--mode', data.nameMode); args.push('-db', selectedDb); if (data.idBased) args.push('--id_based'); if (!data.nameCheck) args.push('--no_name_check'); runCmd(args, data.item.displayName, 'rename'); setModal(null); showToast('Rename queued', 'success'); } else setModal(null); }} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.rename} Rename</button>
            <button onClick={() => { setBottomSheet(null); setModal({ title: 'Delete Item', content: <DeleteModalContent singleItem={item} onConfirm={(opts) => { const a = ['delete']; if (item.itemid) a.push(item.itemid, '--id_based'); else a.push(currentPath === '.' ? item.displayName : `${currentPath}/${item.displayName}`); a.push('-db', selectedDb, '--skip_confirmation', 'yes'); if (opts.type === 'hard') a.push('--hard'); if (opts.scope === 'all') a.push('--all_versions', 'yes'); else if (opts.scope === 'specific' && opts.version) a.push('--version', opts.version); else if (opts.scope === 'range' && opts.startVersion && opts.endVersion) a.push('--st_version', opts.startVersion, '--en_version', opts.endVersion); runCmd(a, item.displayName, 'delete'); setModal(null); clearSelection(); showToast('Delete queued', 'success'); }} onCancel={() => setModal(null)} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-red-900/20 border border-red-900/30 rounded-xl text-sm text-red-400 btn-touch">{Ico.trash} Delete</button>
            <button onClick={() => { setBottomSheet(null); setModal({ title: 'Full Name Metadata', content: <FullNameModalContent item={item} onClose={() => setModal(null)} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.info} Show Full Name</button>
          </>
        )}
      </div>
    );
  };

  // -------------------- RENDER --------------------
  const CreateVolumeModalContent = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [creating, setCreating] = useState(false);
    const handleCreate = async () => {
      const trimmed = name.trim();
      if (!trimmed) { setError('Volume name cannot be empty'); return; }
      const finalName = trimmed.endsWith('.db') ? trimmed : `${trimmed}.db`;
      setCreating(true); setError('');
      try {
        const res = await fetch('/api/dbs/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ db_name: finalName })
        });
        if (!res.ok) { const e = await res.json(); throw new Error(e.detail || 'Failed to create volume'); }
        showToast(`Volume ${finalName} created`, 'success');
        setShowCreateVolume(false);
        setName('');
        fetchDbs();
      } catch (e) { setError(e.message); }
      finally { setCreating(false); }
    };

    return (
      <div className="space-y-4">
        <div>
          <label className="text-[10px] text-gray-500 uppercase mb-1 block">Volume Name</label>
          <input
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); setError(''); }}
            placeholder="e.g. myvault"
            className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm text-gray-200 outline-none focus:border-[#3bb5ff] transition-colors"
            autoFocus
          />
          {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          <p className="text-[10px] text-gray-600 mt-1">.db extension added automatically if omitted</p>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={() => { setShowCreateVolume(false); setName(''); setError(''); }} className="flex-1 py-3 bg-[#0f1f3a] text-gray-300 rounded-xl border border-[#1a3a5c] btn-touch text-sm">Cancel</button>
          <button onClick={handleCreate} disabled={creating || !name.trim()} className="flex-1 py-3 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-xl font-bold btn-touch text-sm disabled:opacity-40">{creating ? 'Creating...' : 'Create Volume'}</button>
        </div>
      </div>
    );
  };

  const RenameVolumeModalContent = ({ db }) => {
    const [name, setName] = useState(db.replace('.db', ''));
    const handleRename = async () => {
      const finalName = name.trim().endsWith('.db') ? name.trim() : `${name.trim()}.db`;
      try {
        const res = await fetch('/api/dbs/rename', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ old_name: db, new_name: finalName }) });
        if (!res.ok) throw new Error('Rename failed');
        fetchDbs(); if (selectedDb === db) setSelectedDb(finalName);
        showToast('Volume renamed', 'success'); setModal(null);
      } catch (e) { showToast(e.message, 'error'); }
    };
    return (
      <div className="space-y-4">
        <input autoFocus type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm text-white" />
        <div className="flex gap-3"><button onClick={() => setModal(null)} className="flex-1 py-3 bg-[#0f1f3a] text-gray-400 rounded-xl">Cancel</button><button onClick={handleRename} className="flex-1 py-3 bg-[#3bb5ff] text-[#060d1a] rounded-xl font-bold">Rename</button></div>
      </div>
    );
  };

  const NukeModalContent = ({ db }) => {
    const [confirm, setConfirm] = useState('');
    const handleNuke = async () => {
      if (confirm !== 'NUKE') return;
      try {
        await fetch('/api/dbs/nuke', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ db_name: db }) });
        showToast('Volume nuked', 'success'); setModal(null); fetchFiles(currentPath);
      } catch (e) { showToast('Nuke failed', 'error'); }
    };
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl"><p className="text-sm text-red-400 font-bold uppercase mb-1">Warning: Nuclear Option</p><p className="text-xs text-gray-300">This will wipe all file metadata in <span className="text-white font-mono">{db}</span>. Discord files will remain but the volume will be empty.</p></div>
        <p className="text-[10px] text-gray-500 uppercase font-bold text-center">Type "NUKE" to confirm:</p>
        <input autoFocus type="text" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="NUKE" className="w-full bg-[#060d1a] border border-red-900/50 rounded-xl px-3 py-3 text-sm text-center text-red-500 font-black tracking-widest" />
        <div className="flex gap-3"><button onClick={() => setModal(null)} className="flex-1 py-3 bg-[#0f1f3a] text-gray-400 rounded-xl">Cancel</button><button onClick={handleNuke} disabled={confirm !== 'NUKE'} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold disabled:opacity-30">Execute Nuke</button></div>
      </div>
    );
  };

  const ItemOptionsMenu = ({ item }) => (
    <div className="space-y-2">
      <button onClick={() => { setBottomSheet(null); setModal({ title: 'New Version', content: <NewVersionUploadModalContent targetItemPath={currentPath === '.' ? item.displayName : `${currentPath}/${item.displayName}`} onUpload={() => { }} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.plus} Upload New Version</button>
      <button onClick={() => { setBottomSheet(null); setModal({ title: 'Versions', content: <SeeVersionsModalContent itemPath={currentPath === '.' ? item.displayName : `${currentPath}/${item.displayName}`} onClose={() => setModal(null)} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.clock} See Versions</button>
      <button onClick={() => { setBottomSheet(null); setModal({ title: 'Download Version', content: <DownloadVersionModalContent itemPath={currentPath === '.' ? item.displayName : `${currentPath}/${item.displayName}`} item={item} onDownload={(args) => { if (args) { const isEncrypted = item && (item.encryption === 'not_automatic' || item.encryption_mode === 'not_automatic'); if (isEncrypted) { setModal({ title: 'Passwords Required', content: <PasswordPromptModalContent items={[{ id: item.itemid, name: item.displayName, hash: item.password_seed_hash || '' }]} onConfirm={(passwords) => { setModal(null); const finalArgs = [...args]; if (Object.keys(passwords).length) { finalArgs.push('--passwords', JSON.stringify(passwords)); } runCmd(finalArgs, item.displayName, 'download'); showToast('Download queued', 'success'); }} /> }); } else { runCmd(args, item.displayName, 'download'); setModal(null); showToast('Download queued', 'success'); } } else setModal(null); }} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.download} Download Version</button>
      <button onClick={() => { setBottomSheet(null); setModal({ title: 'Move / Copy', content: <ModifyModalContent type="move" item={item} onConfirm={(data) => { if (data) { const args = ['modify', data.type]; if (data.type === 'move') { args.push(data.src, data.dst); if (data.copyMode) args.push('--copy'); if (data.srcIdBased) args.push('--src_id_based'); if (data.dstIdBased) args.push('--dst_id_based'); } else { args.push(data.item, data.newName); if (data.nameMode !== 'D') args.push('--mode', data.nameMode); } args.push('-db', selectedDb); if (data.type !== 'move' && data.idBased) args.push('--id_based'); if (!data.nameCheck) args.push('--no_name_check'); runCmd(args, item.displayName, data.type); setModal(null); showToast(`${data.type} queued`, 'success'); } else setModal(null); }} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.move} Move / Copy</button>
      <button onClick={() => { setBottomSheet(null); setModal({ title: 'Rename', content: <ModifyModalContent type="rename" item={item} onConfirm={(data) => { if (data) { const args = ['modify', data.type]; args.push(data.item, data.newName); if (data.nameMode !== 'D') args.push('--mode', data.nameMode); args.push('-db', selectedDb); if (data.idBased) args.push('--id_based'); if (!data.nameCheck) args.push('--no_name_check'); runCmd(args, item.displayName, 'rename'); setModal(null); showToast('Rename queued', 'success'); } else setModal(null); }} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.rename} Rename</button>
      <button onClick={() => { setBottomSheet(null); setModal({ title: 'Delete Item', content: <DeleteModalContent singleItem={item} onConfirm={(opts) => { const a = ['delete']; if (item.itemid) a.push(item.itemid, '--id_based'); else a.push(currentPath === '.' ? item.displayName : `${currentPath}/${item.displayName}`); a.push('-db', selectedDb, '--skip_confirmation', 'yes'); if (opts.type === 'hard') a.push('--hard'); if (opts.scope === 'all') a.push('--all_versions', 'yes'); else if (opts.scope === 'specific' && opts.version) a.push('--version', opts.version); else if (opts.scope === 'range' && opts.startVersion && opts.endVersion) a.push('--st_version', opts.startVersion, '--en_version', opts.endVersion); runCmd(a, item.displayName, 'delete'); setModal(null); clearSelection(); showToast('Delete queued', 'success'); }} onCancel={() => setModal(null)} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-red-900/20 border border-red-900/30 rounded-xl text-sm text-red-400 btn-touch">{Ico.trash} Delete</button>
      <button onClick={() => { setBottomSheet(null); setModal({ title: 'Full Name Metadata', content: <FullNameModalContent item={item} onClose={() => setModal(null)} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.info} Show Full Name</button>
    </div>
  );

  const VolumeOptionsMenu = ({ db }) => (
    <div className="space-y-2">
      <button onClick={() => { setModal(null); setSelectedDb(db); setTab('explorer'); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.folderOpen} Open</button>
      <button onClick={() => { setModal({ title: 'Rename Volume', content: <RenameVolumeModalContent db={db} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.rename} Rename</button>
      <button onClick={() => { setModal(null); setDbToShare(db); setShowSharePasswordModal(true); }} className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1f3a] rounded-xl text-sm text-gray-300 btn-touch">{Ico.share} Package</button>
      <button onClick={() => { setModal(null); setModal({ title: '☢️ NUKE', content: <NukeModalContent db={db} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-red-900/10 border border-red-900/20 rounded-xl text-sm text-red-500 font-bold btn-touch">☢️ NUKE</button>
      <button onClick={() => { setModal({ title: 'Confirm Deletion', content: <DeleteConfirmModal db={db} /> }); }} className="w-full flex items-center gap-3 px-4 py-3 bg-red-900/20 border border-red-900/30 rounded-xl text-sm text-red-400 btn-touch">{Ico.trash} Delete Permanently</button>
    </div>
  );

  const DeleteConfirmModal = ({ db }) => (
    <div className="space-y-4">
      <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
        <p className="text-sm text-red-400 font-bold">⚠️ PERMANENT DELETE</p>
        <p className="text-xs text-gray-300 mt-1">This will permanently remove <span className="text-white font-mono">{db}</span> from disk. This CANNOT be undone.</p>
      </div>
      <div className="flex gap-3">
        <button onClick={() => setModal(null)} className="flex-1 py-3 bg-[#0f1f3a] text-gray-300 rounded-xl border border-[#1a3a5c] btn-touch">Cancel</button>
        <button onClick={async () => { try { await fetch('/api/dbs/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ db_name: db }) }); fetchDbs(); if (selectedDb === db) setSelectedDb(''); showToast('Deleted', 'success'); setModal(null); } catch (e) { showToast(e.message, 'error'); } }} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold btn-touch">Delete</button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[#060d1a] text-white overflow-hidden safe-top">
      {/* Search Header (only in explorer) */}
      {tab === 'explorer' && selectedDb && (
        <div className="px-4 pt-4 pb-2">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#3bb5ff] transition-colors">{Ico.search}</div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="w-full bg-[#0a1628] border border-[#1a3a5c] rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#3bb5ff] transition-all shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative px-4 pb-32">
        {tab === 'explorer' && (
          <div className="space-y-4 pt-4">
            {!selectedDb ? (
              <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-[#0f1f3a] border-2 border-[#1a3a5c] flex items-center justify-center text-[#3bb5ff]/20">{Ico.cube}</div>
                <div className="space-y-2">
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter">No Volume Selected</h2>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-loose">Pick a vault from the volumes tab<br />to browse your encrypted files.</p>
                </div>
                <button onClick={() => setTab('volumes')} className="px-8 py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#3bb5ff]/20 active:scale-95 transition-transform">Go to Volumes</button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <button onClick={goBack} className="p-2 -ml-2 text-[#3bb5ff] active:bg-[#3bb5ff]/10 rounded-full transition-colors">{Ico.chevronLeft}</button>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-black text-[#3bb5ff] uppercase tracking-widest opacity-60 truncate">{selectedDb}</span>
                      <h2 className="text-lg font-black text-white truncate tracking-tight uppercase leading-none">{currentPath === '.' ? 'Root' : currentPath.split('/').pop()}</h2>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => fetchFiles(currentPath)} className="p-3 bg-[#0f1f3a] text-gray-400 rounded-xl border border-[#1a3a5c] active:text-[#3bb5ff] transition-colors">{Ico.version}</button>
                    <button onClick={() => setBottomSheet({ title: 'New Folder', content: <div className="space-y-4"><input autoFocus placeholder="Folder name..." id="new-folder-name" className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-4 py-3 text-sm" /><button onClick={async () => { const n = document.getElementById('new-folder-name').value; if (n) { await fetch('/api/folders/make', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ db_name: selectedDb, folder_name: n, parent_path: currentPath, id_based: false }) }); fetchFiles(currentPath); setBottomSheet(null); } }} className="w-full py-4 bg-[#3bb5ff] text-[#0a1628] rounded-xl font-black uppercase tracking-widest text-[10px]">Create Folder</button></div> })} className="p-3 bg-[#0f1f3a] text-gray-400 rounded-xl border border-[#1a3a5c] active:text-[#3bb5ff] transition-colors">{Ico.folderOpen}</button>
                  </div>
                </div>

                <div className="grid gap-3">
                  {loadingFiles ? (
                    <div className="flex flex-col items-center justify-center py-20">
                      <div className="animate-spin text-[#3bb5ff] mb-4">{Ico.version}</div>
                      <p className="text-[10px] font-black text-[#3bb5ff] uppercase tracking-[0.3em]">Browsing Vault...</p>
                    </div>
                  ) : isRetrying ? (
                    <div className="flex flex-col items-center justify-center h-full py-20">
                      <div className="mb-6 animate-spin text-[#3bb5ff]">{Ico.version}</div>
                      <p className="text-sm font-bold uppercase tracking-widest text-[#3bb5ff]">Connecting to Volume...</p>
                      <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">Attempt {retryCountRef.current} of {maxRetries}</p>
                    </div>
                  ) : (
                    filteredFiles.map(item => (
                      <div key={item.itemid || item.displayName}
                        className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 active:scale-[0.98] ${selectedItems.find(i => (i.itemid && i.itemid === item.itemid) || (i.displayName === item.displayName)) ? 'bg-[#3bb5ff]/10 border-[#3bb5ff] shadow-[0_0_20px_rgba(59,181,255,0.1)]' : 'bg-[#0a1628]/80 border-[#1a3a5c] shadow-lg'}`}
                      >
                        <div onClick={() => toggleSelection(item)} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${selectedItems.find(i => (i.itemid && i.itemid === item.itemid) || (i.displayName === item.displayName)) ? 'bg-[#3bb5ff] border-[#3bb5ff]' : 'border-[#1a3a5c] bg-[#060d1a]'}`}>
                          {selectedItems.find(i => (i.itemid && i.itemid === item.itemid) || (i.displayName === item.displayName)) && <div className="w-2.5 h-2.5 bg-[#0a1628] rounded-sm" />}
                        </div>
                        <div onClick={() => item.type === 'folder' ? navigateTo(item.displayName) : null} className="flex-1 min-w-0 flex items-center gap-3">
                          <span className={`${item.type === 'folder' ? 'text-[#3bb5ff]' : 'text-gray-500'}`}>{item.type === 'folder' ? Ico.folder : Ico.file}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-white truncate uppercase tracking-tight leading-tight">{item.displayName}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[8px] font-black text-[#3bb5ff] uppercase tracking-widest px-1.5 py-0.5 bg-[#3bb5ff]/10 rounded-md">v{item.version}</span>
                              {item.encryption_mode === 'not_automatic' && <span className="text-gray-600">{Ico.shield}</span>}
                            </div>
                          </div>
                        </div>
                        <button onClick={() => setBottomSheet({ title: item.displayName, content: <ItemOptionsMenu item={item} /> })} className="p-3 -mr-2 text-gray-600 hover:text-white transition-colors">{Ico.menu}</button>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {tab === 'volumes' && (
          <div className="space-y-8 pt-6">
            <div className="flex items-center justify-between px-1">
              <div className="flex flex-col">
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">Vaults</h2>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Your encrypted containers</p>
              </div>
              <button onClick={() => setShowCreateVolume(true)} className="p-4 bg-[#3bb5ff] text-[#0a1628] rounded-2xl shadow-lg shadow-[#3bb5ff]/30 active:scale-90 transition-all">{Ico.plus}</button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2"><span className="text-[#3bb5ff]/50">{Ico.cube}</span><h3 className="text-[10px] uppercase font-bold text-[#3bb5ff]/50 tracking-widest">Active</h3></div>
                <button onClick={() => setModal({ title: 'Add External Volume', content: <RemoteFolderPicker showFiles onSelect={p => { if (p.endsWith('.db')) { setExternalVolumes(prev => { const u = [...new Set([...prev, p])]; localStorage.setItem('mob_externalVolumes', JSON.stringify(u)); return u; }); fetchDbs(); setModal(null); showToast('Volume added', 'success'); } else showToast('Must be .db', 'error'); }} onCancel={() => setModal(null)} /> })} className="text-[10px] text-[#3bb5ff] font-bold btn-touch uppercase">+ External</button>
              </div>
              <div className="grid gap-3">
                {allVolumes.map(db => (
                  <div key={db} className={`group flex items-center justify-between p-5 rounded-3xl border transition-all ${selectedDb === db ? 'bg-gradient-to-br from-[#0a1628] to-[#0f1f3a] border-[#3bb5ff] shadow-xl' : 'bg-[#0a1628]/60 border-[#1a3a5c]'}`}>
                    <div onClick={() => { if (selectedDb === db) fetchFiles(currentPath); else setSelectedDb(db); setTab('explorer'); }} className="flex-1 flex items-center gap-4 min-w-0 mr-2 py-1">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${selectedDb === db ? 'bg-[#3bb5ff] text-[#0a1628]' : 'bg-[#0f1f3a] text-gray-600'}`}>{Ico.cube}</div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-sm font-bold truncate text-white uppercase tracking-tight">{db.split(/[\/\\]/).pop().replace('.db', '')}</div>
                        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{selectedDb === db ? 'Currently Open' : 'Tap to unlock'}</div>
                      </div>
                    </div>
                    <button onClick={() => setBottomSheet({ title: 'Volume Options', content: <VolumeOptionsMenu db={db} /> })} className="p-4 -mr-2 text-gray-600 active:text-white transition-colors">{Ico.menu}</button>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setModal({ title: 'Import .vov Package', content: <div className="space-y-3"><RemoteFolderPicker showFiles onSelect={async p => { if (p.endsWith('.vov')) { try { await fetch('/api/dbs/import', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ vov_path: p }) }); fetchDbs(); showToast('Imported', 'success'); setModal(null); } catch (e) { showToast(e.message, 'error'); } } else showToast('Must select .vov', 'error'); }} onCancel={() => setModal(null)} /></div> })} className="w-full py-5 bg-[#0f1f3a]/40 border-2 border-dashed border-[#1a3a5c] rounded-3xl text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] btn-touch flex items-center justify-center gap-3 active:border-[#3bb5ff] active:text-[#3bb5ff] transition-all">{Ico.import} Import .VOV Package</button>
          </div>
        )}

        {tab === 'queue' && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between px-1">
              <div className="flex flex-col">
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">Activity</h2>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Ongoing operations</p>
              </div>
              <button onClick={() => setQueue([])} className="px-4 py-2 bg-[#0f1f3a] text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest active:text-red-400 border border-[#1a3a5c]">Clear All</button>
            </div>
            <div className="space-y-4">
              {queue.length === 0 ? (
                <div className="text-center py-20 opacity-30 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-600 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest">No active tasks</p>
                </div>
              ) : queue.map(item => (
                <div key={item.id} className="bg-[#0a1628] border border-[#1a3a5c] rounded-3xl overflow-hidden shadow-xl">
                  <div className="p-5 flex items-center justify-between border-b border-[#1a3a5c]/50 bg-[#0f1f3a]/30">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${item.status === 'running' ? 'bg-[#3bb5ff]' : item.status === 'completed' ? 'bg-green-500' : item.status === 'failed' ? 'bg-red-500' : 'bg-gray-600'}`} />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-white truncate uppercase tracking-tight">{item.label}</span>
                        <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{item.type} • {item.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-black/40 max-h-40 overflow-y-auto font-mono text-[9px] leading-relaxed text-[#3bb5ff]/80 custom-scrollbar whitespace-pre-wrap">
                    {item.log && item.log.length > 0 ? item.log.join('') : 'Waiting for output...'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div className="space-y-8 pt-6">
            <div className="flex flex-col px-1">
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">Settings</h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Global configuration</p>
            </div>
            {!localConfig ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="animate-spin text-[#3bb5ff]">{Ico.version}</div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Fetching configuration...</p>
              </div>
            ) : (
              <div className="space-y-10">{Object.entries(localConfig).map(([section, data]) => renderSection(section, data, [section]))}</div>
            )}
          </div>
        )}
      </div>

      {selectedItems.length > 0 && (
        <div className="fixed bottom-24 left-4 right-4 bg-[#0a1628]/95 backdrop-blur-xl border border-[#3bb5ff]/40 px-6 py-4 rounded-3xl flex items-center justify-between z-40 shadow-2xl">
          <span className="text-xs text-[#3bb5ff] font-black uppercase">{selectedItems.length} SELECTED</span>
          <div className="flex gap-4">
            <button onClick={() => setBottomSheet({ title: 'Item Options', content: <ItemOptionsMenu items={selectedItems} /> })} className="p-3 bg-[#3bb5ff]/10 text-[#3bb5ff] rounded-xl btn-touch">{Ico.menu}</button>
            <button onClick={clearSelection} className="p-3 text-gray-500 btn-touch hover:text-white">{Ico.close}</button>
          </div>
        </div>
      )}

  // Download execution helper
  const executeDownload = (itemsToDownload, strictnessMode = 'NA') => {
    const needsPassword = (i) => {
      if (i.encryption === 'not_automatic' || i.encryption_mode === 'not_automatic') return true;
      if (i.type === 'folder' && Array.isArray(i.versions)) return i.versions.some(v => v.has_hash || v.encryption === 'not_automatic');
      if (i.password_seed_hash) return true;
      return false;
    };
    const encryptedItems = itemsToDownload.filter(needsPassword);
    if (encryptedItems.length) {
      setModal({ title: 'Passwords Required', content: <PasswordPromptModalContent items={encryptedItems.map(i => ({ id: i.itemid, name: i.displayName, hash: i.password_seed_hash || '' }))} onConfirm={(passwords) => { setModal(null); doDownload(itemsToDownload, passwords, strictnessMode); }} /> });
    } else {
      doDownload(itemsToDownload, {}, strictnessMode);
      setModal(null);
    }
  };
  const doDownload = (itemsToDownload, passwords, strictnessMode) => {
    const downloadFolder = localStorage.getItem('VAULT_OPUS_download_folder') || '/storage/emulated/0/Download';
    itemsToDownload.forEach(item => {
      const itemPath = currentPath === '.' ? item.displayName : `${currentPath}/${item.displayName}`;
      const args = ['download', itemPath, '-db', selectedDb, '--download_folder', downloadFolder];
      if (Object.keys(passwords).length) args.push('--passwords', JSON.stringify(passwords));
      if (strictnessMode !== 'NA') args.push('--strictness_mode', strictnessMode);
      runCmd(args, item.displayName, 'download');
    });
  };

  // Volume tabs
  const renderVolumes = () => (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 bg-[#0a1628] border-b border-[#1a3a5c] flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Volumes</h2>
        <div className="flex gap-2">
          <button onClick={async () => { await fetchDbs(); showToast('Volume list refreshed', 'success'); }} className="p-2 bg-[#0f1f3a] border border-[#1a3a5c] text-gray-300 rounded-xl btn-touch" title="Refresh Volume List">{Ico.version}</button>
          <button onClick={() => setModal({ title: 'Sharables', content: <SharablesModalContent /> })} className="p-2 bg-[#0f1f3a] border border-[#1a3a5c] text-[#3bb5ff] rounded-xl btn-touch" title="Open Sharables">{Ico.externalLink}</button>
          <button onClick={() => setShowCreateVolume(true)} className="p-2 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-xl btn-touch" title="Create Volume">{Ico.plus}</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {recentVolumes.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3"><span className="text-[#3bb5ff]/50">{Ico.clock}</span><h3 className="text-[10px] uppercase font-bold text-[#3bb5ff]/50">Recent</h3></div>
            <div className="space-y-2">{recentVolumes.map(db => (
              <div key={db} className={`flex items-center justify-between px-4 py-3 rounded-xl border btn-touch ${selectedDb === db ? 'bg-[#3bb5ff]/15 border-[#3bb5ff]' : 'bg-[#0f1f3a]/40 border-[#1a3a5c]'}`}>
                <div
                  onClick={() => { if (selectedDb === db) fetchFiles(currentPath); else setSelectedDb(db); setTab('explorer'); }}
                  className="flex-1 flex items-center gap-3 min-w-0 mr-2 py-1"
                >
                  <span className={selectedDb === db ? 'text-[#3bb5ff]' : 'text-gray-500'}>{Ico.cube}</span>
                  <div className="text-sm font-bold truncate text-white">{db.split(/[\/\\]/).pop().replace('.db', '')}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateRecentVolumes(prev => prev.filter(d => d !== db));
                    if (selectedDb === db) setSelectedDb('');
                    showToast('Removed', 'success');
                  }}
                  className="p-3 -m-1.5 text-gray-600 hover:text-red-400 rounded-lg transition-colors flex-shrink-0"
                >
                  {Ico.close}
                </button>
              </div>
            ))}</div>
          </section>
        )}
        <section>
          <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><span className="text-[#3bb5ff]/50">{Ico.cube}</span><h3 className="text-[10px] uppercase font-bold text-[#3bb5ff]/50">Available</h3></div><button onClick={() => setModal({ title: 'Add External Volume', content: <RemoteFolderPicker showFiles onSelect={p => { if (p.endsWith('.db')) { setExternalVolumes(prev => { const u = [...new Set([...prev, p])]; localStorage.setItem('mob_externalVolumes', JSON.stringify(u)); return u; }); fetchDbs(); setModal(null); showToast('Volume added', 'success'); } else showToast('Must be .db', 'error'); }} onCancel={() => setModal(null)} /> })} className="text-[10px] text-[#3bb5ff] font-bold btn-touch uppercase">+ External</button></div>
          <div className="space-y-2">{dbs.map(db => (
            <div key={db} className={`flex items-center justify-between px-4 py-3 rounded-xl border btn-touch ${selectedDb === db ? 'bg-[#3bb5ff]/15 border-[#3bb5ff]' : 'bg-[#0f1f3a]/40 border-[#1a3a5c]'}`}>
              <div
                onClick={() => { if (selectedDb === db) fetchFiles(currentPath); else setSelectedDb(db); setTab('explorer'); }}
                className="flex-1 flex items-center gap-3 min-w-0 mr-2 py-1"
              >
                <span className={selectedDb === db ? 'text-[#3bb5ff]' : 'text-gray-500'}>{Ico.cube}</span>
                <span className="text-sm font-bold text-white truncate">{db.split(/[\/\\]/).pop().replace('.db', '')}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModal({ title: 'Volume Options', content: <VolumeOptionsMenu db={db} /> });
                }}
                className="p-3 -m-1.5 text-gray-500 hover:text-white btn-touch"
              >
                {Ico.menu}
              </button>
            </div>
          ))}</div>
        </section>
        <button onClick={() => setModal({ title: 'Import .vov Package', content: <div className="space-y-3"><RemoteFolderPicker showFiles onSelect={async p => { if (p.endsWith('.vov')) { try { await fetch('/api/dbs/import', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ vov_path: p }) }); fetchDbs(); showToast('Imported', 'success'); setModal(null); } catch (e) { showToast(e.message, 'error'); } } else showToast('Must select .vov', 'error'); }} onCancel={() => setModal(null)} /></div> })} className="w-full py-4 bg-[#0f1f3a] border border-[#1a3a5c] rounded-2xl text-xs text-gray-300 font-bold uppercase btn-touch flex items-center justify-center gap-2">{Ico.import} Import VOV Package</button>
      </div>
    </div>
  );
  const renderQueue = () => (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 bg-[#0a1628] border-b border-[#1a3a5c] flex items-center justify-between"><h2 className="text-lg font-bold text-white">Queue</h2><button onClick={() => setQueue(q => q.filter(i => i.status === 'running' || i.status === 'queued'))} className="text-xs text-gray-400 btn-touch">Clear All</button></div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">{queue.length === 0 ? <div className="text-center py-20 text-gray-500 text-sm">No active tasks</div> : queue.slice().reverse().map(item => (<div key={item.id} className="flex items-center gap-3 px-3 py-2 bg-[#0a1628] border border-[#1a3a5c] rounded-xl"><div className={`w-2 h-2 rounded-full ${item.status === 'completed' ? 'bg-green-400' : item.status === 'failed' ? 'bg-red-400' : item.status === 'running' ? 'bg-[#3bb5ff] animate-pulse' : 'bg-gray-500'}`} /><div className="flex-1"><div className="text-xs text-gray-200 truncate">{item.name}</div><div className="text-[10px] text-gray-500 capitalize">{item.status}</div></div>{item.progress > 0 && <div className="text-xs text-[#3bb5ff]">{item.progress}%</div>}</div>))}</div>
    </div>
  );

  const renderTerminal = () => (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 bg-[#0a1628] border-b border-[#1a3a5c] flex items-center justify-between"><h2 className="text-lg font-bold text-white">Terminal</h2><button onClick={() => setTerminalOutput('')} className="text-xs text-gray-400 btn-touch">Clear</button></div>
      <div className="flex-1 overflow-y-auto p-3 bg-[#060d1a]"><pre className="text-xs text-green-400 font-mono whitespace-pre-wrap break-all">{terminalOutput || 'No output yet'}</pre></div>
    </div>
  );

  return (
    <div className="flex flex-col h-full safe-top bg-[#060d1a]">
      <header className="flex items-center justify-between px-6 py-4 bg-[#0a1628] border-b border-[#1a3a5c] shadow-lg">
        <div className="flex items-center gap-3">
          <img src="/logo/image.png" alt="Logo" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(59,181,255,0.4)]" onError={(e) => e.target.style.display = 'none'} />
          <div><h1 className="text-lg font-black text-white tracking-tighter">VAULT OPUS</h1>{selectedDb && <p className="text-[10px] text-[#3bb5ff] font-bold uppercase mt-1">{selectedDb.replace('.db', '')}</p>}</div>
        </div>
        <div className="flex items-center gap-2">
          {connectionStatus === 'disconnected' && <button onClick={connectWS} className="p-2 text-red-500 btn-touch">{Ico.alert}</button>}
        </div>
      </header>

      <div className="flex-1 overflow-hidden relative">
        {tab === 'explorer' && renderExplorer()}
        {tab === 'volumes' && renderVolumes()}
        {tab === 'queue' && renderQueue()}
        {tab === 'terminal' && renderTerminal()}
        {tab === 'settings' && <SettingsTabContent config={config} fetchConfig={fetchConfig} showToast={showToast} />}
      </div>

      <nav className="flex items-center justify-around bg-[#0a1628] border-t border-[#1a3a5c] py-4 safe-bottom shadow-[0_-10px_30px_rgba(0,0,0,0.4)]">
        {[
          { id: 'explorer', ico: Ico.folder, label: 'FILES' },
          { id: 'volumes', ico: Ico.cube, label: 'VAULTS' },
          { id: 'queue', ico: Ico.clock, label: 'TASKS' },
          { id: 'settings', ico: Ico.settings, label: 'SYSTEM' }
        ].map(n => (
          <button
            key={n.id}
            onClick={() => setTab(n.id)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${tab === n.id ? 'text-[#3bb5ff] scale-110' : 'text-gray-600'}`}
          >
            <div className={`p-1 rounded-xl ${tab === n.id ? 'bg-[#3bb5ff]/10' : ''}`}>{n.ico}</div>
            <span className={`text-[8px] font-black tracking-[0.2em] ${tab === n.id ? 'opacity-100' : 'opacity-40'}`}>{n.label}</span>
          </button>
        ))}
      </div>

      <Sheet open={!!bottomSheet} onClose={() => setBottomSheet(null)} title={bottomSheet?.title}>{bottomSheet?.content}</Sheet>
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.title} wide={modal?.wide}>{modal?.content}</Modal>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Input required from task */}
      {promptQueue.length > 0 && (
        <Modal open onClose={() => { if (ws) ws.send(JSON.stringify({ action: 'input', data: 'cancel', task_id: promptQueue[0].taskId })); setPromptQueue(prev => prev.slice(1)); }} title="Input Required">
          <div className="space-y-4">
            <p className="text-sm text-gray-400 leading-relaxed font-bold uppercase tracking-widest opacity-70">{promptQueue[0].text}</p>
            <input data-prompt-input type={promptQueue[0].isPassword ? 'password' : 'text'} autoFocus className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-4 py-4 text-sm text-white focus:border-[#3bb5ff] outline-none" onKeyDown={e => { if (e.key === 'Enter') { if (ws) ws.send(JSON.stringify({ action: 'input', data: e.target.value, task_id: promptQueue[0].taskId })); setPromptQueue(prev => prev.slice(1)); } }} />
            <div className="flex gap-3">
              <button onClick={() => { if (ws) ws.send(JSON.stringify({ action: 'input', data: 'cancel', task_id: promptQueue[0].taskId })); setPromptQueue(prev => prev.slice(1)); }} className="flex-1 py-4 bg-[#0f1f3a] text-gray-300 rounded-xl border border-[#1a3a5c] font-bold btn-touch uppercase tracking-widest text-[10px]">Cancel</button>
              <button onClick={() => { const inp = document.querySelector('[data-prompt-input]'); if (ws) ws.send(JSON.stringify({ action: 'input', data: inp ? inp.value : '', task_id: promptQueue[0].taskId })); setPromptQueue(prev => prev.slice(1)); }} className="flex-1 py-4 bg-[#3bb5ff] text-[#060d1a] rounded-xl font-black uppercase tracking-widest text-[10px] btn-touch">Submit</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Onboarding UI */}
      {showTerms && (
        <div className="fixed inset-0 z-[150] flex flex-col bg-[#060d1a]/95 backdrop-blur-md p-6 overflow-y-auto safe-top safe-bottom">
          <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#3bb5ff]/15 flex items-center justify-center border border-[#3bb5ff]/30 shadow-[0_0_20px_rgba(59,181,255,0.25)] animate-pulse">
              <svg viewBox="0 0 24 24" fill="none" stroke="#3bb5ff" strokeWidth="2" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">Our Terms and Policy</h2>
              <p className="text-xs text-[#3bb5ff] font-bold uppercase tracking-widest opacity-85">Please review before proceeding</p>
            </div>
            <div className="w-full bg-[#0a1628]/80 border border-[#1a3a5c] rounded-2xl p-5 shadow-2xl overflow-y-auto max-h-[50vh] custom-scrollbar text-left">
              <MiniMarkdown content={`# VAULT OPUS — TERMS OF SERVICE & PRIVACY POLICY

**Version 1-R10 | Effective Date: 2026**

Welcome to VAULT OPUS, an open-source, self-hosted cloud storage system created by WeDu. By using this software, you agree to the following terms. If you do not agree, do not use the application.

## 1. Acceptance of Terms
By downloading, installing, accessing, or using VAULT OPUS in any form (Desktop Client, Mobile Web Interface, CLI, or Android Application), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and Privacy Policy in their entirety.

## 2. Nature of the Software
- **Open Source**: VAULT OPUS is released under the **MIT License**.
- **Self-Hosted**: VAULT OPUS runs entirely on your own infrastructure. There are no centralized servers operated by WeDu.
- **No Accounts**: VAULT OPUS does not require you to create an account or provide personal information.

## 3. Discord Integration
- **Discord as Storage**: VAULT OPUS uses Discord's platform as a file storage backend via your personal Discord Bot Token.
- **Your Responsibility**: You are solely responsible for ensuring your use complies with Discord's Terms of Service. WeDu bears NO liability for any actions taken by Discord against your account.

## 4. Data Privacy
- **Zero Telemetry**: VAULT OPUS collects absolutely no usage data, analytics, or personal information.
- **Local-Only**: All config, databases, and keys are stored exclusively on your local filesystem.

## 5. Encryption & Security
- **Architecture**: Two-layer system using Argon2id + HKDF-SHA256, producing Fernet encrypted data.
- **No Recovery**: WeDu does not store or manage your keys. If you lose your seed, YOUR DATA IS IRRECOVERABLE.

## 6. Liability
- **No Guarantee**: VAULT OPUS is provided "AS IS" without warranty. WeDu makes no guarantees about data integrity or availability.
- **Limitation**: WeDu and its contributors shall NOT be liable for any direct or indirect damages arising from use.`} />
            </div>
            <button onClick={handleAcceptTerms} className="w-full py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-2xl font-bold uppercase tracking-widest text-xs btn-touch shadow-lg shadow-[#3bb5ff]/25 border border-[#3bb5ff]/30">I Accept the Terms and Conditions</button>
          </div>
        </div>
      )}

      {showWelcomeVideo && (
        <div className="fixed inset-0 z-[150] flex flex-col bg-[#060d1a]/95 backdrop-blur-md p-6 overflow-y-auto safe-top safe-bottom">
          <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#3bb5ff]/15 flex items-center justify-center border border-[#3bb5ff]/30 shadow-[0_0_20px_rgba(59,181,255,0.25)]">{Ico.download}</div>
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">Setup Tutorial</h2>
              <p className="text-xs text-[#3bb5ff] font-bold uppercase tracking-widest opacity-85">Follow this quick guide to start</p>
            </div>
            <div className="w-full bg-[#0a1628]/80 border border-[#1a3a5c] rounded-2xl p-5 shadow-2xl flex flex-col">
              <p className="text-sm text-gray-200 mb-4 leading-relaxed font-semibold">New here? go and look to this video:</p>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#1a3a5c] shadow-lg mb-4 bg-black">
                <iframe className="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed text-left font-medium">then to use the requirements you setup. put the token and the channel id either in popup menu, if it shows up. if it didn't, go to settings and then to volumes tab to create your first vault.</p>
            </div>
            <button onClick={() => { setShowWelcomeVideo(false); setTab('settings'); }} className="w-full py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-2xl font-bold uppercase tracking-widest text-xs btn-touch">I Understand</button>
          </div>
        </div>
      )}

      {showSetupModal && (
        <Modal open onClose={() => { }} title="First Time Setup" wide>
          <div className="space-y-4">
            <p className="text-sm text-gray-300">Welcome to Vault Opus! Please configure your backend connection to continue.</p>
            {!setupStatus.has_valid_token && (
              <div>
                <label className="text-xs text-gray-500 uppercase">Discord Bot Token</label>
                <input type="password" value={setupData.token} onChange={e => setSetupData({ ...setupData, token: e.target.value })} placeholder="Token" className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm mt-1" />
              </div>
            )}
            {!setupStatus.has_valid_channel && (
              <div>
                <label className="text-xs text-gray-500 uppercase">Discord Channel ID</label>
                <input type="text" value={setupData.channel_id} onChange={e => setSetupData({ ...setupData, channel_id: e.target.value })} placeholder="Channel ID" className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm mt-1" />
              </div>
            )}
            {!setupStatus.has_valid_volume && (
              <div>
                <label className="text-xs text-gray-500 uppercase">First Volume Name</label>
                <input type="text" value={setupData.db_name} onChange={e => setSetupData({ ...setupData, db_name: e.target.value })} placeholder="e.g. main" className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-3 py-3 text-sm mt-1" />
              </div>
            )}
            <button onClick={async () => {
              if (!setupStatus.has_valid_token && !setupData.token) { showToast('Please enter a Discord Bot Token', 'error'); return; }
              if (!setupStatus.has_valid_channel && !setupData.channel_id) { showToast('Please enter a Discord Channel ID', 'error'); return; }
              if (!setupStatus.has_valid_volume && !setupData.db_name) { showToast('Please enter a Volume Name', 'error'); return; }
              try {
                const r = await fetch('/api/setup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(setupData) });
                if (!r.ok) throw new Error((await r.json()).detail || 'Setup failed');
                const res = await r.json();
                setShowSetupModal(false);
                fetchDbs();
                fetchConfig();
                setSelectedDb(res.db_name);
                setTab('explorer');
                showToast('Setup complete!', 'success');
              } catch (e) { showToast(e.message, 'error'); }
            }} className="w-full py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-xl font-bold mt-2">Finish Setup</button>
          </div>
        </Modal>
      )}

      {showSharePasswordModal && (
        <Modal open onClose={() => setShowSharePasswordModal(false)} title="Package Volume">
          <div className="space-y-4">
            <div className="p-4 bg-[#0f1f3a]/50 border border-[#1a3a5c] rounded-2xl">
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Packaging</p>
              <p className="text-sm font-bold text-white truncate">{dbToShare}</p>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Password Protection (Optional):</label>
              <input autoFocus type="password" value={sharePassword} onChange={e => setSharePassword(e.target.value)} placeholder="Leave empty for no password" className="w-full bg-[#060d1a] border border-[#1a3a5c] rounded-xl px-4 py-3 text-sm text-white focus:border-[#3bb5ff] outline-none" />
              <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Recommended for sharing via public links</p>
            </div>
            <button onClick={async () => {
              try {
                const r = await fetch('/api/dbs/share', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ db_name: dbToShare, password: sharePassword || null }) });
                const d = await r.json();
                showToast('Package created in SHARABLES', 'success');
                setShowSharePasswordModal(false);
                setSharePassword('');
              } catch (e) { showToast('Packaging failed', 'error'); }
            }} className="w-full py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] btn-touch">Create .VOV Package</button>
          </div>
        </Modal>
      )}
      {showTerms && (
        <div className="fixed inset-0 z-[150] flex flex-col bg-[#060d1a]/95 backdrop-blur-md p-6 overflow-y-auto safe-top safe-bottom">
          <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#3bb5ff]/15 flex items-center justify-center border border-[#3bb5ff]/30 shadow-[0_0_20px_rgba(59,181,255,0.25)] animate-pulse">
              <svg viewBox="0 0 24 24" fill="none" stroke="#3bb5ff" strokeWidth="2" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">Our Terms and Policy</h2>
              <p className="text-xs text-[#3bb5ff] font-bold uppercase tracking-widest opacity-85">Please review before proceeding</p>
            </div>

            <div className="w-full bg-[#0a1628]/80 border border-[#1a3a5c] rounded-2xl p-5 shadow-2xl overflow-y-auto max-h-[50vh] custom-scrollbar text-left">
              <MiniMarkdown content={TERMS_AND_CONDITIONS_MARKDOWN} />
            </div>

            <button
              onClick={handleAcceptTerms}
              className="w-full py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-2xl font-bold uppercase tracking-widest text-xs btn-touch shadow-lg shadow-[#3bb5ff]/25 border border-[#3bb5ff]/30 cursor-pointer"
            >
              I Accept the Terms and Conditions
            </button>
          </div>
        </div>
      )}

      {showWelcomeVideo && (
        <div className="fixed inset-0 z-[150] flex flex-col bg-[#060d1a]/95 backdrop-blur-md p-6 overflow-y-auto safe-top safe-bottom">
          <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#3bb5ff]/15 flex items-center justify-center border border-[#3bb5ff]/30 shadow-[0_0_20px_rgba(59,181,255,0.25)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="#3bb5ff" strokeWidth="2" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">Setup Tutorial</h2>
              <p className="text-xs text-[#3bb5ff] font-bold uppercase tracking-widest opacity-85">Follow this quick guide to start</p>
            </div>

            <div className="w-full bg-[#0a1628]/80 border border-[#1a3a5c] rounded-2xl p-5 shadow-2xl flex flex-col">
              <p className="text-sm text-gray-200 mb-4 leading-relaxed font-semibold">
                New here? go and look to this video:
              </p>

              {/* YouTube Video Embed */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#1a3a5c] shadow-lg mb-4 bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={WELCOME_YOUTUBE_VIDEO_URL}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed text-left font-medium">
                then to use the requirements you setup. put the token and the channel id in requirements input places in settings. and then go to volumes tab and hit plus button to make a new volume and you would be done
              </p>
            </div>

            <button
              onClick={() => {
                setShowWelcomeVideo(false);
                setTab('settings');
              }}
              className="w-full py-4 bg-gradient-to-r from-[#006fbe] to-[#3bb5ff] text-white rounded-2xl font-bold uppercase tracking-widest text-xs btn-touch shadow-lg shadow-[#3bb5ff]/25 border border-[#3bb5ff]/30 cursor-pointer"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      {toast && <Toast key={toast.key} message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
