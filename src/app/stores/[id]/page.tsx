// src/app/stores/[id]/page.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound, useRouter } from "next/navigation";
import { getStoreDetails, getGames } from "@/services/apiService";
import { StoreDetails, Game, PaginatedResponse } from "@/@types/types";
import {
  Loader2,
  AlertTriangle,
  ExternalLink,
  Globe,
  ShoppingBag,
  ArrowLeft,
  Home,
  Gamepad2,
  Tag,
  ImageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import GameCard from "@/components/shared/GameCard";
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function StoreDetailPageStandaloneGames() {
  const params = useParams();
  const router = useRouter();
  const storeId = params.id as string;
  const [store, setStore] = useState<StoreDetails | null>(null);
  const [loadingStore, setLoadingStore] = useState(true);
  const [storeError, setStoreError] = useState<string | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);
  const [gamesError, setGamesError] = useState<string | null>(null);
  const [currentGamesPage, setCurrentGamesPage] = useState(1);
  const [totalGamesPages, setTotalGamesPages] = useState(1);
  const [totalGamesCount, setTotalGamesCount] = useState(0);
  const gamesPageSize = 8;

  useEffect(() => {
    if (!storeId) {
      setLoadingStore(false);
      return;
    }

    async function fetchStoreData() {
      if (!API_KEY || !API_BASE_URL) {
        setStoreError("API Key or Base URL is not configured.");
        setLoadingStore(false);
        return;
      }

      setLoadingStore(true);
      setStoreError(null);
      try {
        const storeData = await getStoreDetails(storeId);
        setStore(storeData);
      } catch (err: any) {
        if (err.status === 404) {
          notFound();
        } else {
          setStoreError(
            err.detail || err.message || "Failed to load store details."
          );
        }
      } finally {
        setLoadingStore(false);
      }
    }

    fetchStoreData();
  }, [storeId]);
  useEffect(() => {
    if (!store || !store.id) return;

    async function fetchGamesForStore() {
      setLoadingGames(true);
      setGamesError(null);
      try {
        const params = {
          stores: store!.id,
          page: currentGamesPage,
          page_size: gamesPageSize,
          ordering: "-added",
        };
        const gamesData: PaginatedResponse<Game> = await getGames(params);
        setGames(gamesData.results);
        setTotalGamesCount(gamesData.count);
        setTotalGamesPages(Math.ceil(gamesData.count / gamesPageSize));
      } catch (err: any) {
        setGamesError(
          err.detail || err.message || "Failed to load games for this store."
        );
        setGames([]);
      } finally {
        setLoadingGames(false);
      }
    }

    fetchGamesForStore();
  }, [store, currentGamesPage]);

  const handlePrevGamesPage = () => {
    setCurrentGamesPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextGamesPage = () => {
    setCurrentGamesPage((prev) => Math.min(totalGamesPages, prev + 1));
  };

  if (!API_KEY || (!API_BASE_URL && !store && loadingStore)) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold text-rose-400 mb-2">
          Configuration Error
        </h1>
        <p className="text-lg max-w-md">
          API Key or Base URL is not configured.
        </p>
      </div>
    );
  }

  if (loadingStore) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-amber-500" />
        <p className="mt-4 text-xl text-slate-300">Loading Store Details...</p>
      </div>
    );
  }

  if (storeError) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="w-20 h-20 text-rose-500 mb-6" />
        <h1 className="text-3xl font-bold text-rose-400 mb-3">
          Oops! Store Error.
        </h1>
        <p className="text-lg text-slate-400 mb-8 max-w-lg">{storeError}</p>
        <div className="flex space-x-4">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" /> Go Back
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg flex items-center"
          >
            <Home size={20} className="mr-2" /> Go Home
          </Link>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center">
        <ShoppingBag size={48} className="text-slate-500 mb-4" />
        <p className="text-xl text-slate-400">Store not found.</p>
        <button
          onClick={() => router.back()}
          className="mt-6 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-sky-400 hover:text-sky-300 transition-colors flex items-center text-sm"
          >
            <ArrowLeft size={18} className="mr-2" /> Back to Stores
          </button>
        </div>

        <header className="mb-10 md:mb-12">
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-xl mb-6">
            {store.image_background ? (
              <Image
                src={store.image_background}
                alt={`${store.name} Background`}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <ImageIcon size={64} className="text-slate-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
          </div>
          <div className="relative -mt-16 md:-mt-20 px-4 md:px-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3">
              {store.name}
            </h1>
            {store.domain && (
              <a
                href={`https://${store.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-lg text-amber-400 hover:text-amber-300 underline transition-colors group"
              >
                <Globe size={20} className="mr-2 group-hover:animate-pulse" />{" "}
                Visit Store Website{" "}
                <ExternalLink
                  size={18}
                  className="ml-1.5 opacity-70 group-hover:opacity-100"
                />
              </a>
            )}
            <p className="text-slate-400 text-md mt-2">
              <Gamepad2 size={18} className="inline mr-2" />{" "}
              {store.games_count.toLocaleString()} games available
            </p>
          </div>
        </header>

        <section>
          <h2 className="text-3xl font-bold text-slate-100 mb-6 flex items-center">
            <Tag size={28} className="mr-3 text-sky-400" /> Games at{" "}
            {store.name}
          </h2>

          {loadingGames && games.length === 0 && (
            <div className="text-center py-10">
              <Loader2 className="animate-spin h-10 w-10 text-sky-500 mx-auto mb-3" />
              <p className="text-lg text-sky-400">Loading games...</p>
            </div>
          )}
          {gamesError && games.length === 0 && (
            <div className="text-center py-10 text-rose-400">
              <AlertTriangle className="h-10 w-10 mx-auto mb-3" />
              <p className="text-lg">Error loading games: {gamesError}</p>
            </div>
          )}

          {games.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            !loadingGames &&
            !gamesError &&
            store.games_count > 0 && (
              <p className="text-slate-400 text-lg">
                No games found for this store on the current page.
              </p>
            )
          )}
          {!loadingGames && !gamesError && store.games_count === 0 && (
            <p className="text-slate-400 text-lg">
              This store currently has no games listed via the API.
            </p>
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
                  <button
                    onClick={handlePrevGamesPage}
                    disabled={currentGamesPage === 1 || loadingGames}
                    aria-label="Previous games page"
                    className="px-5 py-2.5 bg-sky-700 hover:bg-sky-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <ChevronLeftIcon size={20} />{" "}
                    <span className="ml-1 hidden sm:inline">Prev</span>
                  </button>
                  <span className="text-md sm:text-lg font-medium text-slate-300 px-2">
                    Page {currentGamesPage} of {totalGamesPages}
                  </span>
                  <button
                    onClick={handleNextGamesPage}
                    disabled={
                      currentGamesPage === totalGamesPages || loadingGames
                    }
                    aria-label="Next games page"
                    className="px-5 py-2.5 bg-sky-700 hover:bg-sky-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <span className="mr-1 hidden sm:inline">Next</span>{" "}
                    <ChevronRightIcon size={20} />
                  </button>
                </div>
              )}
            </div>
          )}
          {totalGamesCount > 0 && (
            <p className="text-center mt-6 text-sm text-slate-500">
              Showing {games.length} of {totalGamesCount.toLocaleString()} games
              from this store.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
