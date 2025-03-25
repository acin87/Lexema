import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostTypes } from '../types/PostTypes';

interface MainFeedState {
    posts: PostTypes[];
    skipPost: number;
    scrollPosition: number;
}
const initialState: MainFeedState = {
    posts: [],
    skipPost: 0,
    scrollPosition: 0,
};

const mainFeedSlice = createSlice({
    name: 'mainFeed',
    initialState: initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<PostTypes[]>) => {
            state.posts = action.payload;
        },
        addPosts: (state, action: PayloadAction<PostTypes[]>) => {
            //на всякий случай добавляем только новые посты
            const newPosts = action.payload.filter((post) => !state.posts.some((p) => p.id === post.id));
            if (newPosts.length > 0) {
                state.posts.push(...newPosts);
            }
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload.id);
        },
        setSkipPost: (state, action: PayloadAction<number>) => {
            state.skipPost = action.payload;
        },
        setScrollPosition: (state, action: PayloadAction<number>) => {
            state.scrollPosition = action.payload;
        },
    },
});

export const { setPosts, removePost, setSkipPost, setScrollPosition, addPosts } = mainFeedSlice.actions;
export default mainFeedSlice.reducer;
