import React from 'react';
import { ArrowUp, Terminal, Heart } from 'lucide-react';

export default function Footer({ profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div>
          <div className="flex items-center gap-2 text-white font-semibold mb-1">
            <span>{profile?.full_name || 'Ansh Majithia'}</span>
            <span className="text-slate-600">•</span>
            <span className="text-indigo-400 font-mono text-[11px]">Full-Stack Portfolio Ecosystem</span>
          </div>
          <p className="text-slate-500">
            Engineered from scratch using React, Node.js, Express, and a custom-coded CMS.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="http://localhost:5000/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:text-white hover:border-slate-700 transition"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>CMS Admin Panel</span>
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900 hover:text-white hover:border-slate-700 transition"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
