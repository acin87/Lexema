import { User } from '../../../entities/user/types/UserTypes';

export type CommentResponse = { 
    results: CommentType[]; 
    count: number;
};

export type CommentType = {
    id: number;
    content: string;
    post_id: number;
    parent_id: number;
    replies?: CommentType[];
    child_count: number;
    likes: number;
    created_at: string;
    updated_at?: string;
    images: [{ image: string }] | null;
    user: User;
};
