import AboutLayout from '@/AboutLayout';
import Accordion, { AccordionSection } from '@/components/Accordion';
import Card, { CardContent, CardTitle } from '@/components/Card';
import React from 'react';
import SubjectItem from '@/components/SubjectItem';
import TextLimitByWords from '@/components/TextLimit';
import { BiCameraMovie } from 'react-icons/bi';
import { BsAspectRatio, BsCalendar, BsStopwatchFill } from 'react-icons/bs';
import { FaAward, FaDollarSign, FaMoneyBillWave, FaPenNib, FaQuoteLeft, FaQuoteRight, FaStar } from 'react-icons/fa';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MdLanguage } from 'react-icons/md';
import { MovieList, Movie } from '@/type/movie';
import { TbChairDirector } from 'react-icons/tb';

type MovieProps = {
    movie: Movie;
};

const MovieDetails = ({ movie }: MovieProps) => {
    return (
        <>
            <h1 className='font-bold text-primary-950 text-2xl mb-2 mt-2 text-center'>{movie.title}</h1>
            <p className='text-primary-800 text-base text-center mb-4'>
                <span>{movie.plot}</span>
            </p>
            <SubjectItem icon={TbChairDirector} subject='Director:' detail={movie.director} />
            <SubjectItem icon={FaPenNib} subject='Writer:' detail={movie.writer} />
            <h4 className='font-bold text-primary-950 text-xl mb-2 mt-2 text-center'>Cast:</h4>
            <div className='flex justify-center flex-wrap mt-4'>
                {movie.cast.map((cast, index) =>
                    <span
                        key={`${cast.name}${index}`}
                        className='text-sm font-semibold text-primary-900 py-1 px-2 mr-2 mb-2'
                    >
                        {`${cast.name} as ${cast.role}`}
                    </span>
                )}
            </div>
            <SubjectItem icon={BsCalendar} subject='Release year:' detail={movie.releaseYear.toString()} />
            <SubjectItem icon={MdLanguage} subject='Original language:' detail={movie.originalLanguage} />
            <SubjectItem icon={FaMoneyBillWave} subject='Budget:' detail={movie.budget} />
            <SubjectItem icon={FaDollarSign} subject='Box office (gross usa):' detail={movie.boxOfficeGrossUsa} />
            <SubjectItem icon={BsStopwatchFill} subject='Runtime:' detail={movie.runtime} />
            <SubjectItem icon={BsAspectRatio} subject='Aspect ratio:' detail={movie.aspectRatio} />
            <SubjectItem icon={FaStar} subject='IMDB rating:' detail={movie.rating.imdb} />
            <SubjectItem icon={FaStar} subject='Rotten Tomatoes rating:' detail={movie.rating.rottenTomatoes} />
            <SubjectItem icon={FaAward} subject='Awards:' detail={movie.awards} />
            <SubjectItem icon={BiCameraMovie} subject='Imdb ID:' detail={movie.imdbId} />
            <h4 className='font-bold text-primary-950 text-xl mb-2 mt-2 text-center'>Quote:</h4>
            <p className='text-primary-800 text-base text-center mb-4'>
                <FaQuoteLeft className='inline-block align-middle mr-2' />
                <span>{movie.quote}</span>
                <FaQuoteRight className='inline-block ml-2' />
            </p>
            <div className='flex justify-center flex-wrap mt-4'>
                {movie.genre.map((genre) =>
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

const FavoriteMovies = ({ movies }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <AboutLayout>
            <div className='flex flex-col justify-center items-center mt-3 mb-3'>
                <Card>
                    <CardTitle title='🎥 My favorite movies 🎥' />
                    <CardContent>
                        <TextLimitByWords maxLength={30}>
                            🎥 Movies are a portal to other worlds, a way to escape our own reality and explore new perspectives. 🌍👁️‍🗨️With every film we watch, we embark on a journey of the imagination, experiencing a range of emotions from joy to sadness, fear to triumph. Movies have the power to inspire us, to challenge our beliefs, and to connect us with others in ways that transcend language and culture. 🤝🌎 Whether we&apos;re seeking entertainment or enlightenment, movies have something to offer everyone. 🎬 So let&apos;s sit back, relax, and immerse ourselves in the magic of cinema. 🍿🎞️ In the list below, you can check out some of my favorite movies! 😊
                        </TextLimitByWords>
                        <Accordion>
                            {movies.map((movie) =>
                                <AccordionSection key={movie.imdbId} title={movie.title}>
                                    <MovieDetails movie={movie} />
                                </AccordionSection>
                            )}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </AboutLayout>
    );
};

export const getStaticProps: GetStaticProps<MovieList> = async () => {
    const { movies } = await import('../../data/movieList.json') as MovieList;
    return {
        props: {
            movies,
        },
    };
};

export default FavoriteMovies;
