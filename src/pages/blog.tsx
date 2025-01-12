import BlogPostItem from '@/components/BlogPostItem';
import Card, { CardContent, CardTitle } from '@/components/Card';
import Chip from '@/components/Chip';
import CircleButton from '@/components/CircleButton';
import Head from 'next/head';
import Input from '@/components/Input';
import LabelledComponent from '@/components/LabelledComponent';
import NothingToSee from '@/components/display/NothingToSee';
import React, { useRef } from 'react';
import prismaClient from '@/lib/prismaClient';
import { GetStaticProps } from 'next';
import { HiFilter } from 'react-icons/hi';
import { Post } from '@/type/posts';

type BlogProps = {
  posts: Post[];
};

const Blog: React.FC<BlogProps> = ({ posts }) => {
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | undefined>(undefined);

  const filteredPosts = keywords.length > 0
    ? posts.filter(post => keywords.some(keyword => post.keywords.toLowerCase().includes(keyword.toLowerCase())))
    : posts;

  const handleKeywordAdd = (keyword: string) => {
    const validValue = keyword.trim();
    if (validValue.length !== 0 && !keywords.includes(validValue)) {
      setKeywords((prev) => [...prev, validValue]);
    }
    if (inputRef.current)
      inputRef.current.value = '';
  };

  const BlogPostList: React.FC = () => {
    return (
      <div className='container mx-auto p-2'>
        {filteredPosts.map((post: Post) =>
          <BlogPostItem key={post.fileName} post={post} OnKeywordClick={handleKeywordAdd} />
        )}
      </div>
    );
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleKeywordAdd(e.currentTarget.value);
    }
  };

  const handleChipRemove = (keyword: string) => {
    setKeywords(keywords.filter(key => key !== keyword));
  };

  return (
    <>
      <Head>
        <title>Blog Post</title>
      </Head>
      <div className='flex justify-center items-center min-h-screen animate-fadeIn'>
        <Card className='min-w-[min(90vw,800px)] !m-1 !p-1'>
          <CardTitle title='Blog Posts' />
          <CardContent>

            <div className='flex flex-col justify-center items-center'>
              <LabelledComponent label='Filter keyword to categorize data 🔍'>
                <div className='flex'>
                  <Input
                    inputRef={inputRef as React.RefObject<HTMLInputElement>} id='inputValue' name='inputValue'
                    onKeyDown={handleInputKeyDown} maxLength={100}
                    className='overflow-hidden max-w-sm border border-primary-100 rounded'
                  />
                  <CircleButton onClick={() => handleKeywordAdd(inputRef.current?.value || '')}>
                    <HiFilter />
                  </CircleButton>
                </div>
              </LabelledComponent>
              <div className='flex flex-wrap mt-1'>
                {keywords.map((keyword: string, keywordIndex: number) =>
                  <Chip title={keyword} key={keywordIndex} showIcon onRemove={() => handleChipRemove(keyword)} />
                )}
              </div>
              {filteredPosts.length === 0 ?
                <NothingToSee />
                :
                <BlogPostList />
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  try {
    const posts = await prismaClient.posts.findMany({
      where: {
        isVisible: true,
      },
    });
    const validPosts = JSON.parse(JSON.stringify(posts));
    return {
      props: {
        posts: validPosts,
      },
      revalidate: 600,
    };
  } catch (error) {
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default Blog;
