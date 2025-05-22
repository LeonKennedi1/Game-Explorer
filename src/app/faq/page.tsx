// app/faq/page.tsx
import { HelpCircle, ChevronDown } from "lucide-react";
import Link from "next/link";
export const metadata = {
  title: "FAQ - Game Explorer",
  description:
    "Find answers to frequently asked questions about Game Explorer.",
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => (
  <details className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg shadow-md hover:border-purple-600/70 transition-colors duration-200">
    <summary className="cursor-pointer list-none p-4 font-semibold text-slate-100 group-open:border-b group-open:border-slate-600 hover:bg-slate-700/30 rounded-t-lg flex justify-between items-center transition-colors">
      <span>{question}</span>
      <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transform transition-transform duration-200" />
    </summary>
    <div className="p-4 text-slate-300 leading-relaxed bg-slate-700/30 rounded-b-lg">
      {answer}
    </div>
  </details>
);

const faqData = [
  {
    question: "What is Game Explorer?",
    answer:
      "Game Explorer is a comprehensive database and discovery platform for video games. We provide detailed information on games, developers, publishers, genres, and platforms, powered by the RAWG API.",
  },
  {
    question: "How is the game data sourced?",
    answer:
      "Our game data, including descriptions, ratings, screenshots, and trailers, is primarily sourced from the RAWG Video Games Database API (rawg.io). We strive to keep this information as accurate and up-to-date as possible.",
  },
  {
    question: "Can I contribute to Game Explorer?",
    answer:
      "Currently, Game Explorer is a read-only platform for discovering game information. We do not have user contribution features at this moment, but we appreciate your enthusiasm! You can always send us feedback or suggestions via our Contact Us page.",
  },
  {
    question: "How often is the game information updated?",
    answer:
      "We synchronize with the RAWG API regularly to ensure our data reflects the latest information available. However, there might be slight delays depending on RAWG's update cycle.",
  },
  {
    question: "Is Game Explorer free to use?",
    answer:
      "Yes, Game Explorer is completely free to use for browsing and discovering game information.",
  },
  {
    question: "I found an error in the game data. What should I do?",
    answer:
      "While we strive for accuracy, errors can sometimes occur. If you find any incorrect information, please feel free to contact us with the details, and we will look into it. Note that the primary source of data is RAWG.io.",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <HelpCircle className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100">
            Frequently Asked{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Questions
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Find answers to common questions about Game Explorer.
          </p>
        </header>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>

        <p className="text-center text-slate-400 mt-12">
          Can't find an answer?{" "}
          <Link
            href="/contact"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            Contact Us
          </Link>
        </p>
      </div>
    </div>
  );
}
