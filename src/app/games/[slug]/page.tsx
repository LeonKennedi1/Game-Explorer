//src/app/games/[slug]/page.tsx
"use client";
import {
  useEffect,
  useState,
  ReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactPortal,
} from "react";

import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  AlertTriangle,
  Info,
  CalendarDays,
  Star,
  BarChart3,
  Link2,
  Gamepad2,
  Tag,
  Users,
  ImageIcon,
  Film,
  Home,
  ChevronLeft,
} from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Game, Screenshot, Movie, PaginatedResponse } from "@/@types/types";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GameDetailPageProps {
  params: { slug: string };
}

type TabKey = "about" | "screenshots" | "movies";

interface Tab {
  key: TabKey;
  label: string;
  icon: ReactNode;
  content: () => ReactNode;
}

export default function GameDetailPage({ params }: GameDetailPageProps) {
  const { slug } = params;
  const [game, setGame] = useState<Game | null>(null);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingGame, setLoadingGame] = useState(true);
  const [loadingScreenshots, setLoadingScreenshots] = useState(false);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  useEffect(() => {
    async function fetchGameDetails() {
      if (!slug || !API_KEY || !API_BASE_URL) {
        setError("Configuration missing or slug not provided.");
        setLoadingGame(false);
        return;
      }
      setLoadingGame(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_BASE_URL}/games/${slug}?key=${API_KEY}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 404)
            throw new Error(`Game with slug "${slug}" not found.`);
          throw new Error(
            errorData.detail ||
              `Failed to fetch game details: ${response.status}`
          );
        }
        const data: Game = await response.json();
        setGame(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred while fetching game details");
        setGame(null);
      } finally {
        setLoadingGame(false);
      }
    }
    fetchGameDetails();
  }, [slug]);
  useEffect(() => {
    async function fetchScreenshots() {
      if (!game || !API_KEY || !API_BASE_URL || screenshots.length > 0) return;
      setLoadingScreenshots(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/games/${game.id}/screenshots?key=${API_KEY}&page_size=20`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.detail ||
              `Failed to fetch screenshots: ${response.status}`
          );
        }
        const data: PaginatedResponse<Screenshot> = await response.json();
        setScreenshots(data.results);
      } catch (err) {
        console.error("Error fetching screenshots:", err);
      } finally {
        setLoadingScreenshots(false);
      }
    }
    if (activeTab === "screenshots" && game) {
      fetchScreenshots();
    }
  }, [activeTab, game, screenshots.length]);

  useEffect(() => {
    async function fetchMovies() {
      if (!game || !API_KEY || !API_BASE_URL || movies.length > 0) return;
      setLoadingMovies(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/games/${game.id}/movies?key=${API_KEY}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.detail || `Failed to fetch movies: ${response.status}`
          );
        }
        const data: PaginatedResponse<Movie> = await response.json();
        setMovies(data.results);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoadingMovies(false);
      }
    }
    if (activeTab === "movies" && game) {
      fetchMovies();
    }
  }, [activeTab, game, movies.length]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const DetailSection = ({
    title,
    icon,
    children,
  }: {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
  }) => (
    <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 p-4 sm:p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-sky-300 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h3>
      {children}
    </div>
  );

  const TagPill = ({
    children,
    href,
    color = "bg-slate-700 hover:bg-slate-600",
    textColor = "text-slate-200",
  }: {
    children: ReactNode;
    href?: string;
    color?: string;
    textColor?: string;
  }) => {
    const commonClasses = `px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out shadow-sm ${color} ${textColor}`;
    if (href) {
      return (
        <Link href={href} className={commonClasses}>
          {children}
        </Link>
      );
    }
    return <span className={commonClasses}>{children}</span>;
  };

  const tabs: Tab[] = [
    {
      key: "about",
      label: "About",
      icon: <Info size={18} />,
      content: () =>
        game && (
          <div className="space-y-6 md:space-y-8 mt-4">
            {game.description_raw && (
              <div className="prose prose-slate prose-invert max-w-none bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-5 sm:p-8 rounded-xl shadow-xl leading-relaxed">
                <p className="text-slate-300 whitespace-pre-line text-base">
                  {game.description_raw}
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {game.platforms && game.platforms.length > 0 && (
                <DetailSection title="Platforms" icon={<Gamepad2 size={22} />}>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms.map((p) => (
                      <TagPill
                        key={p.platform.id}
                        color="bg-sky-700/80 hover:bg-sky-600/90"
                        textColor="text-sky-100"
                      >
                        {p.platform.name}
                      </TagPill>
                    ))}
                  </div>
                </DetailSection>
              )}
              {game.genres && game.genres.length > 0 && (
                <DetailSection title="Genres" icon={<Tag size={22} />}>
                  <div className="flex flex-wrap gap-2">
                    {game.genres.map((g) => (
                      <TagPill
                        href={`/genres/${g.slug}`}
                        key={g.id}
                        color="bg-emerald-700/80 hover:bg-emerald-600/90"
                        textColor="text-emerald-100"
                      >
                        {g.name}
                      </TagPill>
                    ))}
                  </div>
                </DetailSection>
              )}
            </div>
            {game.developers && game.developers.length > 0 && (
              <DetailSection title="Developers" icon={<Users size={22} />}>
                <div className="flex flex-wrap gap-2">
                  {game.developers.map((d) => (
                    <TagPill
                      href={`/developers/${d.slug}`}
                      key={d.id}
                      color="bg-purple-700/80 hover:bg-purple-600/90"
                      textColor="text-purple-100"
                    >
                      {d.name}
                    </TagPill>
                  ))}
                </div>
              </DetailSection>
            )}
            {game.publishers && game.publishers.length > 0 && (
              <DetailSection title="Publishers">
                <div className="flex flex-wrap gap-2">
                  {game.publishers.map((p) => (
                    <TagPill
                      href={`/publishers/${p.slug}`}
                      key={p.id}
                      color="bg-amber-700/80 hover:bg-amber-600/90"
                      textColor="text-amber-100"
                    >
                      {p.name}
                    </TagPill>
                  ))}
                </div>
              </DetailSection>
            )}
            {game.tags && game.tags.length > 0 && (
              <DetailSection title="Tags">
                <div className="flex flex-wrap gap-2">
                  {game.tags
                    .slice(0, 15)
                    .map(
                      (t: {
                        id: Key | null | undefined;
                        name:
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | Promise<
                              | string
                              | number
                              | bigint
                              | boolean
                              | ReactPortal
                              | ReactElement<
                                  unknown,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | null
                              | undefined
                            >
                          | null
                          | undefined;
                      }) => (
                        <TagPill
                          key={t.id}
                          color="bg-slate-600/80 hover:bg-slate-500/90"
                          textColor="text-slate-200"
                        >
                          {t.name}
                        </TagPill>
                      )
                    )}
                </div>
              </DetailSection>
            )}
          </div>
        ),
    },
    {
      key: "screenshots",
      label: `Screenshots ${
        screenshots.length > 0 ? `(${screenshots.length})` : ""
      }`,
      icon: <ImageIcon size={18} />,
      content: () => (
        <div className="mt-6">
          {loadingScreenshots && (
            <div className="text-center py-10">
              <Loader2 className="animate-spin h-8 w-8 text-sky-500 mx-auto" />
            </div>
          )}
          {!loadingScreenshots && screenshots.length === 0 && (
            <div className="text-center py-10 flex flex-col items-center text-slate-400">
              <ImageIcon size={32} className="mb-2 opacity-50" />
              No screenshots available.
            </div>
          )}
          {screenshots.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {screenshots.map((ss, index) => (
                <button
                  key={ss.id}
                  onClick={() => openLightbox(index)}
                  className="block rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 aspect-video"
                >
                  <Image
                    src={ss.image}
                    alt={`Screenshot ${ss.id}`}
                    width={300}
                    height={169}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "movies",
      label: `Trailers ${movies.length > 0 ? `(${movies.length})` : ""}`,
      icon: <Film size={18} />,
      content: () => (
        <div className="mt-6">
          {loadingMovies && (
            <div className="text-center py-10">
              <Loader2 className="animate-spin h-8 w-8 text-sky-500 mx-auto" />
            </div>
          )}
          {!loadingMovies && movies.length === 0 && (
            <div className="text-center py-10 flex flex-col items-center text-slate-400">
              <Film size={32} className="mb-2 opacity-50" />
              No trailers available.
            </div>
          )}
          {movies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 p-3 rounded-xl shadow-lg"
                >
                  <h4 className="text-md font-semibold text-sky-200 mb-2 truncate">
                    {movie.name}
                  </h4>
                  <div className="aspect-video relative">
                    <video
                      controls
                      poster={movie.preview}
                      className="w-full h-full rounded-md shadow-inner"
                      preload="metadata"
                    >
                      <source
                        src={movie.data.max || movie.data["480"]}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
  ];

  const activeTabData = tabs.find((tab) => tab.key === activeTab);
  if (loadingGame)
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <Loader2 className="animate-spin h-12 w-12 text-sky-500 mb-4" />
        <p className="text-xl text-sky-400">Loading game details...</p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold text-rose-400 mb-2">Error</h1>
        <p className="text-lg text-center">{error}</p>
        <Link
          href="/"
          className="mt-6 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-md transition-colors flex items-center"
        >
          <ChevronLeft size={18} className="mr-1" /> Go back to Home
        </Link>
      </div>
    );
  if (!game)
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <Info className="w-16 h-16 text-slate-500 mb-4" />
        <h1 className="text-2xl font-bold text-slate-400 mb-2">
          Game Not Found
        </h1>
        <p className="text-lg text-center">
          The game you are looking for could not be found.
        </p>
        <Link
          href="/"
          className="mt-6 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-md transition-colors flex items-center"
        >
          <ChevronLeft size={18} className="mr-1" /> Go back to Home
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 pb-12">
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full overflow-hidden">
        {game.background_image && (
          <Image
            src={game.background_image_additional || game.background_image}
            alt={`${game.name} background`}
            fill
            sizes="100vw"
            className="object-cover object-center opacity-40"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 md:p-12 container mx-auto">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2 text-white shadow-xl"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
          >
            {game.name}
          </h1>
          {game.tagline && (
            <p
              className="text-lg sm:text-xl text-slate-300 mb-4 italic"
              style={{ textShadow: "0 1px 5px rgba(0,0,0,0.5)" }}
            >
              {game.tagline}
            </p>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-sm sm:text-base">
            {game.released && (
              <div
                className="flex items-center text-slate-300"
                title="Release Date"
              >
                <CalendarDays size={16} className="mr-1.5 text-sky-400" />
                {new Date(game.released).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
            {game.metacritic && (
              <div
                className={`flex items-center px-2.5 py-1 rounded-md font-semibold text-xs sm:text-sm
                  ${
                    game.metacritic > 75
                      ? "bg-green-500/80 text-green-50"
                      : game.metacritic > 50
                      ? "bg-yellow-500/80 text-yellow-50"
                      : "bg-red-500/80 text-red-50"
                  }`}
                title={`Metascore: ${game.metacritic}`}
              >
                <BarChart3 size={14} className="mr-1.5" />
                {game.metacritic}
              </div>
            )}
            {game.rating > 0 && (
              <div
                className="flex items-center text-yellow-300"
                title={`User Rating: ${game.rating.toFixed(1)}/5`}
              >
                <Star size={16} className="mr-1 text-yellow-400 fill-current" />
                <span className="font-semibold">{game.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-400 ml-0.5">/5</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10  relative z-10">
        {game.website && (
          <div className="mb-8 flex justify-center md:justify-start">
            <a
              href={game.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out transform hover:scale-105"
            >
              <Link2 size={18} className="mr-2" /> Visit Official Website
            </a>
          </div>
        )}
        <div className="sticky top-[calc(var(--header-height,60px)+10px)] bg-slate-800/80 backdrop-blur-md z-20 rounded-t-lg shadow-lg border-b border-slate-700 overflow-x-auto scrollbar-hide">
          <nav
            className="-mb-px flex space-x-2 sm:space-x-4 px-2 sm:px-4"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap py-3 sm:py-4 px-2 sm:px-4 border-b-2 font-semibold text-sm sm:text-base transition-all duration-150 ease-in-out flex items-center group
                  ${
                    activeTab === tab.key
                      ? "border-sky-500 text-sky-400"
                      : "border-transparent text-slate-400 hover:text-sky-300 hover:border-sky-400/70"
                  } focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-t-md`}
              >
                <span
                  className={`mr-1.5 sm:mr-2 ${
                    activeTab === tab.key
                      ? "text-sky-400"
                      : "text-slate-500 group-hover:text-sky-300"
                  }`}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-b-lg shadow-lg">
          {activeTabData && activeTabData.content()}
        </div>
      </div>
      {screenshots.length > 0 && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={screenshots.map((ss) => ({
            src: ss.image,
            width: ss.width,
            height: ss.height,
          }))}
          index={lightboxIndex}
          render={{
            buttonPrev: screenshots.length <= 1 ? () => null : undefined,
            buttonNext: screenshots.length <= 1 ? () => null : undefined,
          }}
        />
      )}

      <p className="text-center mt-12 text-sm text-slate-400">
        Game data and images provided by{" "}
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
