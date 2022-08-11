import { fetcher } from 'lib/fetcher';
import useSWR from 'swr';

export const useBountiesByAssignee = (username: string) => {
    const { data, error } = useSWR(
        () => (username ? `/api/bounties/${username}` : null),
        fetcher,
    );

    return {
        bounties: data,
        isError: error,
        isLoading: !error && !data,
    };
};
