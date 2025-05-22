export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PlatformInfo {
  id: number;
  name: string;
  slug: string;
}

export interface PlatformDetails extends PlatformInfo {
  games_count: number;
  image_background: string | null;
  description?: string;
  year_start?: number | null;
  year_end?: number | null;
  image?: string | null;
}

export interface GenreInfo {
  id: number;
  name: string;
  slug: string;
}

export interface GenreDetails extends GenreInfo {
  games_count: number;
  image_background: string;
  description?: string;
}

export interface DeveloperInfo {
  id: number;
  name: string;
  slug: string;
}

export interface DeveloperDetails extends DeveloperInfo {
  games_count: number;
  image_background: string;
  description?: string;
}

export interface PublisherInfo {
  id: number;
  name: string;
  slug: string;
}

export interface PublisherDetails extends PublisherInfo {
  games_count: number;
  image_background: string;
  description?: string;
}
export interface ShortScreenshot {
  id: number;
  image: string;
}
export interface Game {
  [x: string]: any;
  id: number;
  slug: string;
  name: string;
  released: string | null;
  background_image: string | null;
  rating: number;
  metacritic: number | null;
  description_raw?: string;
  website?: string;
  platforms?: { platform: PlatformInfo }[];
  genres?: GenreInfo[];
  developers?: DeveloperInfo[];
  publishers?: PublisherInfo[];
  short_screenshots?: ShortScreenshot[];
}

export interface TagInfo {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string | null;
}
export interface Screenshot {
  id: number;
  image: string;
  width?: number;
  height?: number;
  is_deleted?: boolean;
}

export interface Movie {
  id: number;
  name: string;
  preview: string;
  data: {
    "480": string;
    max: string;
  };
}
export interface StoreInfo {
  id: number;
  name: string;
  slug: string;
  domain?: string;
}

export interface StoreDetails extends StoreInfo {
  games_count: number;
  image_background: string | null;
}
