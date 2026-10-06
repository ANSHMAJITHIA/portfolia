import React, { useState } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function ExperienceSection({ experiences }) {
  const [filterType, setFilterType] = useState('all');

  const filtered = filterType === 'all'
    ? experiences
    : experiences.filter(e => e.type.toLowerCase() === filterType.toLowerCase());

  return (
    <section id="experience" className="py-24 bg-slate-900/40 border-t border-slate-900">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">Career Trajectory</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Work Experience & Education
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Professional background, engineering roles, and academic foundations.
          </p>

          {/* Type Toggle */}
          <div className="inline-flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl mt-6">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterType === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Milestones
            </button>
            <button
              onClick={() => setFilterType('work')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterType === 'work' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Work Only
            </button>
            <button
              onClick={() => setFilterType('education')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterType === 'education' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Education
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-32 space-y-12">
          {filtered.map((item) => (
            <div key={item.id} className="relative pl-8 sm:pl-10 group">
              
              {/* Timeline marker icon */}
              <div className={`absolute -left-5 top-1.5 w-10 h-10 rounded-xl border flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                item.type === 'work'
                  ? 'bg-slate-900 border-indigo-500/40 text-indigo-400 shadow-indigo-500/10'
                  : 'bg-slate-900 border-emerald-500/40 text-emerald-400 shadow-emerald-500/10'
              }`}>
                {item.type === 'work' ? (
                  <Briefcase className="w-4 h-4" />
                ) : (
                  <GraduationCap className="w-4 h-4" />
                )}
              </div>

              {/* Date stamp on left for wider screens */}
              <div className="hidden sm:block absolute -left-36 top-3 w-28 text-right">
                <span className="text-xs font-mono font-medium text-slate-500">
                  {item.start_date}
                </span>
                <span className="block text-[11px] font-mono text-slate-600">
                  {item.end_date || (item.is_current ? 'Present' : '')}
                </span>
              </div>

              {/* Card Container */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    {item.is_current && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Current
                      </span>
                    )}
                  </div>
                  <span className="sm:hidden text-xs font-mono text-indigo-400">
                    {item.start_date} – {item.end_date || 'Present'}
                  </span>
                </div>

                <div className="text-xs font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                  <span>{item.organization}</span>
                  {item.location && (
                    <>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </span>
                    </>
                  )}
                </div>

                {item.description && (
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
