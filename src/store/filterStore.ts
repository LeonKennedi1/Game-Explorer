// src/store/filterStore.ts
import { create } from "zustand";
import { getParentPlatforms, getGenres, getTags } from "@/services/apiService";
import {
  PlatformInfo,
  GenreInfo,
  TagInfo,
  PaginatedResponse,
} from "@/@types/types";

interface FilterDataState {
  platforms: PlatformInfo[];
  genres: GenreInfo[];
  tags: TagInfo[];
  isLoading: boolean;
  error: string | null;
  fetchFilterData: () => Promise<void>;
}

export const useFilterStore = create<FilterDataState>((set, get) => ({
  platforms: [],
  genres: [],
  tags: [],
  isLoading: false,
  error: null,

  fetchFilterData: async () => {
    if (
      (get().platforms.length > 0 ||
        get().genres.length > 0 ||
        get().tags.length > 0) &&
      !get().error
    ) {
    }
    set({ isLoading: true, error: null });
    try {
      const [platformsData, genresData, tagsData] = await Promise.all([
        getParentPlatforms(),
        getGenres({ page_size: 30 }),
        getTags({ page_size: 40, ordering: "-games_count" }),
      ]);

      set({
        platforms:
          (platformsData as PaginatedResponse<PlatformInfo>)?.results || [],
        genres: (genresData as PaginatedResponse<GenreInfo>)?.results || [],
        tags: (tagsData as PaginatedResponse<TagInfo>)?.results || [],
        isLoading: false,
      });
    } catch (error: any) {
      console.error("Failed to fetch filter data for store:", error);
      set({
        error: error.detail || error.message || "Failed to load filter options",
        isLoading: false,
        platforms: [],
        genres: [],
        tags: [],
      });
    }
  },
}));
