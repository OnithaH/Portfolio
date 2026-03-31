import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiRefreshCw } from 'react-icons/fi';
import AOS from 'aos';
import ProjectCard from './ProjectCard';
import { useGitHub } from '../hooks/useGitHub';
import Swal from 'sweetalert2';

const filterOptions = ['All', 'TypeScript', 'Python', 'JavaScript', 'HTML'];

const Projects = () => {
  const { repos, loading, error } = useGitHub();
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredRepos, setFilteredRepos] = useState([]);

  useEffect(() => {
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (!repos.length) { setFilteredRepos([]); return; }
    if (activeFilter === 'All') {
      setFilteredRepos(repos);
    } else {
      setFilteredRepos(
        repos.filter((repo) => {
          const langs = repo.languages || {};
          return repo.language === activeFilter || Object.keys(langs).includes(activeFilter);
        })
      );
    }
  }, [repos, activeFilter]);

  const handleRefresh = async () => {
    await Swal.fire({
      title: 'Refreshing Projects',
      text: 'Fetching latest data from GitHub...',
      icon: 'info',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      background: '#0f172a',
      color: '#e2e8f0',
    });
    window.location.reload();
  };

  return (
    <section id="projects" className="py-20 bg-gray-900/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            My Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my latest projects with live data pulled directly from GitHub.
            Click any project card to see more details.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10" data-aos="fade-up" data-aos-delay="100">
          {filterOptions.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-indigo-600 text-white neon-glow'
                  : 'glass border border-white/10 text-gray-400 hover:border-indigo-500/40 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
          <motion.button
            onClick={handleRefresh}
            className="px-5 py-2 rounded-full text-sm font-medium glass border border-white/10 text-gray-400 hover:border-indigo-500/40 hover:text-white flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiRefreshCw className="w-3.5 h-3.5" />
            Refresh
          </motion.button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="glass rounded-2xl border border-white/10 overflow-hidden">
                <div className="h-1 bg-gray-800 animate-pulse" />
                <div className="p-6">
                  <div className="h-5 bg-gray-800 rounded animate-pulse mb-3 w-3/4" />
                  <div className="h-3 bg-gray-800 rounded animate-pulse mb-2" />
                  <div className="h-3 bg-gray-800 rounded animate-pulse mb-2 w-2/3" />
                  <div className="h-2 bg-gray-800 rounded animate-pulse mt-6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 px-6 py-4 glass rounded-2xl border border-red-500/30 text-red-400">
              <span>⚠️ Failed to fetch GitHub data.</span>
              <button
                onClick={handleRefresh}
                className="underline hover:text-white transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {filteredRepos.map((repo, index) => (
              <ProjectCard key={repo.id} repo={repo} index={index} />
            ))}
          </motion.div>
        )}

        {!loading && !error && filteredRepos.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No projects found for the selected filter.
          </div>
        )}

        {/* GitHub Link */}
        <div className="text-center mt-12" data-aos="fade-up">
          <motion.a
            href="https://github.com/OnithaH"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 glass border border-indigo-500/30 hover:border-indigo-500 text-white rounded-xl font-semibold transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub className="w-5 h-5" />
            View All Projects on GitHub
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
