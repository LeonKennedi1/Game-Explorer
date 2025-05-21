import Link from "next/link";
import {
  Gamepad2,
  Home,
  Sword,
  Shield,
  Users,
  Layers,
  TowerControl,
} from "lucide-react";
export default function Header() {
  const iconSize = 18;
  const navLinkBaseStyles =
    "flex items-center px-3 py-2 rounded-md transition-all duration-300 text-sm sm:text-base font-medium";
  const navLinkHoverStyles = "hover:bg-white/10 hover:text-sky-300";

  return (
    <header
      className="
      animated-gradient-header /* Наш класс с анимированным градиентом */
      text-gray-100 p-4 shadow-2xl sticky top-0 z-50 border-b border-white/10"
    >
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <Gamepad2
            size={36}
            className="
              text-sky-400 group-hover:text-sky-300
              transition-all duration-300 transform group-hover:rotate-[-15deg] group-hover:scale-110
              drop-shadow-[0_2px_2px_rgba(0,119,182,0.7)]"
          />
          <span
            className="
            text-2xl sm:text-3xl font-extrabold tracking-tight
            text-shadow-soft group-hover:text-gray-50 transition-colors duration-300
            bg-clip-text text-transparent bg-gradient-to-r from-slate-50 via-sky-200 to-slate-200
            group-hover:from-sky-300 group-hover:via-white group-hover:to-sky-400
            "
          >
            Game Explorer
          </span>
        </Link>
        <ul className="flex items-center space-x-1 md:space-x-2">
          <li>
            <Link
              href="/"
              className={`${navLinkBaseStyles} ${navLinkHoverStyles}`}
            >
              <Home size={iconSize} className="mr-1.5 sm:mr-2" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/games"
              className={`${navLinkBaseStyles} ${navLinkHoverStyles}`}
            >
              <Sword size={iconSize} className="mr-1.5 sm:mr-2" />
              Games
            </Link>
          </li>
          <li>
            <Link
              href="/developers"
              className={`${navLinkBaseStyles} ${navLinkHoverStyles}`}
            >
              <Users size={iconSize} className="mr-1.5 sm:mr-2" />
              Developers
            </Link>
          </li>
          <li>
            <Link
              href="/genres"
              className={`${navLinkBaseStyles} ${navLinkHoverStyles}`}
            >
              <Layers size={iconSize} className="mr-1.5 sm:mr-2" />
              Genres
            </Link>
          </li>
          <li>
            <Link
              href="/platforms"
              className={`${navLinkBaseStyles} ${navLinkHoverStyles}`}
            >
              <TowerControl size={iconSize} className="mr-1.5 sm:mr-2" />{" "}
              Platforms
            </Link>
          </li>
          <li>
            <Link
              href="/publishers"
              className={`${navLinkBaseStyles} ${navLinkHoverStyles}`}
            >
              <Shield size={iconSize} className="mr-1.5 sm:mr-2" /> Publishers
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
