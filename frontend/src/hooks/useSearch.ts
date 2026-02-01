import { useQuery } from '@tanstack/react-query';
import { searchAPI } from '../lib/api';

export const useSearch = (query: string, enabled = true) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchAPI.search(query),
    enabled: enabled && query.length > 0,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
