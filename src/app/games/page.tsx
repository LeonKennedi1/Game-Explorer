//src/app/games/page.tsx
"use client";
import { useEffect, useState, FormEvent, useRef, useCallback } from "react";
import { getGames } from "@/services/apiService";
import {
  Search,
  Filter as FilterIcon,
  Loader2,
  AlertTriangle,
  Info,
  ChevronDown,
  XCircle,
} from "lucide-react";
import { Game, PaginatedResponse } from "@/@types/types";
import GameCard from "@/components/shared/GameCard";
import { useFilterStore } from "@/store/filterStore";

export default function AllGamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);
  const [gamesError, setGamesError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalGamesCount, setTotalGamesCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const {
    platforms: allPlatforms,
    genres: allGenres,
    tags: allTags,
    isLoading: isLoadingFilters,
    error: filtersError,
    fetchFilterData,
  } = useFilterStore();

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [ordering, setOrdering] = useState<string>("-added");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const pageSize = 12;
  const observer = useRef<IntersectionObserver | null>(null);
  const lastGameElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingMore || loadingGames) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          console.log(
            "[AllGamesPage] IntersectionObserver: Reached end, loading next page."
          );
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingMore, loadingGames, hasNextPage]
  );

  useEffect(() => {
    fetchFilterData();
  }, [fetchFilterData]);

  useEffect(() => {
    if (!isLoadingFilters) {
      console.log("[AllGamesPage] Reset useEffect triggered. Details:", {
        search: currentSearch,
        platforms: selectedPlatforms,
        genres: selectedGenres,
        tags: selectedTags,
        ordering: ordering,
      });
      setGames([]);
      setCurrentPage(1);
      setHasNextPage(true);
    }
  }, [
    currentSearch,
    selectedPlatforms,
    selectedGenres,
    selectedTags,
    ordering,
    isLoadingFilters,
  ]);

  useEffect(() => {
    async function loadGames(pageToFetch: number) {
      const isFullReload = pageToFetch === 1;

      if (isFullReload) setLoadingGames(true);
      else setIsFetchingMore(true);
      setGamesError(null);

      const params: Record<string, any> = {
        page: pageToFetch,
        page_size: pageSize,
      };
      if (currentSearch) params.search = currentSearch;
      if (selectedPlatforms.length > 0)
        params.parent_platforms = selectedPlatforms.join(",");
      if (selectedGenres.length > 0) params.genres = selectedGenres.join(",");
      if (selectedTags.length > 0) params.tags = selectedTags.join(",");
      if (ordering) params.ordering = ordering;

      console.log(
        `[AllGamesPage] loadGames - Fetching page: ${pageToFetch} with params:`,
        JSON.stringify(params, null, 2)
      );

      try {
        const data: PaginatedResponse<Game> = await getGames(params);
        setGames((prevGames) =>
          isFullReload ? data.results : [...prevGames, ...data.results]
        );
        setTotalGamesCount(data.count);
        setHasNextPage(data.next !== null);
      } catch (err: any) {
        setGamesError(err.detail || err.message || "Error fetching games.");
        if (isFullReload) {
          setGames([]);
          setTotalGamesCount(0);
        }
      } finally {
        if (isFullReload) setLoadingGames(false);
        setIsFetchingMore(false);
      }
    }

    if (!isLoadingFilters) {
      loadGames(currentPage);
    }
  }, [
    currentPage,
    isLoadingFilters,
    currentSearch,
    selectedPlatforms,
    selectedGenres,
    selectedTags,
    ordering,
  ]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      currentSearch !== searchTerm.trim() ||
      (searchTerm.trim() === "" && currentSearch !== "")
    ) {
      setCurrentSearch(searchTerm.trim());
    }
  };

  const resetFiltersAndSearch = () => {
    setSearchTerm("");
    setSelectedPlatforms([]);
    setSelectedGenres([]);
    setSelectedTags([]);
    setOrdering("-added");
    setCurrentSearch("");
  };

  const handlePlatformChange = (platformId: string) =>
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  const handleGenreChange = (genreId: string) =>
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  const handleTagChange = (tagId: string) =>
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  const handleOrderingChange = (newOrdering: string) =>
    setOrdering(newOrdering);

  if (
    !process.env.NEXT_PUBLIC_RAWG_API_KEY ||
    !process.env.NEXT_PUBLIC_API_BASE_URL
  ) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold text-rose-400 mb-2">
          Configuration Error
        </h1>
        <p className="text-lg text-center">
          API Key or Base URL is not configured correctly.
        </p>
        <p className="text-sm text-slate-400 text-center mt-1">
          Please ensure `NEXT_PUBLIC_RAWG_API_KEY` and
          `NEXT_PUBLIC_API_BASE_URL` are set in your `.env.local`.
        </p>
      </div>
    );
  }

  const FilterSection = ({
    title,
    items,
    selectedItems,
    onChange,
  }: {
    title: string;
    items: { id: number | string; name: string }[];
    selectedItems: string[];
    onChange: (id: string) => void;
  }) => (
    <details className="group bg-slate-700/50 rounded-lg shadow-md border border-slate-600/70 hover:border-sky-600/70 transition-colors duration-200">
      <summary className="cursor-pointer list-none p-3 font-semibold text-slate-200 group-open:border-b group-open:border-slate-600 hover:bg-slate-600/30 rounded-t-lg flex justify-between items-center transition-colors">
        <span>
          {title}{" "}
          {selectedItems.length > 0 && (
            <span className="text-sky-400">({selectedItems.length})</span>
          )}
        </span>
        <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transform transition-transform duration-200" />
      </summary>
      <div className="p-3 max-h-60 overflow-y-auto border-t border-slate-600 group-open:block bg-slate-700/30 rounded-b-lg scrollbar scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-700/50 scrollbar-thumb-rounded-full">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="flex items-center mb-2 last:mb-0">
              <input
                id={`${title.toLowerCase().replace(/\s+/g, "-")}-${item.id}`}
                type="checkbox"
                checked={selectedItems.includes(String(item.id))}
                onChange={() => onChange(String(item.id))}
                className="h-4 w-4 text-sky-500 border-slate-500 rounded focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-700 bg-slate-800 checked:bg-sky-500 checked:border-transparent cursor-pointer"
              />
              <label
                htmlFor={`${title.toLowerCase().replace(/\s+/g, "-")}-${
                  item.id
                }`}
                className="ml-2 text-sm text-slate-300 hover:text-sky-200 cursor-pointer select-none"
              >
                {item.name}
              </label>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 italic">No options available.</p>
        )}
      </div>
    </details>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 py-1">
          Browse All Games
        </span>
      </h1>

      <form
        onSubmit={handleSearchSubmit}
        className="mb-10 max-w-2xl mx-auto flex shadow-lg rounded-lg"
      >
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for games (e.g., Elden Ring)"
            className="w-full pl-12 pr-4 py-3 border-y border-l border-slate-700 rounded-l-lg bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-500"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-r-lg transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center w-28"
          disabled={
            loadingGames &&
            currentPage === 1 &&
            currentSearch === searchTerm.trim()
          }
        >
          {loadingGames &&
          currentPage === 1 &&
          currentSearch === searchTerm.trim() ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            "Search"
          )}
        </button>
      </form>

      {(isLoadingFilters || (!isLoadingFilters && !filtersError)) && (
        <div className="mb-10 p-4 sm:p-6 bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100 mb-3 sm:mb-0 flex items-center">
              <FilterIcon className="h-7 w-7 mr-3 text-sky-400" />
              Filters & Sorting
            </h2>
            <button
              onClick={resetFiltersAndSearch}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-rose-500 flex items-center"
            >
              <XCircle size={18} className="mr-1.5" />
              Reset All
            </button>
          </div>
          {isLoadingFilters && (
            <div className="text-center py-6">
              <Loader2 className="animate-spin h-8 w-8 text-sky-400 mx-auto mb-2" />
              <p className="text-lg text-sky-300">Loading filter options...</p>
            </div>
          )}
          {filtersError && !isLoadingFilters && (
            <div className="text-center py-6 text-rose-400">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
              <p className="text-lg">Error loading filters: {filtersError}</p>
            </div>
          )}
          {!isLoadingFilters && !filtersError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FilterSection
                title="Platforms"
                items={allPlatforms}
                selectedItems={selectedPlatforms}
                onChange={handlePlatformChange}
              />
              <FilterSection
                title="Genres"
                items={allGenres}
                selectedItems={selectedGenres}
                onChange={handleGenreChange}
              />
              <FilterSection
                title="Tags"
                items={allTags}
                selectedItems={selectedTags}
                onChange={handleTagChange}
              />
              <div>
                <label
                  htmlFor="ordering-filter"
                  className="block text-sm font-medium text-slate-300 mb-1.5"
                >
                  Sort by
                </label>
                <div className="relative">
                  <select
                    id="ordering-filter"
                    value={ordering}
                    onChange={(e) => handleOrderingChange(e.target.value)}
                    className="block w-full appearance-none px-3 py-3 bg-slate-700/80 border border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-100 pr-10"
                  >
                    <option value="-added">Recently Added</option>
                    <option value="-created">Recently Created</option>
                    <option value="-released">Release Date (Newest)</option>
                    <option value="released">Release Date (Oldest)</option>
                    <option value="-rating">Rating (Highest)</option>
                    <option value="rating">Rating (Lowest)</option>
                    <option value="-metacritic">Metacritic (Highest)</option>
                    <option value="metacritic">Metacritic (Lowest)</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="-name">Name (Z-A)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {loadingGames && games.length === 0 && (
        <div className="text-center py-20">
          <Loader2 className="animate-spin h-12 w-12 text-sky-500 mx-auto mb-4" />
          <p className="text-xl text-sky-400">Loading awesome games...</p>
        </div>
      )}
      {!loadingGames && gamesError && games.length === 0 && (
        <div className="text-center py-20">
          <AlertTriangle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <p className="text-xl text-rose-400">Oops! Something went wrong.</p>
          <p className="text-md text-slate-400 mt-1">{gamesError}</p>
        </div>
      )}

      {games.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mb-8">
          {games.map((game, index) => (
            <div
              ref={games.length === index + 1 ? lastGameElementRef : null}
              key={`${game.id}-${index}`}
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>
      )}

      {isFetchingMore && (
        <div className="text-center py-10 flex items-center justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-sky-500 mr-3" />
          <p className="text-lg text-sky-400">Loading more games...</p>
        </div>
      )}

      {!loadingGames &&
        !isFetchingMore &&
        !gamesError &&
        games.length === 0 && (
          <div className="text-center py-20">
            <Info className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <p className="text-xl text-slate-400">No games found.</p>
            <p className="text-md text-slate-500 mt-1">
              {currentSearch &&
                `Your search for "${currentSearch}" didn't return any results. `}
              {(selectedPlatforms.length > 0 ||
                selectedGenres.length > 0 ||
                selectedTags.length > 0) &&
                "Try adjusting your filters or search term."}
              {!currentSearch &&
                !(
                  selectedPlatforms.length > 0 ||
                  selectedGenres.length > 0 ||
                  selectedTags.length > 0
                ) &&
                "Try a different search or explore filters!"}
            </p>
          </div>
        )}

      {!gamesError && (
        <p className="text-center mt-8 text-sm text-slate-400">
          {games.length > 0 &&
            `Showing ${games.length} of ${totalGamesCount} games. `}
          {!hasNextPage &&
            games.length > 0 &&
            games.length === totalGamesCount &&
            `All games loaded. `}
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
      )}
    </div>
  );
}
