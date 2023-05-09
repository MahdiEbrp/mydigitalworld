import axios, { AxiosInstance } from 'axios';
import { setupCache } from 'axios-cache-adapter';

export type AxiosProps= {
    baseURL: string;
    cacheMaxAge: number;
}
export const createAxiosInstance = ({ baseURL, cacheMaxAge }: AxiosProps): AxiosInstance => {
    const cache = setupCache({
        maxAge: cacheMaxAge,
    });

    return axios.create({
        baseURL,
        adapter: cache.adapter,
    });
};

export default createAxiosInstance;