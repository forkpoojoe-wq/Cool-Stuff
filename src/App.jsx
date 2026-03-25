import { useState, useEffect } from 'react';
import { Gamepad2, Search, X, Maximize2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredGames, setFilteredGames] = useState(gamesData);

  useEffect(() => {
    const filtered = gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredGames(filtered);
  }, [searchQuery, selectedCategory]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const openGame = (game) => {
    setSelectedGame(game);
  };

  const closeGame = () => {
    setSelectedGame(null);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-[#051a05] text-slate-200 font-sans selection:bg-lime-500/30 relative overflow-x-hidden">
      {/* Turf Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#051a05]/50 to-[#051a05]"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-lime-900/30 bg-[#051a05]/90 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedGame(null)}>
            <div className="w-10 h-10 bg-lime-600 rounded-lg flex items-center justify-center shadow-lg shadow-lime-500/20 rotate-3 group hover:rotate-0 transition-transform">
              <Gamepad2 className="text-[#051a05] w-6 h-6" />
            </div>
            <h1 className="text-xl font-black italic tracking-tighter uppercase text-white">
              Sports <span className="text-lime-400">Hub</span>
            </h1>
          </div>

          <div className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lime-700 w-4 h-4" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full bg-black/40 border border-lime-900/30 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-lime-500/50 transition-all text-sm placeholder:text-lime-900/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-black/40 border border-lime-900/30 rounded-md text-[10px] font-mono text-lime-500 uppercase tracking-widest">
              <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></span>
              Live Stats: 1,240 Online
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Mobile Search */}
        <div className="relative mb-8 md:hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lime-700 w-4 h-4" />
          <input
            type="text"
            placeholder="Search games..."
            className="w-full bg-black/40 border border-lime-900/30 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-lime-500/50 transition-all placeholder:text-lime-900/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Hero Section */}
        {!selectedGame && (
          <section className="mb-12">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a2a0a] to-[#051a05] border border-lime-900/20 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
              {/* Stadium Lights Effect */}
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-lime-500/10 blur-[120px] rounded-full"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-lime-500/5 blur-[120px] rounded-full"></div>
              
              <div className="flex-1 text-center md:text-left relative z-10">
                <span className="inline-block px-3 py-1 bg-lime-500/20 text-lime-400 text-[10px] font-black tracking-[0.2em] uppercase rounded-md mb-4 border border-lime-500/30">
                  MVP Selection
                </span>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-4 italic uppercase tracking-tighter leading-none">
                  BitLife <br/><span className="text-lime-500">Simulator</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 max-w-lg font-medium leading-relaxed">
                  Live your best (or worst) life in this text-based simulator. Make choices, build a career, and see where life takes you!
                </p>
                <button 
                  onClick={() => openGame(gamesData.find(g => g.id === 'bitlife'))}
                  className="px-10 py-5 bg-lime-500 hover:bg-lime-400 text-[#051a05] font-black uppercase tracking-tighter rounded-xl transition-all shadow-xl shadow-lime-500/20 active:scale-95 flex items-center gap-3 group"
                >
                  Enter Stadium
                  <Gamepad2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </button>
              </div>
              <div className="flex-1 relative group">
                <div className="absolute -inset-4 bg-lime-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" 
                  alt="Featured" 
                  className="relative rounded-xl shadow-2xl border border-white/10 transform transition-transform group-hover:scale-[1.02] grayscale-[0.2] group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </section>
        )}

        {/* Games Grid */}
        {!selectedGame && (
          <section>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <h3 className="text-2xl font-black text-white flex items-center gap-3 uppercase italic tracking-tighter">
                <span className="w-3 h-8 bg-lime-500 rounded-sm skew-x-[-15deg]"></span>
                Locker Room
              </h3>
              <div className="flex flex-wrap gap-2">
                {['All', 'Sports', 'Action', 'Simulation', 'Retro', 'Puzzle', 'Clicker'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-md text-xs font-black uppercase tracking-widest transition-all border ${
                      selectedCategory === cat 
                        ? 'bg-lime-500 text-[#051a05] border-lime-500 shadow-lg shadow-lime-500/20' 
                        : 'bg-black/40 hover:bg-lime-900/20 border-lime-900/30 text-lime-700 hover:text-lime-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <motion.div
                  key={game.id}
                  layoutId={game.id}
                  whileHover={{ y: -8 }}
                  className="group relative bg-[#0a2a0a]/40 border border-lime-900/20 rounded-xl overflow-hidden cursor-pointer shadow-xl hover:shadow-lime-500/10 transition-all hover:border-lime-500/40"
                  onClick={() => openGame(game)}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={game.thumbnail} 
                      alt={game.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051a05] via-transparent to-transparent opacity-80"></div>
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-black text-lime-500 uppercase tracking-widest border border-lime-500/20">
                      {game.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-black text-white mb-1 group-hover:text-lime-400 transition-colors uppercase italic tracking-tighter">
                      {game.title}
                    </h4>
                    <p className="text-slate-500 text-sm line-clamp-2 font-medium">
                      {game.description}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <div className="w-10 h-10 bg-lime-500 rounded-lg flex items-center justify-center shadow-xl shadow-lime-500/40">
                      <ExternalLink className="w-5 h-5 text-[#051a05]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Game Player View */}
        <AnimatePresence>
          {selectedGame && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 bg-[#051a05] flex flex-col"
            >
              <div className="h-16 bg-[#0a2a0a] border-b border-lime-900/30 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={closeGame}
                    className="p-2 hover:bg-lime-500/10 rounded-lg transition-colors text-lime-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <h2 className="text-lg font-black text-white uppercase italic tracking-tighter">
                    {selectedGame.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-lime-500/10 rounded-lg transition-colors text-lime-600 hover:text-lime-400 flex items-center gap-2"
                  >
                    <Maximize2 className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest hidden sm:inline">Fullscreen</span>
                  </button>
                  <button 
                    onClick={() => window.open(selectedGame.url, '_blank')}
                    className="flex items-center gap-2 px-4 py-2 bg-lime-600 hover:bg-lime-500 text-[#051a05] text-xs font-black uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-lime-500/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    New Tab
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-black relative flex flex-col">
                {selectedGame.url.includes('coolmathgames.com') ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#051a05]">
                    <div className="w-24 h-24 bg-lime-500/10 rounded-2xl flex items-center justify-center mb-6 border border-lime-500/20 rotate-3">
                      <ExternalLink className="w-12 h-12 text-lime-400" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-3 uppercase italic tracking-tighter">Away Game Required</h3>
                    <p className="text-slate-400 max-w-md mb-8 text-lg font-medium">
                      Coolmath Games blocks playing inside other sites. Click the button below to open it in a new tab and start playing!
                    </p>
                    <button 
                      onClick={() => window.open(selectedGame.url, '_blank')}
                      className="px-10 py-5 bg-lime-500 hover:bg-lime-400 text-[#051a05] font-black uppercase tracking-tighter rounded-xl transition-all shadow-xl shadow-lime-500/20 active:scale-95 flex items-center gap-3 text-lg"
                    >
                      <ExternalLink className="w-6 h-6" />
                      Open in New Tab
                    </button>
                  </div>
                ) : selectedGame.url ? (
                  <iframe
                    key={selectedGame.url}
                    src={selectedGame.url}
                    className="flex-1 w-full border-none"
                    title={selectedGame.title}
                    allowFullScreen
                    allow="autoplay; fullscreen; keyboard; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-[#051a05]">
                    <div className="w-16 h-16 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <div className="p-4 bg-[#0a2a0a] border-t border-lime-900/30">
                <div className="container mx-auto flex items-center justify-between">
                  <div className="max-w-2xl">
                    <p className="text-slate-400 text-sm font-medium line-clamp-1">{selectedGame.description}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => {
                        const currentUrl = selectedGame.url;
                        setSelectedGame(prev => ({...prev, url: ''}));
                        setTimeout(() => setSelectedGame(prev => ({...prev, url: currentUrl})), 50);
                      }}
                      className="text-lime-700 hover:text-lime-400 text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
                    >
                      Reset Play
                    </button>
                    <div className="flex gap-4">
                      <button className="text-lime-900 hover:text-lime-400 text-[10px] font-black uppercase tracking-[0.2em] transition-colors">
                        Report
                      </button>
                      <button className="text-lime-900 hover:text-lime-400 text-[10px] font-black uppercase tracking-[0.2em] transition-colors">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      {!selectedGame && (
        <footer className="border-t border-lime-900/20 py-16 mt-20 bg-black/20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-8 bg-lime-600 rounded flex items-center justify-center">
                <Gamepad2 className="text-[#051a05] w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white uppercase italic tracking-tighter">Sports <span className="text-lime-500">Hub</span></span>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto font-medium">
              The ultimate unblocked arena. Play your favorite games anywhere, anytime. No timeouts, just pure action.
            </p>
            <div className="flex justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-2xl font-black text-white italic">50+</div>
                <div className="text-[10px] font-black text-lime-700 uppercase tracking-widest">Games</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-white italic">24/7</div>
                <div className="text-[10px] font-black text-lime-700 uppercase tracking-widest">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-white italic">100%</div>
                <div className="text-[10px] font-black text-lime-700 uppercase tracking-widest">Unblocked</div>
              </div>
            </div>
            <div className="pt-8 border-t border-lime-900/10 text-lime-900 text-[10px] font-black uppercase tracking-[0.3em]">
              © 2026 Sports Hub Arena. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
