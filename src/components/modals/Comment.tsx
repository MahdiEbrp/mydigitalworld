import Button from '../Button';
import Loader from '../display/Loader';
import React, { useEffect, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import getHumorousHTTPMessage from '@/lib/humorousHTTPMessage';
import useCommentData from '@/lib/useCommentData';
import { CommentSection } from '../CommentSection';
import { CommentType } from '@/type/comment';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useSession } from 'next-auth/react';
import { useTheme } from '@/context/Theme';
import { useToast } from '@/context/ToastContext';

const INPUT_ROWS = 3;

type Parent = {
    id: string;
    userName: string;
};

const Comments = ({ topicId }: { topicId: string; }) => {
    const [parent, setParent] = useState<Parent | null>(null);
    const [updatedCommentData, setUpdatedCommentData] = useState<CommentType[]>([]);
    const [updatingComments, setUpdatingComments] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { commentData: commentDataFromApi, isLoading, hasError } = useCommentData(topicId);
    const { data: session, status } = useSession();
    const { showToast } = useToast();
    const { theme } = useTheme();
    useEffect(() => {
        if (commentDataFromApi) {
            setUpdatedCommentData(commentDataFromApi);
        }
    }, [commentDataFromApi]);

    if (hasError) {
        return (
            <div className={`${theme === 'dark' ? 'warning_dark' : 'warning'} rounded bg-primary-300 text-primary-800`} role='alert'>
                <p className='text-base'>🚨 Oh no! The data is out of sync and dancing to its own beat 🕺💃 We&apos;ll get it back in line ASAP!</p>
            </div>
        );
    }

    if (isLoading || status === 'loading')
        return <Loader />;

    const handleSendButton = async () => {
        const opinion = inputRef.current?.value.trim() || '';
        if (opinion === '') {
            showToast('Comment should not be empty. 😱 Fill it with your deepest, darkest secrets! Just kidding... please don\'t do that. 😂', 'warning', 4000);
            return;
        }
        try {
            setUpdatingComments(true);
            const { data: response } = await axios.post<CommentType>('/api/comment/insert', { opinion, topicId });
            showToast('🎉 Congratulations! You nailed it! 🙌 Your comment has been successfully created. Keep up the great work! 💪', 'success', 2000);
            setUpdatedCommentData([...updatedCommentData, response]);
        }
        catch (error) {
            if (error instanceof AxiosError)
                showToast(getHumorousHTTPMessage(error.response?.status || 0), 'error', 4000);
            else
                showToast('Seriously, doesn\'t know what\'s happening.🧐👻', 'error', 2000);

        }
        finally {
            setUpdatingComments(false);
        }

    };

    const UserAuthWarning = () => {
        return (
            <div className={`${theme === 'dark' ? 'warning_dark' : 'warning'} rounded bg-primary-300 text-primary-800 p-1`} role='alert'>
                <p className='text-base'>👀 Yo! You wanna leave your mark on this post? Well, you gotta be a registered user first. It&apos;s like trying to swim without water 🏊‍♂️ or dance without music 🕺</p>
            </div>
        );
    };
    const ReplayBox = () => {
        return (
            <>
                <textarea
                    className='block text-base resize-none shadow-sm w-full px-4 py-2 leading-5 text-input bg-input border border-primary-100 rounded focus:outline-none focus:bg-input focus:border-primary-100'
                    rows={INPUT_ROWS}
                    ref={inputRef}
                />
                <div className='flex items-center self-stretch justify-between'>
                    {updatingComments ?

                        <span className='inline-flex gap-1'>

                            <HiOutlineRefresh className='animate-spin' />
                            <span>&quot;Loading the awesomeness... Please hold tight!🤗&quot;</span>
                        </span>
                        :
                        <>
                            <p className='text-base'>
                                Reply to: {parent ? parent.userName : 'No one.😎'}
                            </p>
                            <Button disabled={updatingComments} onClick={handleSendButton}>Send</Button>
                        </>
                    }
                </div>
            </>
        );
    };

    const handleLikeClick = (id: string) => {
        updateByAction(id, 'like');
    };

    const handleDislikeClick = (id: string) => {
        updateByAction(id, 'dislike');
    };

    const handleReplyClick = (id: string, userName: string) => {
        setParent({ id, userName });
    };

    const handleDeleteClick = (id: string) => {
        updateByAction(id, 'delete');
    };

    const updateByAction = async (id: string, action: 'like' | 'dislike' | 'delete') => {


        try {
            const { data: response } = await axios.post<CommentType>('/api/comment/update', { id, action });
            showToast('🎉 Congratulations! You nailed it! 🙌 Your comment has been successfully created. Keep up the great work! 💪', 'success', 2000);
            setUpdatedCommentData([...updatedCommentData, response]);
        }
        catch (error) {
            if (error instanceof AxiosError)
                showToast(getHumorousHTTPMessage(error.response?.status || 0), 'error', 4000);
            else
                showToast('Seriously, doesn\'t know what\'s happening.🧐👻', 'error', 2000);

        }
    };
    return (
        <div className='space-y-6'>
            <>
                {session ? <ReplayBox /> : <UserAuthWarning />}

                {!updatingComments && updatedCommentData.map((comment) =>
                    <div key={comment.id}>
                        <CommentSection comment={comment} onLikeComment={handleLikeClick} onDislikeComment={handleDislikeClick} onDeleteComment={handleDeleteClick} onReplyComment={handleReplyClick} />
                    </div>
                )}
            </>
        </div>
    );
};

export default Comments;
