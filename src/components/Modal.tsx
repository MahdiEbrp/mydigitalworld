import Button from './Button';
import Card, { CardContent } from './Card';
import React, { ReactNode, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useTheme } from '@/context/Theme';

type ModalProps = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
};

const MODAL_TRANSITION_DURATION = 500;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const [isHidden, setIsHidden] = useState(false);
    const { theme } = useTheme();
    const style = theme === 'dark' ? 'error_dark' : 'error';

    const handleClose = () => {
        setIsModalOpen(false);
        onClose();
    };
    useEffect(() => {
        if (isOpen !== isModalOpen) {
            setIsModalOpen(isOpen);
            setIsHidden(false);
            return;
        }
        if (!isHidden) {
            const timeoutId = setTimeout(() => {
                if (!isModalOpen) {
                    setIsHidden(true);
                }
            }, MODAL_TRANSITION_DURATION);
            return () => clearTimeout(timeoutId);
        }

    }, [isHidden, isModalOpen, isOpen]);

    return (
        <div
            className={`${theme} fixed top-0 left-0 right-0 bottom-0 inset-0 z-50  overflow-y-auto ${isHidden ? 'hidden' : ''
                } ${isModalOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`}
            style={{ transitionDuration: `${MODAL_TRANSITION_DURATION}ms` }}
        >
            <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 transition-opacity' aria-hidden='true' onClick={handleClose}>
                    <div className='absolute inset-0 bg-black opacity-75'></div>
                </div>

                <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'></span>

                <Card
                    className='inline-block align-bottom rounded-lg p-2 text-center overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full'
                    role='dialog'
                    aria-modal='true'
                    aria-labelledby='modal-headline'
                >
                    <div>
                        <div className='flex flex-col items-end'>
                            <Button className={style + ' !p-2'} onClick={handleClose}>
                                <FaTimes className='w-4 h-4' />
                            </Button>
                        </div>
                        <CardContent>
                            <div className='mt-3 text-center sm:mt-5'>
                                <h3 className='text-lg leading-6 font-medium text-paper' id='modal-headline'>
                                    {title}
                                </h3>
                                <div className='mt-2'>{children}</div>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Modal;
