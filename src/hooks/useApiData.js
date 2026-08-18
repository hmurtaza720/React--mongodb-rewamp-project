import { useState, useEffect } from 'react';
import { apiGet } from '../api/client';

/**
 * Fetches `path` from the API on mount and returns { data, loading, error }.
 * `initialValue` (e.g. [] or {}) is what `data` holds until the request
 * resolves, so components can render immediately without null-checks.
 */
export default function useApiData(path, initialValue) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    apiGet(path)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return { data, loading, error };
}
