import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, FolderGit2, Info } from 'lucide-react';
import ProjectModal from './ProjectModal';

export default function ProjectsSection({ projects }) {
  const [filter, setFilter] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const displayedProjects = filter === 'featured'
    ? projects.filter(p => Boolean(p.featured))
    : projects;

  return (
    <section id="projects" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">Portfolio Showcase</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Featured Engineering Projects
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Production systems, developer tools, and full-stack solutions built with modern technology stacks.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === 'featured'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Featured Only
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {displayedProjects.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden flex flex-col group hover:border-slate-700 hover:shadow-2xl hover:shadow-indigo-950/20 transition-all duration-300"
            >
              {/* Image Banner */}
              <div className="relative h-48 bg-slate-950 overflow-hidden cursor-pointer" onClick={() => setActiveModalProject(p)}>
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700">
                    <FolderGit2 className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                
                {p.featured && (
                  <span className="absolute top-3 left-3 bg-indigo-600/90 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => setActiveModalProject(p)}
                    className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-2 cursor-pointer line-clamp-1"
                  >
                    {p.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {p.summary || p.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {(p.technologies || []).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {p.live_url && p.live_url !== '#' && (
                      <a
                        href={p.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {p.github_url && p.github_url !== '#' && (
                      <a
                        href={p.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white font-medium flex items-center gap-1 transition"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveModalProject(p)}
                    className="text-slate-400 hover:text-indigo-400 font-medium flex items-center gap-1 transition p-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
