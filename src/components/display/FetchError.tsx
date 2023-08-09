import Card, { CardContent, CardTitle } from '../Card';
import ImageLoader from '../ImageLoader';

const FetchError = () => {
    return (
        <Card className='animate-fadeIn'>
            <CardTitle title='Ops!' />
            <ImageLoader width={400} height={400} src='\images\error.svg'
                alt='An illustration of a person looking at the void' />
            <CardContent className='flex flex-col gap-1 mt-2 justify-center items-center'>
                <p className='max-w-xl'>
                    Well, it looks like the client and server are playing a game of &quot;who can stay quiet the longest.&quot; 😱 Meanwhile, the poor illustration people are left staring into the abyss, wondering if they&apos;ll ever see data flowing through their cables again.
                </p>
            </CardContent>
        </Card>
    );
};

export default FetchError;