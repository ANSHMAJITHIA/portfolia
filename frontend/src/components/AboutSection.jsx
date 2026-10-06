import React from 'react';
import { User, Code2, Server, Database, CheckCircle2 } from 'lucide-react';

export default function AboutSection({ profile }) {
  const highlights = [
    { title: 'Frontend Mastery', desc: 'React, Next.js, reactive state architectures, Tailwind styling.' },
    { title: 'Backend Engineering', desc: 'Node.js, Express, REST APIs, authentication & file pipelines.' },
    { title: 'Bespoke CMS Solutions', desc: 'Custom admin workflows tailored precisely to business needs.' },
    { title: 'Performance Mindset', desc: 'Optimized bundle sizes, low latency API routes, clean modular code.' },
  ];

  return (
    <section id="about" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">Engineering Philosophy</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            About Me & My Background
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Avatar / Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-600 opacity-25 blur-xl group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl">
                <div className="w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-950">
                  <img
                    src={profile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={profile?.full_name || 'Profile'}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="mt-4 p-2 text-center">
                  <div className="text-sm font-bold text-white">{profile?.full_name || 'Ansh Majithia'}</div>
                  <div className="text-xs text-indigo-400 font-mono">{profile?.headline || 'Full-Stack Developer'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-slate-300 text-base sm:text-lg leading-relaxed space-y-4">
              <p>
                {profile?.bio || 'Passionate software engineer crafting resilient web architectures, modern reactive user interfaces, and bespoke content management systems.'}
              </p>
              <p className="text-slate-400 text-sm sm:text-base">
                Rather than relying on generic website builders or black-box third-party CMS subscriptions, I believe in building deep software fundamentals: clean database schemas, secure authentication mechanisms, responsive layout components, and end-to-end maintainability.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((h, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-white">{h.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal pl-6">{h.desc}</p>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
                <div className="text-xs text-slate-500">Custom Coded</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">&lt; 50ms</div>
                <div className="text-xs text-slate-500">API Response Time</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">Zero</div>
                <div className="text-xs text-slate-500">CMS Vendor Lock-in</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
