import React, { useMemo, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid } from 'react-window';
import { Game } from '../types/game';

interface GameGridProps {
  games: Game[];
  isLoading: boolean;
  onGameClick: (game: Game) => void;
}

export default function GameGrid({ games, isLoading, onGameClick }: GameGridProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const columnCount = 4;
  const rowCount = Math.ceil(games.length / columnCount);
  const cellHeight = 330;
  const cellGap = 24;

  const itemData = useMemo(() => ({ games, onGameClick }), [games, onGameClick]);

  function Cell({ columnIndex, rowIndex, style, data }: any) {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= data.games.length) return null;
    const game: Game = data.games[index];
    return (
      <div style={{
        ...style,
        left: (style.left as number) + cellGap,
        top: (style.top as number) + cellGap,
        width: (style.width as number) - cellGap,
        height: (style.height as number) - cellGap
      }} className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-[#5E17EB]/50 transition-all duration-300 group">
        <button onClick={() => data.onGameClick(game)} className="block text-left w-full">
          <div className="relative overflow-hidden">
            <img
              src={game.imageSmall}
              alt={game.title}
              loading="lazy"
              decoding="async"
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 group-hover:text-[#5E17EB] transition-colors duration-200">{game.title}</h3>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{game.description}</p>
            <div className="flex flex-wrap gap-1">
              {game.categories.slice(0, 2).map((c) => (
                <span key={c} className="px-2 py-0.5 bg-[#5E17EB]/20 border border-[#5E17EB]/30 rounded-full text-[#5E17EB] text-xs font-medium">{c}</span>
              ))}
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4" ref={containerRef}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Featured <span className="text-[#5E17EB]">Games</span>
          </h2>
          <p className="text-gray-400">{isLoading ? 'Loading…' : `${games.length} games found`}</p>
        </div>
        <div style={{ height: 900 }} className="rounded-lg border border-gray-800">
          <AutoSizer>
            {({ width, height }) => {
              let cols = 1;
              if (width >= 1280) cols = 4;
              else if (width >= 1024) cols = 3;
              else if (width >= 768) cols = 2;
              const rows = Math.ceil(games.length / cols);
              const colWidth = (width - (cols + 1) * cellGap) / cols;
              const CellResponsive = (props: any) => (
                <Cell {...props} />
              );
              return (
                <Grid
                  columnCount={cols}
                  columnWidth={colWidth}
                  height={height}
                  rowCount={rows}
                  rowHeight={cellHeight}
                  width={width}
                  itemData={itemData}
                  overscanRowCount={2}
                >
                  {CellResponsive}
                </Grid>
              );
            }}
          </AutoSizer>
        </div>
        {games.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No games found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}