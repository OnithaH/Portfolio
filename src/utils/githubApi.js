import axios from 'axios';

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'OnithaH';

const FEATURED_REPOS = [
  'hazel_rasp',
  'EventHub',
  'Hazel',
  'HiveLanka',
  'Medical-Center-Application',
];

export const fetchRepo = async (repoName) => {
  try {
    const response = await axios.get(`${GITHUB_API}/repos/${USERNAME}/${repoName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching repo ${repoName}:`, error);
    return null;
  }
};

export const fetchRepoLanguages = async (repoName) => {
  try {
    const response = await axios.get(`${GITHUB_API}/repos/${USERNAME}/${repoName}/languages`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching languages for ${repoName}:`, error);
    return {};
  }
};

export const fetchAllFeaturedRepos = async () => {
  const repos = await Promise.all(
    FEATURED_REPOS.map(async (name) => {
      const [repo, languages] = await Promise.all([
        fetchRepo(name),
        fetchRepoLanguages(name),
      ]);
      if (!repo) return null;
      return { ...repo, languages };
    })
  );
  return repos.filter(Boolean);
};

export const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    'C++': '#f34b7d',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Shell: '#89e051',
    Vue: '#41b883',
    Svelte: '#ff3e00',
  };
  return colors[language] || '#8b949e';
};

export const getProjectMeta = (repoName) => {
  const meta = {
    hazel_rasp: {
      title: 'Hazel Rasp',
      description: 'A sophisticated Python application with advanced algorithms and data processing capabilities.',
      tags: ['Python', 'Machine Learning', 'Data Science'],
      featured: true,
    },
    EventHub: {
      title: 'EventHub',
      description: 'Online Event Ticketing System — seamless event discovery, booking, and management platform.',
      tags: ['Web App', 'Ticketing', 'Events'],
      featured: true,
    },
    Hazel: {
      title: 'Hazel',
      description: 'A TypeScript-powered application with stunning 3D designs and interactive UI components.',
      tags: ['TypeScript', '3D Design', 'Interactive'],
      featured: true,
    },
    HiveLanka: {
      title: 'HiveLanka',
      description: 'Full-featured e-commerce platform with modern UI, product management, and seamless checkout.',
      tags: ['E-Commerce', 'Full Stack', 'Shopping'],
      featured: true,
    },
    'Medical-Center-Application': {
      title: 'Medical Center App',
      description: 'Comprehensive medical center management application with patient records and appointment scheduling.',
      tags: ['Healthcare', 'JavaScript', 'Management'],
      featured: true,
    },
  };
  return meta[repoName] || {};
};
