import { Post } from '../../../entities/post/types/PostTypes';
export type FeedType = 'main' | 'profile' | 'group';

export interface FeedState {
    [key: string]: {
        posts: Post[];
        skip: number;
      };
}
