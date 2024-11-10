import { User } from '../user/usersTypes';

export type PostResponse = { posts: PostTypes[] };

export type PostTypes = {
    id: number;
    title: string;
    body: string;
    tags: Tag[];
    reactions: Reaction;
    userId: number;
    views: number;
    className: string;
};

export type Reaction = {
    likes: number;
    dislikes: number;
};
export type Tag = {
    name: string;
};
