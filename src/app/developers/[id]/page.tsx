// src/app/developers/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  AlertTriangle,
  Info,
  ChevronLeft,
  ChevronRight,
  Users,
  Gamepad2,
  Home,
} from "lucide-react";
import { DeveloperDetails, Game, PaginatedResponse } from "@/@types/types";
import GameCard from "@/components/shared/GameCard";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface DeveloperDetailPageProps {
  params: { id: string };
}

export default function DeveloperDetailPage({
  params,
}: DeveloperDetailPageProps) {
  const { id: developerId } = params;
  const [developer, setDeveloper] = useState<DeveloperDetails | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingGames, setLoadingGames] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gamesPage, setGamesPage] = useState(1);
  const [totalGamesPages, setTotalGamesPages] = useState(1);
  const [totalGamesCount, setTotalGamesCount] = useState(0);
  const gamesPageSize = 6;

  useEffect(() => {
    async function fetchInitialData() {
      if (!developerId) return;
      setLoading(true);
      setError(null);

      try {
        const devResponse = await fetch(
          `${API_BASE_URL}/developers/${developerId}?key=${API_KEY}`
        );
        if (!devResponse.ok) {
          const errorData = await devResponse.json();
          if (devResponse.status === 404)
            throw new Error(`Developer with ID "${developerId}" not found.`);
          throw new Error(
            errorData.detail ||
              `Failed to fetch developer details: ${devResponse.statusText} (${devResponse.status})`
          );
        }
        const devData: DeveloperDetails = await devResponse.json();
        setDeveloper(devData);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else
          setError(
            "An unknown error occurred while fetching developer details."
          );
        setDeveloper(null);
      } finally {
        setLoading(false);
      }
    }

    if (API_KEY && API_BASE_URL) {
      fetchInitialData();
    } else {
      setError("API Key or Base URL is not configured.");
      setLoading(false);
    }
  }, [developerId]);

  useEffect(() => {
    async function fetchDeveloperGames() {
      if (!developer || !developer.id) return;

      setLoadingGames(true);

      try {
        const gamesResponse = await fetch(
          `${API_BASE_URL}/games?key=${API_KEY}&developers=${developer.id}&page_size=${gamesPageSize}&page=${gamesPage}&ordering=-added` // Сортировка по дате добавления
        );
        if (!gamesResponse.ok) {
          const errorData = await gamesResponse.json();
          console.error(
            `Failed to fetch games for developer ${developer.id}: ${
              errorData.detail || gamesResponse.status
            }`
          );
          setGames([]);
          setTotalGamesPages(1);
          setTotalGamesCount(0);
        } else {
          const gamesData: PaginatedResponse<Game> = await gamesResponse.json();
          setGames(gamesData.results);
          setTotalGamesCount(gamesData.count);
          setTotalGamesPages(Math.ceil(gamesData.count / gamesPageSize));
        }
      } catch (err) {
        console.error("Error fetching developer games:", err);
        setGames([]);
        setTotalGamesPages(1);
        setTotalGamesCount(0);
      } finally {
        setLoadingGames(false);
      }
    }

    if (API_KEY && API_BASE_URL && developer) {
      fetchDeveloperGames();
    }
  }, [developer, gamesPage]);

  const handlePrevGamesPage = () =>
    setGamesPage((prev) => Math.max(1, prev - 1));
  const handleNextGamesPage = () =>
    setGamesPage((prev) => Math.min(totalGamesPages, prev + 1));

  const PaginationButton = ({
    onClick,
    disabled,
    children,
    ariaLabel,
  }: {
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
    ariaLabel: string;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {children}
    </button>
  );
  if (!API_KEY || !API_BASE_URL) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold text-rose-400 mb-2">
          Configuration Error
        </h1>
        <p className="text-lg text-center max-w-md">
          {error || "API Key or Base URL is not configured."}
        </p>
        <Link
          href="/"
          className="mt-8 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-md transition-colors flex items-center"
        >
          <Home size={18} className="mr-2" /> Go to Homepage
        </Link>
      </div>
    );
  }

  if (loading)
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <Loader2 className="animate-spin h-12 w-12 text-purple-500 mb-4" />
        <p className="text-xl text-purple-400">Loading Developer Profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold text-rose-400 mb-2">Error</h1>
        <p className="text-lg text-center max-w-md">{error}</p>
        <Link
          href="/developers"
          className="mt-8 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-md transition-colors flex items-center"
        >
          <ChevronLeft size={18} className="mr-1" /> Back to Developers
        </Link>
      </div>
    );

  if (!developer)
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <Info className="w-16 h-16 text-slate-500 mb-4" />
        <h1 className="text-2xl font-bold text-slate-400 mb-2">
          Developer Not Found
        </h1>
        <p className="text-lg text-center">
          The developer profile you are looking for could not be found.
        </p>
        <Link
          href="/developers"
          className="mt-8 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-md transition-colors flex items-center"
        >
          <ChevronLeft size={18} className="mr-1" /> Back to Developers
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 pb-12">
      <div className="relative h-[35vh] sm:h-[45vh] md:h-[55vh] w-full overflow-hidden">
        {developer.image_background && (
          <Image
            src={developer.image_background}
            alt={`${developer.name} background`}
            fill
            sizes="100vw"
            className="object-cover object-center opacity-30"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 md:p-12 container mx-auto">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2 text-white shadow-xl"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
          >
            {developer.name}
          </h1>
          <div
            className="flex items-center text-lg text-purple-300"
            title={`Total games by ${developer.name}`}
          >
            <Gamepad2 size={20} className="mr-2 text-purple-400" />
            <span>
              {developer.games_count.toLocaleString()} Games Developed
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10  relative z-10">
        {developer.description && (
          <div className="prose prose-slate prose-invert max-w-none bg-slate-800/70 backdrop-blur-sm border border-slate-700 p-5 sm:p-8 rounded-xl shadow-xl mb-10 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-purple-300 !mt-0 flex items-center">
              <Users size={28} className="mr-3 text-purple-400" /> About{" "}
              {developer.name}
            </h2>
            <div
              className="text-slate-300 text-base"
              dangerouslySetInnerHTML={{ __html: developer.description }}
            />
          </div>
        )}
        {developer.games_count > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-slate-100">
              Games by {developer.name}
            </h2>
            {loadingGames && games.length === 0 && (
              <div className="text-center py-10">
                <Loader2 className="animate-spin h-10 w-10 text-sky-500 mx-auto" />
              </div>
            )}
            {games.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                {games.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            )}
            {(totalGamesPages > 1 || (loadingGames && games.length > 0)) && (
              <div className="flex flex-col items-center space-y-4 mt-10">
                {loadingGames && games.length > 0 && (
                  <div className="flex items-center text-sky-400">
                    <Loader2 className="animate-spin h-6 w-6 mr-2" />
                    <span>Loading more games...</span>
                  </div>
                )}
                {totalGamesPages > 1 && (
                  <div className="flex justify-center items-center space-x-3 sm:space-x-4">
                    <PaginationButton
                      onClick={handlePrevGamesPage}
                      disabled={gamesPage === 1 || loadingGames}
                      ariaLabel="Previous games page"
                    >
                      <ChevronLeft size={20} />
                      <span className="ml-1 hidden sm:inline">Previous</span>
                    </PaginationButton>
                    <span className="text-md sm:text-lg font-medium text-slate-300 px-2">
                      Page {gamesPage} of {totalGamesPages}
                    </span>
                    <PaginationButton
                      onClick={handleNextGamesPage}
                      disabled={gamesPage === totalGamesPages || loadingGames}
                      ariaLabel="Next games page"
                    >
                      <span className="mr-1 hidden sm:inline">Next</span>
                      <ChevronRight size={20} />
                    </PaginationButton>
                  </div>
                )}
              </div>
            )}
            {!loadingGames &&
              games.length === 0 &&
              developer.games_count > 0 && (
                <div className="text-center py-10 flex flex-col items-center text-slate-400">
                  <Info size={32} className="mb-2 opacity-50" />
                  <p>No games found for this developer on the current page.</p>
                  {gamesPage > 1 && (
                    <p className="text-sm">Try going to the previous page.</p>
                  )}
                </div>
              )}
          </div>
        )}
      </div>

      <p className="text-center mt-12 text-sm text-slate-400">
        Data provided by{" "}
        <a
          href="https://rawg.io"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-sky-300 transition-colors"
        >
          RAWG.io
        </a>
        .
      </p>
    </div>
  );
}
