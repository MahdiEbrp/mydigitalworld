import AboutLayout from '@/AboutLayout';
import Accordion, { AccordionSection } from '@/components/Accordion';
import Card, { CardContent, CardTitle } from '@/components/Card';
import React from 'react';
import SubjectItem from '@/components/SubjectItem';
import TextLimitByWords from '@/components/TextLimit';
import { BsCalendar } from 'react-icons/bs';
import { FaAward } from 'react-icons/fa';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { SongList, Song } from '@/type/song';
import { GiMicrophone } from 'react-icons/gi';
import { BiAlbum, BiStopwatch } from 'react-icons/bi';
type SongProps = {
    song: Song;
};

const SongDetails = ({ song }: SongProps) => {
    return (
        <>
            <h1 className='font-bold text-primary-950 text-2xl mb-2 mt-2 text-center'>{song.title}</h1>
            <SubjectItem icon={GiMicrophone} subject='Artist:' detail={song.artist} />
            <SubjectItem icon={BiAlbum} subject='Album:' detail={song.album} />
            <h4 className='font-bold text-primary-950 text-xl mb-2 mt-2 text-center'>Writers:</h4>
            <div className='flex justify-center flex-wrap mt-4'>
                {song.writers.map((writer, index) =>
                    <span
                        key={`${writer}-${index}`}
                        className='text-sm font-semibold text-primary-900 py-1 px-2 mr-2 mb-2'
                    >
                        {writer}
                    </span>
                )}
            </div>
            <SubjectItem icon={BiStopwatch} subject='Length:' detail={song.length} />
            <SubjectItem icon={BsCalendar} subject='Release year:' detail={song.releaseDate} />
            <SubjectItem icon={FaAward} subject='Awards:' detail={song.awards} />
            <h4 className='font-bold text-primary-950 text-xl mb-2 mt-2 text-center'>Record labels:</h4>
            <div className='flex justify-center flex-wrap mt-4'>
                {song.recordLabels.map((recordLabel, index) =>
                    <span
                        key={`${recordLabel}-${index}`}
                        className='text-sm font-semibold text-primary-900 py-1 px-2 mr-2 mb-2'
                    >
                        {recordLabel}
                    </span>
                )}
            </div>
            <h4 className='font-bold text-primary-950 text-xl mb-2 mt-2 text-center'>Lyrics:</h4>
            <p className='text-primary-800 text-base text-center mb-4'>
                <span>{song.lyrics}</span>
            </p>
            <div className='flex justify-center flex-wrap mt-4'>
                {song.genres.map((genre) =>
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

const FavoriteSongs = ({ songs }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <AboutLayout>
            <div className='flex flex-col justify-center items-center mt-3 mb-3'>
                <Card>
                    <CardTitle title='🎵 My favorite songs 🎵' />
                    <CardContent>
                        <TextLimitByWords maxLength={30}>
                            🎵 Music is the language that speaks to our souls. It has the power to transport us to a place of pure emotion and tranquility, where all our worries fade away. When we listen to a song, we don&apos;t just hear it - we feel it. We connect with the artist&apos;s message, the melody, and the rhythm, creating a unique and personal experience that stays with us forever. 💫 There&apos;s something magical about how a simple combination of sounds and words can evoke such strong feelings within us. Whether it&apos;s a heart-wrenching ballad or an upbeat pop tune, every song has a story to tell. 📖 It may be a story of love ❤️, heartbreak 💔, hope 🙏, or even just pure joy and celebration 🎉. In the list below, you can check out some of my favorite songs! 😊
                        </TextLimitByWords>
                        <Accordion>
                            {songs.map((song, index) =>
                                <AccordionSection key={`${song.title}-${index}`} title={song.title}>
                                    <SongDetails song={song} />
                                </AccordionSection>
                            )}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </AboutLayout>
    );
};

export const getStaticProps: GetStaticProps<SongList> = async () => {
    const { songs } = await import('../../data/songList.json') as SongList;
    return {
        props: {
            songs,
        },
    };
};

export default FavoriteSongs;
