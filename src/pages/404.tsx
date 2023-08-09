import Card, { CardContent, CardTitle } from '@/components/Card';
import Head from 'next/head';
import ImageLoader from '@/components/ImageLoader';
import Link from 'next/link';
import { GiPortal } from 'react-icons/gi';
export default function Home() {

    return (
        <>
            <Head>
                <title>404 Not Found!</title>
            </Head>
            <div className='flex animate-fadeIn justify-center items-center min-h-screen'>
                <Card>
                    <CardTitle title='404 Not Found!' />
                    <ImageLoader width={640} height={640} src='\images\404.svg'
                        alt='An illustration of a person traveling from another dimension and scaring a cute monster.' />
                    <CardContent>
                        <span className='text-primary-850'>
                            Hey there! It looks like you&apos;ve ended up in the wrong dimension. No need to freak out though, we&apos;ve got a <Link className='font-bold rounded-lg p-1 text-link' href='/' ><GiPortal className='inline' />portal</Link> that&apos;ll lead you right back home. So sit tight, relax and let us do the work. Cheers!
                        </span>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}