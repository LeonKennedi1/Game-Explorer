//src/components/shared/footer.tsx
import Link from "next/link";
import { Gamepad2, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const linkStyles =
    "hover:text-sky-400 transition-colors duration-300 ease-in-out inline-flex items-center";
  const externalLinkStyles = `${linkStyles} hover:underline underline-offset-2`;

  return (
    <footer className="bg-slate-900 text-gray-300 pt-12 pb-8 mt-auto border-t border-slate-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-2 group mb-2">
              <Gamepad2
                size={28}
                className="text-sky-500 group-hover:text-sky-400 transition-colors"
              />
              <span className="text-xl font-semibold text-gray-100 group-hover:text-sky-300 transition-colors">
                Game Explorer
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your ultimate guide to the world of video games. Discover,
              explore, and share your passion.
            </p>
            <p className="text-xs text-gray-500">
              Powered by the comprehensive{" "}
              <a
                href="https://rawg.io/apidocs"
                target="_blank"
                rel="noopener noreferrer"
                className={externalLinkStyles}
              >
                RAWG API <ExternalLink size={12} className="ml-1" />
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className={linkStyles}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/games" className={linkStyles}>
                  All Games
                </Link>
              </li>
              <li>
                <Link href="/genres" className={linkStyles}>
                  Genres
                </Link>
              </li>
              <li>
                <Link href="/platforms" className={linkStyles}>
                  Platforms
                </Link>
              </li>
              <li>
                <Link href="/#latest-releases" className={linkStyles}>
                  Latest Releases
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-3">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className={linkStyles}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkStyles}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className={linkStyles}>
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="https://rawg.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={externalLinkStyles}
                >
                  RAWG.io Home <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-3">
              Legal & Info
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className={linkStyles}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className={linkStyles}>
                  Terms of Service
                </Link>
              </li>
              <li className="text-xs text-gray-500 pt-2">
                All game data and images are provided by and attributed to
                RAWG.io. We do not claim ownership of this content.
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Game Explorer. All rights reserved (unless otherwise
            stated).
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Designed with <span className="text-red-500 animate-pulse">❤</span>{" "}
            for gamers.
          </p>
        </div>
      </div>
    </footer>
  );
}
