//src/app/platforms/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllPlatforms } from "@/services/apiService";
import { PlatformDetails, PaginatedResponse } from "@/@types/types";
export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState<PlatformDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPlatforms, setTotalPlatforms] = useState(0);

  const pageSize = 12;

  useEffect(() => {
    async function fetchPlatformsData() {
      setLoading(true);
      setError(null);
      try {
        const params = {
          page: currentPage,
          page_size: pageSize,
          ordering: "name",
        };
        const data = (await getAllPlatforms(
          params
        )) as PaginatedResponse<PlatformDetails>;

        setPlatforms(data.results);
        setTotalPlatforms(data.count);
        setTotalPages(Math.ceil(data.count / pageSize));
      } catch (err: any) {
        setError(
          err.detail ||
            err.message ||
            "An unknown error occurred while fetching platforms"
        );
        setPlatforms([]);
        setTotalPlatforms(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }
    if (
      process.env.NEXT_PUBLIC_RAWG_API_KEY &&
      process.env.NEXT_PUBLIC_API_BASE_URL
    ) {
      fetchPlatformsData();
    } else {
      setError("API Key or Base URL is not configured.");
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
      </div>
    );
  }

  if (loading)
    return (
      <p className="text-center text-xl py-10 text-gray-400">
        Loading platforms...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-xl py-10">Error: {error}</p>
    );

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Game Platforms</h1>
      {platforms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {platforms.map((platform) => (
            <Link
              key={platform.id}
              href={`/platforms/${platform.id}`}
              className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
            >
              <div className="w-full h-40 relative">
                {platform.image_background || platform.image ? (
                  <Image
                    src={
                      platform.image_background ??
                      platform.image ??
                      "/placeholder-image.png"
                    }
                    alt={platform.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500">{platform.name}</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 truncate text-white">
                  {platform.name}
                </h3>
                <p className="text-sm text-gray-400">
                  Games: {platform.games_count}
                </p>
                {platform.year_start && (
                  <p className="text-xs text-gray-500">
                    Est: {platform.year_start}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg py-10 text-gray-400">
          No platforms found.
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
        Showing {platforms.length > 0 ? platforms.length : 0} of{" "}
        {totalPlatforms} platforms. Data from{" "}
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
