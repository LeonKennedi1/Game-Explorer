// src/app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { FaGamepad, FaUsers, FaLightbulb, FaHeart } from "react-icons/fa";

export const metadata: Metadata = {
  title: "About Us | Game Explorer",
  description:
    "Learn more about Game Explorer, your ultimate destination for discovering and exploring video games.",
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-sky-400 tracking-tight">
            About Game Explorer
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
            Your ultimate portal to the vast universe of video games. Discover,
            explore, and dive deep into your next favorite adventure.
          </p>
        </header>

        <section className="mb-12 pt-4">
          <h2 className="text-3xl font-semibold text-sky-300 mb-6 text-center">
            Our Mission
          </h2>
          <div className="max-w-3xl mx-auto bg-slate-800 p-6 sm:p-8 rounded-lg shadow-xl">
            <p className="text-lg text-slate-300 leading-relaxed">
              At Game Explorer, our mission is to provide gamers of all kinds
              with a comprehensive, intuitive, and engaging platform to discover
              and learn about video games. We aim to be the go-to resource for
              game information, including details on platforms, release dates,
              genres, developers, publishers, and community ratings. We believe
              that finding your next great game should be an exciting journey,
              not a chore.
            </p>
          </div>
        </section>

        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl font-semibold text-sky-300 mb-8 text-center">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl flex flex-col items-center text-center">
              <FaGamepad className="text-5xl text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-100 mb-2">
                Curate Game Data
              </h3>
              <p className="text-slate-400">
                We meticulously gather and organize data for thousands of games,
                ensuring you have access to accurate and up-to-date information.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl flex flex-col items-center text-center">
              <FaLightbulb className="text-5xl text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-100 mb-2">
                Facilitate Discovery
              </h3>
              <p className="text-slate-400">
                Our powerful search and filtering tools, along with curated
                lists, help you find games tailored to your preferences.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl flex flex-col items-center text-center md:col-span-2 lg:col-span-1">
              <FaUsers className="text-5xl text-rose-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-100 mb-2">
                Build Community
              </h3>
              <p className="text-slate-400">
                We foster a space for gamers to share their opinions, ratings,
                and connect over their shared passion for gaming.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl font-semibold text-sky-300 mb-6 text-center">
            Our Story
          </h2>
          <div className="max-w-3xl mx-auto bg-slate-800 p-6 sm:p-8 rounded-lg shadow-xl">
            <p className="text-lg text-slate-300 leading-relaxed mb-4">
              Game Explorer was born from a simple idea: to create a place where
              the joy of discovering new games is as thrilling as playing them.
              As lifelong gamers, we often found ourselves spending too much
              time searching for reliable game information scattered across the
              web. We envisioned a unified platform that was both comprehensive
              and easy to navigate.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              Fuelled by <FaHeart className="inline text-red-500 mx-1" /> for
              gaming and a passion for web development, our small team embarked
              on this journey to build Game Explorer from the ground up. We are
              committed to continuously improving the platform, adding new
              features, and expanding our database to serve the global gaming
              community.
            </p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold text-sky-300 mb-6">
            Join Us on Our Quest!
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            We're excited about the future of Game Explorer and the gaming
            world. Explore our vast collection and find your next adventure!
          </p>
          <Link
            href="/games"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Explore Games Now
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
