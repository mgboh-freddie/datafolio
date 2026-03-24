'use client';

import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Github, Star, GitFork, ExternalLink, Users, BookOpen, MapPin, Link2, Code2, TrendingUp, RefreshCw, Calendar, AlertCircle,  } from 'lucide-react';

const GITHUB_USERNAME = 'mgboh-freddie';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  blog: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
  size: number;
}

const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Jupyter: '#DA5B0B',
  Shell: '#89e051',
  R: '#198CE7',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
};

function LanguageDot({ language }: { language: string }) {
  const color = LANGUAGE_COLORS[language] || '#8b949e';
  return (
    <span
      className="lang-dot"
      style={{ backgroundColor: color }}
      title={language}
    />
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5 hover:border-cyan-400/30 hover:bg-zinc-800/60 transition-all duration-300 card-glow-hover"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen size={15} className="text-cyan-400 flex-shrink-0" />
          <span className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
            {repo.name}
          </span>
          {repo.fork && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700 flex-shrink-0">
              fork
            </span>
          )}
        </div>
        <ExternalLink
          size={13}
          className="text-zinc-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-0.5"
        />
      </div>

      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 flex-1">
        {repo.description || (
          <span className="italic text-zinc-600">No description provided</span>
        )}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/15"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 pt-1 border-t border-zinc-800/60">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <LanguageDot language={repo.language} />
            <span className="text-xs text-zinc-400">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-zinc-500">
          <Star size={12} />
          <span className="text-xs font-mono">{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1 text-zinc-500">
          <GitFork size={12} />
          <span className="text-xs font-mono">{repo.forks_count}</span>
        </div>
        <div className="flex items-center gap-1 text-zinc-500 ml-auto">
          <Calendar size={11} />
          <span className="text-xs">{updatedDate}</span>
        </div>
      </div>
    </a>
  );
}

export default function GitHubProfilePage() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'forks' | 'name'>('updated');
  const [filterLang, setFilterLang] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchGitHubData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
      ]);

      if (!userRes.ok) {
        if (userRes.status === 404) throw new Error(`GitHub user "${GITHUB_USERNAME}" not found.`);
        if (userRes.status === 403) throw new Error('GitHub API rate limit reached. Please try again in a minute.');
        throw new Error('Failed to fetch GitHub profile.');
      }

      const userData: GitHubUser = await userRes.json();
      const reposData: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];

      setUser(userData);
      setRepos(reposData);
    } catch (err: any) {
      setError(err.message || 'Failed to load GitHub data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const languages = ['all', ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean) as string[]))];

  const filteredRepos = repos
    .filter((r) => filterLang === 'all' || r.language === filterLang)
    .filter((r) =>
      searchQuery === '' ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
      if (sortBy === 'forks') return b.forks_count - a.forks_count;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
  const topLanguages = Object.entries(
    repos.reduce((acc: Record<string, number>, r) => {
      if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const joinYear = user ? new Date(user.created_at).getFullYear() : null;

  return (
    <AppLayout>
      <div className="min-h-screen bg-mesh-purple">
        {/* Page Header */}
        <div className="px-6 pt-8 pb-6 border-b border-zinc-800/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <Github size={20} className="text-zinc-300" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">GitHub Profile</h1>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Live data from{' '}
                  <span className="text-cyan-400 font-mono">@{GITHUB_USERNAME}</span>
                </p>
              </div>
            </div>
            <button
              onClick={fetchGitHubData}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition-all duration-150 text-sm disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-zinc-800 flex items-center justify-center">
                  <Github size={28} className="text-zinc-600" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-zinc-300 font-medium">Fetching GitHub data…</p>
                <p className="text-zinc-500 text-sm mt-1">Connecting to GitHub API</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-14 h-14 rounded-xl bg-rose-400/10 border border-rose-400/20 flex items-center justify-center">
                <AlertCircle size={24} className="text-rose-400" />
              </div>
              <div className="text-center max-w-sm">
                <p className="text-white font-semibold">Failed to load GitHub data</p>
                <p className="text-zinc-400 text-sm mt-1">{error}</p>
              </div>
              <button
                onClick={fetchGitHubData}
                className="px-4 py-2 rounded-lg bg-cyan-400 text-zinc-950 text-sm font-semibold hover:bg-cyan-300 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Content */}
          {!loading && !error && user && (
            <>
              {/* Profile + Stats Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Profile Card */}
                <div className="lg:col-span-1 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 animate-fade-in card-glow-cyan relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative flex flex-col items-center text-center gap-4">
                    <div className="relative">
                      <img
                        src={user.avatar_url}
                        alt={`${user.name || user.login} GitHub avatar`}
                        className="w-20 h-20 rounded-2xl border-2 border-zinc-700 object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                        <Github size={12} className="text-zinc-300" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">{user.name || user.login}</h2>
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
                      >
                        @{user.login}
                      </a>
                    </div>
                    {user.bio && (
                      <p className="text-xs text-zinc-400 leading-relaxed">{user.bio}</p>
                    )}
                    <div className="w-full space-y-2 pt-2 border-t border-zinc-800">
                      {user.location && (
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <MapPin size={12} className="text-zinc-500" />
                          {user.location}
                        </div>
                      )}
                      {user.blog && (
                        <div className="flex items-center gap-2 text-xs text-zinc-400 truncate">
                          <Link2 size={12} className="text-zinc-500 flex-shrink-0" />
                          <a
                            href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 truncate transition-colors"
                          >
                            {user.blog}
                          </a>
                        </div>
                      )}
                      {joinYear && (
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <Calendar size={12} className="text-zinc-500" />
                          Joined {joinYear}
                        </div>
                      )}
                    </div>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-150 text-sm font-medium"
                    >
                      <Github size={15} />
                      View on GitHub
                      <ExternalLink size={12} className="ml-auto text-zinc-500" />
                    </a>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4 animate-fade-in-delay-1">
                  {[
                    {
                      label: 'Public Repos',
                      value: user.public_repos,
                      icon: BookOpen,
                      color: 'text-cyan-400',
                      bg: 'bg-cyan-400/10',
                      border: 'border-cyan-400/20',
                    },
                    {
                      label: 'Followers',
                      value: user.followers,
                      icon: Users,
                      color: 'text-emerald-400',
                      bg: 'bg-emerald-400/10',
                      border: 'border-emerald-400/20',
                    },
                    {
                      label: 'Following',
                      value: user.following,
                      icon: TrendingUp,
                      color: 'text-purple-400',
                      bg: 'bg-purple-400/10',
                      border: 'border-purple-400/20',
                    },
                    {
                      label: 'Total Stars',
                      value: totalStars,
                      icon: Star,
                      color: 'text-amber-400',
                      bg: 'bg-amber-400/10',
                      border: 'border-amber-400/20',
                    },
                    {
                      label: 'Total Forks',
                      value: totalForks,
                      icon: GitFork,
                      color: 'text-blue-400',
                      bg: 'bg-blue-400/10',
                      border: 'border-blue-400/20',
                    },
                    {
                      label: 'Languages',
                      value: topLanguages.length,
                      icon: Code2,
                      color: 'text-rose-400',
                      bg: 'bg-rose-400/10',
                      border: 'border-rose-400/20',
                    },
                  ].map((stat, i) => {
                    const StatIcon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className={`stat-card p-4 flex flex-col gap-3`}
                        style={{ animationDelay: `${i * 0.05}s` }}
                      >
                        <div className={`w-9 h-9 rounded-lg ${stat.bg} border ${stat.border} flex items-center justify-center`}>
                          <StatIcon size={16} className={stat.color} />
                        </div>
                        <div>
                          <p className={`text-2xl font-bold font-mono tabular-nums ${stat.color}`}>
                            {stat.value.toLocaleString()}
                          </p>
                          <p className="text-xs text-zinc-500 mt-0.5">{stat.label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Languages */}
              {topLanguages.length > 0 && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 animate-fade-in-delay-2">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Code2 size={15} className="text-cyan-400" />
                    Top Languages
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {topLanguages.map(([lang, count]) => (
                      <div
                        key={lang}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800/60 border border-zinc-700/60 hover:border-zinc-600 transition-colors cursor-pointer"
                        onClick={() => setFilterLang(filterLang === lang ? 'all' : lang)}
                      >
                        <LanguageDot language={lang} />
                        <span className="text-sm text-zinc-300 font-medium">{lang}</span>
                        <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Repositories */}
              <div className="animate-fade-in-delay-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <BookOpen size={16} className="text-cyan-400" />
                    Repositories
                    <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-700">
                      {filteredRepos.length}
                    </span>
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Search */}
                    <input
                      type="text"
                      placeholder="Search repos…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm placeholder-zinc-600 focus:outline-none focus:border-cyan-400/50 transition-colors w-40"
                    />
                    {/* Language Filter */}
                    <select
                      value={filterLang}
                      onChange={(e) => setFilterLang(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-cyan-400/50 transition-colors"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang === 'all' ? 'All Languages' : lang}
                        </option>
                      ))}
                    </select>
                    {/* Sort */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-cyan-400/50 transition-colors"
                    >
                      <option value="updated">Recently Updated</option>
                      <option value="stars">Most Stars</option>
                      <option value="forks">Most Forks</option>
                      <option value="name">Name A–Z</option>
                    </select>
                  </div>
                </div>

                {filteredRepos.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50">
                    <BookOpen size={32} className="text-zinc-700" />
                    <p className="text-zinc-400 text-sm">No repositories match your filters</p>
                    <button
                      onClick={() => { setFilterLang('all'); setSearchQuery(''); }}
                      className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredRepos.map((repo) => (
                      <RepoCard key={repo.id} repo={repo} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
