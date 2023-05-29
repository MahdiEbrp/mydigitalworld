import Card, { CardContent, CardTitle } from '@/components/Card';
import Head from 'next/head';

export const Home = () => {

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className='flex justify-center items-center min-h-screen'>
        <Card>
          <CardTitle title='Home' />
          <CardContent><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.</p></CardContent>

        </Card>
      </div>


    </>
  );
};

export default Home;