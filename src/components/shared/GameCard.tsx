//src/components/shared/GameCard.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Star,
  BarChart3,
  Play,
  CalendarDays,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Game } from "@/app/@types/types";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (
      isHovered &&
      game.short_screenshots &&
      game.short_screenshots.length > 1
    ) {
      intervalId = setInterval(() => {
        setCurrentScreenshotIndex(
          (prevIndex) => (prevIndex + 1) % (game.short_screenshots?.length || 1)
        );
      }, 2200);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovered, game.short_screenshots]);

  const mainImage =
    isHovered && game.short_screenshots && game.short_screenshots.length > 0
      ? game.short_screenshots[currentScreenshotIndex]?.image
      : game.background_image;

  const displayPlatforms = game.parent_platforms?.slice(0, 4) || [];
  const getPlatformIcon = (slug: string) => {
    if (slug.includes("pc")) return "💻";
    if (slug.includes("playstation")) return "🎮";
    if (slug.includes("xbox")) return "❎";
    if (slug.includes("nintendo")) return "🍄";
    if (slug.includes("ios")) return "📱";
    if (slug.includes("android")) return "🤖";
    return "🕹️";
  };

  const handlePrevScreenshot = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentScreenshotIndex(
      (prev) =>
        (prev - 1 + (game.short_screenshots?.length || 1)) %
        (game.short_screenshots?.length || 1)
    );
  };

  const handleNextScreenshot = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentScreenshotIndex(
      (prev) => (prev + 1) % (game.short_screenshots?.length || 1)
    );
  };

  return (
    <div
      className="
        bg-slate-800/70 backdrop-blur-sm border border-slate-700
        rounded-xl shadow-xl overflow-hidden
        transform transition-all duration-300 ease-out
        hover:scale-[1.03] hover:shadow-cyan-500/30 hover:border-cyan-600
        relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentScreenshotIndex(0);
      }}
    >
      <Link href={`/games/${game.slug}`} className="block cursor-pointer">
        <div className="w-full h-52 relative">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={`${game.name} screenshot`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-all duration-500 ease-in-out group-hover:opacity-80"
              key={mainImage}
              priority={game.id < 10}
            />
          ) : (
            <div className="w-full h-full bg-slate-700 flex flex-col items-center justify-center text-slate-500">
              <ImageIcon size={48} className="mb-2 opacity-50" />
              <span>No Image Available</span>
            </div>
          )}
          <div
            className="
            absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent
            p-3 flex flex-col justify-end
            transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            {displayPlatforms.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {displayPlatforms.map(
                  ({
                    platform,
                  }: {
                    platform: { id: number; name: string; slug: string };
                  }) => (
                    <span
                      key={platform.id}
                      title={platform.name}
                      className="
                        bg-slate-600/80 text-gray-200 text-xs px-2 py-1 rounded-md
                        hover:bg-cyan-600/90 hover:text-white transition-colors"
                    >
                      {getPlatformIcon(platform.slug)}
                      <span className="ml-1 hidden sm:inline">
                        {platform.name}
                      </span>
                    </span>
                  )
                )}
              </div>
            )}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                            w-16 h-16 bg-black/50 rounded-full flex items-center justify-center
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100"
            >
              <Play size={32} className="text-white fill-white" />
            </div>
          </div>
          {isHovered &&
            game.short_screenshots &&
            game.short_screenshots.length > 1 && (
              <>
                <button
                  onClick={handlePrevScreenshot}
                  className="absolute top-1/2 left-2 -translate-y-1/2 z-10 p-2 bg-black/40 text-white rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 focus:outline-none"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextScreenshot}
                  className="absolute top-1/2 right-2 -translate-y-1/2 z-10 p-2 bg-black/40 text-white rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 focus:outline-none"
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
        </div>

        <div className="p-4">
          <h3 className="text-xl font-bold mb-1.5 truncate text-slate-100 group-hover:text-sky-300 transition-colors">
            {game.name}
          </h3>

          {game.released && (
            <p className="text-xs text-slate-400 mb-2 flex items-center">
              <CalendarDays size={14} className="mr-1.5 text-slate-500" />
              {new Date(game.released).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          )}

          <div className="flex justify-between items-center text-sm mb-2">
            {game.rating > 0 && (
              <div
                className="flex items-center"
                title={`Rating: ${game.rating.toFixed(1)}/5`}
              >
                <Star
                  size={16}
                  className="mr-1 text-yellow-400 fill-yellow-400"
                />
                <span className="text-yellow-300 font-semibold">
                  {game.rating.toFixed(1)}
                </span>
              </div>
            )}
            {game.metacritic && (
              <div
                className={`flex items-center px-2 py-0.5 rounded-md text-xs font-bold
                  ${
                    game.metacritic > 75
                      ? "bg-green-500/20 text-green-400"
                      : game.metacritic > 50
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                title={`Metascore: ${game.metacritic}`}
              >
                <BarChart3 size={14} className="mr-1" />
                {game.metacritic}
              </div>
            )}
          </div>
        </div>
      </Link>
      {isHovered &&
        game.short_screenshots &&
        game.short_screenshots.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center p-1 space-x-1.5 z-10">
            {game.short_screenshots.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentScreenshotIndex(index);
                }}
                className={`w-2 h-2 rounded-full outline-none transition-all duration-200
                ${
                  currentScreenshotIndex === index
                    ? "bg-sky-400 scale-125"
                    : "bg-slate-500/70 hover:bg-slate-400/90"
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        )}
    </div>
  );
}
