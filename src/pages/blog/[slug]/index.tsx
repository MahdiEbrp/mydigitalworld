import Card, { CardContent, CardTitle } from '@/components/Card';
import CircleButton from '@/components/CircleButton';
import FetchError from '@/components/display/FetchError';
import Head from 'next/head';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import React from 'react';
import Tooltip from '@/components/Tooltip';
import getMarkdownSlugs, { getPostContentBySlug } from '@/lib/fileHelper';
import prismaClient from '@/lib/prismaClient';
import { BiArrowBack, BiArrowToBottom, BiArrowToTop, BiComment } from 'react-icons/bi';
import { GetStaticPaths, GetStaticProps } from 'next';
import {type Post } from '@/type/posts';
import { useCommentModal } from '@/context/CommentContext';
import { useTheme } from '@/context/Theme';

type PostProps = {
    post: Post | null;
    postContent: string;
    error: boolean;
};


const Post: React.FC<PostProps> = ({ post, postContent }) => {

    const { theme } = useTheme();
    const { showCommentModal } = useCommentModal();

    const StickyBar = () => {
        const handleMoveUp = () => {
            if (typeof window !== undefined) {
                const targetButton = document.getElementById('card');
                targetButton?.scrollIntoView({ behavior: 'smooth' });
            }
        };
        const handleMoveDown = () => {
            if (typeof window !== undefined) {
                const targetButton = document.getElementById('endOfThePage');
                targetButton?.scrollIntoView({ behavior: 'smooth' });
            }
        };
        const handleComments = () => {
            if (post)
                showCommentModal(post.topicId);
        };

        return (
            <div className='sticky top-0 flex gap-1 right-0 bottom-0'>
                <Tooltip text='Move up' onClick={handleMoveUp}>
                    <CircleButton >
                        <BiArrowToTop className='w-6 h-6' />
                    </CircleButton>
                </Tooltip>
                <Tooltip text='Move down' onClick={handleMoveDown}>
                    <CircleButton >
                        <BiArrowToBottom className='w-6 h-6' />
                    </CircleButton>
                </Tooltip>
                <Tooltip text='Back to blog list'>
                    <Link href='/blog'>
                        <CircleButton >
                            <BiArrowBack className='w-6 h-6' />
                        </CircleButton>
                    </Link>
                </Tooltip>
                <Tooltip text='Show comments' onClick={handleComments}>
                    <CircleButton >
                        <BiComment className='w-6 h-6' />
                    </CircleButton>
                </Tooltip>
            </div>
        );
    };
    return (
        <>
            <Head>
                <title>{post?.title || 'Post not found!'}</title>
            </Head>
            <div className='flex justify-center items-center min-h-screen animate-fadeIn'>
                <Card id='card' className='!min-w-fit !p-1'>
                    {post ?
                        <>
                            <StickyBar />
                            <CardTitle title={post.title} />
                            <CardContent>
                                <article className={`prose min-w-[min(90vw,800px)] flex flex-col justify-center items-center ${theme} prose-img:m-auto prose-img:rounded`}>
                                    <Markdown>
                                        {postContent}
                                    </Markdown>
                                </article>
                            </CardContent>
                            <div id='endOfThePage' />
                        </>
                        :
                        <>
                            <FetchError />
                        </>
                    }
                </Card>

            </div>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = getMarkdownSlugs();
    const paths = slugs.map((slug) => ({ params: { slug } }));

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
    const slug = params?.slug as string;
    try {
        const post = await prismaClient.posts.findFirst(
            {
                where: {
                    isVisible: true,
                    fileName: slug,
                }
            }
        );

        if (!post) {
            return {
                props: {
                    post: null,
                    postContent: '',
                    error: true
                }
            };
        }
        else {
            const postContent = getPostContentBySlug(slug);
            const validPost = JSON.parse(JSON.stringify(post)) as Post;

            return {
                props: {
                    post: validPost,
                    postContent,
                    error: false
                }
            };
        }
    } catch (error) {
        return {
            props: {
                post: null,
                postContent: '',
                error: true
            },
        };
    }
};

export default Post;
