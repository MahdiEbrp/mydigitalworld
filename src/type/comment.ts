export type CommentType = {
    opinion: string;
    createdAt: string;
    id: string;
    parentId?: string | null;
    topicId: string;
    likes: number;
    dislikes: number;
    comments: number;
    likedBySessionUser: boolean;
    commentedBySessionUser: boolean;
    dislikedBySessionUser: boolean;
    userName: string | null;
    image: string | null;
    replies?: CommentType[];
};
