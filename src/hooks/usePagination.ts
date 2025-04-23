import {
  keepPreviousData,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import api from '../lib/api';
import {AxiosError, AxiosResponse} from 'axios';

export const usePagination = <T, K extends string>(
  route: string,
  options?: UseQueryOptions<AxiosResponse, AxiosError>,
) => {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  const {data, isPlaceholderData, ...query} = useQuery({
    ...options,
    queryKey: [route, page],
    queryFn: () => api.get(`${route}?page=${page}`),
    placeholderData: keepPreviousData,
    staleTime: 5000,
    select: data => data.data as Record<K, T[]> & {hasMore?: boolean},
  });

  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: [route, page + 1],
        queryFn: () => api.get(`${route}?page=${page + 1}`),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  return {
    nextPage: () => setPage(old => (data?.hasMore ? old + 1 : old)),
    data,
    isPlaceholderData: isPlaceholderData as false,
    ...query,
  };
};
