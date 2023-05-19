import { HTMLAttributes, ReactElement } from 'react';

export type CardProps = {
    children?: ReactElement | ReactElement[];
} & HTMLAttributes<HTMLDivElement>;

export const Card = ({ children,...rest }: CardProps) => {
    const maxWidthClassName = 'max-w-2xl';
    const { className } = {...rest};
    return (
        <div {...rest} className={`bg-primary-500 gap-1 shadow-md rounded-lg m-2 p-6 ${maxWidthClassName} ${className ? className : ''}`}>
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