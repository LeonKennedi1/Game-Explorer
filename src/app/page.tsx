//src/app/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getGames } from "@/services/apiService";
import { Game, PaginatedResponse } from "./@types/types";
import GameCard from "@/components/shared/GameCard";
export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGames, setTotalGames] = useState(0);
  const pageSize = 12;
  useEffect(() => {
    async function fetchPopularGames() {
      setLoading(true);
      setError(null);
      try {
        const params = {
          page: currentPage,
          page_size: pageSize,
          ordering: "-added",
        };
        const data: PaginatedResponse<Game> = await getGames(params);

        setGames(data.results);
        setTotalGames(data.count);
        setTotalPages(Math.ceil(data.count / pageSize));
      } catch (err: any) {
        setError(
          err.detail ||
            err.message ||
            "An unknown error occurred while fetching popular games"
        );
        setGames([]);
        setTotalGames(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }
    if (
      process.env.NEXT_PUBLIC_RAWG_API_KEY &&
      process.env.NEXT_PUBLIC_API_BASE_URL
    ) {
      fetchPopularGames();
    } else {
      setError(
        "API Key or Base URL is not configured. Please check your .env.local file."
      );
      setLoading(false);
    }
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  if (
    !process.env.NEXT_PUBLIC_RAWG_API_KEY ||
    !process.env.NEXT_PUBLIC_API_BASE_URL
  ) {
    return (
      <div className="text-center py-10">
        <h1 className="text-red-500">Configuration Error</h1>
        <p className="text-lg">API Key or Base URL is not configured.</p>
        <p>
          Please make sure `NEXT_PUBLIC_RAWG_API_KEY` and
          `NEXT_PUBLIC_API_BASE_URL` are set in your `.env.local` file.
        </p>
      </div>
    );
  }

  if (loading)
    return (
      <p className="text-center text-xl py-10 text-gray-400">
        Loading popular games...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-xl py-10">Error: {error}</p>
    );

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Popular Games</h1>
      {games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400">
          No popular games found at the moment.
        </p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1 || loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-lg text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
      <p className="text-center mt-6 text-sm text-gray-400">
        Showing {games.length} of {totalGames} games. Data from{" "}
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
