import { User } from '../../friends/types/User';

export type CommentResponse = { comments: CommentType[]; totalCount: number | undefined };

export type CommentType = {
    id: number;
    body: string;
    data: string;
    postId: number;
    parentId: number;
    children?: CommentType[];
    childCount: number;
    likes: number;
    createdAt: string;
    upatedAt?: string;
    user: User;
};
