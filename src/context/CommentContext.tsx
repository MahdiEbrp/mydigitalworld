import CommentModal from '@/components/modals/Comment';
import Modal from '@/components/Modal';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type CommentModalContextType = {
    showCommentModal: (topicId: string) => Promise<number>;
};

const CommentModalContext = createContext<CommentModalContextType>({
    showCommentModal: () => Promise.resolve(0),
});

export const useCommentModal = () => useContext(CommentModalContext);

const CommentModalProvider = ({ children }: { children: ReactNode; }) => {
    const [isModalVisible, setModalVisibility] = useState(false);
    const [currentTopicId, setCurrentTopicId] = useState<string>('');
    // eslint-disable-next-line no-extra-parens
    const [resolveFn, setResolveFn] = useState<(count:number) => void>(() => void 0);
    const [commentCount, setCommentCount] = useState(0);
    const showCommentModal = (topicId: string) => {
        setCurrentTopicId(topicId);
        setModalVisibility(true);
        return new Promise<number>((resolve) => {
            setResolveFn(() => resolve);
        });
    };
    const closeModal = () => {
        setModalVisibility(false);
        setCurrentTopicId('');
        resolveFn(commentCount);
    };

    const handleCommentCountChange = (count: number) => {
        setCommentCount(count);
    };

    return (
        <CommentModalContext.Provider value={{ showCommentModal }}>
            {children}
            <Modal isOpen={isModalVisible} title='Comment(s)' onClose={closeModal}>
                <CommentModal onCountChange={handleCommentCountChange} topicId={currentTopicId} />
            </Modal>
        </CommentModalContext.Provider>
    );
};

export default CommentModalProvider;