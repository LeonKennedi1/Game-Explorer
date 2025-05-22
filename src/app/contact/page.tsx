//src/app/contact/page.tsx
"use client";
import { Mail, MessageSquare, MapPin, Phone } from "lucide-react";
export default function ContactPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Thank you for your message! This is a demo form.");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <Mail className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100">
            Contact{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-500">
              Us
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            We're here to help and answer any question you might have.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="space-y-6 p-6 bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold text-emerald-300 mb-3">
              Get in Touch
            </h2>
            <div className="flex items-start">
              <Mail
                size={20}
                className="mr-3 mt-1 text-emerald-400 flex-shrink-0"
              />
              <div>
                <h3 className="font-medium text-slate-100">Email</h3>
                <a
                  href="mailto:contact@gameexplorer.com"
                  className="text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  odokienkovlas07@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <Phone
                size={20}
                className="mr-3 mt-1 text-emerald-400 flex-shrink-0"
              />
              <div>
                <h3 className="font-medium text-slate-100">
                  Phone (Support Hours: 9am - 5pm UTC)
                </h3>
                <p className="text-slate-300">
                  +7 707 799 7015
                  <span className="text-xs text-slate-200 ml-2">Vlas</span>
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin
                size={20}
                className="mr-3 mt-1 text-emerald-400 flex-shrink-0"
              />
              <div>
                <h3 className="font-medium text-slate-100">Our Office</h3>
                <p className="text-slate-300">
                  123 Gaming Lane, Pixel City, GC 54321{" "}
                  <span className="text-xs text-slate-500">(Placeholder)</span>
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              For support inquiries, please be as detailed as possible. We aim
              to respond within 24-48 business hours.
            </p>
          </section>
          <section className="p-6 bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4 flex items-center">
              <MessageSquare size={28} className="mr-3" /> Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-500"
                  placeholder="Question about a game"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-500"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
