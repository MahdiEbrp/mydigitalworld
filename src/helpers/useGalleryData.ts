import axios from 'axios';
import useSWR from 'swr';
import { Gallery } from '@/type/gallery';

const GALLERY_API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/gallery`;
const UPDATE_GALLERY_API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/like/update`;

const fetcher = async (url: string) => {
    const { data } = await axios.get(url, {
        withCredentials: true,
    });
    return data;
};

type LikeResponse = {
    likes: number,
    dislikes: number,
    likedBySessionUser: boolean,
    dislikedBySessionUser: boolean;
};

const useGalleryData = () => {
    const { data: galleryData = [], error, isLoading, mutate } = useSWR<Gallery[]>(GALLERY_API_ROUTE, fetcher);

    const updateGallery = async (topicId: string, isLike: boolean) => {
        try {
            let newGalleryData = galleryData.map((image) => {
                if (image.topicId === topicId) {
                    const isAlreadyLiked = image.likedBySessionUser;
                    const isAlreadyDisliked = image.dislikedBySessionUser;
                    image.likes += isAlreadyLiked ? -1 : isLike ? 1 : 0;
                    image.dislikes += isAlreadyDisliked ? -1 : !isLike ? 1 : 0;
                    image.likedBySessionUser = !isAlreadyLiked && isLike;
                    image.dislikedBySessionUser = !isAlreadyDisliked && !isLike;
                }
                return image;
            });

            mutate([...newGalleryData], false);

            const { data: response } = await axios.post<LikeResponse>(UPDATE_GALLERY_API_ROUTE, { topicId, isLike });
            newGalleryData = newGalleryData.map((image) => {
                if (image.topicId === topicId) {
                    return { ...image, ...response };
                }
                return image;
            });
            mutate(newGalleryData, false);
            return {error:undefined};
        } catch (error) {
            return {error:error};
        }
    };

    return { galleryData, isLoading, error, updateGallery,mutate };
};

export default useGalleryData;
