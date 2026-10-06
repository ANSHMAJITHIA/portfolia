import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { getProfile, getSkills, getProjects, getExperiences, getBlogPosts } from './lib/api';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const [profData, skillsData, projData, expData, blogData] = await Promise.all([
          getProfile(),
          getSkills(),
          getProjects(),
          getExperiences(),
          getBlogPosts()
        ]);

        if (profData) setProfile(profData);
        if (skillsData) setSkills(skillsData);
        if (projData) setProjects(projData);
        if (expData) setExperiences(expData);
        if (blogData) setPosts(blogData);
      } catch (err) {
        console.error('Error fetching portfolio content:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <div className="w-12 h-12 rounded-2xl border-2 border-indigo-500 border-t-transparent animate-spin mb-4"></div>
        <div className="text-xs font-mono tracking-wider text-slate-300">Synchronizing with Custom CMS API...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      <Navbar profile={profile} />
      <main className="flex-1">
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <BlogSection posts={posts} />
        <ContactSection profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
