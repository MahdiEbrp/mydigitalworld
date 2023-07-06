import axios, { AxiosError } from 'axios';
import useSWR from 'swr';
import { useMemo, useState } from 'react';
import { AdminEditCommentType } from '@/type/adminEditComment';

const PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST;
const COMMENTS_API_ROUTE = `${PUBLIC_HOST}/api/admin/comments/fetch`;
const DELETE_COMMENTS_API_ROUTE = `${PUBLIC_HOST}/api/admin/comments/delete`;

const fetcher = async (url: string) => {
    const { data } = await axios.get(url, {
        withCredentials: true,
    });
    return data;
};


const useAdminCommentsData = () => {
    const { data: commentsData, error, isLoading, mutate } = useSWR<AdminEditCommentType>(COMMENTS_API_ROUTE, fetcher);
    const [isUpdating, setUpdating] = useState(false);
    const adminError = useMemo(() => {
        return error instanceof AxiosError && error.response?.status === 403;
    }, [error]);


    const deleteComments = async (ids: string[]) => {

        if (!ids || ids.length === 0)
            return { error: 'id(s) Not found!' };
        if (!commentsData)
            return { error: undefined };
        const posts = commentsData.comments.filter(comment => ids.includes(comment.id));
        if (!posts || posts.length === 0)
            return { error: 'Post Not found!' };
        try {
            setUpdating(true);
            // mutate(commentsData.comments, false);

            await axios.post<{ id: string; }>(DELETE_COMMENTS_API_ROUTE, { ids });

            return { error: undefined };
        } catch (error) {

            // mutate([...newCommentsData, post], false);
            return { error: error };
        }
        finally {
            setUpdating(false);
        }
    };

    return { commentsData, isLoading, error, adminError, mutate, isUpdating, deleteComments };
};

export default useAdminCommentsData;
