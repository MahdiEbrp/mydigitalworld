import AboutLayout from '@/AboutLayout';
import Accordion, { AccordionSection } from '@/components/Accordion';
import Card, { CardContent, CardTitle } from '@/components/Card';
import ImageLoader from '@/components/ImageLoader';
import TextLimitByWords from '@/components/TextLimit';
import { NextPage } from 'next';
import { ReactElement } from 'react';

type GoalProps = {
    src: string;
    alt: string;
    children: string | ReactElement;
};
const GoalDetail = ({ src, alt, children }: GoalProps) => {
    return (
        <div className='flex flex-col justify-center gap-4'>
            <ImageLoader className='rounded transform hover:scale-90 transition duration-500' src={src} alt={alt} width={200} height={200} />
            <p className='text-paper'>{children}</p>
        </div>
    );
};
const goals: NextPage = () => {
    return (
        <AboutLayout>
            <div className='flex flex-col justify-center items-center mt-3 mb-3'>
                <Card>
                    <CardTitle title='🎯 My Goals 🎯' />
                    <CardContent>
                        <TextLimitByWords maxLength={30}>
                            🎯✨Having goals and hopes is an essential part of being human. Goals are the destinations that we strive to reach 🎯, while hopes are the aspirations that inspire us to keep moving forward ✨. They keep us motivated and give us purpose in life. Goals can be short-term or long-term, but they all serve the same purpose: to give us something to work towards and achieve. Hopes, on the other hand, are often tied to our dreams and ambitions for the future. They give us a sense of optimism and a belief that anything is possible if we work hard enough. Ultimately, having goals and hopes gives our lives meaning and helps us to create the kind of future we want for ourselves 🙌.
                        </TextLimitByWords>
                        <Accordion>
                            <AccordionSection title='Make a positive impact'>
                                <GoalDetail src='/images/kindness.jpg' alt='a passionate advocate for spreading kindness'  >
                                    <>
                                        I am a passionate advocate for spreading kindness and positivity in the world.I believe that even small acts of kindness can have a ripple effect and make a big difference in someone&apos;s day or even their life. With a focus on promoting empathy, compassion, and understanding, I have made it my mission to create a kinder and more welcoming world for everyone.<br />I enjoy spreading kindness through various initiatives and projects.Whether it&apos;s through a simple smile, a helping hand, or a kind word, I am dedicated to making a positive impact and leaving the world a better place than I found it.<br /> My unwavering commitment to kindness serves as an inspiration to others and a reminder that even the smallest acts of kindness can have a meaningful impact on the world around us.
                                    </>
                                </GoalDetail>
                            </AccordionSection>
                            <AccordionSection title='Find the inner peace'>
                                <GoalDetail src='/images/innerPeace.jpg' alt='a journey to find inner peace and live a more fulfilling life'  >
                                    I&apos;m on a journey to find inner peace and live a more fulfilling life. I believe that the key to happiness lies within us, and that by taking care of our physical, mental, and emotional well-being, we can unlock our true potential and achieve our goals.I&apos;ve always been interested in personal growth and spirituality, and over the years I&apos;ve explored different practices and philosophies to help me connect with my inner self.
                                </GoalDetail>
                            </AccordionSection>
                            <AccordionSection title='Collect more beautiful memory'>
                                <GoalDetail src='/images/beautifulMemory.jpg' alt='a passionate individual who believes in the power of memories'  >
                                    <>
                                        As a passionate individual who believes in the power of memories, I hold the firm belief that they are the most valuable possessions we can have. To me, it&apos;s essential to collect as many beautiful memories as possible throughout our lives. With my love for photography and storytelling, I aim to capture and preserve these precious moments forever.<br />For me, memories hold much more significance than just being a collection of events that have happened in our lives. They shape who we are and influence the way we perceive the world around us. Memories can bring us joy, comfort, and even solace during difficult times.

                                    </>
                                </GoalDetail>
                            </AccordionSection>
                            <AccordionSection title='Play more kalimba'>
                                <GoalDetail src='/images/kalimba.jpg' alt='my deep love for the kalimba'  >
                                    <>
                                        As an avid lover of music, I find myself constantly drawn to the soothing and melodious tones of the kalimba. This enchanting instrument has captivated me with its simplicity and yet endless possibilities for creativity. Whenever I play the kalimba, I feel transported to a place of peace and tranquility, where all my worries fade away and only the beauty of the music remains.<br />Despite my deep love for the kalimba, I find that I never have enough time to fully indulge in my passion for playing it. However, I am determined to make more time for this wonderful instrument and explore all the different melodies and rhythms that can be created with it. Whether I am playing alone or with others, the kalimba always brings me joy and a sense of fulfillment that is unmatched by anything else.<br />So if you ever see me with my kalimba in hand, know that I am lost in a world of music and pure bliss, and that nothing could make me happier than being able to share this beautiful experience with others.
                                    </>
                                </GoalDetail>
                            </AccordionSection>
                            <AccordionSection title='Travel more'>
                                <GoalDetail src='/images/travel.jpg' alt='a passionate traveler with a deep love for exploring'  >
                                    I&apos;m a passionate traveler with a deep love for exploring new places and experiencing different cultures. I believe that traveling is the best way to broaden your horizons and open yourself up to new experiences and perspectives.Whether it&apos;s hiking in the mountains, sampling local cuisine, or simply soaking up the atmosphere in a new city, I&apos;m always up for an adventure. So if you&apos;re looking for someone to join you on your next travel escapade, count me in!
                                </GoalDetail>
                            </AccordionSection>
                            <AccordionSection title='Writing my own book'>
                                <GoalDetail src='/images/books.jpg' alt='inspired to craft my own tales'  >
                                    <>
                                        As an aspiring writer, I have always had a passion for creating stories that captivate readers and transport them to new worlds. From a young age, I found myself lost in the pages of my favorite books and inspired to craft my own tales. Over time, I honed my writing skills and developed a unique voice that allows me to create relatable characters, vivid settings, and compelling plots.<br />I am dedicated to writing stories that not only entertain but also inspire and challenge readers to think in new ways. Each of my books is a labor of love, carefully crafted to bring joy, excitement, and wonder into the lives of those who pick them up.
                                    </>
                                </GoalDetail>
                            </AccordionSection>
                        </Accordion>
                    </CardContent>
                </Card>
            </div >
        </AboutLayout >
    );
};

export default goals;