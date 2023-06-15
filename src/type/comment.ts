export type CommentType = {
    opinion: string;
    createdAt: string;
    id: string;
    topicId: string;
    likes: number;
    dislikes: number;
    likedBySessionUser: boolean,
    commentedBySessionUser: boolean,
    dislikedBySessionUser: boolean;
    userName?: string,
    image?: string;
    subCommentsArray?:CommentType[]
};
