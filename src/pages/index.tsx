import Card, { CardContent } from '@/components/Card';
import Head from 'next/head';
import SlideShow from '@/components/SlideShow';

const slidesData = [
  {
    'title': '🚀💻 Discovering the Digital Universe!',
    'imageUrl': '/images/blog/mahdi.jpg',
    'imageAlt': 'image of mahdi ebrahim pour',
    'description': '👋 Hi there! 🌍🚀 I\'m a programmer on a journey to explore the fascinating world of coding. 💻🌐 I\'m passionate about learning new things, and I absolutely love sharing my knowledge with others. 🤝🧠 I\'m always on the lookout for fresh challenges, and I\'m super excited to see what the future holds for me in this ever-evolving digital universe.'
  },
  {
    'title': '🧭 ✈️ The World is My Playground',
    'imageUrl': '/images/blog/parse.jpg',
    'imageAlt': 'image of parse (persepolis) ',
    'description': '🧭🗺️🌎 Exploring the world is not just a hobby; it\'s my true passion. I feel alive when I\'m on the move, venturing into the unknown, and discovering the hidden gems of our planet. 🗺️✈️🌏🌄🏝️ From majestic mountain peaks to tranquil sandy beaches, I crave the diverse landscapes that Mother Nature has to offer. Every sunrise brings a promise of new adventures and unexplored territories. 🌅⛰️🏖️'
  },
  {
    'title': '🎶🌟 Music is a Soundtrack That Makes My Soul Alive! 🎵💓',
    'imageUrl': '/images/blog/kalimba.jpg',
    'imageAlt': 'image of mahdi ebrahim pour playing kalimba',
    'description': '🎶🌌 Music has always been a powerful force in my life. It has the ability to transport me to another place, evoke strong emotions, and make me feel alive. 💓🎵 I believe that music is a soundtrack that can make our souls come alive. There are many different ways that music can make us feel alive. 🎶💫🎵🎶 It can be the beat of a song that gets our hearts racing, the lyrics that speak to our soul, or the overall sound that transports us to another place. 🎵🌅'
  }
];
export const Home = () => {

  return (
    <>
      <Head>
        <title>Home-Mahdi Ebrahim pour</title>
      </Head>
      <div className='flex flex-col items-center min-h-screen animate-fadeIn' suppressHydrationWarning={true}>
        <Card className='min-w-[min(90vw,800px)] !m-1 !p-1 self-center'>
          <CardContent>
            <SlideShow slides={slidesData} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Home;