import Card, { CardContent, CardTitle } from '../Card';
import ImageLoader from '../ImageLoader';

const AdminError = () => {
    return (
        <Card className='animate-fadeIn'>
            <CardTitle title='Ops!' />
            <ImageLoader width={400} height={400} src='\images\error403.svg'
                alt='An illustration of a person looking at the void' />
            <CardContent className='flex flex-col gap-1 mt-2 justify-center items-center'>
                <p className='max-w-xl'>
                    <span>🛑 Stop! You&apos;re not an admin. 🚫</span><br /> Unless you have the power to summon 🦄 unicorns and 🌈 rainbows with a snap of your fingers, I suggest you step away from that keyboard and leave the admin-ing to the professionals. 😎
                </p>
            </CardContent>
        </Card>
    );
};

export default AdminError;