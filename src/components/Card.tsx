import { ReactElement } from 'react';

export const Card = ({ children }: { children?: ReactElement | ReactElement[]; } = {}) => {
    const maxWidthClassName = 'max-w-2xl';

    return (
        <div className={`bg-primary-500 gap-1 shadow-md rounded-lg m-2 p-6 ${maxWidthClassName}`}>
            {children}
        </div>
    );
};

export const CardTitle = ({ title }: { title: string; }) => {
   return <h2 className='text-xl text-primary-950 text-center font-bold mb-4'>{title}</h2>;
};

export const CardImage = ({ children }: { children?: ReactElement | ReactElement[] | string; } = {}) => {
    return <div className='flex justify-center m-2'>{children}</div>;
};

export const CardContent = ({ children }: { children?: ReactElement | ReactElement[] | string; } = {}) => {
    return <div className='text-primary-800 text-lg text-center'>{children}</div>;
};

export default Card;