import AboutLayout from '@/AboutLayout';
import Accordion, { AccordionSection } from '@/components/Accordion';
import Card, { CardContent, CardTitle } from '@/components/Card';
import ImageLoader from '@/components/ImageLoader';
import React from 'react';
import SubjectItem from '@/components/SubjectItem';
import TextLimitByWords from '@/components/TextLimit';
import { BookList, Book } from '@/type/book';
import { FaUserAlt, FaBookOpen, FaCalendarAlt, FaBuilding, FaBarcode, FaLanguage, FaMapMarkerAlt, FaAward, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

interface BookProps {
    book: Book;
}

const BookDetails = ({ book }: BookProps) => {
    return (
        <>
            <ImageLoader className='rounded duration-500' src={book.cover} alt={`${book.title}-${book.author}-cover`} width={200} height={200} />
            <h1 className='font-bold text-primary-950 text-2xl mb-2 mt-2 text-center'>{book.title}</h1>
            <p className='text-primary-800 text-base text-center mb-4'>
                <span>{book.summary}</span>
            </p>
            <SubjectItem icon={FaUserAlt} subject='Author:' detail={book.author} />
            <SubjectItem icon={FaBookOpen} subject='Format:' detail={`${book.format.binding} (${book.format.pages} Pages)`} />
            <SubjectItem icon={FaMapMarkerAlt} subject='Setting:' detail={book.setting} />
            <SubjectItem icon={FaCalendarAlt} subject='Publication date:' detail={book.publicationDate} />
            <SubjectItem icon={FaBuilding} subject='Publisher:' detail={book.publisher} />
            <SubjectItem icon={FaBarcode} subject='ISBN10:' detail={book.ISBN.ISBN10} />
            <SubjectItem icon={FaBarcode} subject='ISBN13:' detail={book.ISBN.ISBN13} />
            <SubjectItem icon={FaLanguage} subject='Language:' detail={book.language} />
            <SubjectItem icon={FaAward} subject='Literary awards:' detail={book.literaryAwards} />
            <h4 className='font-bold text-primary-950 text-xl mb-2 mt-2 text-center'>Quote:</h4>
            <p className='text-primary-800 text-base text-center mb-4'>
                <FaQuoteLeft className='inline-block align-middle mr-2' />
                <span>{book.quote}</span>
                <FaQuoteRight className='inline-block ml-2' />
            </p>
            <div className='flex justify-center flex-wrap mt-4'>
                {book.genres.map((genre) =>
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

const FavoriteBooks = ({ books }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <AboutLayout>
            <div className='flex flex-col justify-center items-center mt-3 mb-3'>
                <Card>
                    <CardTitle title='📚 My favorite books 📚' />
                    <CardContent>
                        <TextLimitByWords maxLength={30}>
                            Reading is such a valuable activity that can help us learn, grow, and escape into different worlds. 🌎 Whether it&apos;s fiction, non-fiction, or something in between, every book has the potential to teach us something new or offer a fresh perspective on life. 🤓 So many books, so little time 📚⏰, as Frank Zappa once said.. But even if we can only squeeze in a few minutes of reading here and there, it&apos;s definitely worth it in the long run. 📖 Happy reading! In the list below, you can check out some of my favorite books! 😊
                        </TextLimitByWords>
                        <Accordion>
                            {books.map((book) =>
                                <AccordionSection key={book.ISBN.ISBN13} title={book.title}>
                                    <BookDetails book={book} />
                                </AccordionSection>
                            )}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </AboutLayout>
    );
};

export const getStaticProps: GetStaticProps<BookList> = async () => {
    const { books } = await import('../../data/bookList.json') as BookList;
    return {
        props: {
            books,
        },
    };
};

export default FavoriteBooks;
