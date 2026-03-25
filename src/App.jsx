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
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedGame(null)}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Cool stuff
            </h1>
          </div>

          <div className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            {/* User elements removed */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Mobile Search */}
        <div className="relative mb-8 md:hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search games..."
            className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Game Grid */}

        {/* Hero Section */}
        {!selectedGame && (
          <section className="mb-12">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-slate-800 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold tracking-wider uppercase rounded-full mb-4">
                  Featured Game
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                  BitLife
                </h2>
                <p className="text-slate-400 text-lg mb-8 max-w-lg">
                  Live your best (or worst) life in this text-based simulator. Make choices, build a career, and see where life takes you!
                </p>
                <button 
                  onClick={() => openGame(gamesData.find(g => g.id === 'bitlife'))}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                >
                  Play Now
                </button>
              </div>
              <div className="flex-1 relative group">
                <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" 
                  alt="Featured" 
                  className="relative rounded-2xl shadow-2xl border border-white/10 transform transition-transform group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </section>
        )}

        {/* Games Grid */}
        {!selectedGame && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                Game Catalog
              </h3>
              <div className="flex gap-2">
                {['All', 'Sports', 'Action', 'Simulation', 'Retro', 'Puzzle', 'Clicker'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white'
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
                  className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-indigo-500/10 transition-all"
                  onClick={() => openGame(game)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={game.thumbnail} 
                      alt={game.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                      {game.title}
                    </h4>
                    <p className="text-slate-500 text-sm line-clamp-2">
                      {game.description}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-white" />
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-50 bg-[#0f172a] flex flex-col"
            >
              <div className="h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={closeGame}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <h2 className="text-lg font-bold text-white">{selectedGame.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white flex items-center gap-2"
                  >
                    <Maximize2 className="w-5 h-5" />
                    <span className="text-sm font-medium hidden sm:inline">Fullscreen</span>
                  </button>
                  <button 
                    onClick={() => window.open(selectedGame.url, '_blank')}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    New Tab
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-black relative flex flex-col">
                {selectedGame.url.includes('coolmathgames.com') ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-950">
                    <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 border border-indigo-500/20">
                      <ExternalLink className="w-10 h-10 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">This game doesn't work here</h3>
                    <p className="text-slate-400 max-w-md mb-8 text-lg">
                      Coolmath Games blocks playing inside other sites. Click the button below to open it in a new tab and start playing!
                    </p>
                    <button 
                      onClick={() => window.open(selectedGame.url, '_blank')}
                      className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center gap-3 text-lg"
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
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <div className="p-4 bg-slate-900 border-t border-slate-800">
                <div className="container mx-auto flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">{selectedGame.description}</p>
                  </div>
                  <button 
                    onClick={() => {
                      const currentUrl = selectedGame.url;
                      setSelectedGame(prev => ({...prev, url: ''}));
                      setTimeout(() => setSelectedGame(prev => ({...prev, url: currentUrl})), 50);
                    }}
                    className="text-slate-400 hover:text-white text-sm flex items-center gap-1"
                  >
                    Reload Game
                  </button>
                  <div className="flex gap-4">
                    <button className="text-slate-400 hover:text-white text-sm flex items-center gap-1">
                      Report Issue
                    </button>
                    <button className="text-slate-400 hover:text-white text-sm flex items-center gap-1">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      {!selectedGame && (
        <footer className="border-t border-slate-800 py-12 mt-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Gamepad2 className="text-indigo-500 w-6 h-6" />
              <span className="text-xl font-bold text-white">Cool stuff</span>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">
              The best collection of unblocked games for school. Play your favorite games anywhere, anytime.
            </p>
            <div className="mt-8 pt-8 border-t border-slate-800/50 text-slate-600 text-xs">
              © 2026 Unblocked Games Hub. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
