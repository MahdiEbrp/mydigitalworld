import axios from 'axios';
import useSWR from 'swr';
import { Gallery } from '@/type/gallery';

const API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/gallery`;

const fetcher = async (url: string) => {
    const { data } = await axios.get(url, {
        withCredentials: true,
    });
    return data;
};

const useGalleryData = () => {
    const { data, error } = useSWR(API_ROUTE, (url) => fetcher(url));

    const galleryData = data as Gallery[];
    const isLoading = !galleryData && !error;
    const hasError = error !== undefined;

    return { galleryData, isLoading, hasError };
};

export default useGalleryData;
