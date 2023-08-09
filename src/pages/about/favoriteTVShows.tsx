import AboutLayout from '@/AboutLayout';
import Accordion, { AccordionSection } from '@/components/Accordion';
import Card, { CardContent, CardTitle } from '@/components/Card';
import React from 'react';
import SubjectItem from '@/components/SubjectItem';
import TextLimitByWords from '@/components/TextLimit';
import { AiFillBuild } from 'react-icons/ai';
import { BsAspectRatio, BsCalendar, BsPersonVideo2, BsStopwatchFill } from 'react-icons/bs';
import { FaAward, FaPenNib, FaQuoteLeft, FaQuoteRight, FaStar } from 'react-icons/fa';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MdLanguage, MdOutlineVideoStable } from 'react-icons/md';
import { TVShowList, TVShow } from '@/type/tvShow';
import { TbChairDirector } from 'react-icons/tb';

type TVShowProps = {
    tvShow: TVShow;
};

const TVShowDetails = ({ tvShow }: TVShowProps) => {
    return (
        <>
            <h1 className='font-bold text-primary-950 text-2xl mb-2 mt-2 text-center'>{tvShow.title}</h1>
            <p className='text-primary-800 text-base text-center mb-4'>
                <span>{tvShow.plot}</span>
            </p>
            <SubjectItem icon={AiFillBuild} subject='Creator:' detail={tvShow.creator} />
            <SubjectItem icon={TbChairDirector} subject='Director:' detail={tvShow.director} />
            <SubjectItem icon={FaPenNib} subject='Writer:' detail={tvShow.writer} />
            <h4 className='font-bold text-primary-950 text-xl mb-2 mt-2 text-center'>Cast:</h4>
            <div className='flex justify-center flex-wrap mt-4'>
                {tvShow.cast.map((cast, index) =>
                    <span
                        key={`${cast.name}${index}`}
                        className='text-sm font-semibold text-primary-900 py-1 px-2 mr-2 mb-2'
                    >
                        {`${cast.name} as ${cast.role}`}
                    </span>
                )}
            </div>
            <SubjectItem icon={MdOutlineVideoStable} subject='Seasons:' detail={tvShow.seasons.toString()} />
            <SubjectItem icon={BsPersonVideo2} subject='Episodes:' detail={tvShow.episodes.toString()} />
            <SubjectItem icon={BsCalendar} subject='Release year:' detail={tvShow.originalRelease} />
            <SubjectItem icon={MdLanguage} subject='Original language:' detail={tvShow.originalLanguage} />
            <SubjectItem icon={BsStopwatchFill} subject='Runtime:' detail={tvShow.runtime} />
            <SubjectItem icon={BsAspectRatio} subject='Aspect ratio:' detail={tvShow.aspectRatio} />
            <SubjectItem icon={FaStar} subject='IMDB rating:' detail={tvShow.rating.imdb} />
            <SubjectItem icon={FaStar} subject='Rotten Tomatoes rating:' detail={tvShow.rating.rottenTomatoes} />
            <SubjectItem icon={FaAward} subject='Awards:' detail={tvShow.awards} />
            <h4 className='font-bold text-primary-950 text-xl mb-2 mt-2 text-center'>Quote:</h4>
            <p className='text-primary-800 text-base text-center mb-4'>
                <FaQuoteLeft className='inline-block align-middle mr-2' />
                <span>{tvShow.quote}</span>
                <FaQuoteRight className='inline-block ml-2' />
            </p>
            <div className='flex justify-center flex-wrap mt-4'>
                {tvShow.genre.map((genre) =>
                    <span
                        key={genre}
                        className='text-xs font-semibold bg-primary-200 text-primary-950 rounded-full py-1 px-2 mr-2 mb-2'
                    >
                        {genre}
                    </span>
                )}
            </div>
        </>
    );
};

const FavoriteTVShows = ({ tvShows }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <AboutLayout>
            <div className='flex flex-col justify-center items-center mt-3 mb-3'>
                <Card>
                    <CardTitle title='📺 My favorite tvShows 📺' />
                    <CardContent>
                        <TextLimitByWords maxLength={30}>
                            📺 Television shows have become a vital part of our daily routine and TV shows are incredibly useful for relaxation and stress relief, providing the opportunity to unwind after a long day or recharge during downtime. Overall, with so many genres and formats available, television programming has something for everyone to inform, educate, entertain, and inspire, making it a powerful medium that benefits all. 🙌So sit back, grab some popcorn 🍿 and check out my favorite TV shows below. I hope you find something that sparks your interest and brings you joy! 😊
                        </TextLimitByWords>
                        <Accordion>
                            {tvShows.map((tvShow, index) =>
                                <AccordionSection key={`${tvShow.title}-${index}`} title={tvShow.title}>
                                    <TVShowDetails tvShow={tvShow} />
                                </AccordionSection>
                            )}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </AboutLayout>
    );
};

export const getStaticProps: GetStaticProps<TVShowList> = async () => {
    const { tvShows } = await import('../../data/tvShowList.json') as TVShowList;
    return {
        props: {
            tvShows,
        },
    };
};

export default FavoriteTVShows;
