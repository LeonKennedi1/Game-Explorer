// src/app/stores/page.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import {
  Loader2,
  AlertTriangle,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getAllStores } from "@/services/apiService";
import { StoreDetails, PaginatedResponse } from "@/@types/types";
import StoreCard from "@/components/shared/StoreCard";
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function StoresPageStandalone() {
  const [stores, setStores] = useState<StoreDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStores, setTotalStores] = useState(0);

  const pageSize = 12;
  const ordering = "name";

  useEffect(() => {
    async function fetchStoresData() {
      if (!API_KEY || !API_BASE_URL) {
        setError(
          "API Key or Base URL is not configured. Please check your environment variables."
        );
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const params = {
          page: currentPage,
          page_size: pageSize,
          ordering: ordering,
        };
        const data = await getAllStores(params);

        setStores(data.results);
        setTotalStores(data.count);
        setTotalPages(Math.ceil(data.count / pageSize));
      } catch (err: any) {
        setError(
          err.detail ||
            err.message ||
            "An unknown error occurred while fetching stores"
        );
        setStores([]);
        setTotalStores(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    fetchStoresData();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  if (!API_KEY || !API_BASE_URL) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold text-rose-400 mb-2">
          Configuration Error
        </h1>
        <p className="text-lg max-w-md">
          API Key or Base URL is not configured. Please check your environment
          variables.
        </p>
      </div>
    );
  }
  if (loading && stores.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <Loader2 className="animate-spin h-12 w-12 text-amber-500 mb-4" />
        <p className="text-xl text-amber-400">Loading game stores...</p>
      </div>
    );
  }
  if (error && stores.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold text-rose-400 mb-2">
          Error Fetching Stores
        </h1>
        <p className="text-lg max-w-md">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 py-1">
          Game Stores
        </span>
      </h1>
      {error && stores.length > 0 && (
        <div className="mb-4 p-3 bg-rose-900/60 border border-rose-700 rounded-md text-center">
          <p className="text-rose-300">
            <AlertTriangle className="inline-block mr-2" size={18} /> Could not
            load all stores: {error}
          </p>
        </div>
      )}
      {stores.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mb-8">
          {stores.map((store, index) => (
            <StoreCard
              key={store.id}
              store={store}
              isPriorityImage={index < 4}
            />
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <div className="text-center py-20">
            <Info className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <p className="text-xl text-slate-400">No game stores found.</p>
            <p className="text-md text-slate-500 mt-1">
              Check back later or try refreshing the page.
            </p>
          </div>
        )
      )}
      {(totalPages > 1 || (loading && stores.length > 0)) && (
        <div className="flex flex-col items-center space-y-4 mt-10">
          {loading && stores.length > 0 && (
            <div className="flex items-center text-amber-400">
              <Loader2 className="animate-spin h-6 w-6 mr-2" />
              <span>Loading more stores...</span>
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-3 sm:space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1 || loading}
                aria-label="Previous page"
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <ChevronLeft size={20} />
                <span className="ml-1 hidden sm:inline">Previous</span>
              </button>
              <span className="text-md sm:text-lg font-medium text-slate-300 px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || loading}
                aria-label="Next page"
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <span className="mr-1 hidden sm:inline">Next</span>
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      <p className="text-center mt-8 text-sm text-slate-400">
        {totalStores > 0 &&
          `Showing ${
            stores.length > 0 ? (currentPage - 1) * pageSize + 1 : 0
          }-${Math.min(
            currentPage * pageSize,
            totalStores
          )} of ${totalStores.toLocaleString()} stores. `}
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
