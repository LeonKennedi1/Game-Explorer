// src/components/shared/StoreCard.tsx
import Link from "next/link";
import Image from "next/image";
import { StoreDetails } from "@/@types/types";
import { Globe, ExternalLink, ImageIcon } from "lucide-react";
interface StoreCardProps {
  store: StoreDetails;
  isPriorityImage?: boolean;
}

export default function StoreCard({
  store,
  isPriorityImage = false,
}: StoreCardProps) {
  const storeUrl = store.domain
    ? `https://${store.domain}`
    : `/stores/${store.slug}`;
  const isExternalLink = !!store.domain;

  return (
    <div
      className="
        group block bg-slate-800/70 backdrop-blur-sm border border-slate-700
        rounded-xl shadow-xl overflow-hidden
        transform transition-all duration-300 ease-out
        hover:scale-[1.03] hover:shadow-amber-500/30 hover:border-amber-600
        focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900
        h-full flex flex-col"
    >
      <Link
        href={storeUrl}
        target={isExternalLink ? "_blank" : undefined}
        rel={isExternalLink ? "noopener noreferrer" : undefined}
        className="flex flex-col h-full"
        aria-label={`View ${store.name}${
          isExternalLink ? " (opens in new tab)" : ""
        }`}
      >
        <div className="w-full h-48 sm:h-52 relative">
          {store.image_background ? (
            <Image
              src={store.image_background}
              alt={`${store.name} background`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              priority={isPriorityImage}
            />
          ) : (
            <div className="w-full h-full bg-slate-700 flex flex-col items-center justify-center text-slate-500 p-4 text-center">
              <ImageIcon size={48} className="mb-2 opacity-50" />
              <span className="font-semibold">{store.name}</span>
              <span className="text-xs mt-1">No Image Available</span>
            </div>
          )}
          {store.image_background && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg sm:text-xl font-semibold mb-1 truncate text-slate-100 group-hover:text-amber-300 transition-colors flex items-center">
            {store.name}
            {isExternalLink && (
              <ExternalLink
                size={16}
                className="ml-2 opacity-70 group-hover:opacity-100 flex-shrink-0"
              />
            )}
          </h3>
          <p className="text-sm text-slate-400 mt-auto">
            Games: {store.games_count.toLocaleString()}
          </p>
          {store.domain && (
            <p
              className="text-xs text-slate-500 mt-1 flex items-center truncate"
              title={store.domain}
            >
              <Globe size={12} className="mr-1.5 opacity-70 flex-shrink-0" />
              {store.domain}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
