import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../../entities/post/types/PostTypes';
import { FeedState, FeedType } from '../types/FeedTypes';

const initialState: FeedState = {
    main: { posts: [], skip: 0 },
    profile: { posts: [], skip: 0 },
    group: { posts: [], skip: 0 },
};

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<{ feedType: FeedType; posts: Post[] }>) => {
            const { feedType, posts } = action.payload;
            state[feedType].posts = posts;
        },
        addPosts: (state, action: PayloadAction<{ feedType: FeedType; posts: Post[] }>) => {
            const { feedType, posts } = action.payload;
            //на всякий случай добавляем только новые посты
            const newPosts = posts.filter((post) => !state[feedType].posts.some((p) => p.id === post.id));
            if (newPosts.length > 0) {
                state[feedType].posts.push(...newPosts);
            }
        },
        setSkip: (state, action: PayloadAction<{ feedType: FeedType; skip: number }>) => {
            const { feedType, skip } = action.payload;
            state[feedType].skip = skip;
        },
    },
});

export const { setPosts, addPosts, setSkip } = feedSlice.actions;
export default feedSlice.reducer;
