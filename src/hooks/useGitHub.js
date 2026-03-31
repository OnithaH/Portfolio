import { useState, useEffect } from 'react';
import { fetchAllFeaturedRepos } from '../utils/githubApi';

export const useGitHub = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setLoading(true);
        const data = await fetchAllFeaturedRepos();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadRepos();
  }, []);

  return { repos, loading, error };
};
