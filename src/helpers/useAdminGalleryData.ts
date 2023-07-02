import axios, { AxiosError } from 'axios';
import useSWR from 'swr';
import { Gallery } from '@/type/gallery';
import { useMemo, useState } from 'react';

const GALLERY_API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/admin/gallery/fetch`;
const INSERT_GALLERY_API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/admin/gallery/insert`;
const UPDATE_GALLERY_API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/admin/gallery/update`;
const DELETE_GALLERY_API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/admin/gallery/delete`;

const fetcher = async (url: string) => {
    const { data } = await axios.get(url, {
        withCredentials: true,
    });
    return data;
};


const useAdminGalleryData = () => {
    const { data: galleryData = [], error, isLoading, mutate } = useSWR<Gallery[]>(GALLERY_API_ROUTE, fetcher);
    const [isUpdating, setUpdating] = useState(false);
    const adminError = useMemo(() => {
        return error instanceof AxiosError && error.response?.status === 403;
    }, [error]);
    const insertGallery = async (galleryPost: Gallery) => {
        const { id, title, location, src, altTag, description } = galleryPost;
        const data = { id, title, location, src, altTag, description };
        const isEmpty = Object.values(data).some(value => !value);
        if (isEmpty)
            return { error: 'Empty object' };

        galleryPost.id = id;

        try {
            setUpdating(true);
            let newGalleryData = [...galleryData, galleryPost];
            mutate(newGalleryData, false);
            const { data: response } = await axios.post<Gallery>(INSERT_GALLERY_API_ROUTE, data);
            newGalleryData = newGalleryData.map((image) => {
                if (image.id === id) {
                    return response;
                }
                return image;
            });
            mutate(newGalleryData, false);
            return { error: undefined };
        } catch (error) {
            const previousGalleryData = galleryData.filter((image) => image.topicId !== id);
            mutate(previousGalleryData, false);
            return { error: error };
        }
        finally{
            setUpdating(false);
        }
    };
    const updateGallery = async (galleryPost: Gallery) => {
        const { id, title, location, src, altTag, description } = galleryPost;
        const data = { id, title, location, src, altTag, description };
        const isEmpty = Object.values(data).some(value => !value);
        if (isEmpty)
            return { error: 'Empty object' };
        const post = galleryData.find(image => image.id === id);
        if (!post)
            return { error: 'Post Not found!' };
        try {
            setUpdating(true);
            let newGalleryData = galleryData.map((image) => {
                if (image.id === id) {
                    return { ...image, title, location, src, altTag, description };
                }
                return image;
            });

            mutate(newGalleryData, false);

            const { data: response } = await axios.post<Gallery>(UPDATE_GALLERY_API_ROUTE, data);

            newGalleryData = galleryData.map((image) => {
                if (image.id === id) {
                    return response;
                }
                return image;
            });
            mutate(newGalleryData, false);
            return { error: undefined };
        } catch (error) {
            const previousGalleryData = galleryData.filter((image) => image.topicId !== id);
            mutate([...previousGalleryData,post], false);
            return { error: error };
        }
        finally {
            setUpdating(false);
        }
    };
    const deleteGallery = async (id: string) => {

        if (!id || id.length === 0)
            return { error: 'id Not found!' };

        const post = galleryData.find(image => image.id === id);
        if (!post)
            return { error: 'Post Not found!' };
        const newGalleryData = galleryData.filter(image => image.id !== id);
        try {
            setUpdating(true);
            mutate(newGalleryData, false);

            await axios.post<{ id: string; }>(DELETE_GALLERY_API_ROUTE, { id });

            return { error: undefined };
        } catch (error) {

            mutate([...newGalleryData,post], false);
            return { error: error };
        }
        finally {
            setUpdating(false);
        }
    };
    return { galleryData, isLoading, error, adminError, mutate, insertGallery, updateGallery, deleteGallery,isUpdating };
};

export default useAdminGalleryData;
