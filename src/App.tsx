import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, Search, Trash2, Disc3, Lock, LogOut, FileAudio, Image as ImageIcon, CheckCircle2, ChevronRight, Volume2, ArrowLeft, Instagram, Twitter, Youtube, MessageCircle, Send, X } from 'lucide-react';

// ==========================================
// 1. INTERFACES & SUPABASE CONFIG
// ==========================================
interface Artist {
  id: number;
  name: string;
  genre: string;
  image_url: string;
  status?: string;
}

interface Release {
  id: number;
  title: string;
  artist_name: string;
  year?: string;
  type: string;
  image_url?: string;
  track_url?: string;
}

const SUPABASE_URL = 'https://goigwfkbsmfvsvugdqza.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvaWd3Zmtic21mdnN2dWdkcXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMzI3OTYsImV4cCI6MjA5MzcwODc5Nn0.vL7iAxtz-85G6j_MfifBhEZALfJJ1Cyp-TxLQ8Iee9o';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// 2. MAIN APP COMPONENT (ROUTER)
// ==========================================
export default function App() {
  const [currentTrack, setCurrentTrack] = useState<Release | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying, currentTrack]);

  return (
    <Router>
      <div className="bg-zinc-950 text-white min-h-screen antialiased pb-24 font-sans selection:bg-green-500/30">
        
        <Routes>
          <Route path="/" element={<Home setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentTrack={currentTrack} />} />
          <Route path="/artist/:id" element={<ArtistProfile setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentTrack={currentTrack} />} />
        </Routes>

        <audio ref={audioRef} src={currentTrack?.track_url} onEnded={() => setIsPlaying(false)} />
        
        {/* GLOBAL PLAYER BAR */}
        {currentTrack && (
          <div className="fixed bottom-0 left-0 right-0 z-[100] bg-zinc-950/90 backdrop-blur-3xl border-t border-white/10 p-5 px-6 md:px-12 flex justify-between items-center animate-slide-up">
            <div className="flex items-center gap-4 w-1/3">
               <Disc3 size={24} className={`text-green-500 ${isPlaying ? 'animate-spin' : ''}`} />
               <div className="hidden sm:block overflow-hidden">
                  <p className="text-[10px] font-black uppercase tracking-widest truncate">{currentTrack.title}</p>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase truncate tracking-widest">{currentTrack.artist_name}</p>
               </div>
            </div>
            <button onClick={() => setIsPlaying(!isPlaying)} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-all shadow-xl">
               {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
            </button>
            <div className="w-1/3 flex justify-end text-zinc-600"><Volume2 size={18} /></div>
          </div>
        )}

        {/* FLOATING CHATBOT */}
        <Chatbot />
      </div>
    </Router>
  );
}

// ==========================================
// 3. HOME VIEW
// ==========================================
function Home({ setCurrentTrack, setIsPlaying, isPlaying, currentTrack }: any) {
  const [scrolled, setScrolled] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [releases, setReleases] = useState<Release[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const fetchData = async () => {
    const { data: aData } = await supabase.from('artists').select('*').order('id', { ascending: false });
    const { data: rData } = await supabase.from('releases').select('*').order('id', { ascending: false });
    if (aData) setArtists(aData as Artist[]);
    if (rData) setReleases(rData as Release[]);
  };

  useEffect(() => {
    fetchData();
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredReleases = releases.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.artist_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'All' || r.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="animate-fade-in">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="font-black italic tracking-widest text-xl uppercase">Dope Stereo<span className="text-green-500">.</span></button>
          <ul className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <li><button onClick={() => document.getElementById('roster')?.scrollIntoView({behavior:'smooth'})} className="hover:text-green-400 transition-colors">Roster</button></li>
            <li><button onClick={() => document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'})} className="hover:text-green-400 transition-colors">E-Catalog</button></li>
            <li><button onClick={() => document.getElementById('portal')?.scrollIntoView({behavior:'smooth'})} className="hover:text-green-400 transition-colors">Portal</button></li>
          </ul>
        </div>
      </nav>

      {/* HERO SECTION WITH VIDEO */}
      <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-30">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-12">WE DON'T<br />JUST MAKE<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">MUSIC.</span></h1>
          <button onClick={() => document.getElementById('roster')?.scrollIntoView({behavior:'smooth'})} className="bg-green-500 text-black px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
             Explore Roster <ChevronRight size={14} className="inline ml-1" />
          </button>
        </div>
      </section>

      {/* ROSTER SECTION */}
      <section id="roster" className="py-40 max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-6xl font-black tracking-tighter uppercase mb-24 leading-none">The<br />Roster</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {artists.map((artist) => (
            <Link key={artist.id} to={`/artist/${artist.id}`} className="group relative bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-white/5 h-[450px] shadow-2xl block hover:-translate-y-2 transition-transform">
              <img src={artist.image_url} alt={artist.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10">
                <p className="text-green-500 text-[9px] font-bold tracking-widest uppercase mb-2">{artist.genre}</p>
                <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">{artist.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* E-CATALOG WITH SEARCH & FILTER */}
      <section id="catalog" className="py-40 bg-zinc-900/10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-6xl font-black tracking-tighter uppercase leading-none">E-Catalog</h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-green-500 transition-colors" size={16} />
                <input type="text" placeholder="Search Track or Artist..." className="bg-zinc-950 border border-white/10 rounded-full pl-12 pr-6 py-3 text-xs font-bold outline-none focus:border-green-500 w-full sm:w-64 transition-all" onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <div className="flex bg-zinc-950 border border-white/10 rounded-full p-1">
                {['All', 'Single', 'EP', 'Album'].map(t => (
                  <button key={t} onClick={() => setFilterType(t)} className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${filterType === t ? 'bg-green-500 text-black' : 'text-zinc-500 hover:text-white'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {filteredReleases.map((release) => (
              <div key={release.id} onClick={() => { setCurrentTrack(release); setIsPlaying(true); }} className="group cursor-pointer">
                <div className="aspect-square bg-zinc-950 rounded-[2rem] mb-6 overflow-hidden border border-white/5 relative">
                  {release.image_url ? (
                    <img src={release.image_url} className={`w-full h-full object-cover transition-all ${isPlaying && currentTrack?.id === release.id ? 'scale-110 blur-sm opacity-40' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-950"><Disc3 className="text-zinc-800" size={40} /></div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/40 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-full bg-green-500 text-black flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                       {currentTrack?.id === release.id && isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mb-1">{release.type}</p>
                <h4 className="font-black text-sm uppercase truncate">{release.title}</h4>
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest truncate">{release.artist_name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTAL SECTION */}
      <section id="portal" className="py-40 max-w-7xl mx-auto px-6 lg:px-12">
        {!isLoggedIn ? (
          <div className="bg-zinc-900/20 p-20 rounded-[4rem] border border-white/5 text-center">
             <h2 className="text-7xl font-black tracking-tighter uppercase mb-8 leading-none">Internal<br/>Portal</h2>
             <button onClick={() => setIsLoggedIn(true)} className="bg-white text-black px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-green-500 transition-all shadow-2xl">Authorize Access</button>
          </div>
        ) : (
          <Dashboard onLogout={() => setIsLoggedIn(false)} refresh={fetchData} artists={artists} releases={releases} />
        )}
      </section>
    </div>
  );
}

// ==========================================
// 4. ARTIST PROFILE VIEW
// ==========================================
function ArtistProfile({ setCurrentTrack, setIsPlaying, isPlaying, currentTrack }: any) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [artistReleases, setArtistReleases] = useState<Release[]>([]);

  useEffect(() => {
    async function getProfile() {
      const { data: aData } = await supabase.from('artists').select('*').eq('id', id).single();
      if (aData) {
        setArtist(aData as Artist);
        const { data: rData } = await supabase.from('releases').select('*').eq('artist_name', aData.name);
        if (rData) setArtistReleases(rData as Release[]);
      }
    }
    getProfile();
  }, [id]);

  if (!artist) return <div className="h-screen bg-zinc-950" />

  return (
    <div className="pb-40 animate-fade-in">
      <nav className="fixed top-0 left-0 right-0 z-50 p-8 flex justify-between pointer-events-none">
        <button onClick={() => navigate('/')} className="p-4 bg-zinc-950/80 backdrop-blur-xl rounded-full border border-white/10 text-white hover:text-green-500 transition-all pointer-events-auto shadow-2xl">
          <ArrowLeft size={20} />
        </button>
      </nav>

      <div className="relative h-[60vh] flex flex-col justify-end items-center text-center overflow-hidden pb-20">
        <img src={artist.image_url} className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        <div className="relative z-10">
          <div className="w-48 h-48 rounded-[3rem] overflow-hidden border-4 border-green-500/20 shadow-2xl mx-auto mb-8"><img src={artist.image_url} className="w-full h-full object-cover" /></div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">{artist.name}</h1>
          <p className="text-green-500 font-bold uppercase tracking-[0.5em] text-[10px]">{artist.genre}</p>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid gap-4">
          {artistReleases.map(release => (
            <div key={release.id} onClick={() => { setCurrentTrack(release); setIsPlaying(true); }} className={`group flex items-center justify-between p-6 rounded-[2rem] border transition-all cursor-pointer ${currentTrack?.id === release.id ? 'bg-green-500 text-black border-green-500' : 'bg-zinc-900/40 border-white/5 hover:border-green-500/30'}`}>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-950">
                  {release.image_url ? <img src={release.image_url} className="w-full h-full object-cover" /> : <Disc3 className="w-full h-full p-4 text-zinc-800" />}
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-tight text-lg mb-1">{release.title}</h4>
                  <p className={`text-[9px] font-bold uppercase tracking-widest ${currentTrack?.id === release.id ? 'text-black/60' : 'text-zinc-500'}`}>{release.type}</p>
                </div>
              </div>
              <div className={`p-4 rounded-full ${currentTrack?.id === release.id ? 'bg-black text-white' : 'bg-zinc-950 text-green-500 shadow-xl group-hover:scale-110 transition-transform'}`}>
                {currentTrack?.id === release.id && isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ==========================================
// 5. CMS DASHBOARD
// ==========================================
function Dashboard({ onLogout, refresh, artists, releases }: any) {
  const [activeTab, setActiveTab] = useState<'artist' | 'release' | 'manage'>('artist');
  const [status, setStatus] = useState('idle');

  const handleDelete = async (id: number, table: string) => {
    if (!confirm('Hapus data ini dari database?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) refresh();
  };

  const handleUpload = async (e: any, type: string) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.target);

    try {
      if (type === 'artist') {
        const file = formData.get('photo') as File;
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
        await supabase.storage.from('media').upload(`artists/${fileName}`, file);
        const { data: url } = supabase.storage.from('media').getPublicUrl(`artists/${fileName}`);
        
        await supabase.from('artists').insert([{ name: formData.get('name'), genre: formData.get('genre'), image_url: url.publicUrl, status: 'Active' }]);
      } else {
        const tFile = formData.get('track') as File;
        const cFile = formData.get('cover') as File;
        
        const tName = `${Date.now()}-track-${tFile.name.replace(/\s+/g, '_')}`;
        await supabase.storage.from('media').upload(`masters/${tName}`, tFile);
        const { data: tUrl } = supabase.storage.from('media').getPublicUrl(`masters/${tName}`);

        const cName = `${Date.now()}-cover-${cFile.name.replace(/\s+/g, '_')}`;
        await supabase.storage.from('media').upload(`covers/${cName}`, cFile);
        const { data: cUrl } = supabase.storage.from('media').getPublicUrl(`covers/${cName}`);

        await supabase.from('releases').insert([{ title: formData.get('title'), artist_name: formData.get('artist_name'), type: formData.get('type'), track_url: tUrl.publicUrl, image_url: cUrl.publicUrl }]);
      }
      setStatus('success'); refresh(); setTimeout(() => setStatus('idle'), 2000); e.target.reset();
    } catch (err: any) { alert(err.message); setStatus('idle'); }
  };

  return (
    <div className="p-10 bg-zinc-900/40 rounded-[3rem] border border-white/10 space-y-10">
       <div className="flex justify-between items-center border-b border-white/5 pb-8">
          <div className="flex gap-4">
             {['artist', 'release', 'manage'].map(t => (
               <button key={t} onClick={() => setActiveTab(t as any)} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-green-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>
                 {t === 'manage' ? 'Manage' : `+ ${t}`}
               </button>
             ))}
          </div>
          <button onClick={onLogout} className="text-red-500 font-bold uppercase text-[10px] tracking-widest">Logout</button>
       </div>

       {activeTab === 'manage' ? (
         <div className="grid md:grid-cols-2 gap-10">
            <div>
               <h4 className="text-green-500 text-[10px] font-black uppercase mb-6 tracking-widest">Roster Management</h4>
               {artists.map((a: any) => (
                 <div key={a.id} className="flex items-center justify-between bg-zinc-950 p-4 rounded-2xl border border-white/5 mb-2">
                    <span className="text-[10px] font-bold uppercase">{a.name}</span>
                    <button onClick={() => handleDelete(a.id, 'artists')} className="text-zinc-600 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                 </div>
               ))}
            </div>
            <div>
               <h4 className="text-green-500 text-[10px] font-black uppercase mb-6 tracking-widest">Catalog Management</h4>
               {releases.map((r: any) => (
                 <div key={r.id} className="flex items-center justify-between bg-zinc-950 p-4 rounded-2xl border border-white/5 mb-2">
                    <span className="text-[10px] font-bold uppercase">{r.title}</span>
                    <button onClick={() => handleDelete(r.id, 'releases')} className="text-zinc-600 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                 </div>
               ))}
            </div>
         </div>
       ) : (
         <form onSubmit={(e) => handleUpload(e, activeTab)} className="max-w-md mx-auto bg-zinc-950 p-10 rounded-[2.5rem] border border-white/5 space-y-6">
            <h4 className="text-2xl font-black uppercase italic mb-8">Add {activeTab}</h4>
            {activeTab === 'artist' ? (
              <><input name="name" placeholder="Name" className="w-full bg-zinc-900 border border-white/5 p-5 rounded-2xl text-[10px] font-bold uppercase outline-none focus:border-green-500" required />
                <input name="genre" placeholder="Genre" className="w-full bg-zinc-900 border border-white/5 p-5 rounded-2xl text-[10px] font-bold uppercase outline-none focus:border-green-500" required />
                <input name="photo" type="file" accept="image/*" className="text-[10px] text-zinc-500 w-full p-4 border border-dashed border-white/10 rounded-2xl" required /></>
            ) : (
              <><input name="title" placeholder="Title" className="w-full bg-zinc-900 border border-white/5 p-5 rounded-2xl text-[10px] font-bold uppercase outline-none focus:border-green-500" required />
                <input name="artist_name" placeholder="Artist" className="w-full bg-zinc-900 border border-white/5 p-5 rounded-2xl text-[10px] font-bold uppercase outline-none focus:border-green-500" required />
                <select name="type" className="w-full bg-zinc-900 border border-white/5 p-5 rounded-2xl text-[10px] font-bold uppercase outline-none focus:border-green-500"><option>Single</option><option>EP</option><option>Album</option></select>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border border-dashed border-white/10 rounded-xl"><p className="text-[8px] uppercase font-bold text-zinc-500 mb-2">Cover Art</p><input name="cover" type="file" accept="image/*" className="text-[8px] w-full" required /></div>
                  <div className="text-center p-4 border border-dashed border-white/10 rounded-xl"><p className="text-[8px] uppercase font-bold text-zinc-500 mb-2">Master Audio</p><input name="track" type="file" accept="audio/*" className="text-[8px] w-full" required /></div>
                </div></>
            )}
            <button type="submit" disabled={status === 'loading'} className="w-full bg-green-500 text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-green-400 transition-all">
              {status === 'loading' ? 'Syncing...' : 'Execute Submission'}
            </button>
         </form>
       )}
    </div>
  );
}

// ==========================================
// 6. CHATBOT COMPONENT (DOPEBOT)
// ==========================================
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Halo! Gw DopeBot 🤖. Ada yang bisa dibantu soal Dope Stereo? (Ketik: demo, artis, atau rilis)", isBot: true }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.toLowerCase();
    setMessages(prev => [...prev, { text: inputText, isBot: false }]);
    setInputText("");

    setTimeout(() => {
      let botReply = "Sori bro, gw kurang paham. Coba ketik 'demo', 'artis', 'rilis', atau sapa gw aja.";
      
      // --- LOGIKA BASA-BASI (SMALL TALK) ---
      if (userMsg === "p" || userMsg === "ping") {
        botReply = "Uy! Nggak usah di-ping bro, gw selalu standby. Ada yang bisa dibantu? 😎";
      } else if (userMsg.includes("halo") || userMsg.includes("hai") || userMsg.includes("hi") || userMsg.includes("hello")) {
        botReply = "Halo juga bro! 👋 Asik banget lu mampir ke portal kita. Ada yang mau ditanyain?";
      } else if (userMsg.includes("kabar") || userMsg.includes("apa kabar")) {
        botReply = "Kabar baik bro! Server Dope Stereo lagi aman sentosa. Lu sendiri gimana? 🔥";
      } else if (userMsg.includes("siapa lu") || userMsg.includes("lu siapa")) {
        botReply = "Gw DopeBot, asisten virtual Dope Stereo yang siap bantu lu eksplor karya-karya kita.";
      } else if (userMsg.includes("keren") || userMsg.includes("mantap") || userMsg.includes("gila")) {
        botReply = "Yoi dong, Dope Stereo gitu lho! Thanks bro apresiasinya 🚀";
      } else if (userMsg.includes("makasih") || userMsg.includes("thanks") || userMsg.includes("oke") || userMsg.includes("ok")) {
        botReply = "Sama-sama bro! Silakan lanjut jalan-jalan di web kita ya. 🎧";
      } 
      // --- LOGIKA UTAMA ---
      else if (userMsg.includes("demo")) {
        botReply = "Mau kirim demo track? Keren! Langsung email aja karya lu ke A&R kita: alex@dopestereo.com 🎧";
      } else if (userMsg.includes("artis") || userMsg.includes("roster")) {
        botReply = "Roster kita lagi on-fire! Cek langsung di menu 'The Roster' buat liat talent Dope Stereo.";
      } else if (userMsg.includes("rilis") || userMsg.includes("lagu") || userMsg.includes("katalog")) {
        botReply = "Semua master audio dan rilisan terbaru kita tersimpan rapi di E-Catalog. Cek aja langsung!";
      }

      setMessages(prev => [...prev, { text: botReply, isBot: true }]);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-[100] w-14 h-14 bg-green-500 text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.4)] hover:scale-110 transition-all ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageCircle size={28} />
      </button>

      <div className={`fixed bottom-8 right-8 z-[100] w-80 bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        <div className="bg-zinc-950 p-4 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h4 className="font-black uppercase tracking-widest text-[10px]">DopeBot Assistant</h4>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors"><X size={16} /></button>
        </div>

        <div className="p-4 h-64 overflow-y-auto space-y-4 text-xs font-bold tracking-wide">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${msg.isBot ? 'bg-zinc-800 text-white rounded-tl-none' : 'bg-green-500 text-black rounded-tr-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-3 bg-zinc-950 border-t border-white/5 flex gap-2">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..." 
            className="flex-1 bg-zinc-900 border border-white/10 rounded-full px-4 py-2 text-[10px] outline-none focus:border-green-500 transition-colors"
          />
          <button type="submit" className="w-8 h-8 bg-green-500 text-black rounded-full flex items-center justify-center hover:bg-green-400 transition-colors">
            <Send size={14} className="ml-0.5" />
          </button>
        </form>
      </div>
    </>
  );
}