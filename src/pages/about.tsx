import AboutLayout from '@/AboutLayout';
import Card, { CardContent, CardTitle } from '@/components/Card';
import CircleButton from '@/components/CircleButton';
import ImageLoader from '@/components/ImageLoader';
import React, { ReactElement, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { NextPage } from 'next';
import { Tab, TabGroup } from '@/components/TabGroup';
import { calculateAge } from '@/lib/dateUtility';

const myAge = calculateAge(new Date('1991-03-08'));

const MarginedParagraph = ({ children }: { children: ReactElement | string; }) => {
    return <p className='mt-2'>{children}</p>;
};

const MAX_STEP = 3;
const About: NextPage = () => {

    const [activeId, setActiveId] = useState(0);
    const nextStep = () => {
        if (activeId !== MAX_STEP - 1)
            setActiveId(activeId + 1);
    };
    const previousStep = () => {
        if (activeId !== 0)
            setActiveId(activeId - 1);
    };

    return (
        <AboutLayout>
            <div className='flex flex-col justify-center items-center mt-3 mb-3'>
                <Card>
                    <CardTitle title='About Me' />
                    <CardContent>
                        <div className='flex flex-col'>
                            <ImageLoader className='rounded' src={'/images/mahdi.jpg'} alt='Mahdi Ebrahim pour' width={400} height={400} />
                            <div className='flex justify-center items-center mt-2 gap-1'>
                                <CircleButton disabled={activeId === 0} onClick={previousStep}>
                                    <FaArrowLeft />
                                </CircleButton>
                                <p>Page {activeId + 1} of {MAX_STEP}</p>
                                <CircleButton disabled={activeId === MAX_STEP - 1} onClick={nextStep}>
                                    <FaArrowRight />
                                </CircleButton>
                            </div>
                        </div>
                        <TabGroup activeId={activeId.toString()} useFadeIn>
                            <Tab id='0' >
                                <MarginedParagraph>
                                    <>
                                        Hey there! My name is <strong className='font-bold'>Mahdi Ebrahim Pour</strong>, and it&apos;s great to meet you! I&apos;m a {myAge} old, who was born on March 8th, 1991. As a kid, I had dreams of becoming a road and construction engineer, but my life took a different turn when my mother enrolled me in computer software classes. And I must say, it turned out to be the best thing that ever happened to me! Since then, technology has been my passion, and programming feels like solving a puzzle to me. I hope to make money from it someday.
                                    </>
                                </MarginedParagraph>
                            </Tab>
                            <Tab id='1'>
                                <MarginedParagraph>
                                    When I&apos;m not programming, I love spending time in nature and traveling to new places. There&apos;s something so peaceful about being surrounded by the beauty of nature. I also enjoy spending time alone, whether it&apos;s reading a book or just reflecting on life. But don&apos;t get me wrong - I love hanging out with my family and friends too! Whenever I have free time, I like to strum on my kalimba or listen to music and podcasts. Music helps me relax, while podcasts are a great way to learn new things and expand my knowledge.
                                </MarginedParagraph>
                            </Tab>
                            <Tab id='2'>
                                <MarginedParagraph>
                                    Movies and series are another form of entertainment that I enjoy. Who doesn&apos;t love getting lost in a good story? There&apos;s nothing quite like sitting down with some popcorn and watching your favorite movie or show. All in all, I&apos;m a pretty easy-going guy who loves to explore new things, spend time with loved ones, and challenge myself in the world of programming. Thanks for reading!
                                </MarginedParagraph>
                            </Tab>
                        </TabGroup>
                    </CardContent>
                </Card>
            </div>
        </AboutLayout>
    );
};

export default About;