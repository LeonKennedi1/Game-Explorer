//src/app/genres/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GenreDetails, Game, PaginatedResponse } from "@/@types/types";
import GameCard from "@/components/shared/GameCard";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GenreDetailPageProps {
  params: { id: string };
}

export default function GenreDetailPage({ params }: GenreDetailPageProps) {
  const { id: genreId } = params;
  const [genre, setGenre] = useState<GenreDetails | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gamesPage, setGamesPage] = useState(1);
  const [totalGamesPages, setTotalGamesPages] = useState(1);
  const gamesPageSize = 6;

  useEffect(() => {
    async function fetchGenreData() {
      if (!genreId) return;

      setLoading(true);
      setError(null);
      try {
        const genreResponse = await fetch(
          `${API_BASE_URL}/genres/${genreId}?key=${API_KEY}`
        );
        if (!genreResponse.ok) {
          const errorData = await genreResponse.json();
          if (genreResponse.status === 404)
            throw new Error(`Genre with ID "${genreId}" not found.`);
          throw new Error(
            errorData.detail ||
              `Failed to fetch genre details: ${genreResponse.status}`
          );
        }
        const genreData: GenreDetails = await genreResponse.json();
        setGenre(genreData);

        const gamesResponse = await fetch(
          `${API_BASE_URL}/games?key=${API_KEY}&genres=${genreId}&page_size=${gamesPageSize}&page=${gamesPage}`
        );
        if (!gamesResponse.ok) {
          const errorData = await gamesResponse.json();
          console.error(
            `Failed to fetch games for genre ${genreId}: ${
              errorData.detail || gamesResponse.status
            }`
          );
          setGames([]);
        } else {
          const gamesData: PaginatedResponse<Game> = await gamesResponse.json();
          setGames(gamesData.results);
          setTotalGamesPages(Math.ceil(gamesData.count / gamesPageSize));
        }
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred");
        setGenre(null);
        setGames([]);
      } finally {
        setLoading(false);
      }
    }

    if (API_KEY && API_BASE_URL) {
      fetchGenreData();
    } else {
      setError("API Key or Base URL is not configured.");
      setLoading(false);
    }
  }, [genreId, gamesPage]);

  const handlePrevGamesPage = () =>
    setGamesPage((prev) => Math.max(1, prev - 1));
  const handleNextGamesPage = () =>
    setGamesPage((prev) => Math.min(totalGamesPages, prev + 1));

  if (!API_KEY || !API_BASE_URL) {
    return (
      <div className="text-center py-10">
        <h1 className="text-red-500">Configuration Error</h1>
        <p className="text-lg">API Key or Base URL is not configured.</p>
      </div>
    );
  }

  if (loading && !genre)
    return (
      <p className="text-center text-xl py-10">Loading genre details...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-xl py-10">Error: {error}</p>
    );
  if (!genre)
    return <p className="text-center text-xl py-10">Genre not found.</p>;

  return (
    <div className="max-w-5xl mx-auto">
      {genre.image_background && (
        <div className="w-full h-60 md:h-80 relative mb-6 rounded-lg overflow-hidden shadow-xl">
          <Image
            src={genre.image_background}
            alt={genre.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      )}
      <h1 className="text-5xl font-bold mb-2 text-center md:text-left">
        {genre.name}
      </h1>
      <p className="text-gray-400 mb-6 text-center md:text-left">
        Games in this genre: {genre.games_count}
      </p>

      {genre.description && (
        <div className="prose prose-sm sm:prose lg:prose-lg prose-invert max-w-none bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-white !mt-0">
            About the {genre.name} Genre
          </h2>
          <div
            className="text-gray-300"
            dangerouslySetInnerHTML={{ __html: genre.description }}
          />
        </div>
      )}

      {games.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-white">
            Games in {genre.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          {totalGamesPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={handlePrevGamesPage}
                disabled={gamesPage === 1 || loading}
                className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
              >
                Previous Games
              </button>
              <span>
                Page {gamesPage} of {totalGamesPages}
              </span>
              <button
                onClick={handleNextGamesPage}
                disabled={gamesPage === totalGamesPages || loading}
                className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
              >
                Next Games
              </button>
            </div>
          )}
        </div>
      )}
      {!loading && games.length === 0 && genre.games_count > 0 && (
        <p className="text-center text-lg py-6">
          No games found for this genre on the current page.
        </p>
      )}

      <p className="text-center mt-8 text-sm text-gray-400">
        Data provided by{" "}
        <a
          href="https://rawg.io"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-200"
        >
          RAWG.io
        </a>
        .
      </p>
    </div>
  );
}
