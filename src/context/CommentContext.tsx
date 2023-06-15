import React, { createContext, ReactNode, useContext, useState } from 'react';
import Modal from '@/components/Modal';
import CommentModal from '@/components/modals/Comment';

type CommentModalContextType = {
    showCommentModal: (topicId: string) => void;
};

const CommentModalContext = createContext<CommentModalContextType>({
    showCommentModal: () => void 0,
});

export const useCommentModal = () => useContext(CommentModalContext);

const CommentModalProvider = ({ children }: { children: ReactNode; }) => {
    const [isModalVisible, setModalVisibility] = useState(false);
    const [currentTopicId, setCurrentTopicId] = useState<string>('');

    const showCommentModal = (topicId: string) => {
        setCurrentTopicId(topicId);
        setModalVisibility(true);
    };

    const closeModal = () => {
        setModalVisibility(false);
        setCurrentTopicId('');
    };

    return (
        <CommentModalContext.Provider value={{ showCommentModal }}>
            {children}
            <Modal isOpen={isModalVisible} title='Comment(s)' onClose={closeModal}>
                <CommentModal topicId={currentTopicId} />
            </Modal>
        </CommentModalContext.Provider>
    );
};

export default CommentModalProvider;
