import Card, { CardContent, CardTitle } from '@/components/Card';
import Head from 'next/head';

export default function Home() {

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className='flex justify-center items-center min-h-screen'>
        <Card>
          <CardTitle title='Home' />
          <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.</CardContent>
        </Card>
      </div>
    </>
  );
}
