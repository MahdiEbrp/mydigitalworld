import Button from '../Button';
import Modal from '../Modal';
import { MessageBoxButton as MessageBoxButtonType } from '@/context/MessageBoxContext';
import { useMemo } from 'react';

type MessageBoxProps = {
    isVisible: boolean;
    message: string;
    title: string;
    buttons: MessageBoxButtonType[];
    onClose: (button: MessageBoxButtonType) => void;
};

const MessageBox = ({
    title,
    message,
    isVisible,
    buttons,
    onClose,
}: MessageBoxProps) => {

    const uniqueButtons = useMemo(() => Array.from(new Set(buttons)), [buttons]);

    const handleCloseModal = (button: MessageBoxButtonType): void => {
        onClose(button);
    };

    if (!isVisible) {
        return <></>;
    }


    return (
        <Modal isOpen={isVisible} title={title} onClose={() => handleCloseModal('cancel')}>
            <div className='flex flex-col gap-1'>
                <p>{message}</p>
                <div className='flex justify-center gap-1'>
                    {uniqueButtons.map((button) =>
                        <Button key={button} onClick={() => handleCloseModal(button)}>
                            {button.charAt(0).toUpperCase() + button.slice(1)}
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default MessageBox;
