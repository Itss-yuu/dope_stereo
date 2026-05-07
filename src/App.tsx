import { useState, useEffect, useRef } from 'react';
import { Film, Music, Play, Instagram, Twitter, Youtube, ChevronRight, Lock, LogOut, Disc3, TrendingUp, Clock, Star } from 'lucide-react';

const artists = [
  {
    id: 1,
    name: 'NOVA JADE',
    genre: 'Indie R&B',
    image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    status: 'Active',
  },
  {
    id: 2,
    name: 'KAEL RIVERS',
    genre: 'Electronic Soul',
    image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    status: 'Recording',
  },
  {
    id: 3,
    name: 'MIRA SOLENE',
    genre: 'Dark Pop',
    image: 'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    status: 'Touring',
  },
];

const unreleasedTracks = [
  { id: 1, title: 'Echoes in Static', artist: 'Nova Jade', duration: '3:47', status: 'Mixing', date: 'Jun 2026' },
  { id: 2, title: 'Neon Collapse', artist: 'Kael Rivers', duration: '4:12', status: 'Mastering', date: 'Jul 2026' },
  { id: 3, title: 'Glass Season', artist: 'Mira Solene', duration: '3:29', status: 'Recording', date: 'Aug 2026' },
  { id: 4, title: 'Low Signal', artist: 'Nova Jade', duration: '5:03', status: 'Mixing', date: 'Jun 2026' },
  { id: 5, title: 'Orbit (feat. Kael)', artist: 'Mira Solene', duration: '3:55', status: 'Finalizing', date: 'Sep 2026' },
];

const loggedInUser = { name: 'Alex', role: 'A&R Manager' };

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen antialiased">
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-1 group">
            <span className="text-xl font-black tracking-[0.15em] text-white">DOPE STEREO</span>
            <span className="w-2 h-2 rounded-full bg-green-400 ml-0.5 group-hover:scale-125 transition-transform duration-200" />
          </button>
          <ul className="hidden md:flex items-center gap-8">
            {['home', 'roster', 'catalog', 'portal'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollTo(item)}
                  className={`text-xs font-semibold tracking-[0.12em] uppercase transition-colors duration-200 ${activeSection === item ? 'text-green-400' : 'text-zinc-400 hover:text-white'}`}
                >
                  {item === 'catalog' ? 'E-Catalog' : item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => scrollTo('portal')}
            className="hidden md:flex items-center gap-2 border border-green-500/40 text-green-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 hover:bg-green-400/10 hover:border-green-400 transition-all duration-200"
          >
            <Lock size={12} />
            Portal
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950" />
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <Film size={320} strokeWidth={0.5} className="text-zinc-400" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-green-400 text-xs font-semibold tracking-[0.3em] uppercase mb-8 opacity-80">
            Music Agency &amp; Record Label — Est. 2019
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.92] tracking-tight text-white mb-10">
            WE DON&apos;T<br />
            JUST MAKE<br />
            <span className="text-green-400">MUSIC.</span><br />
            WE MAKE<br />
            ERAS.
          </h1>
          <p className="text-zinc-400 text-base lg:text-lg max-w-md mx-auto mb-12 leading-relaxed">
            Shaping culture through sound. Representing the next generation of genre-defining artists.
          </p>
          <button
            onClick={() => scrollTo('roster')}
            className="group inline-flex items-center gap-3 bg-green-400 text-zinc-950 text-xs font-black tracking-[0.2em] uppercase px-8 py-4 hover:bg-green-300 transition-all duration-200"
          >
            DISCOVER THE SOUND
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest text-zinc-500 uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>
      </section>

      {/* ROSTER */}
      <section id="roster" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-green-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Our Artists</p>
            <h2 className="text-5xl lg:text-6xl font-black tracking-tight">THE ROSTER</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-semibold tracking-widest uppercase transition-colors duration-200">
            Full Roster <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* E-CATALOG */}
      <section id="catalog" className="py-32 bg-zinc-900/30 border-t border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-green-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Releases</p>
            <h2 className="text-5xl lg:text-6xl font-black tracking-tight">E-CATALOG</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Frequency Loss', artist: 'Nova Jade', year: '2025', type: 'Album', plays: '12.4M' },
              { title: 'Synthetic Blue', artist: 'Kael Rivers', year: '2025', type: 'EP', plays: '8.7M' },
              { title: 'Mirror Season', artist: 'Mira Solene', year: '2024', type: 'Album', plays: '21.1M' },
              { title: 'Static Hours', artist: 'Nova Jade', year: '2024', type: 'Single', plays: '5.2M' },
            ].map((release, i) => (
              <div
                key={i}
                className="group p-5 border border-zinc-800 hover:border-zinc-600 transition-colors duration-200 cursor-pointer"
              >
                <div className="aspect-square bg-zinc-800 mb-4 flex items-center justify-center relative overflow-hidden">
                  <Disc3
                    size={48}
                    className="text-zinc-600 group-hover:text-zinc-500 transition-all duration-700 group-hover:rotate-180"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="text-xs text-zinc-500 font-semibold tracking-widest uppercase mb-1">
                  {release.type} · {release.year}
                </p>
                <h3 className="font-black text-base text-white mb-1 tracking-tight">{release.title}</h3>
                <p className="text-zinc-400 text-xs mb-3">{release.artist}</p>
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                  <TrendingUp size={11} />
                  <span>{release.plays} streams</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT PORTAL */}
      <section id="portal" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-green-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Secure Access</p>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight">CLIENT PORTAL</h2>
        </div>

        {!isLoggedIn ? (
          <LoginForm onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <Dashboard onLogout={() => setIsLoggedIn(false)} />
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800/60 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1">
            <span className="text-sm font-black tracking-[0.15em] text-zinc-400">DOPE STEREO</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 ml-0.5" />
          </div>
          <p className="text-zinc-600 text-xs tracking-wide order-3 md:order-2 text-center">
            &copy; 2026 PT. Penerbit Digital Stereo. All rights reserved.
          </p>
          <div className="flex items-center gap-5 order-2 md:order-3">
            {[Instagram, Twitter, Youtube].map((Icon) => (
              <a key={Icon.displayName} href="#" className="text-zinc-600 hover:text-white transition-colors duration-200">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function ArtistCard({ artist }: { artist: typeof artists[number] }) {
  return (
    <div
      className="group relative cursor-pointer border border-zinc-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(74,222,128,0.15)]"
    >
      <div className="aspect-[3/4] overflow-hidden bg-zinc-900 relative">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full border border-green-400/60 flex items-center justify-center backdrop-blur-sm bg-zinc-950/40">
            <Play size={18} className="text-green-400 ml-0.5" fill="currentColor" />
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span className="text-xs font-semibold tracking-widest uppercase px-2 py-1 bg-zinc-950/70 text-green-400 backdrop-blur-sm">
            {artist.status}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-black tracking-wide text-white mb-1">{artist.name}</h3>
        <p className="text-zinc-500 text-xs font-medium tracking-widest uppercase">{artist.genre}</p>
      </div>
    </div>
  );
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="max-w-md">
      <div className="border border-zinc-800 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 border border-green-500/40 flex items-center justify-center">
            <Lock size={16} className="text-green-400" />
          </div>
          <div>
            <p className="font-bold text-sm tracking-wide">Restricted Access</p>
            <p className="text-zinc-500 text-xs mt-0.5">Authorized personnel only</p>
          </div>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-xs font-semibold tracking-widest uppercase text-zinc-500 block mb-2">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="alex@dopestereo.com"
              className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm px-4 py-3 focus:outline-none focus:border-green-500 transition-colors duration-200"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold tracking-widest uppercase text-zinc-500 block mb-2">
              Password
            </label>
            <input
              type="password"
              defaultValue="password"
              className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm px-4 py-3 focus:outline-none focus:border-green-500 transition-colors duration-200"
              placeholder="••••••••"
            />
          </div>
        </div>
        <button
          onClick={onLogin}
          className="w-full bg-green-400 text-zinc-950 text-xs font-black tracking-[0.2em] uppercase py-4 hover:bg-green-300 transition-colors duration-200"
        >
          ACCESS PORTAL
        </button>
      </div>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="space-y-8">
      <div className="border border-zinc-800 p-6 flex items-start justify-between">
        <div>
          <p className="text-green-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Dashboard</p>
          <h3 className="text-3xl font-black tracking-tight">
            Welcome back, <span className="text-green-400">{loggedInUser.name}</span>
          </h3>
          <p className="text-zinc-500 text-sm mt-1">{loggedInUser.role} · Dope Stereo Records</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <p className="text-xs text-zinc-500 mb-1">Last Login</p>
            <p className="text-sm font-semibold">Today, 09:41 AM</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-semibold tracking-widest uppercase border border-zinc-700 hover:border-zinc-500 px-4 py-2 transition-all duration-200"
          >
            <LogOut size={12} />
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Tracks', value: '23', icon: Music },
          { label: 'In Mastering', value: '4', icon: Star },
          { label: 'Pending Review', value: '7', icon: Clock },
          { label: 'Q3 Releases', value: '3', icon: TrendingUp },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="border border-zinc-800 p-5">
            <div className="flex items-center justify-between mb-3">
              <Icon size={14} className="text-zinc-500" />
              <span className="text-xs text-green-400 font-semibold">+</span>
            </div>
            <p className="text-3xl font-black mb-1">{value}</p>
            <p className="text-zinc-500 text-xs font-medium tracking-wide">{label}</p>
          </div>
        ))}
      </div>

      <div className="border border-zinc-800">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h4 className="font-black text-sm tracking-wide">UNRELEASED TRACKS</h4>
          <span className="text-xs text-zinc-500 font-medium">{unreleasedTracks.length} tracks</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800/60">
                <th className="text-left text-xs font-semibold text-zinc-500 tracking-widest uppercase px-6 py-3">#</th>
                <th className="text-left text-xs font-semibold text-zinc-500 tracking-widest uppercase px-4 py-3">Title</th>
                <th className="text-left text-xs font-semibold text-zinc-500 tracking-widest uppercase px-4 py-3 hidden md:table-cell">Artist</th>
                <th className="text-left text-xs font-semibold text-zinc-500 tracking-widest uppercase px-4 py-3 hidden lg:table-cell">Duration</th>
                <th className="text-left text-xs font-semibold text-zinc-500 tracking-widest uppercase px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-zinc-500 tracking-widest uppercase px-4 py-3 hidden md:table-cell">Est. Release</th>
              </tr>
            </thead>
            <tbody>
              {unreleasedTracks.map((track, i) => (
                <tr
                  key={track.id}
                  className="border-b border-zinc-800/30 hover:bg-zinc-900/50 transition-colors duration-150 group cursor-pointer"
                >
                  <td className="px-6 py-4 text-zinc-600 text-sm font-mono">{String(i + 1).padStart(2, '0')}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center group-hover:bg-green-400/10 transition-colors duration-150">
                        <Play size={10} className="text-zinc-500 group-hover:text-green-400 transition-colors duration-150 ml-0.5" fill="currentColor" />
                      </div>
                      <span className="font-semibold text-sm text-white">{track.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-zinc-400 text-sm hidden md:table-cell">{track.artist}</td>
                  <td className="px-4 py-4 text-zinc-500 text-sm font-mono hidden lg:table-cell">{track.duration}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs font-semibold tracking-widest uppercase px-2 py-1 ${
                        track.status === 'Mastering' || track.status === 'Finalizing'
                          ? 'text-green-400 bg-green-400/10'
                          : track.status === 'Mixing'
                          ? 'text-blue-400 bg-blue-400/10'
                          : 'text-zinc-400 bg-zinc-800'
                      }`}
                    >
                      {track.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-zinc-500 text-xs font-medium hidden md:table-cell">{track.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
