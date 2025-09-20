import React, { useState } from 'react';
import Header from './components/Header';
import GameOfTheDay from './components/GameOfTheDay';
import GameCategories from './components/GameCategories';
import GameGrid from './components/GameGrid';
import About from './components/About';
import Movies from './components/Movies';
import GameModal from './components/GameModal';
import { games } from './data/games';
import { Game } from './types/game';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'movies':
        return <Movies />;
      default:
        return (
          <>
            <GameOfTheDay />
            <GameCategories 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <GameGrid games={filteredGames} onGameClick={handleGameClick} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        games={games}
      />
      
      <main className="pt-20">
        {renderContent()}
      </main>

      {selectedGame && (
        <GameModal 
          game={selectedGame} 
          onClose={handleCloseModal}
          relatedGames={games.filter(g => g.id !== selectedGame.id && g.category === selectedGame.category).slice(0, 4)}
        />
      )}
      
      <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 LupineVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;