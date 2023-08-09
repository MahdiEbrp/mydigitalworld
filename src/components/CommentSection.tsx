import ImageLoader from './ImageLoader';
import { CommentType } from '@/type/comment';
import { FaChevronDown, FaChevronUp, FaHeart, FaRegComment, FaReply, FaThumbsDown, FaTrash } from 'react-icons/fa';
import { getTimeSinceDate } from '@/lib/dateUtility';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

type CommentActions = {
    onDeleteComment: (id: string) => void;
    onReplyComment: (id: string, userName: string) => void;
    onLikeComment: (id: string) => void;
    onDislikeComment: (id: string) => void;
};

type CommentSectionProps = Omit<CommentType, keyof CommentActions> & Partial<CommentActions>;


export const CommentSection = ({ comment, ...actions }: { comment: CommentSectionProps; } & CommentActions) => {


    const { onDeleteComment, onReplyComment, onLikeComment, onDislikeComment } = actions;

    const [isExpanded, setIsExpanded] = useState(false);

    const { data: session } = useSession();

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const handleLikeClick = (id: string) => {
        onLikeComment(id);
    };

    const handleDislikeClick = (id: string) => {
        onDislikeComment(id);
    };

    const handleReplyClick = (id: string) => {
        onReplyComment(id, comment.userName || 'Unknown user');
    };

    const handleDeleteClick = (id: string) => {
        onDeleteComment(id);
    };

    const ExpandIcon = () => {
        const iconStyle = 'w-6 h-6 cursor-pointer text-primary-950 inline ml-1';
        return (
            <>
                {isExpanded ?
                    <FaChevronUp className={iconStyle} onClick={toggleExpand} />
                    :
                    <FaChevronDown className={iconStyle} onClick={toggleExpand} />
                }
            </>
        );
    };

    return (
        <div className='overflow-hidden w-[min(100%,100vw)]' >
            <div className='flex flex-col items-center justify-between w-full py-1 px-1 text-left focus:outline-none gap-1'>
                <div className='inline-flex gap-1 flex-col sm:flex-row items-center mt-2'>
                    <div className='inline-flex gap-1'>
                        {comment.comments > 0 && <ExpandIcon />}

                        <button
                            className={`inline-flex items-center ${session && 'cursor-pointer'} gap-1 ml-2 ${comment.likedBySessionUser ? 'text-like-800' : 'text-primary-800'
                                } hover:animate-pulse ${comment.likedBySessionUser ? 'hover:text-like-900' : 'hover:text-primary-900'
                                }`}
                            disabled={!session}
                            onClick={() => handleLikeClick(comment.id)}
                        >
                            <FaHeart />
                            <span>{comment.likes}</span>
                        </button>
                        <button
                            className={`inline-flex items-center ${session && 'cursor-pointer'} gap-1 ${comment.dislikedBySessionUser ? 'text-paper' : 'text-primary-800'
                                } hover:animate-pulse hover:text-primary-900`}
                            onClick={() => handleDislikeClick(comment.id)}
                            disabled={!session}

                        >
                            <FaThumbsDown />
                            <span>{comment.dislikes}</span>
                        </button>
                        <span className='inline-flex items-center gap-1 text-primary-800'>
                            <FaRegComment />
                            <span>{comment.comments || 0}</span>
                        </span>
                        {session &&
                            <>
                                <button className='ml-4 cursor-pointer text-primary-800 hover:animate-pulse hover:text-primary-900'
                                    onClick={() => handleReplyClick(comment.id)}
                                >
                                    <FaReply />
                                </button>
                                {comment.commentedBySessionUser &&
                                    <button className='ml-2 cursor-pointer text-primary-800 hover:animate-pulse hover:text-primary-900'
                                        onClick={() => handleDeleteClick(comment.id)}

                                    >
                                        <FaTrash />
                                    </button>
                                }
                            </>
                        }
                    </div>
                </div>

                <div className='flex self-baseline gap-2'>
                    <ImageLoader
                        className='max-h-[300px] max-w-screen rounded object-cover'
                        width={32}
                        height={32}
                        src={comment.image ?? '/default-avatar.png'}
                        alt={`${comment.userName}'s profile picture`}
                    />
                    <p className='overflow-ellipsis text-base text-primary-950'>
                        <span className='inline-block first-letter:uppercase text-paper text-base'>
                            {comment.userName || 'Unknown user '}
                        </span>
                        {` said (${getTimeSinceDate(comment.createdAt)}): ${comment.opinion}`}
                    </p>
                </div>
            </div>

            <div
                className={`transition-all duration-500 rounded-b-lg ${isExpanded ? 'max-h-[100rem]' : 'max-h-0'
                    }`}
            >
                <div className='px-4 pt-2 pb-4'>
                    {comment.replies && comment.replies.map((reply) =>

                        <CommentSection key={reply.id} comment={reply} onLikeComment={handleLikeClick} onDislikeComment={handleDislikeClick}
                            onDeleteComment={handleDeleteClick} onReplyComment={handleReplyClick}
                        />
                    )}

                </div>
            </div>
        </div>
    );
};