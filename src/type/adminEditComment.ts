import { CommentType } from './comment';
import { Topic } from './topic';

export type AdminEditCommentType = {
    comments: CommentType[];
    topics: Topic[];
};