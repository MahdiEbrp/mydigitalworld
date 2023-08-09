import { CommentType } from '@/type/comment';

export const buildCommentTree = (comments: CommentType[]): CommentType[] => {
    const commentMap = comments.reduce<Record<string, CommentType>>((map, comment) => {
        return {
            ...map,
            [comment.id]: { ...comment, replies: [] },
        };
    }, {});
    const commentTree: CommentType[] = [];
    for (const comment of Object.values(commentMap)) {
        const parent = commentMap[comment.parentId ?? ''];
        if (comment.parentId && !parent)
            continue;
        if (parent) {
            parent.comments++;
            parent.replies?.push(comment);
        } else {
            commentTree.push(comment);
        }
    }

    return commentTree;
};

