import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, X, ArrowRight, Tag } from 'lucide-react';

export default function BlogSection({ posts }) {
  const [selectedPost, setSelectedPost] = useState(null);

  if (!posts || posts.length === 0) return null;

  return (
    <section id="blog" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">Editorial & Insights</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Engineering Articles & Notes
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Thoughts on software architecture, custom CMS development, and web ecosystems.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col cursor-pointer group hover:shadow-xl hover:shadow-indigo-950/20"
            >
              {post.cover_image && (
                <div className="h-48 bg-slate-950 overflow-hidden">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      {new Date(post.published_at || post.created_at).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 4 min read
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {(post.tags || []).slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read article</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-10">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedPost.cover_image && (
              <div className="rounded-2xl overflow-hidden h-60 w-full mb-6">
                <img src={selectedPost.cover_image} alt={selectedPost.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-mono">
              <span>{new Date(selectedPost.published_at || selectedPost.created_at).toLocaleDateString()}</span>
              <span>•</span>
              <span>{(selectedPost.tags || []).join(', ')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              {selectedPost.title}
            </h2>

            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans space-y-4 border-t border-slate-800/80 pt-6">
              {selectedPost.content}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
