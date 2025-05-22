// src/services/apiService.ts
import {
  PaginatedResponse,
  Game,
  Screenshot,
  Movie,
  PlatformInfo,
  GenreInfo,
  TagInfo,
  DeveloperDetails,
  StoreDetails,
} from "@/@types/types";
import axios, { AxiosInstance, AxiosError } from "axios";

const API_KEY_FROM_ENV = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_KEY_FROM_ENV) {
  console.warn(
    "[apiService] WARNING: NEXT_PUBLIC_RAWG_API_KEY is not set in .env.local. API calls might fail."
  );
}
if (!API_BASE_URL) {
  console.warn(
    "[apiService] WARNING: NEXT_PUBLIC_API_BASE_URL is not set in .env.local. API calls will fail."
  );
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    if (!config.params || !config.params.key) {
      config.params = {
        ...config.params,
        key: API_KEY_FROM_ENV,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const errorMessage =
      error.response?.data?.detail ||
      error.response?.data?.error ||
      error.message ||
      "Unknown API error";
    console.error(
      "[apiService] API Error Interceptor:",
      errorMessage,
      "Status:",
      error.response?.status,
      "URL:",
      error.config?.url
    );
    console.error(
      "[apiService] Full error object:",
      error.toJSON ? error.toJSON() : error
    );
    return Promise.reject({
      detail: errorMessage,
      status: error.response?.status,
    });
  }
);
export const getGames = async (
  params: Record<string, any> = {}
): Promise<PaginatedResponse<Game>> => {
  console.log("[apiService] getGames - API_KEY_FROM_ENV:", API_KEY_FROM_ENV);
  console.log(
    "[apiService] getGames - Initial params received:",
    JSON.stringify(params, null, 2)
  );

  const finalParams = {
    ...params,
    key: API_KEY_FROM_ENV,
  };
  console.log(
    "[apiService] getGames - Final params for request:",
    JSON.stringify(finalParams, null, 2)
  );

  try {
    const response = await apiClient.get<PaginatedResponse<Game>>("/games", {
      params: finalParams,
    });
    console.log("[apiService] getGames - Response status:", response.status);
    return response.data;
  } catch (error: any) {
    console.error(
      "[apiService] getGames - Catch block error:",
      error.detail || error.message || error
    );
    throw error;
  }
};

export const getGameDetails = async (
  slugOrId: string | number
): Promise<Game> => {
  try {
    const response = await apiClient.get<Game>(`/games/${slugOrId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGameScreenshots = async (
  gameId: number
): Promise<PaginatedResponse<Screenshot>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Screenshot>>(
      `/games/${gameId}/screenshots`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGameMovies = async (
  gameId: number
): Promise<PaginatedResponse<Movie>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Movie>>(
      `/games/${gameId}/movies`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getParentPlatforms = async (): Promise<
  PaginatedResponse<PlatformInfo>
> => {
  try {
    const response = await apiClient.get<PaginatedResponse<PlatformInfo>>(
      "/platforms/lists/parents"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPlatforms = async (
  params: Record<string, any> = {}
): Promise<PaginatedResponse<PlatformInfo>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<PlatformInfo>>(
      "/platforms",
      { params }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getPlatformDetails = async (
  id: number | string
): Promise<PlatformInfo> => {
  try {
    const response = await apiClient.get<PlatformInfo>(`/platforms/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGenres = async (
  params: Record<string, any> = { page_size: 30 }
): Promise<PaginatedResponse<GenreInfo>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<GenreInfo>>(
      "/genres",
      { params }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getGenreDetails = async (
  id: number | string
): Promise<GenreInfo> => {
  try {
    const response = await apiClient.get<GenreInfo>(`/genres/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTags = async (
  params: Record<string, any> = { page_size: 40, ordering: "-games_count" }
): Promise<PaginatedResponse<TagInfo>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<TagInfo>>("/tags", {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getDevelopers = async (
  params: Record<string, any> = {}
): Promise<PaginatedResponse<DeveloperDetails>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<DeveloperDetails>>(
      "/developers",
      { params }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getDeveloperDetails = async (
  id: number | string
): Promise<DeveloperDetails> => {
  try {
    const response = await apiClient.get<DeveloperDetails>(`/developers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getPublishers = async (
  params: Record<string, any> = {}
): Promise<PaginatedResponse<DeveloperDetails>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<DeveloperDetails>>(
      "/publishers",
      { params }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getPublisherDetails = async (
  id: number | string
): Promise<DeveloperDetails> => {
  try {
    const response = await apiClient.get<DeveloperDetails>(`/publishers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllStores = async (
  params: Record<string, any> = {}
): Promise<PaginatedResponse<StoreDetails>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<StoreDetails>>(
      "/stores",
      { params }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "[apiService] getAllStores - Catch block error:",
      error.detail || error.message || error
    );
    throw error;
  }
};
export const getStoreDetails = async (
  id: string | number
): Promise<StoreDetails> => {
  try {
    const response = await apiClient.get<StoreDetails>(`/stores/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(
      `[apiService] getStoreDetails (id: ${id}) - Catch block error:`,
      error.detail || error.message || error
    );
    throw error;
  }
};
export default apiClient;
