import { fetcher } from 'lib/fetcher';
import useSWR from 'swr';

export const useBounties = () => {
    const { data, error } = useSWR('/api/bounties', fetcher);

    return {
        bounties: data,
        isError: error,
        isLoading: !error && !data,
    };
};
