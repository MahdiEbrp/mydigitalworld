import axios, { AxiosError } from 'axios';
import useSWR from 'swr';
import { AdminEditCommentType } from '@/type/adminEditComment';
import { useMemo, useState } from 'react';

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
    const { data: commentsData, error, isLoading, mutate } = useSWR<AdminEditCommentType>(
        COMMENTS_API_ROUTE,
        fetcher
    );
    const [isUpdating, setIsUpdating] = useState(false);
    const isAdminForbidden = useMemo(() => {
        return error instanceof AxiosError && error.response?.status === 403;
    }, [error]);

    const deleteComments = async (ids: string[]) => {
        if (!ids || ids.length === 0) {
            return { error: 'id(s) Not found!' };
        }

        if (!commentsData) {
            return { error: undefined };
        }

        const originalComments = commentsData.comments;
        const filteredComments = commentsData.comments.filter(
            (comment) => !ids.includes(comment.id)
        );

        if (!originalComments || originalComments.length === 0) {
            return { error: 'Post Not found!' };
        }

        try {
            setIsUpdating(true);

            mutate({ ...commentsData, comments: filteredComments }, false);

            await axios.post<{ id: string; }>(DELETE_COMMENTS_API_ROUTE, { ids });

            return { error: undefined };
        } catch (error) {
            const prevData = {
                ...commentsData,
                comments: originalComments,
            };
            mutate(prevData, false);
            return { error: error };
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        commentsData,
        isLoading,
        error,
        isAdminForbidden,
        mutate,
        isUpdating,
        deleteComments,
    };
};

export default useAdminCommentsData;
