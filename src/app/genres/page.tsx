//src/app/genres/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Loader2,
  AlertTriangle,
  Info,
  ChevronLeft,
  ChevronRight,
  Tag,
  Gamepad2,
  Home,
} from "lucide-react";
import { GenreDetails, PaginatedResponse } from "@/@types/types";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function GenresPage() {
  const [genres, setGenres] = useState<GenreDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGenres, setTotalGenres] = useState(0);

  const pageSize = 16;

  useEffect(() => {
    async function fetchGenres() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_BASE_URL}/genres?key=${API_KEY}&page=${currentPage}&page_size=${pageSize}&ordering=name`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.detail ||
              `Failed to fetch genres: ${response.statusText} (${response.status})`
          );
        }
        const data: PaginatedResponse<GenreDetails> = await response.json();
        setGenres(data.results);
        setTotalGenres(data.count);
        setTotalPages(Math.ceil(data.count / pageSize));
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred while fetching genres.");
        setGenres([]);
      } finally {
        setLoading(false);
      }
    }

    if (API_KEY && API_BASE_URL) {
      fetchGenres();
    } else {
      setError(
        "API Key or Base URL is not configured. Please check your environment variables."
      );
      setLoading(false);
    }
  }, [currentPage]);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

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
      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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

  if (loading && genres.length === 0)
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <Loader2 className="animate-spin h-12 w-12 text-emerald-500 mb-4" />
        <p className="text-xl text-emerald-400">Loading Game Genres...</p>
      </div>
    );

  if (error && genres.length === 0)
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold text-rose-400 mb-2">
          Error Fetching Genres
        </h1>
        <p className="text-lg text-center max-w-md">{error}</p>
        <Link
          href="/"
          className="mt-8 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-md transition-colors flex items-center"
        >
          <Home size={18} className="mr-2" /> Go to Homepage
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 py-1">
          Explore Game Genres
        </span>
      </h1>

      {genres.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mb-10">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genres/${genre.slug}`}
              className="
                group block bg-slate-800/70 backdrop-blur-sm border border-slate-700
                rounded-xl shadow-lg overflow-hidden
                transform transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-emerald-500/30 hover:border-emerald-600
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <div className="w-full h-48 sm:h-52 relative">
                {genre.image_background ? (
                  <Image
                    src={genre.image_background}
                    alt={`${genre.name} background`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-700 flex flex-col items-center justify-center text-slate-500">
                    <Tag size={48} className="mb-2 opacity-50" />
                    <span>No Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg sm:text-xl font-semibold mb-1 truncate text-slate-100 group-hover:text-emerald-300 transition-colors">
                  {genre.name}
                </h3>
                <p className="text-sm text-slate-400 flex items-center">
                  <Gamepad2 size={14} className="mr-1.5 text-slate-500" />
                  Games: {genre.games_count.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-20">
            <Info className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <p className="text-xl text-slate-400">No genres found.</p>
            <p className="text-md text-slate-500 mt-1">
              Try a different page or check back later.
            </p>
          </div>
        )
      )}

      {(totalPages > 1 || loading) && (
        <div className="flex flex-col items-center space-y-4 mt-10">
          {loading && genres.length > 0 && (
            <div className="flex items-center text-emerald-400">
              <Loader2 className="animate-spin h-6 w-6 mr-2" />
              <span>Loading more genres...</span>
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-3 sm:space-x-4">
              <PaginationButton
                onClick={handlePrevPage}
                disabled={currentPage === 1 || loading}
                ariaLabel="Previous page"
              >
                <ChevronLeft size={20} />
                <span className="ml-1 hidden sm:inline">Previous</span>
              </PaginationButton>
              <span className="text-md sm:text-lg font-medium text-slate-300 px-2">
                Page {currentPage} of {totalPages}
              </span>
              <PaginationButton
                onClick={handleNextPage}
                disabled={currentPage === totalPages || loading}
                ariaLabel="Next page"
              >
                <span className="mr-1 hidden sm:inline">Next</span>
                <ChevronRight size={20} />
              </PaginationButton>
            </div>
          )}
        </div>
      )}

      <p className="text-center mt-10 text-sm text-slate-400">
        {totalGenres > 0 &&
          `Showing ${
            genres.length > 0 ? (currentPage - 1) * pageSize + 1 : 0
          }-${Math.min(
            currentPage * pageSize,
            totalGenres
          )} of ${totalGenres.toLocaleString()} genres. `}
        Data from{" "}
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
