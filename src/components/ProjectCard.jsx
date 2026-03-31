import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch, FiEye } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { getLanguageColor, getProjectMeta } from '../utils/githubApi';

const ProjectCard = ({ repo, index }) => {
  const [hovered, setHovered] = useState(false);
  const meta = getProjectMeta(repo.name);

  const handleViewDetails = async () => {
    const languages = repo.languages || {};
    const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
    const langHtml = Object.entries(languages)
      .map(([lang, bytes]) => {
        const pct = ((bytes / totalBytes) * 100).toFixed(1);
        const color = getLanguageColor(lang);
        return `<div class="flex items-center gap-2 mb-1">
          <span style="width:12px;height:12px;border-radius:50%;background:${color};display:inline-block;"></span>
          <span style="color:#e2e8f0;">${lang}</span>
          <span style="color:#94a3b8;margin-left:auto;">${pct}%</span>
        </div>`;
      })
      .join('');

    await Swal.fire({
      title: `<span style="color:#6366f1;">${meta.title || repo.name}</span>`,
      html: `
        <div style="text-align:left;color:#cbd5e1;">
          <p style="margin-bottom:16px;line-height:1.6;">${meta.description || repo.description || 'No description available.'}</p>
          <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.3);border-radius:8px;padding:12px;margin-bottom:16px;">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center;">
              <div><div style="font-size:1.25rem;font-weight:bold;color:#6366f1;">⭐ ${repo.stargazers_count || 0}</div><div style="font-size:0.75rem;color:#94a3b8;">Stars</div></div>
              <div><div style="font-size:1.25rem;font-weight:bold;color:#8b5cf6;">🍴 ${repo.forks_count || 0}</div><div style="font-size:0.75rem;color:#94a3b8;">Forks</div></div>
              <div><div style="font-size:1.25rem;font-weight:bold;color:#06b6d4;">👁 ${repo.watchers_count || 0}</div><div style="font-size:0.75rem;color:#94a3b8;">Watchers</div></div>
            </div>
          </div>
          ${langHtml ? `<div style="margin-bottom:16px;"><p style="color:#94a3b8;font-size:0.8rem;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;">Languages</p>${langHtml}</div>` : ''}
          ${meta.tags ? `<div style="display:flex;flex-wrap:wrap;gap:6px;">${meta.tags.map((t) => `<span style="background:rgba(99,102,241,0.2);color:#818cf8;padding:2px 10px;border-radius:20px;font-size:0.75rem;">${t}</span>`).join('')}</div>` : ''}
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: '🚀 View on GitHub',
      cancelButtonText: 'Close',
      background: '#0f172a',
      color: '#e2e8f0',
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#374151',
      customClass: {
        popup: 'swal-portfolio-popup',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(repo.html_url, '_blank', 'noopener,noreferrer');
      }
    });
  };

  const languages = repo.languages || {};
  const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <motion.div
      className="project-card relative glass rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/40 transition-all duration-300 group cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)' }}
      onClick={handleViewDetails}
    >
      {/* Top color bar */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${getLanguageColor(repo.language)}, #8b5cf6)`,
        }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-1">
              {meta.title || repo.name}
            </h3>
            <p className="text-xs text-gray-500">{repo.full_name}</p>
          </div>
          <div className="flex gap-2">
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glass rounded-lg border border-white/10 hover:border-indigo-500/40 text-gray-400 hover:text-indigo-400 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FiGithub className="w-4 h-4" />
            </motion.a>
            {repo.homepage && (
              <motion.a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass rounded-lg border border-white/10 hover:border-indigo-500/40 text-gray-400 hover:text-indigo-400 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {meta.description || repo.description || 'No description available.'}
        </p>

        {/* Tags */}
        {meta.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Language bars */}
        {topLanguages.length > 0 && (
          <div className="mb-4">
            <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5">
              {topLanguages.map(([lang, bytes]) => (
                <div
                  key={lang}
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(bytes / totalBytes) * 100}%`,
                    backgroundColor: getLanguageColor(lang),
                  }}
                  title={`${lang}: ${((bytes / totalBytes) * 100).toFixed(1)}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {topLanguages.map(([lang]) => (
                <span key={lang} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getLanguageColor(lang) }}
                  />
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-white/5 pt-4">
          <span className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
            <FiStar className="w-3.5 h-3.5" />
            {repo.stargazers_count || 0}
          </span>
          <span className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
            <FiGitBranch className="w-3.5 h-3.5" />
            {repo.forks_count || 0}
          </span>
          <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
            <FiEye className="w-3.5 h-3.5" />
            {repo.watchers_count || 0}
          </span>
          {repo.language && (
            <span className="ml-auto flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              />
              {repo.language}
            </span>
          )}
        </div>
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 bg-indigo-600/5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCard;
