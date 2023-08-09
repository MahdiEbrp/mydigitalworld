import Button from '../Button';
import Chip from '../Chip';
import getHumorousHTTPMessage from '@/lib/humorousHTTPMessage';
import useCommentData from '@/helpers/useCommentData';
import { AxiosError } from 'axios';
import { CommentSection } from '../CommentSection';
import { HiOutlineRefresh } from 'react-icons/hi';
import { buildCommentTree } from '@/lib/structureUtility';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTheme } from '@/context/Theme';
import { useToast } from '@/context/ToastContext';

const INPUT_ROWS = 3;

type ResponseTarget = {
    id: string;
    userName: string;
};
type CommentProps = {
    topicId: string;
    onCountChange: (count: number) => void;
};

const LoaderWithEmoji = ({ text }: { text: string; }) => {
    return (
        <span className='inline-flex gap-1'>

            <HiOutlineRefresh className='animate-spin' />
            <span className='animate-bounce'>🫡</span>
            <span>{text}</span>
        </span>
    );
};
const Comments = ({ topicId, onCountChange }: CommentProps) => {

    const [responseTarget, setResponseTarget] = useState<ResponseTarget | undefined>(undefined);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { commentData, status: commentStatus, error, insertComment, updateComment } = useCommentData(topicId);
    const { data: session, status } = useSession();
    const { showToast } = useToast();
    const { theme } = useTheme();

    const commentTree = useMemo(() => {
        return buildCommentTree(commentData || []);
    }, [commentData]);

    useEffect(() => {
        if (commentData && commentStatus === 'loaded')
            onCountChange(commentData.length);
    }, [commentData, commentStatus, onCountChange]);


    if (error) {
        return (
            <div className={`${theme === 'dark' ? 'warning_dark' : 'warning'} rounded bg-primary-300 text-primary-800`} role='alert'>
                <p className='text-base'>🚨 Oh no! The data is out of sync and dancing to its own beat 🕺💃 We&apos;ll get it back in line ASAP!</p>
            </div>
        );
    }


    if (commentStatus === 'fetching' || status === 'loading')
        return <LoaderWithEmoji text='Aye aye, Captain!, loading awesomeness at warp speed!' />;



    const handleSendButton = async () => {

        const opinion = inputRef.current?.value.trim() || '';

        if (opinion === '') {
            showToast('Comment should not be empty. 😱 Fill it with your deepest, darkest secrets! Just kidding... please don\'t do that. 😂', 'warning', 4000);
            return;
        }
        const { error } = await insertComment(opinion, responseTarget?.id);

        if (error) {
            if (error instanceof AxiosError)
                showToast(getHumorousHTTPMessage(error.response?.status || 0), 'error', 4000);
            else
                showToast('Seriously, doesn\'t know what\'s happening.🧐👻', 'error', 2000);
        }
        else
            showToast('🎉 Congratulations! You nailed it! 🙌 Your comment has been successfully created. Keep up the great work! 💪', 'success', 2000);

    };

    const UserAuthWarning = () => {
        return (
            <div className={`${theme === 'dark' ? 'warning_dark' : 'warning'} rounded bg-primary-300 text-primary-800 p-1`} role='alert'>
                <p className='text-base'>👀 Yo! You wanna leave your mark on this post? Well, you gotta be a registered user first. It&apos;s like trying to swim without water 🏊‍♂️ or dance without music 🕺</p>
            </div>
        );
    };
    const ReplayBox = () => {

        if (commentStatus === 'updating')
            return <LoaderWithEmoji text="Aye aye, Captain! Let's sail through these comments like a boss!" />;

        return (
            <>
                <textarea
                    className='block text-base resize-none shadow-sm w-full px-4 py-2 leading-5 text-input bg-input border border-primary-100 rounded focus:outline-none focus:bg-input focus:border-primary-100  placeholder:text-placeholder'
                    rows={INPUT_ROWS}
                    ref={inputRef}
                    placeholder='Ready for a wild keyboard adventure!'
                />
                <div className='flex items-center self-stretch justify-between'>
                    <div className='inline-flex gap-1'>
                        <span>Reply to:</span>
                        {responseTarget ?
                            <Chip showIcon title={responseTarget.userName} onRemove={() => setResponseTarget(undefined)} />
                            :
                            <span> No one.😎</span>
                        }
                    </div>
                    <Button disabled={commentStatus !== 'loaded'} onClick={handleSendButton}>Send</Button>
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
        setResponseTarget({ id, userName });
    };

    const handleDeleteClick = (id: string) => {
        updateByAction(id, 'delete');
    };

    const updateByAction = async (id: string, action: 'like' | 'dislike' | 'delete') => {

        if (!session)
            return;

        const { error } = await updateComment(id, action);
        if (error) {
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

                {commentStatus === 'loaded' && commentTree.map((comment) =>
                    <div key={comment.id}>
                        <CommentSection comment={comment} onLikeComment={handleLikeClick} onDislikeComment={handleDislikeClick} onDeleteComment={handleDeleteClick} onReplyComment={handleReplyClick} />
                    </div>
                )}
            </>
        </div>
    );
};

export default Comments;
