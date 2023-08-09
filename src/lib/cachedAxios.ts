import axios from 'axios';
import useSWR from 'swr';

type CachedAxiosResult<T> = {
    data: T | undefined;
    isLoading: boolean;
    error: unknown;
};

const TIMEOUT_MS = 30000;

const useCachedAxios = <T>(key: string, url: string): CachedAxiosResult<T> => {
    const fetchData = async () => {
        const response = await axios.get(url, { timeout: TIMEOUT_MS });
        return response.data;
    };

    const { data, error } = useSWR(key, fetchData, {
        shouldRetryOnError: true,
        revalidateOnFocus: false
    });

    return {
        data,
        isLoading: !error && !data,
        error
    };
};

export default useCachedAxios;
