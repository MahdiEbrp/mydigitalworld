import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const CircularLoader = () => {
    return (
        <div className='flex justify-center items-center p-2 animate-bounce'>
            <AiOutlineLoading3Quarters className='text-4xl text-primary-800 opacity-70 animate-spin' />
        </div>
    );
};

export default CircularLoader;