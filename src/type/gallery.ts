export type Gallery = {
    id: string;
    createdAt: Date;
    title: string;
    location: string;
    src: string;
    description: string;
    likes: number;
    dislikes: number;
    comments: number;
    topicId: string;
    altTag: string;
    likedBySessionUser: boolean,
    commentedBySessionUser: boolean,
    dislikedBySessionUser: boolean;
    onLikeClick?: (id: string) => void;
    onDislikeClick?: (id: string) => void;
    onCommentClick?: (id: string) => void;
};