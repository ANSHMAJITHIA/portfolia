import React from 'react';
import { ArrowRight, Github, Linkedin, Twitter, Mail, Sparkles, Terminal } from 'lucide-react';

export default function HeroSection({ profile }) {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden radial-glow">
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-violet-600/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Available for New Roles & High-Impact Contracts</span>
          <span className="text-slate-600">•</span>
          <span className="text-indigo-400 font-mono text-[11px]">{profile?.location || 'Remote / Worldwide'}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Architecting resilient <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            full-stack web systems.
          </span>
        </h1>

        {/* Headline & Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 font-normal leading-relaxed mb-10">
          Hi, I'm <strong className="text-slate-200 font-semibold">{profile?.full_name || 'Ansh Majithia'}</strong>. {profile?.headline || 'Full-Stack Developer & Software Architect'}. Crafting clean APIs, scalable backends, and modern reactive user interfaces.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/25 transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-indigo-400" />
            <span>Get in Touch</span>
          </a>

          <a
            href="http://localhost:5000/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-indigo-300 bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/30 transition-all flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-slate-500" />
            <span>Custom CMS Studio</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-5 text-slate-500">
          {profile?.github_url && (
            <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition p-2" title="GitHub">
              <Github className="w-5 h-5" />
            </a>
          )}
          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition p-2" title="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {profile?.twitter_url && (
            <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition p-2" title="Twitter / X">
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="hover:text-emerald-400 transition p-2" title="Direct Email">
              <Mail className="w-5 h-5" />
            </a>
          )}
        </div>

      </div>
    </section>
  );
}
